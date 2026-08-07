import type { FormSchema } from '@my-oa/form'
import { sampleLeaveFormSchema } from '@my-oa/form'

/**
 * 表单设计器的本地持久化层。
 * 设计产物以 FormSchema 形式存入 localStorage，附带 updatedAt 更新时间。
 * 真实工程中可替换为后端接口。
 */

const STORAGE_KEY = 'oa-designer:forms'
const SEED_FLAG = 'oa-designer:seeded'

export interface StoredForm extends FormSchema {
  updatedAt: string
}

function now(): string {
  return new Date().toLocaleString('zh-CN', { hour12: false })
}

function read(): StoredForm[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as StoredForm[]) : []
  } catch {
    return []
  }
}

function write(forms: StoredForm[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms))
}

/** 读取全部表单，首次访问时种入一个示例表单 */
export function loadForms(): StoredForm[] {
  const forms = read()
  const seeded = localStorage.getItem(SEED_FLAG)
  if (forms.length === 0 && !seeded) {
    const seed: StoredForm[] = [{ ...sampleLeaveFormSchema, updatedAt: now() }]
    write(seed)
    localStorage.setItem(SEED_FLAG, '1')
    return seed
  }
  return forms
}

export function getForm(id: string): StoredForm | undefined {
  return read().find((f) => f.id === id)
}

/** 新增或更新表单，刷新 updatedAt */
export function upsertForm(schema: FormSchema): StoredForm {
  const forms = read()
  const idx = forms.findIndex((f) => f.id === schema.id)
  const stored: StoredForm = { ...schema, updatedAt: now() }
  if (idx >= 0) {
    forms[idx] = stored
  } else {
    forms.push(stored)
  }
  write(forms)
  return stored
}

export function removeForm(id: string): void {
  write(read().filter((f) => f.id !== id))
}

/** 创建一张空白表单并入库，返回可立即编辑的表单 */
export function createForm(): StoredForm {
  return upsertForm({
    id: `form-${Date.now()}`,
    title: '未命名表单',
    fields: [],
  })
}
