import { defineComponent, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { Tags } from "../../shared/Tags";
export const ItemCreate = defineComponent({
  setup(props, context) {
    const refKind = ref("支出");
    const refTagId = ref<number>();
    const refHappenAt = ref<string>(new Date().toISOString());
    const refAmount = ref<number>();
    return () => (
      <MainLayout>
        {{
          default: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon}></Icon>,
          main: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={refKind.value} class={s.tabs}>
                <Tab name="支出">
                  <Tags
                    kind={"expenses"}
                    key={"expenses"}
                    v-model:selected={refTagId.value}
                  />
                </Tab>
                <Tab name="收入">
                  <Tags
                    kind={"income"}
                    key={"income"}
                    v-model:selected={refTagId.value}
                  />
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad
                  v-model:happenAt={refHappenAt.value}
                  v-model:amount={refAmount.value}
                />
              </div>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
