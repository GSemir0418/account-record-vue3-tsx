import { defineComponent, PropType } from "vue";
import s from "./Tabs.module.scss";
export const Tabs = defineComponent({
  props: {
    selected: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    return () => {
      // slots相当于React中的props.children
      const nodeArr = context.slots.default?.();
      // 如果没有传子组件，则返回null
      if (!nodeArr) return null;
      // 遍历nodeArr
      for (let item of nodeArr) {
        if (item.type !== Tab) {
          // 运行时报错
          throw new Error("Tabs组件的子组件必须是Tab组件");
        }
      }
      return (
        <div class={s.tabs}>
          <ol class={s.tabs_nav}>
            {nodeArr.map((item) => (
              <li
                class={item.props?.name === props.selected ? s.selected : ""}
                onClick={() =>
                  context.emit("update:selected", item.props?.name)
                }
              >
                {item.props?.name}
              </li>
            ))}
          </ol>
          <div></div>
        </div>
      );
    };
  },
});

export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    return () => <div>{context.slots.default?.()}</div>;
  },
});
