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

```prisma
generator client {
  provider = "prisma-client-js"
}

generator pothos {
  provider     = "prisma-pothos-types"
  clientOutput = "@prisma/client"
  output       = "../src/server/generated/pothos-types.ts"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

/// @pothos-generator {"action":{"include":["create","update"]}}
/// @pothos-generator {"select":{"exclude":["email"]}}
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String   @default("User")
  post      Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

/// @pothos-generator {"action":{"exclude":["deleteMany"]}}
/// @pothos-generator {"query":{"where":{"published":true},"orderBy":{"title":"desc"}}}
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

/// @pothos-generator {"query":{"orderBy":{"name":"asc"}}}
model Category {
  id        String   @id @default(uuid())
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

上記の内容から以下の schema を生成し、対象のモデルを取り出すときに query に設定した条件で実行されます。

```graphql
"""
A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
"""
scalar DateTime

enum OrderBy {
  Asc
  Desc
}

input PostFilter {
  id: StringFilter
  published: BooleanFilter
  title: StringFilter
  content: StringFilter
  author: UserFilter
  authorId: StringFilter
  categories: CategoryListFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  publishedAt: DateTimeFilter
}

input StringFilter {
  equals: String
  in: [String!]
  notIn: [String!]
  not: StringFilter
  is: String
  isNot: String
  contains: String
  startsWith: String
  endsWith: String
  lt: String
  lte: String
  gt: String
  gte: String
}

input BooleanFilter {
  equals: Boolean
  in: [Boolean!]
  notIn: [Boolean!]
  not: BooleanFilter
  is: Boolean
  isNot: Boolean
}

input UserFilter {
  id: StringFilter
  email: StringFilter
  name: StringFilter
  post: PostListFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
}

input PostListFilter {
  every: PostFilter
  some: PostFilter
  none: PostFilter
}

input DateTimeFilter {
  equals: DateTime
  in: [DateTime!]
  notIn: [DateTime!]
  not: DateTimeFilter
  is: DateTime
  isNot: DateTime
  lt: DateTime
  lte: DateTime
  gt: DateTime
  gte: DateTime
}

input CategoryFilter {
  id: StringFilter
  name: StringFilter
  posts: PostListFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
}

input CategoryListFilter {
  every: CategoryFilter
  some: CategoryFilter
  none: CategoryFilter
}

input PostOrderBy {
  id: OrderBy
  published: OrderBy
  title: OrderBy
  content: OrderBy
  author: UserOrderBy
  authorId: OrderBy
  categories: CategoryOrderBy
  createdAt: OrderBy
  updatedAt: OrderBy
  publishedAt: OrderBy
}

input UserOrderBy {
  id: OrderBy
  email: OrderBy
  name: OrderBy
  post: PostOrderBy
  createdAt: OrderBy
  updatedAt: OrderBy
}

input CategoryOrderBy {
  id: OrderBy
  name: OrderBy
  posts: PostOrderBy
  createdAt: OrderBy
  updatedAt: OrderBy
}

input PostUniqueFilter {
  id: String
}

input CategoryUniqueFilter {
  id: String
}

input PostCreateInput {
  id: String
  published: Boolean
  title: String
  content: String
  author: PostCreateAuthorRelationInput
  categories: PostCreateCategoriesRelationInput
  createdAt: DateTime
  updatedAt: DateTime
  publishedAt: DateTime
}

input PostCreateAuthorRelationInput {
  create: UserCreateWithoutPostInput
  connect: UserUniqueFilter
}

input UserCreateWithoutPostInput {
  id: String
  email: String!
  name: String
  createdAt: DateTime
  updatedAt: DateTime
}

input UserUniqueFilter {
  id: String
  email: String
}

input PostCreateCategoriesRelationInput {
  create: [CategoryCreateWithoutPostsInput!]
  connect: [CategoryUniqueFilter!]
}

input CategoryCreateWithoutPostsInput {
  id: String
  name: String!
  createdAt: DateTime
  updatedAt: DateTime
}

input CategoryCreateInput {
  id: String
  name: String!
  posts: CategoryCreatePostsRelationInput
  createdAt: DateTime
  updatedAt: DateTime
}

input CategoryCreatePostsRelationInput {
  create: [PostCreateWithoutCategoriesInput!]
  connect: [PostUniqueFilter!]
}

input PostCreateWithoutCategoriesInput {
  id: String
  published: Boolean
  title: String
  content: String
  author: PostCreateAuthorRelationInput
  createdAt: DateTime
  updatedAt: DateTime
  publishedAt: DateTime
}

input UserUpdateInput {
  id: String
  email: String
  name: String
  post: UserUpdatePostRelationInput
  createdAt: DateTime
  updatedAt: DateTime
}

input UserUpdatePostRelationInput {
  create: [PostCreateWithoutAuthorInput!]
  set: [PostUniqueFilter!]
  disconnect: [PostUniqueFilter!]
  delete: [PostUniqueFilter!]
  connect: [PostUniqueFilter!]
  update: [UserUpdatePostRelationInputUpdate!]
  updateMany: [UserUpdatePostRelationInputUpdateMany!]
  deleteMany: [PostWithoutAuthorFilter!]
}

input PostCreateWithoutAuthorInput {
  id: String
  published: Boolean
  title: String
  content: String
  categories: PostCreateCategoriesRelationInput
  createdAt: DateTime
  updatedAt: DateTime
  publishedAt: DateTime
}

input PostUpdateWithoutAuthorInput {
  id: String
  published: Boolean
  title: String
  content: String
  categories: PostUpdateCategoriesRelationInput
  createdAt: DateTime
  updatedAt: DateTime
  publishedAt: DateTime
}

