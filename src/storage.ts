import type { LayoutSchema } from './types'

/**
 * 页面设计器的本地持久化层。
 * 设计产物以 LayoutSchema 形式存入 localStorage，附带 updatedAt 更新时间。
 * 真实工程中可替换为后端接口。
 *
 * 注意：designer 只维护 LayoutSchema（布局层），不关心 FormSchema 的 id/name/createdAt 等业务字段。
 * 这些业务字段由 oa-form 在保存时与 LayoutSchema 组装成完整 FormSchema。
 */

const STORAGE_KEY = 'oa-designer:layouts'
const SEED_FLAG = 'oa-designer:seeded-v2' // v2 换了结构，重新种一次种子

export interface StoredLayout extends LayoutSchema {
  updatedAt: string
}

function now(): string {
  return new Date().toLocaleString('zh-CN', { hour12: false })
}

function read(): StoredLayout[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as StoredLayout[]) : []
  } catch {
    return []
  }
}

function write(layouts: StoredLayout[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts))
}

/** 读取全部布局，首次访问时种入一个示例 */
export function loadLayouts(): StoredLayout[] {
  const layouts = read()
  const seeded = localStorage.getItem(SEED_FLAG)
  if (layouts.length === 0 && !seeded) {
    const seedLayout: StoredLayout = {
      id: 'layout-leave-request',
      name: '请假申请',
      type: 'flow',
      fields: [
        { id: 'h1',     type: 'heading',   label: '标题',  content: '请假申请' },
        { id: 'p1',     type: 'paragraph', label: '说明',  content: '请如实填写请假信息，提交后进入审批流程。' },
        { id: 'reason', type: 'textarea',  label: '请假事由', required: true },
        {
          id: 'type',
          type: 'select',
          label: '请假类型',
          required: true,
          options: [
            { label: '年假', value: 'annual' },
            { label: '事假', value: 'personal' },
            { label: '病假', value: 'sick' },
          ],
        },
        { id: 'start', type: 'date',   label: '开始日期', required: true },
        { id: 'end',   type: 'date',   label: '结束日期', required: true },
        { id: 'days',  type: 'number', label: '天数',     required: true },
      ],
      updatedAt: now(),
    }
    write([seedLayout])
    localStorage.setItem(SEED_FLAG, '1')
    return [seedLayout]
  }
  return layouts
}

export function getLayout(id: string): StoredLayout | undefined {
  return read().find((l) => l.id === id)
}

/** 新增或更新布局，刷新 updatedAt */
export function upsertLayout(schema: LayoutSchema): StoredLayout {
  const layouts = read()
  const idx = layouts.findIndex((l) => l.id === schema.id)
  const stored: StoredLayout = { ...schema, updatedAt: now() }
  if (idx >= 0) {
    layouts[idx] = stored
  } else {
    layouts.push(stored)
  }
  write(layouts)
  return stored
}

export function removeLayout(id: string): void {
  write(read().filter((l) => l.id !== id))
}

/** 创建一个空白布局并入库，返回可立即编辑的布局 */
export function createLayout(): StoredLayout {
  const id = `layout-${Date.now()}`
  return upsertLayout({
    id,
    name: '未命名布局',
    type: 'flow',
    fields: [],
    columns: 2,
  })
}
