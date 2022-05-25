import s from "./welcome.module.scss";
export const Forth = () => {
  return (
    <div class={s.card}>
      {/* 使用SVG雪碧图 */}
      <svg>
        <use xlinkHref="#cloud"></use>
      </svg>
      <h2>
        每日提醒
        <br />
        不遗漏每一笔账单
      </h2>
    </div>
  );
};
Forth.displayName = "Forth";
