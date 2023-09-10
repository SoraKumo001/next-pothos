import path from "path";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import PothosPrismaGeneratorPlugin from "pothos-prisma-generator";
import PothosSchemaExporter from "pothos-schema-exporter";
import { Context, prisma } from "./context";

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
    replace: { "%%USER%%": ({ context }) => context.user?.id },

    // Set the following permissions
    /// @pothos-generator any {authority:["ROLE"]}
    authority: ({ context }) => context.user?.roles ?? [],
  },
});
