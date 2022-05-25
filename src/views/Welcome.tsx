import { defineComponent, Transition, ref, VNode, watchEffect } from "vue";
import { RouteLocationNormalizedLoaded, RouterView } from "vue-router";
import s from "./Welcome.module.scss";
import { useSwipe } from "../hooks/useSwipe";

export const Welcome = defineComponent({
  setup(props, context) {
    const mainRef = ref<HTMLElement | null>(null);
    const { distance, direction, isMoving } = useSwipe(mainRef);
    // 立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
    watchEffect(() => {
      console.log(direction.value, isMoving.value);
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
