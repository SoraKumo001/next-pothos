"use client";
import { useFindManyPostQuery } from "@/generated/graphql";
import Link from "next/link";

const Page = () => {
  const [{ data: dataPost }] = useFindManyPostQuery();

  return (
    <div>
      <div>
        <Link href="/explorer">Explorer</Link>
      </div>
      {dataPost?.findManyPost?.map((post) => (
        <div key={post.id}>
          <div>{post.title}</div>
          <div>{post.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Page;
