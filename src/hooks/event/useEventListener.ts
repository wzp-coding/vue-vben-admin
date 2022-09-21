import type { Ref } from 'vue';
import { ref, watch, unref } from 'vue';
import { useThrottleFn, useDebounceFn } from '@vueuse/core';

export type RemoveEventFn = () => void;
export interface UseEventParams {
  el?: Element | Ref<Element | undefined> | Window | any;
  // 监听器名称
  name: string;
  // 元素变化执行的监听函数
  listener: EventListener;
  // addEventListener第三个参数
  options?: boolean | AddEventListenerOptions;
  // 元素变化时自动移除监听器
  autoRemove?: boolean;
  // true防抖，false节流
  isDebounce?: boolean;
  // 防抖节流的时间，0则不进行防抖节流
  wait?: number;
}
export function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80,
}: UseEventParams): { removeEvent: RemoveEventFn } {
  /* eslint-disable-next-line */
  let remove: RemoveEventFn = () => {};
  // 用于控制只添加一次监听器
  const isAddRef = ref(false);

  if (el) {
    const element = ref(el as Element) as Ref<Element>;

    const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait);
    const realHandler = wait ? handler : listener;
    const removeEventListener = (e: Element) => {
      // 移除监听器，说明已经添加过监听器了
      isAddRef.value = true;
      e.removeEventListener(name, realHandler, options);
    };
    const addEventListener = (e: Element) => e.addEventListener(name, realHandler, options);

    /**
     * 监听元素变化
     * 第一次变化，先添加监听器
     * 第二次变化，移除上一次的监听器，isAddRef为true，不会再添加监听器
     */
    const removeWatch = watch(
      element,
      // cleanUp(fn)中的fn在上一个watch过期时(新的watch准备执行前)执行
      (v, _ov, cleanUp) => {
        if (v) {
          !unref(isAddRef) && addEventListener(v);
          cleanUp(() => {
            autoRemove && removeEventListener(v);
          });
        }
      },
      { immediate: true },
    );

    remove = () => {
      removeEventListener(element.value);
      removeWatch();
    };
  }
  return { removeEvent: remove };
}
