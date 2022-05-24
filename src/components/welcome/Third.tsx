import s from "./WelcomeLayout.module.scss";
import chart from "../../assets/icons/chart.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
export const Third = () => {
  return (
    <WelcomeLayout>
      {{
        icon: () => <img src={chart} />,
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
            <RouterLink to="/welcome/4" class={s.next}>
              下一页
            </RouterLink>
            <RouterLink to="/start" class={s.skip}>
              跳过
            </RouterLink>
          </>
        ),
      }}
    </WelcomeLayout>
  );
};
