import { defineComponent, reactive, ref } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Form, FormItem } from "../shared/Form";
import { Button } from "../shared/Button";
import { Icon } from "../shared/Icon";
import s from "./SignInPage.module.scss";
import axios from "axios";
export const SignInPage = defineComponent({
  setup(props, context) {
    const validationCodeRef = ref<any>();
    const formData = reactive({
      email: "",
      validationCode: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });
    const onSubmit = (e: Event) => {
      // 取消默认行为(提交后会刷新)
      e.preventDefault();
    };
    const onSendValidationCode = async () => {
      const response = await axios
        .post("/api/v1/validation_codes", {
          email: formData.email,
        })
        .then(() => {
          validationCodeRef.value.startCount();
        })
        .catch((e) => {
          errors.email = e.response.data.errors.email;
          console.log(errors);
        });
    };
    return () => (
      <MainLayout>
        {{
          default: () => "登录",
          icon: () => <Icon name="left" />,
          main: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="mangosteen" />
                <h1 class={s.appName}>GS记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱"
                  type="text"
                  v-model={formData.email}
                  placeholder="请输入邮箱，然后点击输入验证码"
                  error={errors.email?.[0]}
                />
                <FormItem
                  ref={validationCodeRef}
                  label="验证码"
                  type="validationCode"
                  v-model={formData.validationCode}
                  countFrom={60}
                  placeholder="请输入六位数字"
                  error={errors.email?.[0]}
                  onClick={onSendValidationCode}
                />
                <FormItem style={{ paddingTop: "96px" }}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
