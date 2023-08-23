import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/server/generated/schema.graphql",
  overwrite: true,
  documents: "codegen/graphql/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: { scalars: { DateTime: "string" } },
    },
  },
};

export default config;
