import SchemaBuilder, { BasePlugin, SchemaTypes } from "@pothos/core";
import "./global-types";
import { GraphQLSchema, printSchema } from "graphql";
import { promises as fs } from "fs";
import path from "path";

export class PothosSchemaExporterPlugin<
  Types extends SchemaTypes
> extends BasePlugin<Types> {
  afterBuild(schema: GraphQLSchema): GraphQLSchema {
    const builder = this.builder;
    const output = builder.options.pothosSchemaExporter?.output;
    if (output) {
      const targetDir = path.dirname(output);
      fs.mkdir(targetDir, { recursive: true })
        .catch(() => undefined)
        .then(() => {
          fs.writeFile(output, printSchema(schema));
        });
    }
    return schema;
  }
}

const pluginName = "pothosSchemaExporter" as const;
const allowPluginReRegistration = SchemaBuilder.allowPluginReRegistration;
SchemaBuilder.allowPluginReRegistration = true;
SchemaBuilder.registerPlugin(pluginName, PothosSchemaExporterPlugin);
SchemaBuilder.allowPluginReRegistration = allowPluginReRegistration;
export default pluginName;
