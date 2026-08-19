import { useState } from 'react'
import { Button, Space } from 'antd'
import { EyeOutlined, EditOutlined, DownloadOutlined, SaveOutlined } from '@ant-design/icons'
import { FormRenderer } from '@zdy-oa/form'
import { FieldPalette } from './FieldPalette'
import { DesignCanvas } from './DesignCanvas'
import { PropertyPanel } from './PropertyPanel'
import { defaultLabelFor, genFieldId } from '../fieldMeta'
import type { FieldSchema, FieldType, LayoutSchema } from '../types/index'

export interface DesignerProps {
  formId: string
  schema: LayoutSchema
  onChange?: (schema: LayoutSchema) => void
  onSave?: (schema: LayoutSchema) => void
}

export function Designer({ formId, schema: initialSchema, onChange, onSave }: DesignerProps) {
  const [schema, setSchema] = useState<LayoutSchema>(initialSchema)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [preview, setPreview] = useState(false)

  const update = (next: LayoutSchema) => {
    setSchema(next)
    onChange?.(next)
  }

  const addField = (type: FieldType, index?: number) => {
    const field: FieldSchema = {
      id: genFieldId(),
      type,
      label: defaultLabelFor(type),
      required: false,
      ...(type === 'select' || type === 'radio' || type === 'checkbox'
        ? { options: [{ label: '', value: '' }] }
        : {}),
      ...(type === 'heading' ? { content: defaultLabelFor(type) } : {}),
      ...(type === 'paragraph' ? { content: '' } : {}),
    }
    const fields = [...schema.fields]
    if (index === undefined || index >= fields.length) {
      fields.push(field)
    } else if (index <= 0) {
      fields.unshift(field)
    } else {
      fields.splice(index, 0, field)
    }
    update({ ...schema, fields })
    setSelectedId(field.id)
  }

  const updateField = (id: string, patch: Partial<FieldSchema>) => {
    update({
      ...schema,
      fields: schema.fields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    })
  }

  const removeField = (id: string) => {
    update({ ...schema, fields: schema.fields.filter((f) => f.id !== id) })
    if (selectedId === id) setSelectedId(null)
  }

  const moveField = (id: string, dir: 'up' | 'down') => {
    const idx = schema.fields.findIndex((f) => f.id === id)
    if (idx < 0) return
    const target = dir === 'up' ? idx - 1 : idx + 1
    if (target < 0 || target >= schema.fields.length) return
    const fields = [...schema.fields]
    const tmp = fields[idx]
    fields[idx] = fields[target]
    fields[target] = tmp
    update({ ...schema, fields })
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${schema.id || 'layout'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSave = () => {
    onSave?.(schema);
  }

  const selected = schema.fields.find((f) => f.id === selectedId) ?? null

  return (
    <div className="oa-designer">
      <div className="oa-designer__header">
        <span className="oa-designer__logo">页面设计器</span>
        <Space>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>
            导出 JSON
          </Button>
          <Button
            icon={preview ? <EditOutlined /> : <EyeOutlined />}
            onClick={() => setPreview((p) => !p)}
          >
            {preview ? '返回编辑' : '预览'}
          </Button>
          <Button icon={<SaveOutlined />} type='primary' onClick={handleSave}>
            保存
          </Button>
        </Space>
      </div>
      <div className="oa-designer__main">
        {preview ? (
          <div className="oa-designer__preview">
            <FormRenderer
              schema={{
                id: formId,
                name: schema.name,
                layout: schema,
                createdAt: Date.now().toString(),
                updatedAt: Date.now().toString(),
              }}
            />
          </div>
        ) : (
          <>
            <FieldPalette onAdd={addField} />
            <DesignCanvas
              schema={schema}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onMove={moveField}
              onRemove={removeField}
              onAdd={addField}
              onNameChange={(name) => update({ ...schema, name })}
            />
            <PropertyPanel
              field={selected}
              onChange={(patch) => selectedId && updateField(selectedId, patch)}
            />
          </>
        )}
      </div>
    </div>
  )
}
