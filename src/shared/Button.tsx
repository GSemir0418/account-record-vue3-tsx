import { defineComponent } from "vue";
import s from "./Button.module.scss";
interface Props {
  onClick: (e: MouseEvent) => void;
}
export const Button = defineComponent<Props>({
  setup(props, context) {
    // button的内容应该是从外部插槽定义的
    return () => <button class={s.button}>{context.slots.default?.()}</button>;
  },
});
