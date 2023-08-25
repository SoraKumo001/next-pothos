import { Prisma } from "@prisma/client";
import type { SchemaTypes } from "@pothos/core";
import { PrismaCrudGenerator } from "./PrismaCrudGenerator";
import deepmerge from "deepmerge";

type ModelDirective = {
  action?: { include?: string[]; exclude?: string[] };
  select?: { include?: string[]; exclude?: string[] };
  query?: { orderBy?: object; where?: object };
  option?: { include?: string[]; exclude?: string[]; params?: object };
};

const queryActions = ["find", "findMany"];
const mutationActions = [
  "create",
  "createMany",
  "update",
  "updateMany",
  "delete",
  "deleteMany",
];

const actions = [...queryActions, ...mutationActions];

const getSchemaDirectives = (doc?: string) => {
  const regex = /(?<=@pothos-generator\s).*$/gm;
  return (
    doc
      ?.replace(/\\n/g, "\n")
      .match(regex)
      ?.map((text) => {
        try {
          const [, key, json] =
            text.match(/^(action|select|query|option)\s*(.*?)$/) ?? [];
          if (!key || !json) throw "";
          return { [key]: JSON.parse(json) };
        } catch (e) {
          throw new Error(`Error parsing schema directive:\n ${text}\n${e}`);
        }
      }) ?? []
  );
};
const expandActions = (actions: string[]) =>
  actions.flatMap((action) =>
    action === "mutation"
      ? mutationActions
      : action === "query"
      ? queryActions
      : action
  );

const getActions = ({
  include,
  exclude,
}: {
  include?: string[];
  exclude?: string[];
}) => {
  if (include) {
    return expandActions(include);
  }
  if (exclude) {
    const expandExclude = expandActions(exclude);
    return actions.filter((action) => !expandExclude.includes(action));
  }
  return actions;
};

export class PrismaSchemaGenerator<
  Types extends SchemaTypes
> extends PrismaCrudGenerator<Types> {
  private _builder;
  modelDirectives: { [key: string]: ModelDirective[] } = {};
  constructor(builder: PothosSchemaTypes.SchemaBuilder<Types>) {
    super(builder);
    this._builder = builder;

    Prisma.dmmf.datamodel.models.map((model) => {
      this.modelDirectives[model.name] = getSchemaDirectives(
        model.documentation
      );
    });
  }
  getBuilder() {
    return this._builder;
  }
  getModelDirectives(modelName: string) {
    return this.modelDirectives[modelName];
  }
  getModelActions(modelName: string) {
    const directives = this.getModelDirectives(modelName) ?? [];
    return directives.reduce<string[]>((pre, { action }) => {
      return action ? getActions(action) : pre;
    }, actions);
    return actions;
  }

  getModelOptions(modelName: string) {
    const directives = this.getModelDirectives(modelName) ?? [];

    return directives.reduce<{ [key: string]: object | undefined }>(
      (pre, { option }) => {
        if (!option) return pre;
        const actions = getActions(option ?? {});
        let result = { ...pre };
        actions.forEach((action) => {
          result = { ...result, [action]: option?.params };
        });
        return result;
      },
      {}
    );
  }
  getModelQuery(modelName: string) {
    const directives = this.getModelDirectives(modelName) ?? [];
    return directives.reduce(
      (pre, { query }) =>
        deepmerge(pre, {
          orderBy: query?.orderBy,
          where: query?.where,
        }),
      { orderBy: {}, where: {} }
    );
  }

  getModelSelect(modelName: string) {
    const directives = this.getModelDirectives(modelName) ?? [];

    const fields =
      Prisma.dmmf.datamodel.models
        .find(({ name }) => name === modelName)
        ?.fields.map(({ name }) => name) ?? [];

    return directives.reduce<string[]>((pre, { select }) => {
      const include = select?.include;
      if (include) {
        return [...pre, ...include];
      }

      const exclude = select?.exclude;
      if (exclude) {
        return pre.filter((action) => !exclude.includes(action));
      }
      return pre;
    }, fields);
  }
}
