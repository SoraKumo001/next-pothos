import { Prisma } from "@prisma/client";
import type { SchemaTypes } from "@pothos/core";
import { PrismaCrudGenerator } from "./PrismaCrudGenerator";
import JSON5 from "json5";

const queryOperations = ["find", "findMany"] as const;
const mutationOperations = [
  "create",
  "createMany",
  "update",
  "updateMany",
  "delete",
  "deleteMany",
] as const;

const allOperations = [...queryOperations, ...mutationOperations];

type Operation = (typeof allOperations)[number];
type ExtendOperation = Operation | "mutation" | "query";

type ModelDirective = {
  operation?: { include?: Operation[]; exclude?: Operation[] };
  select?: { include?: Operation[]; exclude?: Operation[] };
  query?: {
    include?: Operation[];
    exclude?: Operation[];
    orderBy?: object;
    where?: object;
  };
  option?: { include?: Operation[]; exclude?: Operation[]; option?: object };
  input?: { fields: { include?: string[]; exclude?: string[] } };
};

const getSchemaDirectives = (doc?: string) => {
  const regex = /(?<=@pothos-generator\s).*$/gm;
  return (
    doc
      ?.replace(/\\n/g, "\n")
      .match(regex)
      ?.map((text) => {
        try {
          const [, key, json] =
            text.match(/^(operation|select|query|option|input)\s*(.*?)$/) ?? [];
          if (!key || !json) throw "";
          return { [key]: JSON5.parse(json) };
        } catch (e) {
          throw new Error(`Error parsing schema directive:\n ${text}\n${e}`);
        }
      }) ?? []
  );
};
const expandOperations = (operations: ExtendOperation[]) =>
  operations.flatMap((operation) =>
    operation === "mutation"
      ? mutationOperations
      : operation === "query"
      ? queryOperations
      : operation
  );

const getOperations = ({
  include,
  exclude,
}: {
  include?: ExtendOperation[];
  exclude?: ExtendOperation[];
}) => {
  if (include) {
    return expandOperations(include);
  }
  if (exclude) {
    const expandExclude = expandOperations(exclude);
    return allOperations.filter((action) => !expandExclude.includes(action));
  }
  return allOperations;
};

export class PrismaSchemaGenerator<
  Types extends SchemaTypes
> extends PrismaCrudGenerator<Types> {
  private _builder;
  modelDirectives: {
    [key: string]: {
      [key in keyof ModelDirective]: Exclude<ModelDirective[key], undefined>[];
    };
  } = {};
  modelOptions: {
    [key: string]: { [key in Operation]: object | undefined };
  } = {};
  modelSelections: { [key: string]: string[] } = {};
  modelQuery: {
    [key: string]: {
      [key in Operation]: { orderBy?: object; where?: object };
    };
  } = {};
  modelInputFields: {
    [key: string]: string[];
  } = {};

  constructor(builder: PothosSchemaTypes.SchemaBuilder<Types>) {
    super(builder);
    this._builder = builder;

    Prisma.dmmf.datamodel.models.map(({ name, documentation }) => {
      this.modelDirectives[name] = getSchemaDirectives(documentation).reduce(
        (pre, value) => {
          Object.keys(value).forEach((key) => {
            const directives = pre[key] ?? [];
            pre[key] = [...directives, value[key]];
          });
          return pre;
        },
        []
      );
    });

    this.createModelOptions();
    this.createModelSelections();
    this.createModelQuery();
    this.createModelInput();
  }
  getBuilder() {
    return this._builder;
  }

  protected createModelOptions() {
    Prisma.dmmf.datamodel.models.forEach(({ name }) => {
      const directives = this.getModelDirectives(name, "option");
      this.modelOptions[name] = directives.reduce(
        (pre, option) => {
          if (!option) return pre;
          const operations = getOperations(option ?? {});
          let result = { ...pre };
          operations.forEach((action) => {
            result = { ...result, [action]: option?.option };
          });
          return result;
        },
        {} as {
          [key in Operation]: object | undefined;
        }
      );
    });
  }

  protected createModelSelections() {
    Prisma.dmmf.datamodel.models.forEach(({ name }) => {
      const directives = this.getModelDirectives(name, "select");
      if (!directives.length) {
        this.modelSelections[name] = this.getModelFields(name);
      } else {
        this.modelSelections[name] = directives.reduce<string[]>(
          (pre, select) => {
            return [...pre, ...this.getModelFields(name, select)];
          },
          []
        );
      }
    });
  }

  protected createModelQuery() {
    Prisma.dmmf.datamodel.models.forEach(({ name }) => {
      const directives = this.getModelDirectives(name, "query");

      directives.forEach((query) => {
        const operations = getOperations(query ?? {});
        let result = {};
        operations.forEach((action) => {
          result = {
            ...result,
            [action]: {
              orderBy: query?.orderBy,
              where: query?.where,
            },
          };
        });
        this.modelQuery[name] = result as {
          [key in Operation]: { orderBy?: object; where?: object };
        };
      });
    });
  }

  protected createModelInput() {
    Prisma.dmmf.datamodel.models.forEach(({ name }) => {
      const directives = this.getModelDirectives(name, "input");
      this.modelInputFields[name] = this.getModelFields(
        name,
        directives[0]?.fields,
        true
      );
    });
  }

  getModelFields(
    modelName: string,
    fields?: { include?: string[]; exclude?: string[] },
    inversion = false
  ) {
    const model = Prisma.dmmf.datamodel.models.find(
      ({ name }) => name === modelName
    );
    const modelFields = model?.fields.map(({ name }) => name) ?? [];
    const include = fields?.include ?? modelFields;
    const exclude = fields?.exclude ?? [];
    const result = include.filter((field) => !exclude.includes(field));
    return inversion
      ? modelFields.filter((field) => !result.includes(field))
      : result;
  }

  getModelDirectives<T extends keyof ModelDirective>(
    modelName: string,
    kind: T
  ): Exclude<ModelDirective[T], undefined>[] {
    return this.modelDirectives[modelName]?.[kind] ?? [];
  }
  getModelOperations(modelName: string) {
    const directives = this.getModelDirectives(modelName, "operation");
    return directives.reduce<string[]>((_, action) => {
      return getOperations(action);
    }, allOperations);
  }

  getModelOptions(modelName: string) {
    return this.modelOptions[modelName];
  }
  getModelSelect(modelName: string) {
    return this.modelSelections[modelName] ?? [];
  }

  getModelQuery(modelName: string) {
    return this.modelQuery[modelName] ?? {};
  }
  getModelInputFields(modelName: string) {
    return this.modelInputFields[modelName] ?? [];
  }
}
