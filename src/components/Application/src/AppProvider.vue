<script lang="ts">
  import { defineComponent, toRefs, ref, unref } from 'vue';
  import { createAppProviderContext } from './useAppContext';
  import { createBreakpointListen } from '/@/hooks/event/useBreakpoint';
  import { prefixCls } from '/@/settings/designSetting';
  import { useAppStore } from '/@/store/modules/app';
  import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';

  const props = {
    /**
     * class style prefix
     * 类名前缀
     */
    prefixCls: { type: String, default: prefixCls },
  };

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      // 判断移动端
      const isMobile = ref(false);
      // 标志是否设置过state
      const isSetState = ref(false);

      const appStore = useAppStore();

      // Monitor screen breakpoint information changes
      // 监听屏幕变化，同步更新信息
      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const lgWidth = screenMap.get(sizeEnum.LG);
        if (lgWidth) {
          // 窗口宽度小于992则视为移动端
          isMobile.value = width.value - 1 < lgWidth; 
        }
        handleRestoreState();
      });

      const { prefixCls } = toRefs(props);

      // Inject variables into the global
      // 将prefixCls, isMobile通过provide注入到每个组件中
      createAppProviderContext({ prefixCls, isMobile });

      /**
       * Used to maintain the state before the window changes
       * 窗口变化之前保存状态
       */
      function handleRestoreState() {
        if (unref(isMobile)) {
          if (!unref(isSetState)) {
            // 移动端且没设置过state
            isSetState.value = true;
            const {
              menuSetting: {
                type: menuType,
                mode: menuMode,
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            } = appStore.getProjectConfig;
            appStore.setProjectConfig({
              menuSetting: {
                type: MenuTypeEnum.SIDEBAR,
                mode: MenuModeEnum.INLINE,
                split: false,
              },
            });
            appStore.setBeforeMiniInfo({ menuMode, menuCollapsed, menuType, menuSplit });
          }
        } else {
          // PC端且设置过state
          if (unref(isSetState)) {
            isSetState.value = false;
            const { menuMode, menuCollapsed, menuType, menuSplit } = appStore.getBeforeMiniInfo;
            appStore.setProjectConfig({
              menuSetting: {
                type: menuType,
                mode: menuMode,
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            });
          }
        }
      }
      return () => slots.default?.();
    },
  });
</script>