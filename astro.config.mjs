import { defineConfig } from "astro/config"
//import node from "@astrojs/node"
import vercel from "@astrojs/vercel/serverless"
import htmx from "astro-htmx"

// https://astro.build/config
export default defineConfig({
  integrations: [htmx()],
  output: "hybrid",
  adapter: vercel({
    edgeMiddleware: true,
  }),

  // adapter: node({
  //   mode: "standalone",
  // }),
})
