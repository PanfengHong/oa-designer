import type { FieldType } from './types'

export interface FieldMeta {
  type: FieldType
  label: string
  /** display / input */
  category: 'input' | 'display'
}

/** 字段库可选类型（输入采集 + 信息展示） */
export const FIELD_TYPES: FieldMeta[] = [
  // 输入类
  { type: 'text',        label: '单行文本', category: 'input' },
  { type: 'textarea',    label: '多行文本', category: 'input' },
  { type: 'number',      label: '数字',     category: 'input' },
  { type: 'date',        label: '日期',     category: 'input' },
  { type: 'date-range',  label: '日期范围', category: 'input' },
  { type: 'select',      label: '下拉选择', category: 'input' },
  { type: 'radio',       label: '单选按钮', category: 'input' },
  { type: 'checkbox',    label: '多选复选', category: 'input' },
  { type: 'user-picker', label: '人员选择', category: 'input' },
  { type: 'upload',      label: '文件上传', category: 'input' },
  // 展示类
  { type: 'heading',     label: '标题',     category: 'display' },
  { type: 'paragraph',   label: '段落',     category: 'display' },
  { type: 'divider',     label: '分隔线',   category: 'display' },
  { type: 'image',       label: '图片',     category: 'display' },
]

export const FIELD_TYPE_LABEL: Record<FieldType, string> = FIELD_TYPES.reduce(
  (acc, f) => {
    acc[f.type] = f.label
    return acc
  },
  {} as Record<FieldType, string>,
)

/** 给定字段类型，返回默认 label 文本 */
export function defaultLabelFor(type: FieldType): string {
  return FIELD_TYPE_LABEL[type] ?? ''
}

/** 生成字段 id：f_{时间戳}_{随机串} */
export function genFieldId(): string {
  return `f_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

/** 判断字段类型是否为输入采集类（可能有用户交互/表单值） */
export function isInputField(type: FieldType): boolean {
  return FIELD_TYPES.find((f) => f.type === type)?.category === 'input'
}
