import {
  InjectionKey,
  provide,
  inject,
  reactive,
  readonly as defineReadonly,
  // defineComponent,
  UnwrapRef,
} from 'vue';

export interface CreateContextOptions {
  /** 只读 */
  readonly?: boolean;
  /** (未实现)创建provider，等调用时再进行provide */
  createProvider?: boolean;
  /** 对provide对象不做任何处理 */
  native?: boolean;
}

/** 将对象中的每个ref值进行脱ref操作，即返回原始值
 *  例如：{ a: Ref<0>, b: Ref<'b'> } => { a: 0, b: 'b' }
 */
type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};

/**
 * 
 * @param context provide提供的对象
 * @param key provide和inject的key
 * @param options 其它配置
 * @returns 响应式的state对象
 */
export function createContext<T>(
  context: any,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {},
) {
  const { readonly = true, createProvider = false, native = false } = options;

  const state = reactive(context);
  // 实际provide的数据
  const provideData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : provideData);

  return {
    state,
  };
}

/** TS函数重载
 *  实际：useContext<T>(paramsA: InjectionKey<T>, paramsB?: boolean | any): T | ShallowUnwrap<T>
 *  当 Boolean(paramsB) === false, return inject(key, {}) ,即 默认值为 {}
 */
export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;

export function useContext<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any,
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {});
}
