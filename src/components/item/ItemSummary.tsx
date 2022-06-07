import { defineComponent } from "vue";
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    return () => <div>ItemSummary</div>;
  },
});
