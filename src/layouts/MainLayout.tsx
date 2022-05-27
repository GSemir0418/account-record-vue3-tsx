import { defineComponent } from "vue";
import { Navbar } from "../shared/Navbar";
export const MainLayout = defineComponent({
  setup(props, context) {
    return () => (
      <>
        <Navbar>
          {{
            default: () => context.slots.default?.(),
            icon: () => context.slots.icon?.(),
          }}
        </Navbar>
        {context.slots.main?.()}
      </>
    );
  },
});
