import { defineComponent, ref } from "vue";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import { Overlay } from "../shared/Overlay";
import s from "./StartPage.module.scss";
export const StartPage = defineComponent({
  setup(props, context) {
    const showOverlay = ref(false);
    const onClickMenu = () => {
      showOverlay.value = !showOverlay.value;
    };
    const close = () => {
      showOverlay.value = false;
    };
    return () => (
      <div>
        <Navbar>
          {/* 向Navbar的插槽传递icon和title */}
          {{
            default: () => "GS记账",
            icon: () => (
              <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
            ),
          }}
        </Navbar>
        <Center class={s.pig_wrapper}>
          <Icon class={s.pig} name="pig"></Icon>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button}>开始记账</Button>
        </div>
        <FloatButton iconName="add"></FloatButton>
        {showOverlay.value && <Overlay close={close} />}
      </div>
    );
  },
});
