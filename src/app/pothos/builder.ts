import path from "node:path";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import PothosPrismaGeneratorPlugin from "pothos-prisma-generator";
import PothosQueryGeneratorPlugin from "pothos-query-generator";
import PothosSchemaExporterPlugin from "pothos-schema-exporter";
import { type Context, prisma } from "./context";

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
    PothosPrismaGeneratorPlugin,
    PothosSchemaExporterPlugin,
    PothosQueryGeneratorPlugin,
  ],
  prisma: {
    client: prisma,
  },
  pothosSchemaExporter: {
    output:
      process.env.NODE_ENV === "development" &&
      path.join(process.cwd(), "graphql", "schema.graphql"),
  },
  pothosQueryGenerator: {
    output:
      process.env.NODE_ENV === "development" &&
      path.join(process.cwd(), "graphql", "query.graphql"),
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
