import { defineComponent, Transition, ref, VNode, watchEffect } from "vue";
import {
  RouteLocationNormalizedLoaded,
  RouterView,
  useRoute,
  useRouter,
} from "vue-router";
import s from "./Welcome.module.scss";
import { useSwipe } from "../hooks/useSwipe";
import { throttle } from "../shared/throttle";
// 定义每个路由名称与其下一个路由路径映射
const welcomeRouteMap: Record<string, string> = {
  Welcome1: "/welcome/2",
  Welcome2: "/welcome/3",
  Welcome3: "/welcome/4",
  Welcome4: "/start",
};
export const Welcome = defineComponent({
  setup(props, context) {
    const mainRef = ref<HTMLElement | null>(null);
    const { direction, isMoving } = useSwipe(mainRef, {
      beforeStart: (e) => e.preventDefault(),
    });
    const route = useRoute();
    const router = useRouter();
    // 将路由切换函数节流处理
    const pushRoute = throttle(() => {
      const routeName = route.name ? route.name.toString() : "Welcome1";
      router.push(welcomeRouteMap[routeName]);
    }, 500);
    watchEffect(() => {
      // 每当isMoving或者direction的值发生变动，都会执行
      if (isMoving.value && direction.value === "left") {
        pushRoute();
      }
    });
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref="#mangosteen"></use>
          </svg>
          <h1>GS记账</h1>
        </header>
        <main ref={mainRef}>
          <RouterView name="main">
            {({
              Component,
              route,
            }: {
              Component: VNode;
              route: RouteLocationNormalizedLoaded;
            }) => (
              <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveActiveClass={s.slide_fade_leave_active}
              >
                {Component}
              </Transition>
            )}
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer" />
        </footer>
      </div>
    );
  },
});
