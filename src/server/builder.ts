import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { prisma } from "./context";
import PrismaTypes from "./generated/pothos-types";
import { Prisma } from "@prisma/client";
import { DateTimeResolver } from "graphql-scalars";
import {
  createModelListQuery,
  createModelMutation,
  createModelObject,
  createModelQuery,
  updateManyModelMutation,
  updateModelMutation,
} from "./libs/createPothosSchema";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import { PrismaCrudGenerator } from "./libs/generatePothos";

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

const generator = new PrismaCrudGenerator(builder);
createModelObject(builder, generator);
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
    };
  },
});
