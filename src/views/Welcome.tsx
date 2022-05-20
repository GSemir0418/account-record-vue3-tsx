import { defineComponent } from "vue";
import { RouterView } from "vue-router";
export const Welcome = defineComponent({
  setup(props, context) {
    return () => (
      <div>
        {/* 需要定义子路由渲染组件 */}
        <RouterView />
      </div>
    );
  },
});
