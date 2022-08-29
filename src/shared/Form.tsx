import axios from "axios";
import { DatetimePicker, Popup } from "vant";
import { computed, defineComponent, PropType, ref } from "vue";
import { Button } from "./Button";
import { EmojiList } from "./EmojiList";
import s from "./Form.module.scss";
import { getFriendlyMessage } from "./getFriendlyMessage";
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
        "text" | "emojiList" | "date" | "validationCode" | "select"
      >,
    },
    error: {
      type: String,
    },
    options: {
      type: Array as PropType<{ text: string; value: string }[]>,
    },
    placeholder: String,
    onClick: Function as PropType<() => void>,
    countFrom: {
      type: Number,
      default: 60,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  // 注册自定义事件，表示允许组件接收到对应事件的回调
  emits: ["update:modelValue"],
  setup: (props, context) => {
    const refDateVisible = ref(false);
    // 计时器
    const timer = ref<number>();
    // 倒计时数字，默认值为父组件指定的countFrom
    const count = ref<number>(props.countFrom);
    // 判断显示内容与按钮状态的字段
    const isCounting = computed(() => !!timer.value);
    // 子组件倒计时逻辑
    const startCount = () => {
      timer.value = setInterval(() => {
        count.value -= 1;
        if (count.value === 0) {
          clearInterval(timer.value);
          timer.value = undefined;
          count.value = props.countFrom;
        }
      }, 1000);
    };
    // 将方法作为子组件实例方法，暴露给父组件，供父组件调用
    context.expose({ startCount });
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
                value={props.modelValue}
                onInput={(e: any) =>
                  context.emit("update:modelValue", e.target.value)
                }
              />
              <Button
                disabled={isCounting.value || props.disabled}
                onClick={props.onClick}
                class={[s.formItem, s.button, s.validationCodeButton]}
              >
                {isCounting.value ? count.value : "发送验证码"}
              </Button>
            </>
          );
        case "select":
          if (!props.options) return;
          return (
            <>
              <select
                class={[s.formItem, s.select]}
                value={props.modelValue}
                onChange={(e: any) => {
                  context.emit("update:modelValue", e.target.value);
                }}
              >
                {props.options.map((opt) => {
                  return <option value={opt.value}>{opt.text}</option>;
                })}
              </select>
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
              <span>
                {props.error ? getFriendlyMessage(props.error) : "　"}
              </span>
            </div>
          )}
        </label>
      </div>
    );
  },
});
