import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  output: "standalone",
  basePath: "/__BASE_PATH_PLACEHOLDER__",
  // prevents the streaming of metadata to the client to prevent flickering of the tab name
  htmlLimitedBots: /.*/,
};

export default nextConfig;
