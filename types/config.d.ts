import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';

import { CacheTypeEnum } from '/@/enums/cacheEnum';

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko';

export interface MenuSetting {
  // 背景色
  bgColor: string;
  // 是否固定住菜单
  fixed: boolean;
  // 菜单折叠
  collapsed: boolean;
  // 折叠菜单时候是否显示菜单名
  collapsedShowTitle: boolean;
  // 屏幕缩小的时候隐藏侧边栏
  siderHidden: boolean;
  // 是否可拖拽
  canDrag: boolean;
  // 是否显示dom
  show: boolean;
  // 是否隐藏dom
  hidden: boolean;
  // 菜单宽度
  menuWidth: number;
  // 菜单模式
  mode: MenuModeEnum;
  // 菜单类型
  type: MenuTypeEnum;
  // 菜单主题
  theme: ThemeEnum;
  // 分割菜单
  split: boolean;
  // 顶部菜单布局
  topMenuAlign: 'start' | 'center' | 'end';
  // 折叠触发器的位置
  trigger: TriggerEnum;
  // 手风琴模式，只展示一个菜单
  accordion: boolean;
  // 在路由切换的时候关闭左侧混合菜单展开菜单
  closeMixSidebarOnChange: boolean;
  // 左侧混合菜单模块切换触发方式
  mixSideTrigger: MixSidebarTriggerEnum;
  // 是否固定左侧混合菜单
  mixSideFixed: boolean;
}

export interface MultiTabsSetting {
  // 刷新后是否保留已经打开的标签页
  cache: boolean;
  // 开启
  show: boolean;
  // 开启快速操作
  showQuick: boolean;
  // 是否可以拖拽
  canDrag: boolean;
  // 是否显示刷新那妞
  showRedo: boolean;
  // 是否显示折叠按钮
  showFold: boolean;
}

export interface HeaderSetting {
  // 背景色
  bgColor: string;
  // 固定头部
  fixed: boolean;
  // 是否显示顶部
  show: boolean;
  // 主题
  theme: ThemeEnum;
  // Turn on full screen
  // 开启锁屏功能
  showFullScreen: boolean;
  // Whether to show the lock screen
  // 显示全屏按钮
  useLockPage: boolean;
  // Show document button
  // 显示文档按钮
  showDoc: boolean;
  // Show message center button
  // 显示消息中心按钮
  showNotice: boolean;
  // 显示菜单搜索按钮
  showSearch: boolean;
}

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface TransitionSetting {
  // Whether to open the page switching animation
  // 是否开启切换动画
  enable: boolean;
  // Route basic switching animation
  // 动画名
  basicTransition: RouterTransitionEnum;
  // Whether to open page switching loading
  // 是否打开页面切换loading
  openPageLoading: boolean;
  // Whether to open the top progress bar
  // 是否打开页面切换顶部进度条
  openNProgress: boolean;
}

/** !!! 改动后需要清空浏览器缓存 */
export interface ProjectConfig {
  // Storage location of permission related information
  // 权限缓存存放位置。默认存放于localStorage
  permissionCacheType: CacheTypeEnum;
  // Whether to show the configuration button
  // 是否显示SettingButton
  showSettingButton: boolean;
  // Whether to show the theme switch button
  // 是否显示主题切换按钮
  showDarkModeToggle: boolean;
  // Configure where the button is displayed
  // 设置按钮位置 可选项
  settingButtonPosition: SettingButtonPositionEnum;
  // Permission mode
  // 权限模式,默认前端角色权限模式
  permissionMode: PermissionModeEnum;
  // Session timeout processing
  // 会话超时处理方案
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  // Website gray mode, open for possible mourning dates
  // 网站灰色模式，用于可能悼念的日期开启
  grayMode: boolean;
  // Whether to turn on the color weak mode
  // 色弱模式
  colorWeak: boolean;
  // Theme color
  // 项目主题色
  themeColor: string;
  // The main interface is displayed in full screen, the menu is not displayed, and the top
  // 是否取消菜单,顶部,多标签页显示, 用于可能内嵌在别的系统内
  fullContent: boolean;
  // content width
  // 主题内容宽度
  contentMode: ContentEnum;
  // Whether to display the logo
  // 是否显示logo
  showLogo: boolean;
  // Whether to show the global footer
  // 是否显示底部信息 copyright
  showFooter: boolean;
  // 头部配置
  headerSetting: HeaderSetting;
  // menuSetting
  // 菜单配置
  menuSetting: MenuSetting;
  // Multi-tab settings
  // 多标签
  multiTabsSetting: MultiTabsSetting;
  // Animation configuration
  // 动画配置
  transitionSetting: TransitionSetting;
  // pageLayout whether to enable keep-alive
  // 是否开启KeepAlive缓存  开发时候最好关闭,不然每次都需要清除缓存
  openKeepAlive: boolean;
  // Lock screen time
  // 自动锁屏时间，为0不锁屏。 单位分钟 默认1个小时
  lockTime: number;
  // Show breadcrumbs
  // 显示面包屑
  showBreadCrumb: boolean;
  // Show breadcrumb icon
  // 显示面包屑图标
  showBreadCrumbIcon: boolean;
  // Use error-handler-plugin
  // 是否使用全局错误捕获
  useErrorHandle: boolean;
  // Whether to open back to top
  // 是否开启回到顶部
  useOpenBackTop: boolean;
  // Is it possible to embed iframe pages
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: boolean;
  // Whether to delete unclosed messages and notify when switching the interface
  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: boolean;
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  // 如果开启,想对单独接口覆盖。可以在单独接口设置
  removeAllHttpPending: boolean;
}

export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
}
export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}
