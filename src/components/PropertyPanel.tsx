import { Input, InputNumber, Form } from 'antd'
import type { FieldSchema } from '../types'
import { findWidget } from '../fieldMeta'

export interface PropertyPanelProps {
  field: FieldSchema | null
  onChange: (patch: Partial<FieldSchema>) => void
}

export function PropertyPanel({ field, onChange }: PropertyPanelProps) {
  return (
    <div className="oa-designer__props">
      <div className="oa-designer__panel-title">属性配置</div>
      {!field ? (
        <div className="oa-designer__empty">选择一个字段以编辑属性</div>
      ) : (
        <>
          {/* 通用属性：所有字段都有 */}
          <Form layout="vertical" className="oa-designer__common-props">
            <Form.Item label="标签/标题">
              <Input
                value={field.label}
                onChange={(e) => onChange({ label: e.target.value })}
                placeholder="字段标签"
              />
            </Form.Item>
            <Form.Item label="字段标识">
              <Input value={field.id} disabled />
            </Form.Item>
            <Form.Item label="跨列数 (grid)">
              <InputNumber
                min={1}
                max={12}
                value={field.colSpan}
                onChange={(v) => onChange({ colSpan: typeof v === 'number' ? v : undefined })}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>

          {/* 组件专属配置：由 widget 的 ConfigView 渲染 */}
          {(() => {
            const widget = findWidget(field.type)
            if (!widget) {
              return <div className="oa-designer__empty">不支持的字段类型：{field.type}</div>
            }
            const ConfigView = widget.ConfigView
            return <ConfigView field={field} onChange={onChange} />
          })()}
        </>
      )}
    </div>
  )
}
