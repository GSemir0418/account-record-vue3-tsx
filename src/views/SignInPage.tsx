import { defineComponent, reactive, ref } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Form, FormItem } from "../shared/Form";
import { Button } from "../shared/Button";
import { Icon } from "../shared/Icon";
import s from "./SignInPage.module.scss";
import axios from "axios";
import { http } from "../shared/HttpClient";
import { useBool } from "../shared/useBool";
import { hasErrors, validate } from "../shared/validate";
import { useRoute, useRouter } from "vue-router";
import { refreshMe } from "../shared/me";
export const SignInPage = defineComponent({
  setup(props, context) {
    const validationCodeRef = ref<any>();
    const route = useRoute();
    const router = useRouter();
    const formData = reactive({
      email: "",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });
    const { ref: validationCodeDisable, on, off } = useBool(false);
    const onSubmit = async (e: Event) => {
      // 取消默认行为(提交后会刷新)
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        code: [],
      });
      Object.assign(
        errors,
        validate(formData, [
          { key: "email", type: "required", message: "必填" },
          {
            key: "email",
            type: "pattern",
            regExp: /.+@.+/,
            message: "必须是邮箱地址",
          },
          { key: "code", type: "required", message: "必填" },
        ])
      );
      if (!hasErrors(errors)) {
        const response = await http
          .post<{ jwt: string }>("/session", formData)
          .catch((e) => {
            if (e.response.status === 422)
              Object.assign(errors, e.response.data.errors);
            throw e;
          });
        // 登录成功保存jwt
        localStorage.setItem("jwt", response.data.jwt);
        // 刷新当前用户
        refreshMe();
        // 跳转回之前页面
        // router.push("/sign_in?return_to=" + encodeURIComponent(route.fullPath));
        const returnTo = route.query.return_to?.toString();
        router.push(returnTo || "/");
      }
    };
    const onSendValidationCode = async () => {
      on();
      const response = await http
        .post("/validation_codes", {
          email: formData.email,
        })
        .catch((e) => {
          if (e.response.status === 422)
            Object.assign(errors, e.response.data.errors);
          throw e;
        })
        .finally(off);
      validationCodeRef.value.startCount();
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
                  v-model={formData.code}
                  countFrom={3}
                  disabled={validationCodeDisable.value}
                  placeholder="请输入六位数字"
                  error={errors.code?.[0]}
                  onClick={onSendValidationCode}
                />
                <FormItem style={{ paddingTop: "96px" }}>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
