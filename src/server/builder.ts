import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { Context, prisma } from "./context";
import { Prisma } from "@prisma/client";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import PothosPrismaGeneratorPlugin from "pothos-prisma-generator";
import PothosSchemaExporter from "pothos-schema-exporter";
import jsonwebtoken from "jsonwebtoken";
import { serialize } from "cookie";
import path from "path";

/**
 * Create a new schema builder instance
 */
export const builder = new SchemaBuilder<{
  Context: Context;
  // PrismaTypes: PrismaTypes; //Not used because it is generated automatically
}>({
  plugins: [
    PrismaPlugin,
    PrismaUtils,
    ScopeAuthPlugin,
    PothosPrismaGeneratorPlugin,
    PothosSchemaExporter,
  ],
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
  },
  authScopes: async (context) => ({
    authenticated: !!context.user,
  }),
  pothosSchemaExporter: {
    output:
      process.env.NODE_ENV === "development" &&
      path.join(process.cwd(), "graphql", "schema.graphql"),
  },
  pothosPrismaGenerator: {
    // Replace the following directives
    // /// @pothos-generator input {data:{author:{connect:{id:"%%USER%%"}}}}
    replace: { "%%USER%%": async ({ context }) => context.user?.id },

    // Set the following permissions
    /// @pothos-generator where {include:["query"],where:{},authority:["authenticated"]}
    authority: async ({ context }) =>
      context.user?.id ? ["authenticated"] : [],
  },
});

// Example of how to add a custom auth query
builder.mutationType({
  fields: (t) => {
    return {
      // Example of how to add a custom auth query
      // This query will return true if the user is authenticated
      signIn: t.boolean({
        args: { email: t.arg({ type: "String", required: true }) },
        resolve: async (_root, { email }, ctx, _info) => {
          const user = await ctx.prisma.user.findUniqueOrThrow({
            where: { email },
          });
          const token = jsonwebtoken.sign({ payload: { user: user } }, "test");
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
      // Example of how to add a custom auth query
      // and will clear the session cookie
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
