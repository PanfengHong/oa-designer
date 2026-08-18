import { useState } from 'react'
import { Button } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined } from '@ant-design/icons'
import type { FieldType, LayoutSchema } from '../types'
import { FIELD_TYPE_LABEL } from '../fieldMeta'
import { FIELD_DRAG_MIME } from './FieldPalette'

export interface DesignCanvasProps {
  schema: LayoutSchema
  selectedId: string | null
  onSelect: (id: string) => void
  onMove: (id: string, dir: 'up' | 'down') => void
  onRemove: (id: string) => void
  onNameChange: (name: string) => void
  /** 拖拽或点击添加字段，index 为插入位置（省略则追加到末尾） */
  onAdd: (type: FieldType, index?: number) => void
}

export function DesignCanvas({
  schema,
  selectedId,
  onSelect,
  onMove,
  onRemove,
  onNameChange,
  onAdd,
}: DesignCanvasProps) {
  // 拖拽过程中预览的插入位置：null 表示未在画布内拖拽；数字表示将插入到该索引之前
  const [dropIndex, setDropIndex] = useState<number | null>(null)

  const readFieldType = (e: React.DragEvent): FieldType | null => {
    const type = e.dataTransfer.getData(FIELD_DRAG_MIME) || e.dataTransfer.getData('text/plain')
    return (type as FieldType) || null
  }

  const isFieldDrag = (e: React.DragEvent): boolean => {
    const types = e.dataTransfer.types
    return types.includes(FIELD_DRAG_MIME) || types.includes('text/plain')
  }

  const handleDrop = (e: React.DragEvent, index?: number) => {
    e.preventDefault()
    e.stopPropagation()
    const type = readFieldType(e)
    if (type) {
      onAdd(type, index)
    }
    setDropIndex(null)
  }

  /** 根据指针在某个字段行内的相对位置，决定插入到该字段之前还是之后 */
  const computeDropIndex = (e: React.DragEvent, idx: number): number => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const isTopHalf = e.clientY - rect.top < rect.height / 2
    return isTopHalf ? idx : idx + 1
  }

  return (
    <div className="oa-designer__canvas">
      <div className='oa-designer__canvas-wrapper'>
        <div className="oa-designer__canvas-head">
          <input
            className="oa-designer__title-input"
            value={schema.name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="布局名称（可作为页面标题）"
          />
          <span className="oa-designer__field-count">{schema.fields.length} 个字段 · {schema.type}</span>
        </div>
        <div
          className={`oa-designer__canvas-body${dropIndex !== null ? ' is-drag-over' : ''}${schema.fields.length === 0 ? ' is-empty' : ''
            }`}
          onDragOver={(e) => {
            if (!isFieldDrag(e)) return
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
            // 拖到空白区域：追加到末尾
            if (dropIndex !== schema.fields.length) setDropIndex(schema.fields.length)
          }}
          onDragLeave={(e) => {
            // 离开画布主体时清除指示（仅当真正离开，而非进入子元素）
            const related = e.relatedTarget as Node | null
            if (!e.currentTarget.contains(related)) {
              setDropIndex(null)
            }
          }}
          onDrop={(e) => handleDrop(e, undefined)}
        >
          {schema.fields.length === 0 ? (
            <div className="oa-designer__empty">
              {dropIndex !== null ? '松开以添加该字段' : '从左侧字段库拖拽或点击添加字段'}
            </div>
          ) : (
            schema.fields.map((field, idx) => (
              <div key={field.id}>
                {dropIndex === idx && <div className="oa-designer__drop-indicator" />}
                <div
                  className={`oa-designer__field-row${selectedId === field.id ? ' is-selected' : ''
                    }${dropIndex === idx || dropIndex === idx + 1 ? ' is-drop-target' : ''}`}
                  onClick={() => onSelect(field.id)}
                  onDragOver={(e) => {
                    if (!isFieldDrag(e)) return
                    e.preventDefault()
                    e.stopPropagation()
                    e.dataTransfer.dropEffect = 'copy'
                    const next = computeDropIndex(e, idx)
                    if (next !== dropIndex) setDropIndex(next)
                  }}
                  onDrop={(e) => handleDrop(e, computeDropIndex(e, idx))}
                >
                  <div className="oa-designer__field-info">
                    <span className="oa-designer__field-label">
                      {field.label || '(未命名)'}
                      <small style={{ marginLeft: 6, color: '#999' }}>[{FIELD_TYPE_LABEL[field.type] ?? field.type}]</small>
                    </span>
                    {field.required ? <span className="oa-designer__field-required">必填</span> : null}
                  </div>
                  <div className="oa-designer__field-actions" onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="small"
                      disabled={idx === 0}
                      onClick={() => onMove(field.id, 'up')}
                      icon={<ArrowUpOutlined />}
                    />
                    <Button
                      size="small"
                      disabled={idx === schema.fields.length - 1}
                      onClick={() => onMove(field.id, 'down')}
                      icon={<ArrowDownOutlined />}
                    />
                    <Button
                      size="small"
                      danger
                      onClick={() => onRemove(field.id)}
                      icon={<DeleteOutlined />}
                    />
                  </div>
                </div>
                {idx === schema.fields.length - 1 && dropIndex === idx + 1 && (
                  <div className="oa-designer__drop-indicator" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
