import s from "./WelcomeLayout.module.scss";
import pig from "../../assets/icons/pig.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
export const First = () => {
  const slots = {
    icon: () => <img src={pig} />,
    title: () => (
      <h2>
        会赚钱
        <br />
        还要会省钱
      </h2>
    ),
    buttons: () => (
      <>
        <RouterLink to="/welcome/4" class={s.fake}>
          跳过
        </RouterLink>
        <RouterLink to="/welcome/2" class={s.next}>
          下一页
        </RouterLink>
        <RouterLink to="/welcome/4" class={s.skip}>
          跳过
        </RouterLink>
      </>
    ),
  };
  return <WelcomeLayout v-slots={slots} />;
};
