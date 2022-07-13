import { defineComponent, PropType } from "vue";
import s from "./Button.module.scss";
export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    level: {
      type: String as PropType<"important" | "normal" | "danger">,
      default: "important",
    },
    // 指定默认type为button，否则页面的第一个按钮会触发form的submit
    type: {
      type: String as PropType<"submit" | "button">,
      default: "button",
    },
  },
  setup(props, context) {
    // button的内容应该是从外部插槽定义的
    return () => (
      <button onClick={props.onClick} class={[s.button, s[props.level]]}>
        {context.slots.default?.()}
      </button>
    );
  },
});
