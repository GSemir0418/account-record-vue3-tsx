import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import "./App.scss";
export const App = defineComponent({
  setup() {
    return () => (
      <>
        {/* 展示路由视图的区域 */}
        <RouterView />
      </>
    );
  },
});
