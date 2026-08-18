import { getAllWidgets } from '@zdy-oa/form'
import type { FieldType, WidgetDefinition } from './types'

/**
 * 字段库列表：从 oa-form 的 widget registry 获取
 * designer 不再自己维护字段类型清单，而是从 form 的 registry 读取
 */
export function listWidgets(): WidgetDefinition[] {
  return getAllWidgets()
}

/** 按类型获取 widget 定义 */
export function findWidget(type: FieldType): WidgetDefinition | undefined {
  return getAllWidgets().find((w) => w.type === type)
}

/** 给定字段类型，返回默认 label 文本 */
export function defaultLabelFor(type: FieldType): string {
  return findWidget(type)?.label ?? type
}

/** 判断字段类型是否为输入采集类 */
export function isInputField(type: FieldType): boolean {
  return findWidget(type)?.category === 'input'
}

/** 生成字段 id：f_{时间戳}_{随机串} */
export function genFieldId(): string {
  return `f_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}
