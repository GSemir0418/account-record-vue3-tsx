import { defineComponent, reactive, toRaw } from "vue";
import { Button } from "../../shared/Button";
import { EmojiList } from "../../shared/EmojiList";
import { Form, FormItem } from "../../shared/Form";
import { validate, Rule } from "../../shared/validate";
import s from "./Tag.module.scss";
export const TagForm = defineComponent({
  setup(props, context) {
    const formData = reactive({
      name: "",
      sign: "",
    });
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});
    const onSubmit = (e: Event) => {
      // 取消默认行为(提交后会刷新)
      e.preventDefault();
      // 拿到formData原始对象(原来是proxy对象)
      const data = toRaw(formData);
      // 设置校验规则
      const rules: Rule<typeof formData>[] = [
        {
          key: "name",
          type: "required",
          required: true,
          message: "请输入标签名称",
        },
        {
          key: "name",
          type: "regExp",
          regExp: /^.{2,6}$/,
          message: "标签名称长度为2-6",
        },
        {
          key: "sign",
          type: "required",
          required: true,
          message: "请输入标签签名",
        },
      ];
      // 每次校验前先清空错误信息
      Object.assign(errors, { name: undefined, sign: undefined });
      // 如果先定义rules变量，再调用validate，则ts会报错，
      // 因为ts会提前判断rules变量的类型，导致这里的rules与validate方法中定义的rules类型冲突。
      // 将validate返回的数据放入errors中
      Object.assign(errors, validate(data, rules));
    };
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem
          label="标签名"
          type="text"
          v-model={formData.name}
          error={errors["name"] ? errors["name"][0] : "　"}
        />
        <FormItem
          label={"符号 " + formData.sign}
          type="emojiList"
          v-model={formData.sign}
          error={errors["sign"] ? errors["sign"][0] : "　"}
        />
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button class={[s.button]}>确定</Button>
        </FormItem>
      </Form>
    );
  },
});
