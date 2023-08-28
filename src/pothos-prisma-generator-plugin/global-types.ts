import { SchemaTypes } from "@pothos/core";
import { PothosPrismaGeneratorPlugin } from ".";

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      pothosPrismaGenerator: PothosPrismaGeneratorPlugin<Types>;
    }
    export interface SchemaBuilder<Types extends SchemaTypes> {
      replaceValues: { [key: string]: (props: { context: any }) => object };
      addReplaceValue: (
        search: string,
        replaceFunction: (props: {
          context: Types["Context"];
        }) => Promise<object | string | number | undefined>
      ) => void;
      replaceValue: (
        target: object,
        props: { context: any }
      ) => Promise<object>;
    }
  }
}
