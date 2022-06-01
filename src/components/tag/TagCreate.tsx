import { defineComponent, reactive, toRaw } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { EmojiList } from "../../shared/EmojiList";
import { Icon } from "../../shared/Icon";
import s from "./TagCreate.module.scss";
export const TagCreate = defineComponent({
  setup(props, context) {
    const formData = reactive({
      name: "",
      sign: "",
    });
    const onSubmit = (e: Event) => {
      // 取消默认行为(提交后会刷新)
      e.preventDefault();
      // 拿到formData原始对象(原来是proxy对象)
      const data = toRaw(formData);
      // 设置校验规则
      const rules = [
        { key: "name", required: true, message: "请输入标签名称" },
        { key: "name", pattern: /^.{2,6}$/, message: "标签名称长度为2-6" },
        { key: "sign", required: true, message: "请输入标签签名" },
      ];
      // const errors = validate(data, rules);
      // errors = {
      //   name: ["错误1", "错误2"],
      //   sign: ["错误3"],
      // };
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
                      class={[s.formItem, s.input, s.error]}
                      v-model={formData.name}
                    />
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>必填</span>
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
                      class={[s.formItem, s.emojiList, s.error]}
                    />
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>必填</span>
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
