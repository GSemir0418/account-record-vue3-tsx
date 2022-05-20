import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";

export const App = defineComponent({
  setup() {
    return () => (
      <>
        <header>导航</header>
        <div>
          <ul>
            <li>
              {/* 路由跳转链接 */}
              <RouterLink to={"/"}>Foo</RouterLink>
            </li>
            <li>
              <RouterLink to={"/bar"}>Bar</RouterLink>
            </li>
          </ul>
        </div>
        {/* 展示路由视图的区域 */}
        <RouterView />
        <footer>页脚</footer>
      </>
    );
  },
});
