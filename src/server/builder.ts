import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { Context, prisma } from "./context";
import PrismaTypes from "./generated/pothos-types";
import { Prisma } from "@prisma/client";
import { DateTimeResolver } from "graphql-scalars";
import {
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
import { PrismaSchemaGenerator } from "./libs/generator/PrismaSchemaGenerator";
import jsonwebtoken from "jsonwebtoken";
import { serialize } from "cookie";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";

export const builder = new SchemaBuilder<{
  Context: Context;
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  plugins: [PrismaPlugin, PrismaUtils, ScopeAuthPlugin],
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
  },
  authScopes: async (context) => ({
    authenticated: !!context.user,
  }),
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
      signIn: t.boolean({
        args: { user: t.arg({ type: "String", required: true }) },
        resolve: (_root, args, ctx, _info) => {
          const token = jsonwebtoken.sign(
            { payload: { user: args.user } },
            "test"
          );
          const res = ctx.res;
          res.setHeader(
            "Set-Cookie",
            serialize("session", token, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            })
          );
          return true;
        },
      }),
      signOut: t.boolean({
        resolve: (_root, args, ctx, _info) => {
          const token = jsonwebtoken.sign(
            { payload: { user: args.user } },
            "test"
          );
          const res = ctx.res;
          res.setHeader(
            "Set-Cookie",
            serialize("session", token, {
              maxAge: 0,
              path: "/",
            })
          );
          return true;
        },
      }),
    };
  },
});
