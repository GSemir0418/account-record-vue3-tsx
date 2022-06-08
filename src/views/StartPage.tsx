import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Overlay, OverlayIcon } from "../shared/Overlay";
import s from "./StartPage.module.scss";
export const StartPage = defineComponent({
  setup(props, context) {
    return () => (
      <MainLayout>
        {{
          default: () => "GS记账",
          icon: () => <OverlayIcon />,
          main: () => (
            <>
              <Center class={s.pig_wrapper}>
                <Icon class={s.pig} name="pig"></Icon>
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
              <RouterLink to="/items/create">
                <FloatButton iconName="add"></FloatButton>
              </RouterLink>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
