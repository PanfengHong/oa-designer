import { Button, Input, Select, Switch } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import type { FormFieldSchema, FormFieldType } from '@zdy-oa/form'
import { FIELD_TYPES } from '../fieldMeta'

export interface PropertyPanelProps {
  field: FormFieldSchema | null
  onChange: (patch: Partial<FormFieldSchema>) => void
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
            <label>标签</label>
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
              onChange={(v: FormFieldType) => onChange({ type: v })}
              options={FIELD_TYPES.map((f) => ({ value: f.type, label: f.label }))}
              style={{ width: '100%' }}
            />
          </div>
          <div className="oa-designer__prop oa-designer__prop--inline">
            <label>必填</label>
            <Switch checked={!!field.required} onChange={(v) => onChange({ required: v })} />
          </div>
          {field.type !== 'user-picker' ? (
            <div className="oa-designer__prop">
              <label>占位提示</label>
              <Input
                value={field.placeholder ?? ''}
                onChange={(e) => onChange({ placeholder: e.target.value })}
                placeholder="placeholder"
              />
            </div>
          ) : null}
          {field.type === 'select' ? (
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
        </>
      )}
    </div>
  )
}
