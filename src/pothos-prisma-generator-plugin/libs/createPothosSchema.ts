import { Prisma } from "@prisma/client";
import type { SchemaTypes } from "@pothos/core";
import { PrismaSchemaGenerator } from "./generator/PrismaSchemaGenerator";
import traverse from "traverse";

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

export const createModelObject = (generator: PrismaSchemaGenerator<any>) => {
  const builder = generator.getBuilder();
  Prisma.dmmf.datamodel.models.map((model) => {
    const selectFields = new Set(generator.getModelSelect(model.name));
    builder.prismaObject(model.name, {
      fields: (t) => {
        const fields = model.fields
          .filter(({ name }) => selectFields.has(name))
          .map((field) => {
            return [
              field.name,
              field.isId
                ? t.exposeID(field.name)
                : field.kind === "scalar"
                ? t.expose(field.name, {
                    type: field.isList ? t.listRef(field.type) : field.type,
                    nullable: !field.isRequired,
                  })
                : (() => {
                    const operationPrefix = field.isList ? "findMany" : "find";
                    const modelQuery = generator.getModelQuery(field.type)[
                      operationPrefix
                    ];
                    const options = generator.getModelOptions(field.type)[
                      operationPrefix
                    ];
                    return t.relation(field.name, {
                      ...options,
                      args: field.isList
                        ? generator.findManyArgs(field.type)
                        : undefined,
                      query: (args) => {
                        if (!field.isList) return {};

                        const where = { ...args.filter, ...modelQuery.where };
                        const orderBy = {
                          ...modelQuery.orderBy,
                          ...args.orderBy,
                        };
                        return {
                          where: Object.keys(where).length ? where : undefined,
                          orderBy: Object.keys(orderBy).length
                            ? orderBy
                            : undefined,
                        };
                      },
                    });
                  })(),
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
  const operationPrefix = "find";
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelOperations(model.name).includes(operationPrefix)
      )
      .map((model) => {
        const options = generator.getModelOptions(model.name)[operationPrefix];
        return [
          `${operationPrefix}${model.name}`,
          t.prismaField({
            ...options,
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
              const modelQuery = generator.getModelQuery(model.name)[
                operationPrefix
              ];
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
  const operationPrefix = "findMany";
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelOperations(model.name).includes(operationPrefix)
      )
      .map((model) => {
        const options = generator.getModelOptions(model.name)[operationPrefix];
        return [
          `${operationPrefix}${model.name}`,
          t.prismaField({
            ...options,
            type: [model.name],
            args: generator.findManyArgs(model.name),
            resolve: (query, _root, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              const modelQuery = generator.getModelQuery(model.name)[
                operationPrefix
              ];
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
  const operationPrefix = "create";
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter(({ name }) =>
        generator.getModelOperations(name).includes(operationPrefix)
      )
      .map(({ name }) => {
        const options = generator.getModelOptions(name)[operationPrefix];
        const modelInput = generator.getModelInputData(name);
        return [
          `${operationPrefix}${name}`,
          t.prismaField({
            ...options,
            type: name,
            args: {
              input: t.arg({
                type: generator.getCreateInput(name),
                required: true,
              }),
            },
            resolve: async (query, _root, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              const input = await t.builder.replaceValue(modelInput, {
                context: ctx,
              });
              return prisma[lowerFirst(name)].create({
                ...query,
                data: { ...args.input, ...input },
              });
            },
          }),
        ];
      })
  );
};

export const createManyModelMutation = (
  t: PothosSchemaTypes.MutationFieldBuilder<any, any>,
  generator: PrismaSchemaGenerator<any>
) => {
  const operationPrefix = "createMany";
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter(({ name }) =>
        generator.getModelOperations(name).includes(operationPrefix)
      )
      .map(({ name }) => {
        const options = generator.getModelOptions(name)[operationPrefix];
        return [
          `${operationPrefix}${name}`,
          t.int({
            ...options,
            args: {
              input: t.arg({
                type: [generator.getCreateInput(name)],
                required: true,
              }),
            },
            resolve: (_root, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              return prisma[lowerFirst(name)]
                .createMany({
                  data: {
                    ...args.input,
                  },
                })
                .then(({ count }: { count: number }) => count);
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
  const operationPrefix = "update";
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelOperations(model.name).includes(operationPrefix)
      )
      .map(({ name }) => {
        const options = generator.getModelOptions(name)[operationPrefix];
        return [
          `${operationPrefix}${name}`,
          t.prismaField({
            ...options,
            type: name,
            args: {
              where: t.arg({
                type: generator.getWhereUnique(name),
                required: true,
              }),
              data: t.arg({
                type: generator.getUpdateInput(name),
                required: true,
              }),
            },
            resolve: (query, _root, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              return prisma[lowerFirst(name)].update({
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
  const operationPrefix = "updateMany";
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelOperations(model.name).includes(operationPrefix)
      )
      .map(({ name }) => {
        const options = generator.getModelOptions(name)[operationPrefix];
        return [
          `${operationPrefix}${name}`,
          t.int({
            ...options,
            args: {
              where: t.arg({
                type: generator.getWhere(name),
                required: true,
              }),
              data: t.arg({
                type: generator.getUpdateInput(
                  name,
                  generator.getModelInputFields(name)
                ),
                required: true,
              }),
            },
            resolve: (_parent, args, ctx, _info) => {
              const prisma = getPrisma(t, ctx);
              return prisma[lowerFirst(name)]
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
  const operationPrefix = "delete";
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelOperations(model.name).includes(operationPrefix)
      )
      .map((model) => {
        const options = generator.getModelOptions(model.name)[operationPrefix];
        return [
          `${operationPrefix}${model.name}`,
          t.prismaField({
            ...options,
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
  const operationPrefix = "deleteMany";
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelOperations(model.name).includes(operationPrefix)
      )
      .map((model) => {
        const options = generator.getModelOptions(model.name)[operationPrefix];
        return [
          `${operationPrefix}${model.name}`,
          t.int({
            ...options,
            args: {
              where: t.arg({
                type: generator.getWhere(model.name),
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
