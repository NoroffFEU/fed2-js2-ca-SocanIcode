import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  appType: "mpa",
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@api": fileURLToPath(new URL("./src/js/api", import.meta.url)),  // optional alias
      "@ui": fileURLToPath(new URL("./src/js/ui", import.meta.url)),    // optional alias
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        auth: resolve(__dirname, "./auth/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        post: resolve(__dirname, "./post/index.html"),
        editPost: resolve(__dirname, "./post/edit/index.html"),
        createPost: resolve(__dirname, "./post/create/index.html"),
        settings: resolve(__dirname, "./settings/index.html"),
        follow: resolve(__dirname, "./follow/friends/following.html"), 
        search: resolve(__dirname, "./search/index.html"),

      },
    },
  },
});
