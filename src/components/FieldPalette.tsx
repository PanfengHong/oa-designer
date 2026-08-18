import { Button } from 'antd'
import type { FieldType } from '../types'
import { listWidgets } from '../fieldMeta'
import type { WidgetDefinition } from '../types'

export interface FieldPaletteProps {
  onAdd: (type: FieldType) => void
}

/** 拖拽时写入 dataTransfer 的自定义 MIME 类型，携带字段类型 */
export const FIELD_DRAG_MIME = 'application/x-oa-field-type'

export function FieldPalette({ onAdd }: FieldPaletteProps) {
  const widgets = listWidgets()
  const inputs = widgets.filter((w) => w.category === 'input')
  const displays = widgets.filter((w) => w.category === 'display')

  const renderPaletteItem = (w: WidgetDefinition) => (
    <Button
      key={w.type}
      className="oa-designer__palette-item"
      icon={w.icon}
      onClick={() => onAdd(w.type)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(FIELD_DRAG_MIME, w.type)
        e.dataTransfer.setData('text/plain', w.type)
        e.dataTransfer.effectAllowed = 'copy'
      }}
    >
      {w.label}
    </Button>
  )

  return (
    <div className="oa-designer__palette">
      <div className="oa-designer__panel-title">字段库</div>

      {inputs.length > 0 ? (
        <div className="oa-designer__palette-section">
          <div className="oa-designer__palette-section-title">输入采集</div>
          <div className="oa-designer__palette-grid">
            {inputs.map(renderPaletteItem)}
          </div>
        </div>
      ) : null}

      {displays.length > 0 ? (
        <div className="oa-designer__palette-section">
          <div className="oa-designer__palette-section-title">信息展示</div>
          <div className="oa-designer__palette-grid">
            {displays.map(renderPaletteItem)}
          </div>
        </div>
      ) : null}

      <p className="oa-designer__palette-tip">点击或拖拽到中间画布添加字段</p>
    </div>
  )
}
