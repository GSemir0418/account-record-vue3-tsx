import { defineComponent, ref } from "vue";

// export const 是带名字的导出，方便ide引入提示
export const App2 = defineComponent({
  setup() {
    const refCount = ref(0);
    const onClick = () => {
      refCount.value += 1;
    };
    // 这里要return一个函数，函数返回值为tsx元素
    return () => (
      <>
        {/* 这里跟template语法不同，需手动.value */}
        <h1>{refCount.value}</h1>
        <div>
          <button onClick={onClick}>+1</button>
        </div>
      </>
    );
  },
});
