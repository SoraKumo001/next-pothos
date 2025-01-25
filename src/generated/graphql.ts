import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any; }
  /** The `Byte` scalar type represents byte value as a Buffer */
  Bytes: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Decimal: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: { input: any; output: any; }
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  posts: Array<Post>;
  postsCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type CategoryPostsArgs = {
  filter?: InputMaybe<PostFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type CategoryPostsCountArgs = {
  filter?: InputMaybe<PostFilter>;
};

export type CategoryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CategoryListFilter = {
  every?: InputMaybe<CategoryFilter>;
  none?: InputMaybe<CategoryFilter>;
  some?: InputMaybe<CategoryFilter>;
};

export type CategoryOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  posts?: InputMaybe<PostOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type CategoryUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<CategoryUpdatePostsRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryUpdatePostsRelationInput = {
  connect?: InputMaybe<Array<PostUniqueFilter>>;
  create?: InputMaybe<Array<PostCreateInput>>;
  delete?: InputMaybe<Array<PostUniqueFilter>>;
  deleteMany?: InputMaybe<Array<PostWithoutCategoriesFilter>>;
  disconnect?: InputMaybe<Array<PostUniqueFilter>>;
  set?: InputMaybe<Array<PostUniqueFilter>>;
  update?: InputMaybe<Array<CategoryUpdatePostsRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<CategoryUpdatePostsRelationInputUpdateMany>>;
};

export type CategoryUpdatePostsRelationInputUpdate = {
  data?: InputMaybe<PostUpdateWithoutCategoriesInput>;
  where?: InputMaybe<PostUniqueFilter>;
};

export type CategoryUpdatePostsRelationInputUpdateMany = {
  data?: InputMaybe<PostUpdateWithoutCategoriesInput>;
  where?: InputMaybe<PostWithoutCategoriesFilter>;
};

export type CategoryUpdateWithoutPostsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryWithoutPostsFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  is?: InputMaybe<Scalars['DateTime']['input']>;
  isNot?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyCategory?: Maybe<Scalars['Int']['output']>;
  createManyPost?: Maybe<Scalars['Int']['output']>;
  createManyUser?: Maybe<Scalars['Int']['output']>;
  createOneCategory?: Maybe<Category>;
  createOnePost?: Maybe<Post>;
  createOneUser?: Maybe<User>;
  deleteManyCategory?: Maybe<Scalars['Int']['output']>;
  deleteManyPost?: Maybe<Scalars['Int']['output']>;
  deleteManyUser?: Maybe<Scalars['Int']['output']>;
  deleteOneCategory?: Maybe<Category>;
  deleteOnePost?: Maybe<Post>;
  deleteOneUser?: Maybe<User>;
  signIn?: Maybe<Scalars['Boolean']['output']>;
  signOut?: Maybe<Scalars['Boolean']['output']>;
  updateManyCategory?: Maybe<Scalars['Int']['output']>;
  updateManyPost?: Maybe<Scalars['Int']['output']>;
  updateManyUser?: Maybe<Scalars['Int']['output']>;
  updateOneCategory?: Maybe<Category>;
  updateOnePost?: Maybe<Post>;
  updateOneUser?: Maybe<User>;
};


export type MutationCreateManyCategoryArgs = {
  input: Array<CategoryCreateInput>;
};


export type MutationCreateManyPostArgs = {
  input: Array<PostCreateInput>;
};


export type MutationCreateManyUserArgs = {
  input: Array<UserCreateInput>;
};


export type MutationCreateOneCategoryArgs = {
  input: CategoryCreateInput;
};


export type MutationCreateOnePostArgs = {
  input: PostCreateInput;
};


export type MutationCreateOneUserArgs = {
  input: UserCreateInput;
};


export type MutationDeleteManyCategoryArgs = {
  where: CategoryFilter;
};


export type MutationDeleteManyPostArgs = {
  where: PostFilter;
};


export type MutationDeleteManyUserArgs = {
  where: UserFilter;
};


export type MutationDeleteOneCategoryArgs = {
  where: CategoryUniqueFilter;
};


export type MutationDeleteOnePostArgs = {
  where: PostUniqueFilter;
};


export type MutationDeleteOneUserArgs = {
  where: UserUniqueFilter;
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateManyCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryFilter;
};


export type MutationUpdateManyPostArgs = {
  data: PostUpdateInput;
  where: PostFilter;
};


export type MutationUpdateManyUserArgs = {
  data: UserUpdateInput;
  where: UserFilter;
};


