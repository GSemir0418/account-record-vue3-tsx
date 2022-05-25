import s from "./welcome.module.scss";
import { FunctionalComponent } from "vue";

export const First: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      {/* 使用SVG雪碧图 */}
      <svg>
        <use xlinkHref="#pig"></use>
      </svg>
      <h2>
        会赚钱
        <br />
        还要会省钱
      </h2>
    </div>
  );
};
First.displayName = "First";
