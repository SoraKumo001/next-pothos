import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { prisma } from "./context";
import PrismaTypes from "./generated/pothos-types";
import { Prisma } from "@prisma/client";
import { DateTimeResolver } from "graphql-scalars";
import {
  PrismaSchemaGenerator,
  createModelListQuery,
  createModelMutation,
  createModelObject,
  createModelQuery,
  deleteManyModelMutation,
  deleteModelMutation,
  updateManyModelMutation,
  updateModelMutation,
} from "./libs/createPothosSchema";
import PrismaUtils from "@pothos/plugin-prisma-utils";

export const builder: PothosSchemaTypes.SchemaBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<{
    PrismaTypes: PrismaTypes;
    Scalars: {
      DateTime: {
        Input: Date;
        Output: Date;
      };
    };
  }>
> = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  plugins: [PrismaPlugin, PrismaUtils],
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
  },
});

builder.addScalarType("DateTime", DateTimeResolver, {});

const generator = new PrismaSchemaGenerator(builder);
createModelObject(generator);
builder.queryType({
  fields: (t) => {
    return {
      ...createModelQuery(t, generator),
      ...createModelListQuery(t, generator),
    };
  },
});

builder.mutationType({
  fields: (t) => {
    return {
      ...createModelMutation(t, generator),
      ...updateModelMutation(t, generator),
      ...updateManyModelMutation(t, generator),
      ...deleteModelMutation(t, generator),
      ...deleteManyModelMutation(t, generator),
    };
  },
});
