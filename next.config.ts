import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // disabled for now, as it messes with the placement of popovers from blueprintjs
  // see https://github.com/palantir/blueprint/issues/5503
  reactStrictMode: false,
  output: "standalone",
  basePath: "/__BASE_PATH_PLACEHOLDER__",
};

export default nextConfig;
