import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import s from "./Welcome.module.scss";
import mangosteen from "../assets/icons/mangosteen.svg";
export const Welcome = defineComponent({
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <header>
          <img src={mangosteen} alt="" />
          <h1>GS记账</h1>
        </header>
        <main>
          <RouterView name="main" />
        </main>
        <footer>
          <RouterView name="footer" />
        </footer>
      </div>
    );
  },
});
