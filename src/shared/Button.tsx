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
  },
  setup(props, context) {
    // button的内容应该是从外部插槽定义的
    return () => (
      <button class={[s.button, s[props.level]]}>
        {context.slots.default?.()}
      </button>
    );
  },
});
