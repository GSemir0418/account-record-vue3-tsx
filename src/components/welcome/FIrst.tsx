import { defineComponent } from "vue";
import s from "./First.module.scss";
import pig from "../../assets/icons/pig.svg";
import { RouterLink } from "vue-router";
export const First = defineComponent({
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={pig} alt="" />
          <h2>
            会赚钱
            <br />
            还要会省钱
          </h2>
        </div>
        <div class={s.actions}>
          <RouterLink to="/welcome/4" class={s.fake}>
            跳过
          </RouterLink>
          <RouterLink to="/welcome/2" class={s.next}>
            下一页
          </RouterLink>
          <RouterLink to="/welcome/4" class={s.skip}>
            跳过
          </RouterLink>
        </div>
      </div>
    );
  },
});
