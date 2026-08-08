import type { ReactNode } from 'react'
import { Button } from 'antd'
import {
  AlignLeftOutlined,
  FileTextOutlined,
  NumberOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { FormFieldType } from '@zdy-oa/form'
import { FIELD_TYPES } from '../fieldMeta'

const ICONS: Record<FormFieldType, ReactNode> = {
  text: <AlignLeftOutlined />,
  textarea: <FileTextOutlined />,
  number: <NumberOutlined />,
  date: <CalendarOutlined />,
  select: <UnorderedListOutlined />,
  'user-picker': <UserOutlined />,
}

export interface FieldPaletteProps {
  onAdd: (type: FormFieldType) => void
}

/** 拖拽时写入 dataTransfer 的自定义 MIME 类型，携带字段类型 */
export const FIELD_DRAG_MIME = 'application/x-oa-field-type'

export function FieldPalette({ onAdd }: FieldPaletteProps) {
  return (
    <div className="oa-designer__palette">
      <div className="oa-designer__panel-title">字段库</div>
      <div className="oa-designer__palette-grid">
        {FIELD_TYPES.map((f) => (
          <Button
            key={f.type}
            className="oa-designer__palette-item"
            icon={ICONS[f.type]}
            onClick={() => onAdd(f.type)}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData(FIELD_DRAG_MIME, f.type)
              e.dataTransfer.setData('text/plain', f.type)
              e.dataTransfer.effectAllowed = 'copy'
            }}
            block
          >
            {f.label}
          </Button>
        ))}
      </div>
      <p className="oa-designer__palette-tip">点击或拖拽到中间画布添加字段</p>
    </div>
  )
}
