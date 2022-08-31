import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
export const SkipFeatures = defineComponent({
  setup(props, context) {
    const onClick = () => {
      localStorage.setItem("skipFeatures", new Date().toISOString());
    };
    return () => (
      <span onClick={onClick}>
        <RouterLink to="/start">跳过</RouterLink>
      </span>
    );
  },
});
