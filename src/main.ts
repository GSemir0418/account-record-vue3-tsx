import { createApp } from "vue";
import { createRouter } from "vue-router";
import { App } from "./App";
import { history } from "./config/history";
import { routes } from "./config/routes";
import '@svgstore'

const router = createRouter({ history, routes });
const app = createApp(App);
app.use(router);
app.mount("#app");
