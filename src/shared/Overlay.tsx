import { defineComponent, PropType, ref, watchEffect } from "vue";
import { RouterLink } from "vue-router";
import { useSwipe } from "../hooks/useSwipe";
import { Icon } from "./Icon";
import s from "./Overlay.module.scss";
import { throttle } from "./throttle";
export const Overlay = defineComponent({
  props: {
    close: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props, context) {
    // 滑动关闭
    const overlayRef = ref();
    const { distance, direction, isMoving } = useSwipe(overlayRef, {
      beforeStart: (e) => e.preventDefault(),
    });
    const handleSwipe = throttle(() => {
      props.close();
    }, 500);
    watchEffect(() => {
      if (
        direction.value === "left" &&
        isMoving.value &&
        distance.value?.x &&
        Math.abs(distance.value.x) > 100
      ) {
        handleSwipe();
      }
    });
    const close = () => {
      props.close();
    };
    const onClickSignIn = () => {};
    return () => (
      <>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay} ref={overlayRef}>
          <section class={s.currentUser} onClick={onClickSignIn}>
            <h2>未登录用户</h2>
            <p>点击这里登录</p>
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="charts" class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.action}>
                  <Icon name="notify" class={s.icon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});

export const OverlayIcon = defineComponent({
  setup(props, context) {
    const showOverlay = ref(false);
    const onClickMenu = () => {
      showOverlay.value = !showOverlay.value;
    };
    const close = () => {
      showOverlay.value = false;
    };
    return () => (
      <>
        <Icon name="menu" class={s.icon} onClick={onClickMenu} />
        {showOverlay.value && <Overlay close={close} />}
      </>
    );
  },
});
