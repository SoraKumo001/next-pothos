import jsonwebtoken from "jsonwebtoken";

const secret = process.env.SECRET ?? "";

export const getJWT = <T>(token: string | undefined) => {
  return new Promise<T | undefined>((resolve) => {
    if (!token) return resolve(undefined);
    jsonwebtoken.verify(token, secret, (_, data) => {
      resolve(
        typeof data === "object" ? (data.payload as T | undefined) : undefined
      );
    });
  });
};
