import { defineComponent, PropType } from "vue";
import s from "./Icon.module.scss";
export type IconName =
  | "add"
  | "chart"
  | "clock"
  | "cloud"
  | "pig"
  | "mangosteen"
  | "export"
  | "notify"
  | "charts"
  | "left"
  | "menu";
export const Icon = defineComponent({
  props: {
    name: {
      // 前面的类型是为Vue准备的，后面的是为TypeScript准备的
      type: String as PropType<IconName>,
      required: true,
    },
    onClick: Function as PropType<(e: MouseEvent) => void>,
  },
  setup(props, context) {
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={`#${props.name}`}></use>
      </svg>
    );
  },
});
