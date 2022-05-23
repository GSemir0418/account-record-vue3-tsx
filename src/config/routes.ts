import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/FIrst";
import { Forth } from "../components/welcome/Forth";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { Bar } from "../views/Bar";
import { Foo } from "../views/Foo";
import { Welcome } from "../views/Welcome";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Foo },
  { path: "/bar", component: Bar },
  {
    path: "/welcome",
    component: Welcome,
    children: [
      // 注意path不需要'/'
      { path: "1", component: First },
      { path: "2", component: Second },
      { path: "3", component: Third },
      { path: "4", component: Forth },
    ],
  },
];
