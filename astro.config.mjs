import { defineConfig } from "astro/config"
//import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: vercel(),
  // adapter: node({
  //   mode: "standalone",
  // }),
})

import { defineConfig } from "astro/config"

import node from "@astrojs/node"
