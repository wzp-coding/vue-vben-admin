import { ref, computed, ComputedRef, unref } from 'vue';
import { useEventListener } from '/@/hooks/event/useEventListener';
import { screenMap, sizeEnum, screenEnum } from '/@/enums/breakpointEnum';

// 全局的屏幕标准尺寸
let globalScreenRef: ComputedRef<sizeEnum | undefined>;
// 全局的屏幕标准宽度
let globalWidthRef: ComputedRef<number>;
// 全局的窗口真实宽度
let globalRealWidthRef: ComputedRef<number>;

// 窗口变化执行的回调函数的参数
export interface CreateCallbackParams {
  // 屏幕标准尺寸
  screen: ComputedRef<sizeEnum | undefined>;
  // 屏幕标准宽度
  width: ComputedRef<number>;
  // 窗口真实宽度
  realWidth: ComputedRef<number>;
  // 屏幕标准宽度
  screenEnum: typeof screenEnum;
  screenMap: Map<sizeEnum, number>;
  sizeEnum: typeof sizeEnum;
}

export function useBreakpoint() {
  return {
    screenRef: computed(() => unref(globalScreenRef)),
    widthRef: globalWidthRef,
    screenEnum,
    realWidthRef: globalRealWidthRef,
  };
}

// Just call it once
// 只调用一次
/**
 *
 * @param fn 每次屏幕尺寸变化的时候调用该函数
 * @returns
 */
export function createBreakpointListen(fn?: (opt: CreateCallbackParams) => void) {
  // 当前屏幕标准尺寸
  const screenRef = ref<sizeEnum>(sizeEnum.XL);
  // 当前窗口的宽度(包含垂直滚动条)
  const realWidthRef = ref(window.innerWidth);

  /** 实时更新screenRef，realWidthRef */
  function getWindowWidth() {
    const width = document.body.clientWidth;
    const xs = screenMap.get(sizeEnum.XS)!;
    const sm = screenMap.get(sizeEnum.SM)!;
    const md = screenMap.get(sizeEnum.MD)!;
    const lg = screenMap.get(sizeEnum.LG)!;
    const xl = screenMap.get(sizeEnum.XL)!;
    if (width < xs) {
      screenRef.value = sizeEnum.XS;
    } else if (width < sm) {
      screenRef.value = sizeEnum.SM;
    } else if (width < md) {
      screenRef.value = sizeEnum.MD;
    } else if (width < lg) {
      screenRef.value = sizeEnum.LG;
    } else if (width < xl) {
      screenRef.value = sizeEnum.XL;
    } else {
      screenRef.value = sizeEnum.XXL;
    }
    realWidthRef.value = width;
  }

  // 使用事件监听器
  useEventListener({
    el: window,
    name: 'resize',

    listener: () => {
      getWindowWidth();
      resizeFn();
    },
    // wait: 100,
  });

  getWindowWidth();
  // 全局的屏幕标准尺寸
  globalScreenRef = computed(() => unref(screenRef));
  // 全局的屏幕标准宽度
  globalWidthRef = computed((): number => screenMap.get(unref(screenRef)!)!);
  // 全局的窗口真实宽度
  globalRealWidthRef = computed((): number => unref(realWidthRef));

  function resizeFn() {
    fn?.({
      screen: globalScreenRef,
      width: globalWidthRef,
      realWidth: globalRealWidthRef,
      screenEnum,
      screenMap,
      sizeEnum,
    });
  }

  resizeFn();
  return {
    screenRef: globalScreenRef,
    screenEnum,
    widthRef: globalWidthRef,
    realWidthRef: globalRealWidthRef,
  };
}
