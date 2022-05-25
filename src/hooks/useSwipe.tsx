import { computed, ComputedRef, onMounted, onUnmounted, Ref, ref } from "vue";
type Point = { x: number; y: number };
type UseSwipe = (el: Ref<HTMLElement | null>) => {
  isMoving: Ref<boolean>;
  distance: ComputedRef<{ x: number; y: number } | null>;
  direction: ComputedRef<"" | "right" | "left" | "down" | "up">;
};
export const useSwipe: UseSwipe = (mainRef) => {
  // 滑动开始坐标
  const startPosition = ref<Point | null>(null);
  // 滑动结束坐标
  const endPosition = ref<Point | null>(null);
  // 滑动标记
  const isMoving = ref(false);
  // 触控距离
  const distance = computed(() => {
    if (!startPosition.value || !endPosition.value) {
      return null;
    }
    return {
      x: endPosition.value.x - startPosition.value.x,
      y: endPosition.value.y - startPosition.value.y,
    };
  });
  // 触控方向
  const direction = computed(() => {
    if (!distance.value) {
      return "";
    }
    const { x, y } = distance.value;
    // 判断x方向移动的距离与y方向移动的距离
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? "right" : "left";
    } else {
      return y > 0 ? "down" : "up";
    }
  });
  // 三个事件的回调
  const onTouchStart = (e: TouchEvent) => {
    isMoving.value = true;
    endPosition.value = null;
    startPosition.value = {
      // 只取第一根手指(touches[0])的移动数据
      x: e.touches[0].screenX,
      y: e.touches[0].screenY,
    };
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!startPosition.value) {
      return;
    }
    // endPosition实时更新
    endPosition.value = { x: e.touches[0].screenX, y: e.touches[0].screenY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    isMoving.value = false;
  };

  // 在useSwipe所在的组件挂载后 添加touch的事件监听
  onMounted(() => {
    mainRef.value?.addEventListener("touchstart", onTouchStart);
    mainRef.value?.addEventListener("touchmove", onTouchMove);
    mainRef.value?.addEventListener("touchend", onTouchEnd);
  });
  // 卸载组件后移除事件绑定
  onUnmounted(() => {
    mainRef.value?.removeEventListener("touchstart", onTouchStart);
    mainRef.value?.removeEventListener("touchmove", onTouchMove);
    mainRef.value?.removeEventListener("touchend", onTouchEnd);
  });
  return {
    isMoving,
    distance,
    direction,
  };
};
