import { defineComponent } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";
import s from "./TagCreate.module.scss";
export const TagCreate = defineComponent({
  setup(props, context) {
    return () => (
      <MainLayout>
        {{
          default: () => "新建标签",
          icon: () => <Icon name="left" />,
          main: () => (
            <form class={s.form}>
              {/* 标签名称表单项 */}
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>标签名</span>
                  <div class={s.formItem_value}>
                    <input class={[s.formItem, s.input, s.error]} />
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>必填</span>
                  </div>
                </label>
              </div>
              {/* 表情选择框 */}
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>符号</span>
                  <div class={s.formItem_value}>
                    <div class={[s.formItem, s.emojiList, s.error]}>
                      <nav>
                        <span class={s.selected}>表情</span>
                        <span>手势</span>
                        <span>职业</span>
                        <span>衣服</span>
                        <span>动物</span>
                        <span>自然</span>
                        <span>食物</span>
                        <span>运动</span>
                        <span>表情</span>
                        <span>手势</span>
                        <span>职业</span>
                        <span>衣服</span>
                        <span>动物</span>
                        <span>自然</span>
                        <span>食物</span>
                        <span>运动</span>
                      </nav>
                      <ol>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                        <li>😀</li>
                      </ol>
                    </div>
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
