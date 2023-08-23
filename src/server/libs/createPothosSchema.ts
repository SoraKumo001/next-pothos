import { Prisma } from "@prisma/client";
import type { SchemaTypes } from "@pothos/core";
import { PrismaCrudGenerator } from "./generatePothos";

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

export const createModelObject = (
  builder: PothosSchemaTypes.SchemaBuilder<any>,
  generator: PrismaCrudGenerator<any>
) => {
  Prisma.dmmf.datamodel.models.map((model) => {
    builder.prismaObject(model.name, {
      fields: (t) => {
        const fields = model.fields.map((field) => [
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
                query: (args) => ({
                  where: args.filter ?? undefined,
                  orderBy: args.orderBy ?? undefined,
                  take: 2,
                }),
              }),
        ]);
        return Object.fromEntries(fields);
      },
    });
  });
};

export const createModelQuery = (
  t: PothosSchemaTypes.QueryFieldBuilder<any, any>,
  generator: PrismaCrudGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models.map((model) => {
      return [
        lowerFirst(model.name),
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
            return prisma[lowerFirst(model.name)].findUnique({
              ...query,
              where: args.filter,
            });
          },
        }),
      ];
    })
  );
};

export const createModelListQuery = (
  t: PothosSchemaTypes.QueryFieldBuilder<any, any>,
  generator: PrismaCrudGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models.map((model) => {
      return [
        `list${model.name}`,
        t.prismaField({
          type: [model.name],
          args: generator.findManyArgs(model.name),
          resolve: (query, _root, args, ctx, _info) => {
            const prisma = getPrisma(t, ctx);
            return prisma[lowerFirst(model.name)].findMany({
              ...query,
              where: args.filter ?? undefined,
              orderBy: args.orderBy ?? undefined,
              take: 3,
            });
          },
        }),
      ];
    })
  );
};

export const createModelMutation = (
  t: PothosSchemaTypes.MutationFieldBuilder<any, any>,
  generator: PrismaCrudGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models.map((model) => {
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
  generator: PrismaCrudGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models.map((model) => {
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
  generator: PrismaCrudGenerator<any>
) => {
  return Object.fromEntries(
    Prisma.dmmf.datamodel.models.map((model) => {
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
