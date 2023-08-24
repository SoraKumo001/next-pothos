import { Prisma } from "@prisma/client";
import type { SchemaTypes } from "@pothos/core";
import { PrismaCrudGenerator } from "./generator";

type ModelDirective = {
  action?: { include?: string[]; exclude?: string[] };
  select?: { include?: string[]; exclude?: string[] };
  query?: { orderBy?: object; where?: object };
};

const actions = [
  "find",
  "findMany",
  "create",
  "createMany",
  "update",
  "updateMany",
  "delete",
  "deleteMany",
];

export class PrismaSchemaGenerator<
  Types extends SchemaTypes
> extends PrismaCrudGenerator<Types> {
  private _builder;
  modelDirective: { [key: string]: ModelDirective } = {};
  constructor(builder: PothosSchemaTypes.SchemaBuilder<Types>) {
    super(builder);
    this._builder = builder;

    Prisma.dmmf.datamodel.models.map((model) => {
      const directive = getSchemaDirective(model.documentation);
      this.modelDirective[model.name] = directive;
    });
  }
  getModelDirective(modelName: string) {
    return this.modelDirective[modelName];
  }
  getModelActions(modelName: string) {
    const directive = this.getModelDirective(modelName)?.action;
    if (directive?.include) {
      return directive.include;
    }
    if (directive?.exclude) {
      return actions.filter((action) => !directive.exclude?.includes(action));
    }
    return actions;
  }
  getModelQuery(modelName: string) {
    const directive = this.getModelDirective(modelName)?.query;
    return { orderBy: directive?.orderBy ?? {}, where: directive?.where ?? {} };
  }
  getModelSelect(modelName: string) {
    const directive = this.getModelDirective(modelName)?.select;
    if (directive?.include) {
      return directive.include;
    }
    const fields =
      Prisma.dmmf.datamodel.models
        .find(({ name }) => name === modelName)
        ?.fields.map(({ name }) => name) ?? [];
    if (directive?.exclude) {
      return fields.filter((action) => !directive.exclude?.includes(action));
    }
    return fields;
  }
  getBuilder() {
    return this._builder;
  }
}

type LowerFirst<T extends string> = T extends `${infer F}${infer R}`
  ? `${Lowercase<F>}${R}`
  : T;

const lowerFirst = <T extends string>(str: T) => {
  return (str.charAt(0).toLowerCase() + str.slice(1)) as LowerFirst<T>;
};

const getPrisma = <T extends SchemaTypes, ParentShape>(
  t:
    | PothosSchemaTypes.ObjectFieldBuilder<T, ParentShape>
    | PothosSchemaTypes.QueryFieldBuilder<T, ParentShape>
    | PothosSchemaTypes.MutationFieldBuilder<T, ParentShape>,
  ctx = {}
): any => {
  const prisma = t.builder.options.prisma.client;
  return typeof prisma === "function" ? prisma(ctx) : prisma;
};

const getSchemaDirective = (doc?: string) => {
  const regex = /(?<=@pothos-generator\s).*$/gm;
  return (
    doc
      ?.replace(/\\n/g, "\n")
      .match(regex)
      ?.reduce((acc, cur) => {
        try {
          const object = JSON.parse(cur);
          return Object.assign(acc, object);
        } catch (e) {
          throw new Error(`Error parsing schema directive: ${cur}`);
        }
      }, {}) ?? {}
  );
};

export const createModelObject = (generator: PrismaSchemaGenerator<any>) => {
  const builder = generator.getBuilder();
  Prisma.dmmf.datamodel.models.map((model) => {
    const selectFields = new Set(generator.getModelSelect(model.name));
    builder.prismaObject(model.name, {
      fields: (t) => {
        const fields = model.fields
          .filter(({ name }) => selectFields.has(name))
          .map((field) => {
            const modelQuery = generator.getModelQuery(field.type);
            return [
              field.name,
              field.isId
                ? t.exposeID(field.name)
                : field.kind === "scalar"
                ? t.expose(field.name, {
                    type: field.isList ? t.listRef(field.type) : field.type,
                    nullable: !field.isRequired,
                  })
                : t.relation(field.name, {
                    args: generator.findManyArgs(field.type),
                    query: (args) => {
                      const where = { ...args.filter, ...modelQuery.where };
                      const orderBy = {
                        ...args.orderBy,
                        ...modelQuery.orderBy,
                      };

                      return {
                        where: Object.keys(where).length ? where : undefined,
                        orderBy: Object.keys(orderBy).length
                          ? orderBy
                          : undefined,
                      };
                    },
                  }),
            ];
          });
        return Object.fromEntries(fields);
      },
    });
  });
};

