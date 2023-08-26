import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { Context, prisma } from "./context";
import PrismaTypes from "./generated/pothos-types";
import { Prisma } from "@prisma/client";
import { DateTimeResolver } from "graphql-scalars";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import PothosPrismaGeneratorPlugin from "pothos-prisma-generator-plugin";
import jsonwebtoken from "jsonwebtoken";
import { serialize } from "cookie";

/**
 * Create a new schema builder instance
 */
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
  plugins: [
    PrismaPlugin,
    PrismaUtils,
    ScopeAuthPlugin,
    PothosPrismaGeneratorPlugin,
  ],
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
  },
  authScopes: async (context) => ({
    authenticated: !!context.user,
  }),
});

// Add custom scalar types
builder.addScalarType("DateTime", DateTimeResolver, {});

// Example of how to add a custom auth query
builder.mutationType({
  fields: (t) => {
    return {
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
