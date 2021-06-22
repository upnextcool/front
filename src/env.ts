import pkg from "../package.json";

export const env: { [key: string]: unknown } = {
  prod: process.env.NODE_ENV === "production",
  version: pkg.version,
  frontUrl: `${process.env.VUE_APP_FRONT_URL}`,
  apiUrl: `${process.env.VUE_APP_API_URL}api`,
  graphqlUrl: `${process.env.VUE_APP_API_URL}graphql`,
};
