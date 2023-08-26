import { Prisma } from "@prisma/client";
import type { SchemaTypes } from "@pothos/core";
import { PrismaSchemaGenerator } from "./generator/PrismaSchemaGenerator";

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
        const options = generator.getModelOptions(model.name)["find"];
        return [
          `find${model.name}`,
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
        const options = generator.getModelOptions(model.name)["findMany"];
        return [
          `findMany${model.name}`,
          t.prismaField({
            ...options,
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
        generator.getModelActions(model.name).includes("create")
      )
      .map((model) => {
        const options = generator.getModelOptions(model.name)["create"];
        return [
          `create${model.name}`,
          t.prismaField({
            ...options,
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
        const options = generator.getModelOptions(model.name)["update"];
        return [
          `update${model.name}`,
          t.prismaField({
            ...options,
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
        const options = generator.getModelOptions(model.name)["updateMany"];
        return [
          `updateMany${model.name}`,
          t.int({
            ...options,
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
        const options = generator.getModelOptions(model.name)["delete"];
        return [
          `delete${model.name}`,
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
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models
      .filter((model) =>
        generator.getModelActions(model.name).includes("deleteMany")
      )
      .map((model) => {
        const options = generator.getModelOptions(model.name)["deleteMany"];
        return [
          `deleteMany${model.name}`,
          t.int({
            ...options,
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
