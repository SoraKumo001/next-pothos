import { useFindManyPostQuery } from "@/generated/graphql";

const Page = () => {
  const [{ data: dataPost }] = useFindManyPostQuery();

  return (
    <div>
      {dataPost?.findManyPost.map((post) => (
        <div key={post.id}>
          <div>{post.title}</div>
          <div>{post.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Page;
