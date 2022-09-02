import { defineComponent, onMounted, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { http } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  setup(props, context) {
    const refSelected = ref("支出");
    const refPage = ref(0);
    const refHasMore = ref(false);
    const refExpensesTags = ref<Tag[]>([]);
    const refIncomeTags = ref<Tag[]>([]);
    onMounted(async () => {
      const resp = await http.get<Resources<Tag>>(
        "/tags",
        {
          kind: "expenses",
          _m: "tagIndex",
          page: 1,
        },
        {
          timeout: 1000,
        }
      );
      const { pager, resources } = resp.data;
      refExpensesTags.value = resources;
      refHasMore.value =
        (pager.page - 1) * pager.per_page + resources.length < pager.count;
    });
    onMounted(async () => {
      const resp = await http.get<{ resources: Tag[] }>(
        "/tags",
        {
          kind: "income",
          _m: "tagIndex",
        },
        {
          timeout: 1000,
        }
      );
      refIncomeTags.value = resp.data.resources;
    });
    const onLoadMore = () => {};
    return () => (
      <MainLayout>
        {{
          default: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon}></Icon>,
          main: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={refSelected.value} class={s.tabs}>
                <Tab name="支出">
                  <div class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {refExpensesTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </div>
                  <div class={s.more}>
                    {refHasMore.value ? (
                      <Button onClick={onLoadMore}>加载更多</Button>
                    ) : (
                      <span>没有更多</span>
                    )}
                  </div>
                </Tab>
                <Tab name="收入" class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag} />
                    </div>
                    <div class={s.name}>新增</div>
                  </div>
                  {refIncomeTags.value.map((tag) => (
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>{tag.sign}</div>
                      <div class={s.name}>{tag.name}</div>
                    </div>
                  ))}
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
