/**
 * 类型契约现由 oa-utils 集中维护（打破 oa-form ↔ oa-designer 的循环依赖）。
 * oa-designer 通过 re-export 对外暴露，内部模块仍可从 './types' / '../types'
 * 引用，保持现有导入路径不变；对外 (@zdy-oa/designer) 的类型 API 也保持兼容。
 */
export type {
  LayoutType,
  FieldType,
  FieldOption,
  FieldSchema,
  LayoutSchema,
  WidgetRuntimeProps,
  WidgetDesignProps,
  WidgetConfigProps,
  WidgetDefinition,
} from '@zdy-oa/utils'
