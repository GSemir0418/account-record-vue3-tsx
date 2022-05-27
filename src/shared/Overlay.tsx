import { defineComponent, PropType } from "vue";
import { Icon } from "./Icon";
import s from "./Overlay.module.scss";
export const Overlay = defineComponent({
  props: {
    close: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props, context) {
    const close = () => {
      props.close();
    };
    return () => (
      <>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay}>
          <section>
            <p>未登录用户</p>
            <p>点击这里登录</p>
          </section>
          <nav>
            <ul>
              <li>
                <Icon name="charts" />
                <span>统计图表</span>
              </li>
              <li>
                <Icon name="export" />
                <span>导出数据</span>
              </li>
              <li>
                <Icon name="notify" />
                <span>记账提醒</span>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});
