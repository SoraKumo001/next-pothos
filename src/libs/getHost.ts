import { headers } from "next/headers";

export const getHost = async () => {
  const h = await headers();

  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return undefined;
  const proto = h.get("x-forwarded-proto")?.toString().split(",")[0] ?? "http";
  return `${proto}://${host}`;
};
