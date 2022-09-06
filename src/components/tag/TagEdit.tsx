import { defineComponent } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { TagForm } from "./TagForm";
import s from "./Tag.module.scss";
import { BackIcon } from "../../shared/BackIcon";
import { useRoute } from "vue-router";
export const TagEdit = defineComponent({
  setup(props, context) {
    const route = useRoute();
    const id = parseInt(route.params.id.toString());
    return () => (
      <MainLayout>
        {{
          default: () => "编辑标签",
          icon: () => <BackIcon />,
          main: () => (
            <>
              <TagForm id={id} />
              <div class={s.actions}>
                <Button level="danger" class={s.removeTags} onClick={() => {}}>
                  删除标签
                </Button>
                <Button
                  level="danger"
                  class={s.removeTagsAndItems}
                  onClick={() => {}}
                >
                  删除标签和记账
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
