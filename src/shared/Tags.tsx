import { defineComponent } from "vue";
import { Icon } from "./Icon";
import { useTags } from "../hooks/useTags";
import { http } from "./HttpClient";
import { Button } from "./Button";
import s from "./Tags.module.scss";
export const Tags = defineComponent({
  props: {
    kind: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
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
    return () => (
      <>
        <div class={s.tags_wrapper}>
          <div class={s.tag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag} />
            </div>
            <div class={s.name}>新增</div>
          </div>
          {tags.value.map((tag) => (
            <div class={[s.tag, s.selected]}>
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
