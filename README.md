# pothos-generator

鋭意、作りかけ

## サンプルの実行方法

```sh
# dockerの起動
yarn dev:docker
# DBのマイグレーション
yarn prisma:migrate
# prismaのランタイム生成
yarn prisma:generate
# seed作成
yarn seed
# Next.jsの起動
yarn dev
```

## 概要

prisma の schema から GraphQL の schema を自動生成します

### Builder の設定

PrismaPlugin,PrismaUtil,PothosPrismaGeneratorPlugin を追加します  
認証機能を使用する際は ScopeAuthPlugin も追加する必要があります

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
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
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
});

// Add custom scalar types
builder.addScalarType("DateTime", DateTimeResolver, {});
```

### Prisma のスキーマ設定

`@pothos-generator`で出力内容を制御します。
開発中で仕様が変更される可能性が大きいので詳細は省きます。

- query/mutation の自動出力設定  
  `find`,`findMany`,`create`,`createMany`,`update`,`updateMany`,`delete`,`deleteMany`
- query 時の`orderBy`,`where`の挿入
- オプションの追加による、認証機能の設定
- create や update 時に input 可能なフィールドの制限
- create や update 時に強制入力する data の設定
- create や update 時、prisma に送る where を context の情報を参照して実行時に生成する機能

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

### 入力データの置換

builder に対して置換文字列を設定しておくと、input-data と where ディレクティブ 内の文字列をクエリ実行時に置き換えます。
ログインユーザの情報を書き込む場合などに利用できます。

```ts
// Replace the following directives
// /// @pothos-generator input {data:{author:{connect:{id:"%%USER%%"}}}}
builder.addReplaceValue("%%USER%%", async ({ context }) => context.user?.id);
```

### 権限によるクエリ条件の切り替え

権限設定を行うと、where を切り替えられます。
以下の場合、ログイン済みの場合は`where:{}`、ログインしていない場合は`,where:{published:true}`という条件が追加されます。

```ts
// Set the following permissions
/// @pothos-generator where {include:["query"],where:{},authority:["authenticated"]}
/// @pothos-generator where {include:["query"],where:{published:true}}
builder.setAuthority((ctx) => (ctx.user?.id ? ["authenticated"] : []));
```
