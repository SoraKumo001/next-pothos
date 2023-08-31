import { SchemaTypes } from "@pothos/core";
import { PothosSchemaExporterPlugin } from ".";

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      pothosSchemaExporter: PothosSchemaExporterPlugin<Types>;
    }

    export interface SchemaBuilderOptions<Types extends SchemaTypes> {
      pothosSchemaExporter?: {
        output?: string | null | false;
      };
    }
  }
}
