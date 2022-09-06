import { defineComponent, ref } from "vue";
import { Icon } from "./Icon";
import { useTags } from "../hooks/useTags";
import { http } from "./HttpClient";
import { Button } from "./Button";
import s from "./Tags.module.scss";
import { RouterLink } from "vue-router";
export const Tags = defineComponent({
  props: {
    kind: {
      type: String,
      required: true,
    },
    selected: Number,
  },
  setup(props, context) {
    const timer = ref<number>();
    const currentTag = ref<HTMLDivElement>();
    const { kind } = props;
    const { fetchTags, tags, hasMore } = useTags((page) => {
      return http.get<Resources<Tag>>(
        "/tags",
        {
          kind,
          _m: "tagIndex",
          page: page + 1,
        },
        {
          timeout: 1000,
        }
      );
    });
    const onSelect = (tag: Tag) => {
      context.emit("update:selected", tag.id);
    };
    const longPress = () => {
      console.log("长按");
    };
    const onTouchStart = (e: TouchEvent) => {
      currentTag.value = e.currentTarget as HTMLDivElement;
      timer.value = setTimeout(() => {
        longPress();
      }, 500);
    };
    const onTouchEnd = () => {
      clearTimeout(timer.value);
    };
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
      );
      if (
        currentTag.value !== pointedElement &&
        currentTag.value?.contains(pointedElement) === false
      ) {
        clearTimeout(timer.value);
      }
    };
    return () => (
      <>
        <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
          <RouterLink to={`/tags/create?kind=${kind}`} class={s.tag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag} />
            </div>
            <div class={s.name}>新增</div>
          </RouterLink>
          {tags.value.map((tag) => (
            <div
              class={[s.tag, props.selected === tag.id ? s.selected : ""]}
              onClick={() => onSelect(tag)}
              onTouchstart={onTouchStart}
              onTouchend={onTouchEnd}
            >
              <div class={s.sign}>{tag.sign}</div>
              <div class={s.name}>{tag.name}</div>
            </div>
          ))}
        </div>
        <div class={s.more}>
          {hasMore.value ? (
            <Button onClick={fetchTags}>加载更多</Button>
          ) : (
            <span>没有更多</span>
          )}
        </div>
      </>
    );
  },
});
