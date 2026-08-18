/**
 * 页面设计器维护的核心类型契约
 *
 * - LayoutSchema / FieldSchema / FieldType / LayoutType 由 designer 定义和维护
 *   └ 不再限定于"表单"——designer 可搭建任意页面类型的布局（数据采集页 / 审批详情页 / 信息展示页等）
 * - oa-form 通过 `import type` 引用（编译后擦除，运行时 form 不依赖 designer）
 * - designer 仍依赖 form 的运行时组件 FormRenderer（用于数据采集类布局的预览），单向依赖
 */

// ---------------------------------------------------------------------------
// 布局模式：描述页面整体的排版方式
// ---------------------------------------------------------------------------
export type LayoutType =
  | 'flow'      // 流式布局：从上到下依次排列（最常用，取代之前的 standard）
  | 'grid'      // 栅格布局：多列栅格（2/3/4 列）
  | 'table'     // 表格式布局：行列结构
  | 'free'      // 自由布局：可绝对定位 / 拖拽定位

// ---------------------------------------------------------------------------
// 字段类型：设计器可添加的各种"组件"
//   - 输入采集类：text / textarea / number / date / date-range / select / user-picker / radio / checkbox / upload
//   - 信息展示类：heading / paragraph / divider / image
// ---------------------------------------------------------------------------
export type FieldType =
  | 'text'         // 单行文本输入
  | 'textarea'     // 多行文本输入
  | 'number'       // 数字输入
  | 'date'         // 日期选择
  | 'date-range'   // 日期范围
  | 'select'       // 下拉选择
  | 'user-picker'  // 人员选择
  | 'radio'        // 单选按钮
  | 'checkbox'     // 多选复选框
  | 'upload'       // 文件上传
  | 'heading'      // 标题（展示）
  | 'paragraph'    // 段落（展示）
  | 'divider'      // 分隔线（展示）
  | 'image'        // 图片（展示）

// ---------------------------------------------------------------------------
// 通用选项（select/radio/checkbox 共用）
// ---------------------------------------------------------------------------
export interface FieldOption {
  label: string
  value: string
}

// ---------------------------------------------------------------------------
// 字段 Schema：设计器中每个组件的抽象描述
//   - 所有字段共享：id / type / label
//   - 输入类字段可选：required / placeholder / options / defaultValue
//   - 展示类字段可选：content（段落文本/标题文本/图片地址 等）
// ---------------------------------------------------------------------------
export interface FieldSchema {
  id: string
  type: FieldType
  label: string
  // 输入类字段
  required?: boolean
  placeholder?: string
  options?: FieldOption[]
  defaultValue?: string | number | string[] | number[]
  // 展示类字段
  content?: string    // heading: 标题文本 / paragraph: 段落文本 / image: 图片 URL
  // 栅格 / 布局相关
  colSpan?: number    // grid 模式下跨列数
  width?: number      // free 模式下宽度 (px)
  height?: number     // free 模式下高度 (px)
}

// ---------------------------------------------------------------------------
// 布局 Schema（designer 的核心产物）
//   - id:     布局 ID
//   - name:   布局名（可作为页面标题）
//   - type:   布局模式（flow/grid/table/free）
//   - fields: 字段列表
//   - columns: grid 模式下的列数
// ---------------------------------------------------------------------------
export interface LayoutSchema {
  id: string
  name: string
  type: LayoutType
  fields: FieldSchema[]
  columns?: number     // grid 模式下的列数，默认 2
}
