import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const page: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/api/graphql");
  }, []);
  return null;
};

export default page;
