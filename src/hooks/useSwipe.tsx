import { computed, ComputedRef, onMounted, onUnmounted, Ref, ref } from "vue";
type Point = { x: number; y: number };
interface Options {
  // 生命周期
  beforeStart?: (e: TouchEvent) => void;
  afterStart?: (e: TouchEvent) => void;
  beforeMove?: (e: TouchEvent) => void;
  afterMove?: (e: TouchEvent) => void;
  beforeEnd?: (e: TouchEvent) => void;
  afterEnd?: (e: TouchEvent) => void;
}
type UseSwipe = (
  el: Ref<HTMLElement | null>,
  options?: Options
) => {
  isMoving: Ref<boolean>;
  distance: ComputedRef<{ x: number; y: number } | null>;
  direction: ComputedRef<"" | "right" | "left" | "down" | "up">;
};
export const useSwipe: UseSwipe = (mainRef, options?) => {
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

  // 三个事件的回调,生命周期hook贯穿其中
  const onTouchStart = (e: TouchEvent) => {
    options?.beforeStart?.(e);
    isMoving.value = true;
    endPosition.value = null;
    startPosition.value = {
      // 只取第一根手指(touches[0])的移动数据
      x: e.touches[0].screenX,
      y: e.touches[0].screenY,
    };
    options?.afterStart?.(e);
  };
  const onTouchMove = (e: TouchEvent) => {
    options?.beforeMove?.(e);
    if (!startPosition.value) {
      return;
    }
    // endPosition实时更新
    endPosition.value = { x: e.touches[0].screenX, y: e.touches[0].screenY };
    options?.afterMove?.(e);
  };
  const onTouchEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e);
    isMoving.value = false;
    options?.afterEnd?.(e);
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
