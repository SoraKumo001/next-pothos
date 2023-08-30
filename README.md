# pothos-generator

## 概要

Automatic generation of GraphQL schema from prisma schema

## How to run the sample

```sh
# Start docker
yarn dev:docker
# DB migration
yarn prisma:migrate
# prisma runtime generation
yarn prisma:generate
# create seed
yarn seed
# Start Next.js
yarn dev
```

### Builder Settings

Add PrismaPlugin,PrismaUtil,PothosPrismaGeneratorPlugin  
ScopeAuthPlugin must also be added when using the authorization function.

By setting `replace` and `authority` in pothosPrismaGenerator, you can refer to user information to separate the data to be inserted and the conditions to be applied.

```ts
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { Context, prisma } from "./context";
import PrismaTypes from "./generated/pothos-types";
import { Prisma } from "@prisma/client";
import { DateTimeResolver } from "graphql-scalars";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import PothosPrismaGeneratorPlugin from "pothos-prisma-generator-plugin";

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
  ],
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
  },
  authScopes: async (context) => ({
    authenticated: !!context.user,
  }),
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
```

### Prisma schema settings

The output content is controlled by `@pothos-generator`.
Details are omitted since the specification is still under development and is likely to change.

- Automatic output setting for query/mutation  
  `find`,`findMany`,`create`,`createMany`,`update`,`updateMany`,`delete`,`deleteMany`
- Insertion of `orderBy` and `where` at query time
- Configuration of authentication by adding options.
- Restrict fields that can be input during create and update.
- Set data to be forced during create and update
- Function to generate `where' to prisma at runtime by referring to context information at create and update

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Unnecessary because automatic generation does not refer to type information

// generator pothos {
//   provider     = "prisma-pothos-types"
//   clientOutput = "@prisma/client"
//   output       = "../src/server/generated/pothos-types.ts"
// }

/// @pothos-generator operation {include:["createOne","updateOne","findMany"]}
/// @pothos-generator select {fields:{exclude:["email"]}}
/// @pothos-generator input-field {include:["create"],fields:{include:["email","name"]}}
/// @pothos-generator input-field {include:["update"],fields:{include:["name"]}}
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String   @default("User")
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

/// @pothos-generator operation {exclude:["deleteMany"]}
/// @pothos-generator option {include:["mutation"],option:{authScopes:{authenticated:true}}}
/// @pothos-generator input-field {fields:{exclude:["id","createdAt","updatedAt","author"]}}
/// @pothos-generator input-data {data:{author:{connect:{id:"%%USER%%"}}}}
/// @pothos-generator where {include:["query"],where:{},authority:["authenticated"]}
/// @pothos-generator where {include:["query"],where:{published:true}}
/// @pothos-generator where {include:["update","delete"],where:{authorId:"%%USER%%"}}
/// @pothos-generator order {orderBy:{title:"desc"}}
model Post {
  id          String     @id @default(uuid())
  published   Boolean    @default(false)
  title       String     @default("New Post")
  content     String     @default("")
  author      User?      @relation(fields: [authorId], references: [id])
  authorId    String?
  categories  Category[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  publishedAt DateTime   @default(now())
}

/// @pothos-generator order {orderBy:{name:"asc"}}
/// @pothos-generator input-field {fields:{exclude:["id","createdAt","updatedAt","posts"]}}
model Category {
  id        String   @id @default(uuid())
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

```

### Substitution of Input Data

If a replacement string is set for builder, it will replace the strings in the input-data and where directives when the query is executed.
This can be used, for example, to write logged-in user information.

```ts
// Replace the following directives
// /// @pothos-generator input {data:{author:{connect:{id:"%%USER%%"}}}}
replace: { "%%USER%%": async ({ context }) => context.user?.id },
```

### Switching query conditions by permissions

You can switch where by setting permissions.
In the following case, the condition `where:{}` is added if you are logged in, and `,where:{published:true}` if you are not logged in.

```ts
// Set the following permissions
/// @pothos-generator where {include:["query"],where:{},authority:["authenticated"]}
authority: async ({ context }) => (context.user?.id ? ["authenticated"] : []),
```