export const createModelQuery = (
  t: PothosSchemaTypes.QueryFieldBuilder<any, any>,
  generator: PrismaSchemaGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) => generator.getModelActions(model.name).includes("find"))
      .map((model) => {
        return [
          `find${model.name}`,
          t.prismaField({
            type: model.name,
            nullable: true,
            args: {
              filter: t.arg({
                type: generator.getWhereUnique(model.name),
                required: true,
              }),
            },
            resolve: (query, _root, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              const modelQuery = generator.getModelQuery(model.name);
              const where = { ...args.filter, ...modelQuery.where };
              return prisma[lowerFirst(model.name)].findUnique({
                ...query,
                where: Object.keys(where).length ? where : undefined,
              });
            },
          }),
        ];
      })
  );
};

export const createModelListQuery = (
  t: PothosSchemaTypes.QueryFieldBuilder<any, any>,
  generator: PrismaSchemaGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelActions(model.name).includes("findMany")
      )
      .map((model) => {
        return [
          `findMany${model.name}`,
          t.prismaField({
            type: [model.name],
            args: generator.findManyArgs(model.name),
            resolve: (query, _root, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              const modelQuery = generator.getModelQuery(model.name);
              const where = { ...args.filter, ...modelQuery.where };
              const orderBy = {
                ...args.orderBy,
                ...modelQuery.orderBy,
              };
              return prisma[lowerFirst(model.name)].findMany({
                ...query,
                where: Object.keys(where).length ? where : undefined,
                orderBy: Object.keys(orderBy).length ? orderBy : undefined,
              });
            },
          }),
        ];
      })
  );
};

export const createModelMutation = (
  t: PothosSchemaTypes.MutationFieldBuilder<any, any>,
  generator: PrismaSchemaGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelActions(model.name).includes("findMany")
      )
      .map((model) => {
        return [
          `create${model.name}`,
          t.prismaField({
            type: model.name,
            args: {
              input: t.arg({
                type: generator.getCreateInput(model.name),
                required: true,
              }),
            },
            resolve: (query, _root, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              return prisma[lowerFirst(model.name)].create({
                ...query,
                data: {
                  ...args.input,
                },
              });
            },
          }),
        ];
      })
  );
};

export const updateModelMutation = (
  t: PothosSchemaTypes.MutationFieldBuilder<any, any>,
  generator: PrismaSchemaGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelActions(model.name).includes("update")
      )
      .map((model) => {
        return [
          `update${model.name}`,
          t.prismaField({
            type: model.name,
            args: {
              where: t.arg({
                type: generator.getWhereUnique(model.name),
                required: true,
              }),
              data: t.arg({
                type: generator.getUpdateInput(model.name),
                required: true,
              }),
            },
            resolve: (query, _root, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              return prisma[lowerFirst(model.name)].update({
                ...query,
                where: {
                  ...args.where,
                },
                data: {
                  ...args.data,
                },
              });
            },
          }),
        ];
      })
  );
};

export const updateManyModelMutation = (
  t: PothosSchemaTypes.MutationFieldBuilder<any, any>,
  generator: PrismaSchemaGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelActions(model.name).includes("updateMany")
      )
      .map((model) => {
        return [
          `updateMany${model.name}`,
          t.int({
            args: {
              where: t.arg({
                type: generator.getWhereUnique(model.name),
                required: true,
              }),
              data: t.arg({
                type: generator.getUpdateInput(model.name),
                required: true,
              }),
            },
            resolve: (_parent, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              return prisma[lowerFirst(model.name)]
                .updateMany({
                  where: args.where ?? undefined,
                  data: args.data,
                })
                .then(({ count }: { count: number }) => count);
            },
          }),
        ];
      })
  );
};

export const deleteModelMutation = (
  t: PothosSchemaTypes.MutationFieldBuilder<any, any>,
  generator: PrismaSchemaGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelActions(model.name).includes("delete")
      )
      .map((model) => {
        return [
          `delete${model.name}`,
          t.prismaField({
            type: model.name,
            args: {
              where: t.arg({
                type: generator.getWhereUnique(model.name),
                required: true,
              }),
            },
            resolve: (query, _root, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              return prisma[lowerFirst(model.name)].delete({
                ...query,
                where: {
                  ...args.where,
                },
              });
            },
          }),
        ];
      })
  );
};

export const deleteManyModelMutation = (
  t: PothosSchemaTypes.MutationFieldBuilder<any, any>,
  generator: PrismaSchemaGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelActions(model.name).includes("deleteMany")
      )
      .map((model) => {
        return [
          `deleteMany${model.name}`,
          t.int({
            args: {
              where: t.arg({
                type: generator.getWhereUnique(model.name),
                required: true,
              }),
            },
            resolve: (_parent, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              return prisma[lowerFirst(model.name)]
                .deleteMany({
                  where: args.where ?? undefined,
                })
                .then(({ count }: { count: number }) => count);
            },
          }),
        ];
      })
  );
};
