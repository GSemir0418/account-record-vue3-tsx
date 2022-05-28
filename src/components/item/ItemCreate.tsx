import { defineComponent, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  setup(props, context) {
    const refSelected = ref("支出");
    return () => (
      <MainLayout>
        {{
          default: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon}></Icon>,
          main: () => (
            <Tabs v-model:selected={refSelected.value}>
              <Tab name="支出">icon列表</Tab>
              <Tab name="收入">icon列表2</Tab>
            </Tabs>
          ),
        }}
      </MainLayout>
    );
  },
});
