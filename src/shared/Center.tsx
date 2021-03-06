import { defineComponent, PropType } from "vue";
import s from "./Center.module.scss";
export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<"row" | "column">,
      default: "row",
    },
  },
  setup(props, context) {
    return () => (
      // react中需要自己去join className
      <div class={[s.center, props.direction]}>{context.slots.default?.()}</div>
    );
  },
});
