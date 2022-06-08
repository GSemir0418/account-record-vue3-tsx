import { Overlay } from "vant";
import { defineComponent, reactive, ref, toRaw, watchEffect } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Form, FormItem } from "../../shared/Form";
import { Icon } from "../../shared/Icon";
import { OverlayIcon } from "../../shared/Overlay";
import { Tab, Tabs } from "../../shared/Tabs";
import { Time } from "../../shared/time";
import s from "./ItemList.module.scss";
import { ItemSummary } from "./ItemSummary";
export const ItemList = defineComponent({
  setup(props, context) {
    const refOverlayVisible = ref(false);
    const refSelected = ref("本月");
    const customTime = reactive({
      start: new Time().format(),
      end: new Time().format(),
    });
    const t = new Time();
    const times = [
      { start: t.firstDayOfMonth(), end: t.lastDayOfMonth() },
      {
        start: t.add(-1, "month").firstDayOfMonth(),
        end: t.add(-1, "month").lastDayOfMonth(),
      },
      { start: t.firstDayOfYear(), end: t.lastDayOfYear() },
    ];
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault();
      refOverlayVisible.value = false;
      console.log(toRaw(customTime));
    };
    const onSelect = (value: string) => {
      if (value === "自定义时间") {
        refOverlayVisible.value = true;
      }
    };
    return () => (
      <MainLayout>
        {{
          default: () => "账单列表",
          icon: () => <OverlayIcon />,
          main: () => (
            <>
              <Tabs
                classPrefix={"customTabs"}
                v-model:selected={refSelected.value}
                // 添加了一个update:selected事件监听，表示除正常更新Tabs的selected外，还会控制Overlay的显隐
                onUpdate:selected={onSelect}
              >
                <Tab name="本月">
                  <ItemSummary
                    startDate={times[0].start.format()}
                    endDate={times[0].end.format()}
                  />
                </Tab>
                <Tab name="上月">
                  <ItemSummary
                    startDate={times[1].start.format()}
                    endDate={times[1].end.format()}
                  />
                </Tab>
                <Tab name="今年">
                  <ItemSummary
                    startDate={times[2].start.format()}
                    endDate={times[2].end.format()}
                  />
                </Tab>
                <Tab name="自定义时间">
                  <ItemSummary
                    startDate={customTime.start}
                    endDate={customTime.end}
                  />
                </Tab>
              </Tabs>
              <Overlay show={refOverlayVisible.value} className={s.overlay}>
                <div class={s.overlay_inner}>
                  <header>请选择时间</header>
                  <main>
                    <Form onSubmit={onSubmitCustomTime}>
                      <FormItem
                        label="开始时间"
                        v-model={customTime.start}
                        type="date"
                      />
                      <FormItem
                        label="结束时间"
                        v-model={customTime.end}
                        type="date"
                      />
                      <FormItem>
                        <div class={s.actions}>
                          <button
                            type="button"
                            onClick={() => {
                              refOverlayVisible.value = false;
                            }}
                          >
                            取消
                          </button>
                          {/* type必须为submit才能触发form的onsubmit事件 */}
                          <button type="submit">确认</button>
                        </div>
                      </FormItem>
                    </Form>
                  </main>
                </div>
              </Overlay>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