input PostUpdateCategoriesRelationInput {
  create: [CategoryCreateWithoutPostsInput!]
  set: [CategoryUniqueFilter!]
  disconnect: [CategoryUniqueFilter!]
  delete: [CategoryUniqueFilter!]
  connect: [CategoryUniqueFilter!]
  update: [PostUpdateCategoriesRelationInputUpdate!]
  updateMany: [PostUpdateCategoriesRelationInputUpdateMany!]
  deleteMany: [CategoryWithoutPostsFilter!]
}

input CategoryUpdateWithoutPostsInput {
  id: String
  name: String
  createdAt: DateTime
  updatedAt: DateTime
}

input CategoryWithoutPostsFilter {
  id: StringFilter
  name: StringFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
}

input PostUpdateCategoriesRelationInputUpdate {
  where: CategoryUniqueFilter
  data: CategoryUpdateWithoutPostsInput
}

input PostUpdateCategoriesRelationInputUpdateMany {
  where: CategoryWithoutPostsFilter
  data: CategoryUpdateWithoutPostsInput
}

input PostWithoutAuthorFilter {
  id: StringFilter
  published: BooleanFilter
  title: StringFilter
  content: StringFilter
  categories: CategoryListFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  publishedAt: DateTimeFilter
}

input UserUpdatePostRelationInputUpdate {
  where: PostUniqueFilter
  data: PostUpdateWithoutAuthorInput
}

input UserUpdatePostRelationInputUpdateMany {
  where: PostWithoutAuthorFilter
  data: PostUpdateWithoutAuthorInput
}

input PostUpdateInput {
  id: String
  published: Boolean
  title: String
  content: String
  author: PostUpdateAuthorRelationInput
  categories: PostUpdateCategoriesRelationInput
  createdAt: DateTime
  updatedAt: DateTime
  publishedAt: DateTime
}

input PostUpdateAuthorRelationInput {
  create: UserCreateWithoutPostInput
  update: UserUpdateWithoutPostInput
  connect: UserUniqueFilter
  disconnect: Boolean
  delete: Boolean
}

input UserUpdateWithoutPostInput {
  id: String
  email: String
  name: String
  createdAt: DateTime
  updatedAt: DateTime
}

input CategoryUpdateInput {
  id: String
  name: String
  posts: CategoryUpdatePostsRelationInput
  createdAt: DateTime
  updatedAt: DateTime
}

input CategoryUpdatePostsRelationInput {
  create: [PostCreateWithoutCategoriesInput!]
  set: [PostUniqueFilter!]
  disconnect: [PostUniqueFilter!]
  delete: [PostUniqueFilter!]
  connect: [PostUniqueFilter!]
  update: [CategoryUpdatePostsRelationInputUpdate!]
  updateMany: [CategoryUpdatePostsRelationInputUpdateMany!]
  deleteMany: [PostWithoutCategoriesFilter!]
}

input PostUpdateWithoutCategoriesInput {
  id: String
  published: Boolean
  title: String
  content: String
  author: PostUpdateAuthorRelationInput
  createdAt: DateTime
  updatedAt: DateTime
  publishedAt: DateTime
}

input PostWithoutCategoriesFilter {
  id: StringFilter
  published: BooleanFilter
  title: StringFilter
  content: StringFilter
  author: UserFilter
  authorId: StringFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  publishedAt: DateTimeFilter
}

input CategoryUpdatePostsRelationInputUpdate {
  where: PostUniqueFilter
  data: PostUpdateWithoutCategoriesInput
}

input CategoryUpdatePostsRelationInputUpdateMany {
  where: PostWithoutCategoriesFilter
  data: PostUpdateWithoutCategoriesInput
}

type User {
  id: ID!
  name: String!
  post(filter: PostFilter, orderBy: PostOrderBy): [Post!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Post {
  id: ID!
  published: Boolean!
  title: String!
  content: String!
  author(filter: UserFilter, orderBy: UserOrderBy): User!
  authorId: String
  categories(filter: CategoryFilter, orderBy: CategoryOrderBy): [Category!]!
  createdAt: DateTime!
  updatedAt: DateTime!
  publishedAt: DateTime!
}

type Category {
  id: ID!
  name: String!
  posts(filter: PostFilter, orderBy: PostOrderBy): [Post!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  findPost(filter: PostUniqueFilter!): Post
  findCategory(filter: CategoryUniqueFilter!): Category
  findManyPost(filter: PostFilter, orderBy: PostOrderBy): [Post!]!
  findManyCategory(
    filter: CategoryFilter
    orderBy: CategoryOrderBy
  ): [Category!]!
}

type Mutation {
  createPost(input: PostCreateInput!): Post!
  createCategory(input: CategoryCreateInput!): Category!
  updateUser(where: UserUniqueFilter!, data: UserUpdateInput!): User!
  updatePost(where: PostUniqueFilter!, data: PostUpdateInput!): Post!
  updateCategory(
    where: CategoryUniqueFilter!
    data: CategoryUpdateInput!
  ): Category!
  updateManyPost(where: PostUniqueFilter!, data: PostUpdateInput!): Int!
  updateManyCategory(
    where: CategoryUniqueFilter!
    data: CategoryUpdateInput!
  ): Int!
  deletePost(where: PostUniqueFilter!): Post!
  deleteCategory(where: CategoryUniqueFilter!): Category!
  deleteManyCategory(where: CategoryUniqueFilter!): Int!
}
```
