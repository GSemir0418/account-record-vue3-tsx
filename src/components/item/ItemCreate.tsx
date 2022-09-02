import { defineComponent, onMounted, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { http } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import { useTags } from "../../hooks/useTags";
import s from "./ItemCreate.module.scss";
import { Tags } from "../../shared/Tags";
export const ItemCreate = defineComponent({
  setup(props, context) {
    const refSelected = ref("支出");
    return () => (
      <MainLayout>
        {{
          default: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon}></Icon>,
          main: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={refSelected.value} class={s.tabs}>
                <Tab name="支出">
                  <Tags kind={"expenses"} key={"expenses"} />
                </Tab>
                <Tab name="收入">
                  <Tags kind={"income"} key={"income"} />
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad />
              </div>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
