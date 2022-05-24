import s from "./WelcomeLayout.module.scss";
import cloud from "../../assets/icons/cloud.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
export const Forth = () => {
  return (
    <WelcomeLayout>
      {{
        icon: () => <img src={cloud} />,
        title: () => (
          <h2>
            每日提醒
            <br />
            不遗漏每一笔账单
          </h2>
        ),
        buttons: () => (
          <>
            <RouterLink to="/start" class={s.fake}>
              跳过
            </RouterLink>
            <RouterLink to="/start" class={s.next}>
              完成
            </RouterLink>
            <RouterLink to="/start" class={s.fake}>
              跳过
            </RouterLink>
          </>
        ),
      }}
    </WelcomeLayout>
  );
};
