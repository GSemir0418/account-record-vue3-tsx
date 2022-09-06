import { AxiosError } from "axios";
import { defineComponent, reactive, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "../../shared/Button";
import { Form, FormItem } from "../../shared/Form";
import { http } from "../../shared/HttpClient";
import { validate, Rule, hasErrors } from "../../shared/validate";
import s from "./Tag.module.scss";
export const TagForm = defineComponent({
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const formData = reactive({
      name: "",
      sign: "",
      kind: route.query.kind!.toString(),
    });
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});
    const onError = (e: AxiosError<ResourceError>) => {
      if (e.response?.status === 422)
        Object.assign(errors, e.response.data.errors);
      throw e;
    };
    const onSubmit = async (e: Event) => {
      // 取消默认行为(提交后会刷新)
      e.preventDefault();
      // 拿到formData原始对象(原来是proxy对象)
      const data = toRaw(formData);
      // 设置校验规则
      const rules: Rule<typeof formData>[] = [
        {
          key: "name",
          type: "required",
          message: "必填",
        },
        {
          key: "name",
          type: "pattern",
          regExp: /^.{2,6}$/,
          message: "标签名称长度为2-6",
        },
        {
          key: "sign",
          type: "required",
          message: "必填",
        },
      ];
      // 每次校验前先清空错误信息
      Object.assign(errors, { name: [], sign: [] });
      // 如果先定义rules变量，再调用validate，则ts会报错，
      // 因为ts会提前判断rules变量的类型，导致这里的rules与validate方法中定义的rules类型冲突。
      // 将validate返回的数据放入errors中
      Object.assign(errors, validate(data, rules));
      if (!hasErrors(errors)) {
        await http.post("/tags", formData).catch(onError);
        router.back();
      }
    };
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem
          label="标签名"
          type="text"
          v-model={formData.name}
          error={errors["name"]?.[0]}
        />
        <FormItem
          label={"符号 " + formData.sign}
          type="emojiList"
          v-model={formData.sign}
          error={errors["sign"]?.[0]}
        />
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button type="submit" class={[s.button]}>
            确定
          </Button>
        </FormItem>
      </Form>
    );
  },
});
