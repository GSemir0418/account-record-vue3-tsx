import { defineComponent } from "vue";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import s from "./StartPage.module.scss";
export const StartPage = defineComponent({
  setup(props, context) {
    const onClick = () => {
      console.log("hi");
    };
    return () => (
      <div>
        <Navbar>
          {/* 向Navbar的插槽传递icon和title */}
          {{
            default: () => "GS记账",
            icon: () => <Icon name="menu" class={s.navIcon} />,
          }}
        </Navbar>
        <Center class={s.pig_wrapper}>
          <Icon class={s.pig} name="pig"></Icon>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>
            开始记账
          </Button>
        </div>
        <FloatButton iconName="add"></FloatButton>
      </div>
    );
  },
});
