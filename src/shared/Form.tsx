import { DatetimePicker, Popup } from "vant";
import { computed, defineComponent, PropType, ref } from "vue";
import { Button } from "./Button";
import { EmojiList } from "./EmojiList";
import s from "./Form.module.scss";
import { Time } from "./time";
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
      type: String as PropType<
        "text" | "emojiList" | "date" | "validationCode"
      >,
    },
    error: {
      type: String,
    },
    placeholder: String,
  },
  // 注册自定义事件，表示允许组件接收到对应事件的回调
  emits: ["update:modelValue"],
  setup: (props, context) => {
    const refDateVisible = ref(false);
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
              placeholder={props.placeholder}
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
        case "date":
          return (
            <>
              <input
                readonly={true}
                value={props.modelValue}
                onClick={() => {
                  refDateVisible.value = true;
                }}
                class={[s.formItem, s.input]}
                placeholder={props.placeholder}
              />
              <Popup position="bottom" v-model:show={refDateVisible.value}>
                <DatetimePicker
                  value={props.modelValue}
                  type="date"
                  title="选择年月日"
                  onConfirm={(date: Date) => {
                    context.emit("update:modelValue", new Time(date).format());
                    refDateVisible.value = false;
                  }}
                  onCancel={() => (refDateVisible.value = false)}
                />
              </Popup>
            </>
          );
        case "validationCode":
          return (
            <>
              <input
                class={[s.formItem, s.input, s.validationCodeInput]}
                placeholder={props.placeholder}
              />
              <Button class={[s.formItem, s.button, s.validationCodeButton]}>
                发送验证码
              </Button>
            </>
          );
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
              <span>{props.error ?? "　"}</span>
            </div>
          )}
        </label>
      </div>
    );
  },
});
