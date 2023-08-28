import SchemaBuilder, { BasePlugin, SchemaTypes } from "@pothos/core";
import "./global-types";
import { PrismaSchemaGenerator } from "./libs/generator/PrismaSchemaGenerator";
import {
  createModelListQuery,
  createModelMutation,
  createManyModelMutation,
  createModelObject,
  createModelQuery,
  deleteManyModelMutation,
  deleteModelMutation,
  updateManyModelMutation,
  updateModelMutation,
} from "./libs/createPothosSchema";
import traverse from "traverse";

SchemaBuilder.prototype.addReplaceValue = function (
  search: string,
  replaceFunction: (props: { context: any }) => object
) {
  if (!this.replaceValues) this.replaceValues = {};
  this.replaceValues[search] = replaceFunction;
};
SchemaBuilder.prototype.replaceValue = async function (
  target: object,
  props: { context: any }
) {
  const builder = this;
  const replaces: {
    [key: string]: (props: { context: any }) => Promise<object>;
  } = {};
  const src = { ...target };
  traverse(src).forEach(function (value) {
    console.log(value);
    const func = builder.replaceValues?.[value];
    if (func) {
      replaces[value] = func;
    }
  });
  const replaceValues = Object.fromEntries(
    await Promise.all(
      Object.entries(replaces).map(async ([key, func]) => [
        key,
        await func(props),
      ])
    )
  );
  return traverse(src).forEach(function (value) {
    const v = replaceValues[value];
    if (v) {
      this.update(v);
    }
  });
};

export class PothosPrismaGeneratorPlugin<
  Types extends SchemaTypes
> extends BasePlugin<Types> {
  beforeBuild(): void {
    const builder = this.builder;
    const generator = new PrismaSchemaGenerator(builder);
    createModelObject(generator);

    if (!builder.configStore.typeConfigs.has("Query")) {
      builder.queryType({});
    }

    builder.queryFields((t) => ({
      ...createModelQuery(t, generator),
      ...createModelListQuery(t, generator),
    }));

    if (!builder.configStore.typeConfigs.has("Mutation")) {
      builder.mutationType({});
    }

    builder.mutationFields((t) => ({
      ...createModelMutation(t, generator),
      ...createManyModelMutation(t, generator),
      ...updateModelMutation(t, generator),
      ...updateManyModelMutation(t, generator),
      ...deleteModelMutation(t, generator),
      ...deleteManyModelMutation(t, generator),
    }));
  }
}

const pluginName = "pothosPrismaGenerator" as const;
const allowPluginReRegistration = SchemaBuilder.allowPluginReRegistration;
SchemaBuilder.allowPluginReRegistration = true;
SchemaBuilder.registerPlugin(pluginName, PothosPrismaGeneratorPlugin);
SchemaBuilder.allowPluginReRegistration = allowPluginReRegistration;
export default pluginName;
