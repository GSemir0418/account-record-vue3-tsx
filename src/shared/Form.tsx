import { computed, defineComponent, PropType, VNode } from "vue";
import { EmojiList } from "./EmojiList";
import s from "./Form.module.scss";
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    );
  },
});

export const FormItem = defineComponent({
  props: {
    label: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String as PropType<"text" | "emojiList" | "date">,
    },
    error: {
      type: String,
    },
  },
  setup: (props, context) => {
    const content = computed(() => {
      switch (props.type) {
        case "text":
          return (
            <input
              value={props.modelValue}
              onInput={(e: any) =>
                context.emit("update:modelValue", e.target.value)
              }
              class={[s.formItem, s.input, s.error]}
            />
          );
        case "emojiList":
          return (
            <EmojiList
              modelValue={props.modelValue?.toString()}
              // 如果只有modelValue但没有props回调，则修改model数据会报错
              // 因此改造EmojiList组件
              onUpdateModelValue={(value) =>
                context.emit("update:modelValue", value)
              }
              class={[s.formItem, s.emojiList, s.error]}
            />
          );
        // TODO: 日期选择器
        case "date":
          return <input />;
        // 如果没有type，则默认为插槽，传什么都可以
        case undefined:
          return context.slots.default?.();
      }
    });
    return () => (
      <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label && <span class={s.formItem_name}>{props.label}</span>}
          <div class={s.formItem_value}>{content.value}</div>
          {props.error && (
            <div class={s.formItem_errorHint}>
              <span>{props.error}</span>
            </div>
          )}
        </label>
      </div>
    );
  },
});