export type MutationUpdateOneCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryUniqueFilter;
};


export type MutationUpdateOnePostArgs = {
  data: PostUpdateInput;
  where: PostUniqueFilter;
};


export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserUniqueFilter;
};

export enum OrderBy {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['String']['output']>;
  categories: Array<Category>;
  categoriesCount: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  published: Scalars['Boolean']['output'];
  publishedAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type PostCategoriesArgs = {
  filter?: InputMaybe<CategoryFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoryOrderBy>>;
};


export type PostCategoriesCountArgs = {
  filter?: InputMaybe<CategoryFilter>;
};

export type PostCreateCategoriesRelationInput = {
  connect?: InputMaybe<Array<CategoryUniqueFilter>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
};

export type PostCreateInput = {
  categories?: InputMaybe<PostCreateCategoriesRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostFilter = {
  author?: InputMaybe<UserFilter>;
  authorId?: InputMaybe<StringFilter>;
  categories?: InputMaybe<CategoryListFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  published?: InputMaybe<BooleanFilter>;
  publishedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PostListFilter = {
  every?: InputMaybe<PostFilter>;
  none?: InputMaybe<PostFilter>;
  some?: InputMaybe<PostFilter>;
};

export type PostOrderBy = {
  author?: InputMaybe<UserOrderBy>;
  authorId?: InputMaybe<OrderBy>;
  categories?: InputMaybe<CategoryOrderBy>;
  content?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  published?: InputMaybe<OrderBy>;
  publishedAt?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type PostUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type PostUpdateAuthorRelationInput = {
  connect?: InputMaybe<UserUniqueFilter>;
  create?: InputMaybe<UserCreateInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<UserUpdateWithoutPostsInput>;
};

export type PostUpdateCategoriesRelationInput = {
  connect?: InputMaybe<Array<CategoryUniqueFilter>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
  delete?: InputMaybe<Array<CategoryUniqueFilter>>;
  deleteMany?: InputMaybe<Array<CategoryWithoutPostsFilter>>;
  disconnect?: InputMaybe<Array<CategoryUniqueFilter>>;
  set?: InputMaybe<Array<CategoryUniqueFilter>>;
  update?: InputMaybe<Array<PostUpdateCategoriesRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<PostUpdateCategoriesRelationInputUpdateMany>>;
};

export type PostUpdateCategoriesRelationInputUpdate = {
  data?: InputMaybe<CategoryUpdateWithoutPostsInput>;
  where?: InputMaybe<CategoryUniqueFilter>;
};

export type PostUpdateCategoriesRelationInputUpdateMany = {
  data?: InputMaybe<CategoryUpdateWithoutPostsInput>;
  where?: InputMaybe<CategoryWithoutPostsFilter>;
};

export type PostUpdateInput = {
  author?: InputMaybe<PostUpdateAuthorRelationInput>;
  categories?: InputMaybe<PostUpdateCategoriesRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostUpdateWithoutAuthorInput = {
  categories?: InputMaybe<PostUpdateCategoriesRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostUpdateWithoutCategoriesInput = {
  author?: InputMaybe<PostUpdateAuthorRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostWithoutAuthorFilter = {
  categories?: InputMaybe<CategoryListFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  published?: InputMaybe<BooleanFilter>;
  publishedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PostWithoutCategoriesFilter = {
  author?: InputMaybe<UserFilter>;
  authorId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  published?: InputMaybe<BooleanFilter>;
  publishedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Query = {
  __typename?: 'Query';
  countCategory?: Maybe<Scalars['Int']['output']>;
  countPost?: Maybe<Scalars['Int']['output']>;
  countUser?: Maybe<Scalars['Int']['output']>;
  findFirstCategory?: Maybe<Category>;
  findFirstPost?: Maybe<Post>;
  findFirstUser?: Maybe<User>;
  findManyCategory?: Maybe<Array<Category>>;
  findManyPost?: Maybe<Array<Post>>;
  findManyUser?: Maybe<Array<User>>;
  findUniqueCategory?: Maybe<Category>;
  findUniquePost?: Maybe<Post>;
  findUniqueUser?: Maybe<User>;
};


export type QueryCountCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
};


export type QueryCountPostArgs = {
  filter?: InputMaybe<PostFilter>;
};


export type QueryCountUserArgs = {
  filter?: InputMaybe<UserFilter>;
};


export type QueryFindFirstCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
  orderBy?: InputMaybe<Array<CategoryOrderBy>>;
};


export type QueryFindFirstPostArgs = {
  filter?: InputMaybe<PostFilter>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type QueryFindFirstUserArgs = {
  filter?: InputMaybe<UserFilter>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};


export type QueryFindManyCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoryOrderBy>>;
};


export type QueryFindManyPostArgs = {
  filter?: InputMaybe<PostFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type QueryFindManyUserArgs = {
  filter?: InputMaybe<UserFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};


export type QueryFindUniqueCategoryArgs = {
  filter: CategoryUniqueFilter;
};


export type QueryFindUniquePostArgs = {
  filter: PostUniqueFilter;
};


export type QueryFindUniqueUserArgs = {
  filter: UserUniqueFilter;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type RoleListFilter = {
  equals?: InputMaybe<Array<Role>>;
  has?: InputMaybe<Role>;
  hasEvery?: InputMaybe<Array<Role>>;
  hasSome?: InputMaybe<Array<Role>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['String']['input']>;
  isNot?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  posts: Array<Post>;
  postsCount: Scalars['Int']['output'];
  roles: Array<Role>;
  updatedAt: Scalars['DateTime']['output'];
};


export type UserPostsArgs = {
  filter?: InputMaybe<PostFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type UserPostsCountArgs = {
  filter?: InputMaybe<PostFilter>;
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<UserCreatePostsRelationInput>;
  roles?: InputMaybe<Array<Role>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreatePostsRelationInput = {
  connect?: InputMaybe<Array<PostUniqueFilter>>;
  create?: InputMaybe<Array<PostCreateInput>>;
};

export type UserFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostListFilter>;
  roles?: InputMaybe<RoleListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  posts?: InputMaybe<PostOrderBy>;
  roles?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type UserUniqueFilter = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<UserUpdatePostsRelationInput>;
  roles?: InputMaybe<Array<Role>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserUpdatePostsRelationInput = {
  connect?: InputMaybe<Array<PostUniqueFilter>>;
  create?: InputMaybe<Array<PostCreateInput>>;
  delete?: InputMaybe<Array<PostUniqueFilter>>;
  deleteMany?: InputMaybe<Array<PostWithoutAuthorFilter>>;
  disconnect?: InputMaybe<Array<PostUniqueFilter>>;
  set?: InputMaybe<Array<PostUniqueFilter>>;
  update?: InputMaybe<Array<UserUpdatePostsRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<UserUpdatePostsRelationInputUpdateMany>>;
};

export type UserUpdatePostsRelationInputUpdate = {
  data?: InputMaybe<PostUpdateWithoutAuthorInput>;
  where?: InputMaybe<PostUniqueFilter>;
};

export type UserUpdatePostsRelationInputUpdateMany = {
  data?: InputMaybe<PostUpdateWithoutAuthorInput>;
  where?: InputMaybe<PostWithoutAuthorFilter>;
};

export type UserUpdateWithoutPostsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Role>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserFragment = { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string };

export type PostFragment = { __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string };

export type CategoryFragment = { __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string };

export type CountUserQueryVariables = Exact<{
  filter?: InputMaybe<UserFilter>;
}>;


export type CountUserQuery = { __typename?: 'Query', countUser?: number | null };

export type CountPostQueryVariables = Exact<{
  filter?: InputMaybe<PostFilter>;
}>;


export type CountPostQuery = { __typename?: 'Query', countPost?: number | null };

export type CountCategoryQueryVariables = Exact<{
  filter?: InputMaybe<CategoryFilter>;
}>;


export type CountCategoryQuery = { __typename?: 'Query', countCategory?: number | null };

export type FindUniqueUserQueryVariables = Exact<{
  filter: UserUniqueFilter;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type FindUniqueUserQuery = { __typename?: 'Query', findUniqueUser?: { __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> } | null };

export type FindUniquePostQueryVariables = Exact<{
  filter: PostUniqueFilter;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter2?: InputMaybe<PostFilter>;
  postsOrderBy2?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit2?: InputMaybe<Scalars['Int']['input']>;
  postsOffset2?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter2?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type FindUniquePostQuery = { __typename?: 'Query', findUniquePost?: { __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> } | null, categories: Array<{ __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> }> } | null };

export type FindUniqueCategoryQueryVariables = Exact<{
  filter: CategoryUniqueFilter;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type FindUniqueCategoryQuery = { __typename?: 'Query', findUniqueCategory?: { __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> } | null };

export type FindFirstUserQueryVariables = Exact<{
  filter?: InputMaybe<UserFilter>;
  orderBy?: InputMaybe<Array<UserOrderBy> | UserOrderBy>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type FindFirstUserQuery = { __typename?: 'Query', findFirstUser?: { __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> } | null };

export type FindFirstPostQueryVariables = Exact<{
  filter?: InputMaybe<PostFilter>;
  orderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter2?: InputMaybe<PostFilter>;
  postsOrderBy2?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit2?: InputMaybe<Scalars['Int']['input']>;
  postsOffset2?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter2?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type FindFirstPostQuery = { __typename?: 'Query', findFirstPost?: { __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> } | null, categories: Array<{ __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> }> } | null };

export type FindFirstCategoryQueryVariables = Exact<{
  filter?: InputMaybe<CategoryFilter>;
  orderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type FindFirstCategoryQuery = { __typename?: 'Query', findFirstCategory?: { __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> } | null };

export type FindManyUserQueryVariables = Exact<{
  filter?: InputMaybe<UserFilter>;
  orderBy?: InputMaybe<Array<UserOrderBy> | UserOrderBy>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type FindManyUserQuery = { __typename?: 'Query', findManyUser?: Array<{ __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> }> | null };

export type FindManyPostQueryVariables = Exact<{
  filter?: InputMaybe<PostFilter>;
  orderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter2?: InputMaybe<PostFilter>;
  postsOrderBy2?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit2?: InputMaybe<Scalars['Int']['input']>;
  postsOffset2?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter2?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type FindManyPostQuery = { __typename?: 'Query', findManyPost?: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> } | null, categories: Array<{ __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> }> }> | null };

export type FindManyCategoryQueryVariables = Exact<{
  filter?: InputMaybe<CategoryFilter>;
  orderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type FindManyCategoryQuery = { __typename?: 'Query', findManyCategory?: Array<{ __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> }> | null };

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: boolean | null };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut?: boolean | null };

export type CreateOneUserMutationVariables = Exact<{
  input: UserCreateInput;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type CreateOneUserMutation = { __typename?: 'Mutation', createOneUser?: { __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> } | null };

export type CreateOnePostMutationVariables = Exact<{
  input: PostCreateInput;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter2?: InputMaybe<PostFilter>;
  postsOrderBy2?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit2?: InputMaybe<Scalars['Int']['input']>;
  postsOffset2?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter2?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type CreateOnePostMutation = { __typename?: 'Mutation', createOnePost?: { __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> } | null, categories: Array<{ __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> }> } | null };

export type CreateOneCategoryMutationVariables = Exact<{
  input: CategoryCreateInput;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type CreateOneCategoryMutation = { __typename?: 'Mutation', createOneCategory?: { __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> } | null };

export type CreateManyUserMutationVariables = Exact<{
  input: Array<UserCreateInput> | UserCreateInput;
}>;


export type CreateManyUserMutation = { __typename?: 'Mutation', createManyUser?: number | null };

export type CreateManyPostMutationVariables = Exact<{
  input: Array<PostCreateInput> | PostCreateInput;
}>;


export type CreateManyPostMutation = { __typename?: 'Mutation', createManyPost?: number | null };

export type CreateManyCategoryMutationVariables = Exact<{
  input: Array<CategoryCreateInput> | CategoryCreateInput;
}>;


export type CreateManyCategoryMutation = { __typename?: 'Mutation', createManyCategory?: number | null };

export type UpdateOneUserMutationVariables = Exact<{
  where: UserUniqueFilter;
  data: UserUpdateInput;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type UpdateOneUserMutation = { __typename?: 'Mutation', updateOneUser?: { __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> } | null };

export type UpdateOnePostMutationVariables = Exact<{
  where: PostUniqueFilter;
  data: PostUpdateInput;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter2?: InputMaybe<PostFilter>;
  postsOrderBy2?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit2?: InputMaybe<Scalars['Int']['input']>;
  postsOffset2?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter2?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type UpdateOnePostMutation = { __typename?: 'Mutation', updateOnePost?: { __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> } | null, categories: Array<{ __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> }> } | null };

export type UpdateOneCategoryMutationVariables = Exact<{
  where: CategoryUniqueFilter;
  data: CategoryUpdateInput;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type UpdateOneCategoryMutation = { __typename?: 'Mutation', updateOneCategory?: { __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> } | null };

export type UpdateManyUserMutationVariables = Exact<{
  where: UserFilter;
  data: UserUpdateInput;
}>;


export type UpdateManyUserMutation = { __typename?: 'Mutation', updateManyUser?: number | null };

export type UpdateManyPostMutationVariables = Exact<{
  where: PostFilter;
  data: PostUpdateInput;
}>;


export type UpdateManyPostMutation = { __typename?: 'Mutation', updateManyPost?: number | null };

export type UpdateManyCategoryMutationVariables = Exact<{
  where: CategoryFilter;
  data: CategoryUpdateInput;
}>;


export type UpdateManyCategoryMutation = { __typename?: 'Mutation', updateManyCategory?: number | null };

export type DeleteOneUserMutationVariables = Exact<{
  where: UserUniqueFilter;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type DeleteOneUserMutation = { __typename?: 'Mutation', deleteOneUser?: { __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> } | null };

export type DeleteOnePostMutationVariables = Exact<{
  where: PostUniqueFilter;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter2?: InputMaybe<PostFilter>;
  postsOrderBy2?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit2?: InputMaybe<Scalars['Int']['input']>;
  postsOffset2?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter2?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type DeleteOnePostMutation = { __typename?: 'Mutation', deleteOnePost?: { __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', postsCount: number, id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> } | null, categories: Array<{ __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string }> }> } | null };

export type DeleteOneCategoryMutationVariables = Exact<{
  where: CategoryUniqueFilter;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type DeleteOneCategoryMutation = { __typename?: 'Mutation', deleteOneCategory?: { __typename?: 'Category', postsCount: number, id?: string | null, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id?: string | null, published: boolean, title: string, content: string, authorId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, author?: { __typename?: 'User', id?: string | null, email: string, name: string, roles: Array<Role>, createdAt: string, updatedAt: string } | null, categories: Array<{ __typename?: 'Category', id?: string | null, name: string, createdAt: string, updatedAt: string }> }> } | null };

export type DeleteManyUserMutationVariables = Exact<{
  where: UserFilter;
}>;


export type DeleteManyUserMutation = { __typename?: 'Mutation', deleteManyUser?: number | null };

export type DeleteManyPostMutationVariables = Exact<{
  where: PostFilter;
}>;


export type DeleteManyPostMutation = { __typename?: 'Mutation', deleteManyPost?: number | null };

export type DeleteManyCategoryMutationVariables = Exact<{
  where: CategoryFilter;
}>;


export type DeleteManyCategoryMutation = { __typename?: 'Mutation', deleteManyCategory?: number | null };

export const UserFragmentDoc = gql`
    fragment user on User {
  id
  email
  name
  roles
  createdAt
  updatedAt
}
    `;
export const PostFragmentDoc = gql`
    fragment post on Post {
  id
  published
  title
  content
  authorId
  createdAt
  updatedAt
  publishedAt
}
    `;
export const CategoryFragmentDoc = gql`
    fragment category on Category {
  id
  name
  createdAt
  updatedAt
}
    `;
export const CountUserDocument = gql`
    query CountUser($filter: UserFilter) {
  countUser(filter: $filter)
}
    `;

export function useCountUserQuery(options?: Omit<Urql.UseQueryArgs<CountUserQueryVariables>, 'query'>) {
  return Urql.useQuery<CountUserQuery, CountUserQueryVariables>({ query: CountUserDocument, ...options });
};
export const CountPostDocument = gql`
    query CountPost($filter: PostFilter) {
  countPost(filter: $filter)
}
    `;

export function useCountPostQuery(options?: Omit<Urql.UseQueryArgs<CountPostQueryVariables>, 'query'>) {
  return Urql.useQuery<CountPostQuery, CountPostQueryVariables>({ query: CountPostDocument, ...options });
};
export const CountCategoryDocument = gql`
    query CountCategory($filter: CategoryFilter) {
  countCategory(filter: $filter)
}
    `;

export function useCountCategoryQuery(options?: Omit<Urql.UseQueryArgs<CountCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<CountCategoryQuery, CountCategoryQueryVariables>({ query: CountCategoryDocument, ...options });
};
export const FindUniqueUserDocument = gql`
    query FindUniqueUser($filter: UserUniqueFilter!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  findUniqueUser(filter: $filter) {
    ...user
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${UserFragmentDoc}
${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useFindUniqueUserQuery(options: Omit<Urql.UseQueryArgs<FindUniqueUserQueryVariables>, 'query'>) {
  return Urql.useQuery<FindUniqueUserQuery, FindUniqueUserQueryVariables>({ query: FindUniqueUserDocument, ...options });
};
export const FindUniquePostDocument = gql`
    query FindUniquePost($filter: PostUniqueFilter!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter2: PostFilter, $postsOrderBy2: [PostOrderBy!], $postsLimit2: Int, $postsOffset2: Int, $postsCountFilter2: PostFilter, $categoriesCountFilter: CategoryFilter) {
  findUniquePost(filter: $filter) {
    ...post
    author {
      ...user
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter2
        orderBy: $postsOrderBy2
        limit: $postsLimit2
        offset: $postsOffset2
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter2)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${CategoryFragmentDoc}`;

export function useFindUniquePostQuery(options: Omit<Urql.UseQueryArgs<FindUniquePostQueryVariables>, 'query'>) {
  return Urql.useQuery<FindUniquePostQuery, FindUniquePostQueryVariables>({ query: FindUniquePostDocument, ...options });
};
export const FindUniqueCategoryDocument = gql`
    query FindUniqueCategory($filter: CategoryUniqueFilter!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  findUniqueCategory(filter: $filter) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}
${UserFragmentDoc}`;

export function useFindUniqueCategoryQuery(options: Omit<Urql.UseQueryArgs<FindUniqueCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<FindUniqueCategoryQuery, FindUniqueCategoryQueryVariables>({ query: FindUniqueCategoryDocument, ...options });
};
export const FindFirstUserDocument = gql`
    query FindFirstUser($filter: UserFilter, $orderBy: [UserOrderBy!], $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  findFirstUser(filter: $filter, orderBy: $orderBy) {
    ...user
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${UserFragmentDoc}
${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useFindFirstUserQuery(options?: Omit<Urql.UseQueryArgs<FindFirstUserQueryVariables>, 'query'>) {
  return Urql.useQuery<FindFirstUserQuery, FindFirstUserQueryVariables>({ query: FindFirstUserDocument, ...options });
};
export const FindFirstPostDocument = gql`
    query FindFirstPost($filter: PostFilter, $orderBy: [PostOrderBy!], $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter2: PostFilter, $postsOrderBy2: [PostOrderBy!], $postsLimit2: Int, $postsOffset2: Int, $postsCountFilter2: PostFilter, $categoriesCountFilter: CategoryFilter) {
  findFirstPost(filter: $filter, orderBy: $orderBy) {
    ...post
    author {
      ...user
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter2
        orderBy: $postsOrderBy2
        limit: $postsLimit2
        offset: $postsOffset2
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter2)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${CategoryFragmentDoc}`;

export function useFindFirstPostQuery(options?: Omit<Urql.UseQueryArgs<FindFirstPostQueryVariables>, 'query'>) {
  return Urql.useQuery<FindFirstPostQuery, FindFirstPostQueryVariables>({ query: FindFirstPostDocument, ...options });
};
export const FindFirstCategoryDocument = gql`
    query FindFirstCategory($filter: CategoryFilter, $orderBy: [CategoryOrderBy!], $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  findFirstCategory(filter: $filter, orderBy: $orderBy) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}
${UserFragmentDoc}`;

export function useFindFirstCategoryQuery(options?: Omit<Urql.UseQueryArgs<FindFirstCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<FindFirstCategoryQuery, FindFirstCategoryQueryVariables>({ query: FindFirstCategoryDocument, ...options });
};
export const FindManyUserDocument = gql`
    query FindManyUser($filter: UserFilter, $orderBy: [UserOrderBy!], $limit: Int, $offset: Int, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  findManyUser(filter: $filter, orderBy: $orderBy, limit: $limit, offset: $offset) {
    ...user
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${UserFragmentDoc}
${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useFindManyUserQuery(options?: Omit<Urql.UseQueryArgs<FindManyUserQueryVariables>, 'query'>) {
  return Urql.useQuery<FindManyUserQuery, FindManyUserQueryVariables>({ query: FindManyUserDocument, ...options });
};
export const FindManyPostDocument = gql`
    query FindManyPost($filter: PostFilter, $orderBy: [PostOrderBy!], $limit: Int, $offset: Int, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter2: PostFilter, $postsOrderBy2: [PostOrderBy!], $postsLimit2: Int, $postsOffset2: Int, $postsCountFilter2: PostFilter, $categoriesCountFilter: CategoryFilter) {
  findManyPost(filter: $filter, orderBy: $orderBy, limit: $limit, offset: $offset) {
    ...post
    author {
      ...user
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter2
        orderBy: $postsOrderBy2
        limit: $postsLimit2
        offset: $postsOffset2
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter2)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${CategoryFragmentDoc}`;

export function useFindManyPostQuery(options?: Omit<Urql.UseQueryArgs<FindManyPostQueryVariables>, 'query'>) {
  return Urql.useQuery<FindManyPostQuery, FindManyPostQueryVariables>({ query: FindManyPostDocument, ...options });
};
export const FindManyCategoryDocument = gql`
    query FindManyCategory($filter: CategoryFilter, $orderBy: [CategoryOrderBy!], $limit: Int, $offset: Int, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  findManyCategory(
    filter: $filter
    orderBy: $orderBy
    limit: $limit
    offset: $offset
  ) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}
${UserFragmentDoc}`;

export function useFindManyCategoryQuery(options?: Omit<Urql.UseQueryArgs<FindManyCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<FindManyCategoryQuery, FindManyCategoryQueryVariables>({ query: FindManyCategoryDocument, ...options });
};
export const SignInDocument = gql`
    mutation SignIn($email: String!) {
  signIn(email: $email)
}
    `;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;

export function useSignOutMutation() {
  return Urql.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument);
};
export const CreateOneUserDocument = gql`
    mutation CreateOneUser($input: UserCreateInput!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  createOneUser(input: $input) {
    ...user
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${UserFragmentDoc}
${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useCreateOneUserMutation() {
  return Urql.useMutation<CreateOneUserMutation, CreateOneUserMutationVariables>(CreateOneUserDocument);
};
export const CreateOnePostDocument = gql`
    mutation CreateOnePost($input: PostCreateInput!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter2: PostFilter, $postsOrderBy2: [PostOrderBy!], $postsLimit2: Int, $postsOffset2: Int, $postsCountFilter2: PostFilter, $categoriesCountFilter: CategoryFilter) {
  createOnePost(input: $input) {
    ...post
    author {
      ...user
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter2
        orderBy: $postsOrderBy2
        limit: $postsLimit2
        offset: $postsOffset2
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter2)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${CategoryFragmentDoc}`;

export function useCreateOnePostMutation() {
  return Urql.useMutation<CreateOnePostMutation, CreateOnePostMutationVariables>(CreateOnePostDocument);
};
export const CreateOneCategoryDocument = gql`
    mutation CreateOneCategory($input: CategoryCreateInput!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  createOneCategory(input: $input) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}
${UserFragmentDoc}`;

export function useCreateOneCategoryMutation() {
  return Urql.useMutation<CreateOneCategoryMutation, CreateOneCategoryMutationVariables>(CreateOneCategoryDocument);
};
export const CreateManyUserDocument = gql`
    mutation CreateManyUser($input: [UserCreateInput!]!) {
  createManyUser(input: $input)
}
    `;

export function useCreateManyUserMutation() {
  return Urql.useMutation<CreateManyUserMutation, CreateManyUserMutationVariables>(CreateManyUserDocument);
};
export const CreateManyPostDocument = gql`
    mutation CreateManyPost($input: [PostCreateInput!]!) {
  createManyPost(input: $input)
}
    `;

export function useCreateManyPostMutation() {
  return Urql.useMutation<CreateManyPostMutation, CreateManyPostMutationVariables>(CreateManyPostDocument);
};
export const CreateManyCategoryDocument = gql`
    mutation CreateManyCategory($input: [CategoryCreateInput!]!) {
  createManyCategory(input: $input)
}
    `;

export function useCreateManyCategoryMutation() {
  return Urql.useMutation<CreateManyCategoryMutation, CreateManyCategoryMutationVariables>(CreateManyCategoryDocument);
};
export const UpdateOneUserDocument = gql`
    mutation UpdateOneUser($where: UserUniqueFilter!, $data: UserUpdateInput!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  updateOneUser(where: $where, data: $data) {
    ...user
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${UserFragmentDoc}
${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useUpdateOneUserMutation() {
  return Urql.useMutation<UpdateOneUserMutation, UpdateOneUserMutationVariables>(UpdateOneUserDocument);
};
export const UpdateOnePostDocument = gql`
    mutation UpdateOnePost($where: PostUniqueFilter!, $data: PostUpdateInput!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter2: PostFilter, $postsOrderBy2: [PostOrderBy!], $postsLimit2: Int, $postsOffset2: Int, $postsCountFilter2: PostFilter, $categoriesCountFilter: CategoryFilter) {
  updateOnePost(where: $where, data: $data) {
    ...post
    author {
      ...user
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter2
        orderBy: $postsOrderBy2
        limit: $postsLimit2
        offset: $postsOffset2
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter2)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${CategoryFragmentDoc}`;

export function useUpdateOnePostMutation() {
  return Urql.useMutation<UpdateOnePostMutation, UpdateOnePostMutationVariables>(UpdateOnePostDocument);
};
export const UpdateOneCategoryDocument = gql`
    mutation UpdateOneCategory($where: CategoryUniqueFilter!, $data: CategoryUpdateInput!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  updateOneCategory(where: $where, data: $data) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}
${UserFragmentDoc}`;

export function useUpdateOneCategoryMutation() {
  return Urql.useMutation<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables>(UpdateOneCategoryDocument);
};
export const UpdateManyUserDocument = gql`
    mutation UpdateManyUser($where: UserFilter!, $data: UserUpdateInput!) {
  updateManyUser(where: $where, data: $data)
}
    `;

export function useUpdateManyUserMutation() {
  return Urql.useMutation<UpdateManyUserMutation, UpdateManyUserMutationVariables>(UpdateManyUserDocument);
};
export const UpdateManyPostDocument = gql`
    mutation UpdateManyPost($where: PostFilter!, $data: PostUpdateInput!) {
  updateManyPost(where: $where, data: $data)
}
    `;

export function useUpdateManyPostMutation() {
  return Urql.useMutation<UpdateManyPostMutation, UpdateManyPostMutationVariables>(UpdateManyPostDocument);
};
export const UpdateManyCategoryDocument = gql`
    mutation UpdateManyCategory($where: CategoryFilter!, $data: CategoryUpdateInput!) {
  updateManyCategory(where: $where, data: $data)
}
    `;

export function useUpdateManyCategoryMutation() {
  return Urql.useMutation<UpdateManyCategoryMutation, UpdateManyCategoryMutationVariables>(UpdateManyCategoryDocument);
};
export const DeleteOneUserDocument = gql`
    mutation DeleteOneUser($where: UserUniqueFilter!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  deleteOneUser(where: $where) {
    ...user
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${UserFragmentDoc}
${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useDeleteOneUserMutation() {
  return Urql.useMutation<DeleteOneUserMutation, DeleteOneUserMutationVariables>(DeleteOneUserDocument);
};
export const DeleteOnePostDocument = gql`
    mutation DeleteOnePost($where: PostUniqueFilter!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter2: PostFilter, $postsOrderBy2: [PostOrderBy!], $postsLimit2: Int, $postsOffset2: Int, $postsCountFilter2: PostFilter, $categoriesCountFilter: CategoryFilter) {
  deleteOnePost(where: $where) {
    ...post
    author {
      ...user
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter2
        orderBy: $postsOrderBy2
        limit: $postsLimit2
        offset: $postsOffset2
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter2)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${CategoryFragmentDoc}`;

export function useDeleteOnePostMutation() {
  return Urql.useMutation<DeleteOnePostMutation, DeleteOnePostMutationVariables>(DeleteOnePostDocument);
};
export const DeleteOneCategoryDocument = gql`
    mutation DeleteOneCategory($where: CategoryUniqueFilter!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  deleteOneCategory(where: $where) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      author {
        ...user
      }
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}
${UserFragmentDoc}`;

export function useDeleteOneCategoryMutation() {
  return Urql.useMutation<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables>(DeleteOneCategoryDocument);
};
export const DeleteManyUserDocument = gql`
    mutation DeleteManyUser($where: UserFilter!) {
  deleteManyUser(where: $where)
}
    `;

export function useDeleteManyUserMutation() {
  return Urql.useMutation<DeleteManyUserMutation, DeleteManyUserMutationVariables>(DeleteManyUserDocument);
};
export const DeleteManyPostDocument = gql`
    mutation DeleteManyPost($where: PostFilter!) {
  deleteManyPost(where: $where)
}
    `;

export function useDeleteManyPostMutation() {
  return Urql.useMutation<DeleteManyPostMutation, DeleteManyPostMutationVariables>(DeleteManyPostDocument);
};
export const DeleteManyCategoryDocument = gql`
    mutation DeleteManyCategory($where: CategoryFilter!) {
  deleteManyCategory(where: $where)
}
    `;

export function useDeleteManyCategoryMutation() {
  return Urql.useMutation<DeleteManyCategoryMutation, DeleteManyCategoryMutationVariables>(DeleteManyCategoryDocument);
};