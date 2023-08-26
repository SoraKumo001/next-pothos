import SchemaBuilder, { BasePlugin, SchemaTypes } from "@pothos/core";
import "./global-types";
import { PrismaSchemaGenerator } from "./libs/generator/PrismaSchemaGenerator";
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

export class PothosPrismaGeneratorPlugin<
  Types extends SchemaTypes
> extends BasePlugin<Types> {
  beforeBuild(): void {
    const builder = this.builder;
    const generator = new PrismaSchemaGenerator(builder);
    createModelObject(generator);

    try {
      builder.queryType({
        fields: (t) => ({
          ...createModelQuery(t, generator),
          ...createModelListQuery(t, generator),
        }),
      });
    } catch (e) {
      builder.queryFields((t) => ({
        ...createModelQuery(t, generator),
        ...createModelListQuery(t, generator),
      }));
    }
    try {
      builder.mutationType({
        fields: (t) => ({
          ...createModelMutation(t, generator),
          ...updateModelMutation(t, generator),
          ...updateManyModelMutation(t, generator),
          ...deleteModelMutation(t, generator),
          ...deleteManyModelMutation(t, generator),
        }),
      });
    } catch (e) {
      builder.mutationFields((t) => ({
        ...createModelMutation(t, generator),
        ...updateModelMutation(t, generator),
        ...updateManyModelMutation(t, generator),
        ...deleteModelMutation(t, generator),
        ...deleteManyModelMutation(t, generator),
      }));
    }
  }
}

const pluginName = "pothosPrismaGenerator" as const;
const allowPluginReRegistration = SchemaBuilder.allowPluginReRegistration;
SchemaBuilder.allowPluginReRegistration = true;
SchemaBuilder.registerPlugin(pluginName, PothosPrismaGeneratorPlugin);
SchemaBuilder.allowPluginReRegistration = allowPluginReRegistration;
export default pluginName;
