import { defineComponent, reactive, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { Tags } from "../../shared/Tags";
import { http } from "../../shared/HttpClient";
export const ItemCreate = defineComponent({
  setup(props, context) {
    const formData = reactive({
      kind: "expenses",
      tags_id: [],
      happen_at: new Date().toISOString(),
      amount: 0,
    });
    const onSubmit = async () => {
      const resp = await http.post<Resource<Item>>("/items", formData, {
        timeout: 1000,
        params: { _m: "itemCreate" },
      });
      console.log(resp);
    };
    return () => (
      <MainLayout>
        {{
          default: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon}></Icon>,
          main: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={formData.kind} class={s.tabs}>
                <Tab name="expenses">
                  <Tags
                    kind={"expenses"}
                    key={"expenses"}
                    v-model:selected={formData.tags_id[0]}
                  />
                </Tab>
                <Tab name="income">
                  <Tags
                    kind={"income"}
                    key={"income"}
                    v-model:selected={formData.tags_id[0]}
                  />
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad
                  v-model:happenAt={formData.happen_at}
                  v-model:amount={formData.amount}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
