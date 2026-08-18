import type { ReactNode } from 'react'
import { Button } from 'antd'
import {
  AlignLeftOutlined,
  FileTextOutlined,
  NumberOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  UploadOutlined,
  FontSizeOutlined,
  MinusOutlined,
  PictureOutlined,
  BlockOutlined,
} from '@ant-design/icons'
import type { FieldType } from '../types'
import { FIELD_TYPES } from '../fieldMeta'

const ICONS: Partial<Record<FieldType, ReactNode>> = {
  text:        <AlignLeftOutlined />,
  textarea:    <FileTextOutlined />,
  number:      <NumberOutlined />,
  date:        <CalendarOutlined />,
  'date-range':<BlockOutlined />,
  select:      <UnorderedListOutlined />,
  radio:       <CheckCircleOutlined />,
  checkbox:    <CheckSquareOutlined />,
  'user-picker':<UserOutlined />,
  upload:      <UploadOutlined />,
  heading:     <FontSizeOutlined />,
  paragraph:   <AlignLeftOutlined />,
  divider:     <MinusOutlined />,
  image:       <PictureOutlined />,
}

export interface FieldPaletteProps {
  onAdd: (type: FieldType) => void
}

/** 拖拽时写入 dataTransfer 的自定义 MIME 类型，携带字段类型 */
export const FIELD_DRAG_MIME = 'application/x-oa-field-type'

export function FieldPalette({ onAdd }: FieldPaletteProps) {
  const inputs = FIELD_TYPES.filter((f) => f.category === 'input')
  const displays = FIELD_TYPES.filter((f) => f.category === 'display')
  return (
    <div className="oa-designer__palette">
      <div className="oa-designer__panel-title">字段库</div>

      <div className="oa-designer__palette-section">
        <div className="oa-designer__palette-section-title">输入采集</div>
        <div className="oa-designer__palette-grid">
          {inputs.map((f) => (
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
      </div>

      <div className="oa-designer__palette-section">
        <div className="oa-designer__palette-section-title">信息展示</div>
        <div className="oa-designer__palette-grid">
          {displays.map((f) => (
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
      </div>

      <p className="oa-designer__palette-tip">点击或拖拽到中间画布添加字段</p>
    </div>
  )
}
