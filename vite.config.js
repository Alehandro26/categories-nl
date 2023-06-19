import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
  dotenv.config({
    path: `./.env.${mode}`,
  });

  return {
    base: "/categories-nl/",
    plugins: [vue()],
    server: {
      port: 8080,
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
