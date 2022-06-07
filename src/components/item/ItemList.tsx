import { Overlay } from "vant";
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { Time } from "../../shared/time";
import s from "./ItemList.module.scss";
import { ItemSummary } from "./ItemSummary";
export const ItemList = defineComponent({
  setup(props, context) {
    const refOverlayVisible = ref(false);
    const refSelected = ref("本月");
    const customTime = reactive({
      start: new Time(),
      end: new Time(),
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
    watchEffect(() => {
      if (refSelected.value === "自定义时间") {
        refOverlayVisible.value = true;
      }
    });
    return () => (
      <MainLayout>
        {{
          default: () => "账单列表",
          icon: () => (
            <Icon name="menu" class={s.icon}>
              列表
            </Icon>
          ),
          main: () => (
            <>
              <Tabs
                classPrefix={"customTabs"}
                v-model:selected={refSelected.value}
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
                    startDate={customTime.start.format()}
                    endDate={customTime.end.format()}
                  />
                </Tab>
              </Tabs>
              <Overlay show={refOverlayVisible.value} className={s.overlay}>
                <div class={s.overlay_inner}>
                  <header>请选择时间</header>
                  <main>
                    <form action=""></form>
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
