import { Prisma } from "@prisma/client";
import type { SchemaTypes } from "@pothos/core";
import { PrismaCrudGenerator } from "./PrismaCrudGenerator";
import JSON5 from "json5";

const findOperations = ["findFirst", "findMany"] as const;
const createOperations = ["createOne", "createMany"] as const;
const updateOperations = ["updateOne", "updateMany"] as const;
const deleteOperations = ["deleteOne", "deleteMany"] as const;
const mutationOperations = [
  ...createOperations,
  ...updateOperations,
  ...deleteOperations,
] as const;

const operationMap = {
  find: findOperations,
  query: findOperations,
  create: createOperations,
  update: updateOperations,
  delete: deleteOperations,
  mutation: mutationOperations,
};

const allOperations = [...findOperations, ...mutationOperations];

type Operation = (typeof allOperations)[number];
type ExtendOperation = Operation | "mutation" | "query";

type ModelDirective = {
  operation?: { include?: Operation[]; exclude?: Operation[] };
  select?: {
    include?: Operation[];
    exclude?: Operation[];
    fields: { include?: string[]; exclude?: string[] };
  };
  order?: {
    include?: Operation[];
    exclude?: Operation[];
    orderBy?: object;
  };
  where?: {
    include?: Operation[];
    exclude?: Operation[];
    where?: object;
  };
  option?: { include?: Operation[]; exclude?: Operation[]; option?: object };
  "input-field"?: {
    include?: Operation[];
    exclude?: Operation[];
    fields: { include?: string[]; exclude?: string[] };
  };
  "input-data"?: {
    include?: Operation[];
    exclude?: Operation[];
    data?: object;
  };
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
            text.match(
              /^(operation|select|where|order|option|input-field|input-data)\s*(.*?)$/
            ) ?? [];
          if (!key || !json) throw "";
          return { [key]: JSON5.parse(json) };
        } catch (e) {
          throw new Error(`Error parsing schema directive:\n ${text}\n${e}`);
        }
      }) ?? []
  );
};
const expandOperations = (operations: ExtendOperation[]) =>
  Array.from(
    new Set(
      operations.flatMap(
        (operation) =>
          operationMap[operation as keyof typeof operationMap] ?? operation
      )
    )
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
  modelSelections: { [key: string]: { [key in Operation]: string[] } } = {};
  modelWhere: {
    [key: string]: {
      [key in Operation]: object;
    };
  } = {};
  modelOrder: {
    [key: string]: {
      [key in Operation]: object;
    };
  } = {};
  modelInputWithoutFields: {
    [key: string]: { [key in Operation]: string[] };
  } = {};
  modelInputData: {
    [key: string]: { [key in Operation]: object };
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
    this.createModelWhere();
    this.createModelOrder();
    this.createModelInputField();
    this.createModelInputData();
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
        const fields = this.getModelFields(name);
        const operations = getOperations({});
        this.modelSelections[name] = Object.fromEntries(
          operations.map((operation) => [operation, fields])
        ) as { [key in Operation]: string[] };
      } else {
        this.modelSelections[name] = directives.reduce(
          (pre, select) => {
            const operations = getOperations(select ?? {});
            let result = { ...pre };
            operations.forEach((operation) => {
              result = {
                ...result,
                [operation]: this.getModelFields(name, select),
              };
            });
            return result;
          },
          {} as {
            [key in Operation]: string[];
          }
        );
      }
    });
  }

  protected createModelOrder() {
    Prisma.dmmf.datamodel.models.forEach(({ name }) => {
      const directives = this.getModelDirectives(name, "order");

      directives.forEach((query) => {
        const operations = getOperations(query ?? {});
        let result = {};
        operations.forEach((action) => {
          result = {
            ...result,
            [action]: query?.orderBy,
          };
        });
        this.modelOrder[name] = result as {
          [key in Operation]: object;
        };
      });
    });
  }
  protected createModelWhere() {
    Prisma.dmmf.datamodel.models.forEach(({ name }) => {
      const directives = this.getModelDirectives(name, "where");

      directives.forEach((query) => {
        const operations = getOperations(query ?? {});
        let result = {};
        operations.forEach((action) => {
          result = {
            ...result,
            [action]: query?.where,
          };
        });
        this.modelWhere[name] = result as {
          [key in Operation]: object;
        };
      });
    });
  }

  protected createModelInputField() {
    Prisma.dmmf.datamodel.models.forEach(({ name }) => {
      const directives = this.getModelDirectives(name, "input-field");

      this.modelInputWithoutFields[name] = directives.reduce(
        (pre, input) => {
          if (!input) return pre;
          const operations = getOperations(input ?? {});
          let result = { ...pre };
          operations.forEach((action) => {
            result = {
              ...result,
              [action]: this.getModelFields(name, input.fields, true),
            };
          });
          return result;
        },
        {} as {
          [key in Operation]: string[];
        }
      );
    });
  }
  protected createModelInputData() {
    Prisma.dmmf.datamodel.models.forEach(({ name }) => {
      const directives = this.getModelDirectives(name, "input-data");

      this.modelInputData[name] = directives.reduce(
        (pre, input) => {
          if (!input) return pre;
          const operations = getOperations(input ?? {});
          let result = { ...pre };
          operations.forEach((action) => {
            result = {
              ...result,
              [action]: this.getModelFields(name, input.data, true),
            };
          });
          return result;
        },
        {} as {
          [key in Operation]: object;
        }
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

  getModelWhere(modelName: string) {
    return this.modelWhere[modelName] ?? {};
  }
  getModelOrder(modelName: string) {
    return this.modelOrder[modelName] ?? {};
  }
  getModelInputFields(modelName: string) {
    return this.modelInputWithoutFields[modelName] ?? [];
  }
  getModelInputData(modelName: string) {
    return this.modelInputData[modelName] ?? [];
  }
  getCreateInput<Name extends keyof Types["PrismaTypes"] & string>(
    modelName: Name,
    without?: string[]
  ) {
    const fields = this.getModelInputFields(modelName)["createOne"];
    return super.getCreateInput(modelName, [...fields, ...(without ?? [])]);
  }
  getUpdateInput<Name extends keyof Types["PrismaTypes"] & string>(
    modelName: Name,
    without?: string[]
  ) {
    const fields = this.getModelInputFields(modelName)["updateOne"];
    return super.getUpdateInput(modelName, [...fields, ...(without ?? [])]);
  }
}