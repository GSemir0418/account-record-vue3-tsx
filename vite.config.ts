import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { svgstore } from "./src/vite_plugins/svgstore";
import styleImport, { VantResolve } from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    svgstore(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  server: {
    proxy: {
      "/api/v1": {
        // target: "http://121.41.82.157:3000/",
        target: "http://114.55.42.152:3000/",
      },
    },
  },
});
