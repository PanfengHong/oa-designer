import { Button, Input, InputNumber, Select, Switch } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import type { FieldSchema, FieldType } from '../types'
import { FIELD_TYPES, isInputField } from '../fieldMeta'

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
          <div className="oa-designer__prop">
            <label>标签/标题</label>
            <Input
              value={field.label}
              onChange={(e) => onChange({ label: e.target.value })}
              placeholder="字段标签"
            />
          </div>
          <div className="oa-designer__prop">
            <label>字段标识</label>
            <Input value={field.id} disabled />
          </div>
          <div className="oa-designer__prop">
            <label>类型</label>
            <Select
              value={field.type}
              onChange={(v: FieldType) => onChange({ type: v })}
              options={FIELD_TYPES.map((f) => ({ value: f.type, label: f.label }))}
              style={{ width: '100%' }}
            />
          </div>

          {/* ========== 输入类字段通用属性 ========== */}
          {isInputField(field.type) ? (
            <>
              <div className="oa-designer__prop oa-designer__prop--inline">
                <label>必填</label>
                <Switch checked={!!field.required} onChange={(v) => onChange({ required: v })} />
              </div>
              <div className="oa-designer__prop">
                <label>占位提示</label>
                <Input
                  value={field.placeholder ?? ''}
                  onChange={(e) => onChange({ placeholder: e.target.value })}
                  placeholder="placeholder"
                />
              </div>
            </>
          ) : null}

          {/* ========== 选择类字段：选项 ========== */}
          {field.type === 'select' || field.type === 'radio' || field.type === 'checkbox' ? (
            <div className="oa-designer__prop">
              <label>
                选项
                <Button
                  size="small"
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    onChange({
                      options: [...(field.options ?? []), { label: '', value: '' }],
                    })
                  }
                >
                  添加
                </Button>
              </label>
              <div className="oa-designer__options">
                {(field.options ?? []).map((opt, i) => (
                  <div key={i} className="oa-designer__option-row">
                    <Input
                      placeholder="显示名"
                      value={opt.label}
                      onChange={(e) => {
                        const options = [...(field.options ?? [])]
                        options[i] = { ...options[i], label: e.target.value }
                        onChange({ options })
                      }}
                    />
                    <Input
                      placeholder="值"
                      value={opt.value}
                      onChange={(e) => {
                        const options = [...(field.options ?? [])]
                        options[i] = { ...options[i], value: e.target.value }
                        onChange({ options })
                      }}
                    />
                    <Button
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        const options = [...(field.options ?? [])]
                        options.splice(i, 1)
                        onChange({ options })
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* ========== 展示类字段：内容 ========== */}
          {field.type === 'heading' || field.type === 'paragraph' || field.type === 'image' ? (
            <div className="oa-designer__prop">
              <label>
                {field.type === 'heading' ? '标题文本' : field.type === 'paragraph' ? '段落文本' : '图片地址'}
              </label>
              {field.type === 'paragraph' ? (
                <Input.TextArea
                  value={field.content ?? ''}
                  onChange={(e) => onChange({ content: e.target.value })}
                  rows={4}
                  placeholder={field.type === 'paragraph' ? '段落内容...' : '图片 URL'}
                />
              ) : (
                <Input
                  value={field.content ?? ''}
                  onChange={(e) => onChange({ content: e.target.value })}
                  placeholder={field.type === 'heading' ? '标题文本' : 'https://...'}
                />
              )}
            </div>
          ) : null}

          {/* ========== 栅格/自由布局属性 ========== */}
          <div className="oa-designer__prop oa-designer__prop--inline">
            <label>跨列数 (grid)</label>
            <InputNumber
              min={1}
              max={12}
              value={field.colSpan}
              onChange={(v) => onChange({ colSpan: typeof v === 'number' ? v : undefined })}
              style={{ width: 120 }}
            />
          </div>
        </>
      )}
    </div>
  )
}
