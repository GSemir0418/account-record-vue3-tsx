import { defineComponent, reactive, toRaw } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { EmojiList } from "../../shared/EmojiList";
import { Icon } from "../../shared/Icon";
import { Rule, validate } from "../../shared/validate";
import s from "./TagCreate.module.scss";
export const TagCreate = defineComponent({
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
      <MainLayout>
        {{
          default: () => "新建标签",
          icon: () => <Icon name="left" />,
          main: () => (
            <form class={s.form} onSubmit={onSubmit}>
              {/* 标签名称表单项 */}
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>标签名</span>
                  <div class={s.formItem_value}>
                    <input
                      class={[s.formItem, s.input, errors["name"] && s.error]}
                      v-model={formData.name}
                    />
                  </div>
                  <div class={s.formItem_errorHint}>
                    {/* 添加空格提前占位，防止出现报错页面整体下移
                    也可以通过CSS设置span的min-height */}
                    <span>{errors["name"] ? errors["name"][0] : "　"}</span>
                  </div>
                </label>
              </div>
              {/* 表情选择框 */}
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>符号 {formData.sign}</span>
                  <div class={s.formItem_value}>
                    <EmojiList
                      v-model={formData.sign}
                      class={[errors["sign"] && s.error]}
                    />
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>
                      {/* 注意空格是中文全角空格，否则报错时会出现1px的抖动 */}
                      {errors["sign"] ? errors["sign"][0] : "　"}
                    </span>
                  </div>
                </label>
              </div>
              {/* 提示信息行  */}
              <p class={s.tips}>记账时长按标签即可进行编辑</p>
              {/* 提交按钮行 */}
              <div class={s.formRow}>
                <div class={s.formItem_value}>
                  <Button class={[s.formItem, s.button]}>确定</Button>
                </div>
              </div>
            </form>
          ),
        }}
      </MainLayout>
    );
  },
});
