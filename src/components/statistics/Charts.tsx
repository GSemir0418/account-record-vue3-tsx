import { defineComponent, PropType, ref } from "vue";
import { FormItem } from "../../shared/Form";
import { Bars } from "./Bars";
import s from "./Charts.module.scss";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup: (props, context) => {
    const refSelect = ref("income");
    console.log(refSelect.value);
    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { text: "收入", value: "income" },
            { text: "支出", value: "expense" },
          ]}
          v-model={refSelect.value}
        />
        <LineChart />
        <PieChart />
        <Bars />
      </div>
    );
  },
});
