import type { FormFieldType } from '@my-oa/form'

export interface FieldMeta {
  type: FormFieldType
  label: string
}

/** 字段库可选类型 */
export const FIELD_TYPES: FieldMeta[] = [
  { type: 'text', label: '单行文本' },
  { type: 'textarea', label: '多行文本' },
  { type: 'number', label: '数字' },
  { type: 'date', label: '日期' },
  { type: 'select', label: '下拉选择' },
  { type: 'user-picker', label: '人员选择' },
]

export const FIELD_TYPE_LABEL: Record<FormFieldType, string> = {
  text: '单行文本',
  textarea: '多行文本',
  number: '数字',
  date: '日期',
  select: '下拉选择',
  'user-picker': '人员选择',
}

export function defaultLabelFor(type: FormFieldType): string {
  return FIELD_TYPE_LABEL[type]
}

export function genFieldId(): string {
  return `f_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}
