import { SchemaTypes } from "@pothos/core";
import { PothosPrismaGeneratorPlugin } from ".";

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      pothosPrismaGenerator: PothosPrismaGeneratorPlugin<Types>;
    }
  }
}
