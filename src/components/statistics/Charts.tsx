import { defineComponent, PropType, ref } from "vue";
import { FormItem } from "../../shared/Form";
import s from "./Charts.module.scss";
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
      </div>
    );
  },
});
