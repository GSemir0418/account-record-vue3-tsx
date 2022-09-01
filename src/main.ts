import { createApp } from "vue";
import { createRouter } from "vue-router";
import { App } from "./App";
import { history } from "./config/history";
import { routes } from "./config/routes";
import "@svgstore";
import { fetchMe, mePromise } from "./shared/me";

const router = createRouter({ history, routes });
fetchMe();
const whiteList: Record<string, "exact" | "startsWith"> = {
  "/": "exact",
  "/start": "exact",
  "/welcome": "startsWith",
  "/sign_in": "startsWith",
};
// 全局路由守卫
// 返回true或false或url
router.beforeEach((to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key];
    if (value === "exact" && to.path === key) {
      return true;
    }
    if (value === "startsWith" && to.path.startsWith(key)) {
      return true;
    }
  }
  // 每次访问之前都要请求当前用户，非常浪费资源
  // 方案一：可以把请求的promise提取到最外层，只在第一次访问时请求，后面只是读取这个promise中的值
  // 问题：在登录后应该刷新当前用户，即刷新promise
  // 解决：封装me.ts，提供promise和refreshMe等接口
  //   return http.get("/me").then(
  //     () => true,
  //     () => "/sign_in?return_to=" + to.path
  //   );
  return mePromise?.then(
    () => true,
    () => "/sign_in?return_to=" + to.path
  );
});
const app = createApp(App);
app.use(router);
app.mount("#app");
