import { InjectionKey, Ref } from 'vue';
import { createContext, useContext } from '/@/hooks/core/useContext';

/** 定义provide数据的类型 */
export interface AppProviderContextProps {
  prefixCls: Ref<string>;
  isMobile: Ref<boolean>;
}

/** 作为inject的key,value值类型为AppProviderContextProps */
const key: InjectionKey<AppProviderContextProps> = Symbol();

/**
 * 这样封装的目的是：使用值的时候可以获得类型提示，例如AppProviderContextProps
 */

/** 封装provide，提供值得时候调用*/
export function createAppProviderContext(context: AppProviderContextProps) {
  // 类似createContext(value, key)
  return createContext<AppProviderContextProps>(context, key);
}

/** 封装inject，使用值的时候调用 */
export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key);
}
