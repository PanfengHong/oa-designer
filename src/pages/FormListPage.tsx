import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { App as AntApp, Button, Popconfirm, Space, Table, Upload } from 'antd'
import type { TableColumnsType } from 'antd'
import {
  PlusOutlined,
  UploadOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import type { FormSchema } from '@zdy-oa/form'
import { createForm, loadForms, removeForm, upsertForm, type StoredForm } from '../storage'

function downloadFormJson(form: FormSchema): void {
  const blob = new Blob([JSON.stringify(form, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${form.id || 'form'}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function FormListInner() {
  const navigate = useNavigate()
  const { message } = AntApp.useApp()
  const [forms, setForms] = useState<StoredForm[]>(() => loadForms())

  const refresh = () => setForms(loadForms())

  const handleCreate = () => {
    const created = createForm()
    navigate(`/designer/${created.id}`)
  }

  const handleDelete = (id: string) => {
    removeForm(id)
    refresh()
    message.success('已删除')
  }

  const handleImport = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as FormSchema
        if (!parsed.id || !Array.isArray(parsed.fields) || typeof parsed.title !== 'string') {
          throw new Error('invalid schema')
        }
        upsertForm(parsed)
        refresh()
        message.success('导入成功')
      } catch {
        message.error('JSON 格式不正确')
      }
    }
    reader.readAsText(file)
  }

  const columns: TableColumnsType<StoredForm> = [
    { title: '标题', dataIndex: 'title', render: (v: string) => v || '(未命名)' },
    { title: '字段数', width: 90, render: (_, r) => r.fields.length },
    { title: '更新时间', dataIndex: 'updatedAt', width: 200 },
    {
      title: '操作',
      width: 230,
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/designer/${r.id}`)}
          >
            编辑
          </Button>
          <Button size="small" type="link" icon={<DownloadOutlined />} onClick={() => downloadFormJson(r)}>
            导出
          </Button>
          <Popconfirm title="确认删除该表单？" onConfirm={() => handleDelete(r.id)}>
            <Button size="small" type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="oa-module-page">
      <h2>表单管理</h2>
      <p className="oa-module-page__desc">低代码设计流程表单 · oa-designer</p>
      <div className="oa-designer__list-toolbar">
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            新建表单
          </Button>
          <Upload
            accept=".json,application/json"
            showUploadList={false}
            beforeUpload={(file) => {
              handleImport(file)
              return false
            }}
          >
            <Button icon={<UploadOutlined />}>导入 JSON</Button>
          </Upload>
        </Space>
      </div>
      <Table
        rowKey="id"
        dataSource={forms}
        columns={columns}
        pagination={false}
        locale={{ emptyText: '暂无表单，点击「新建表单」开始设计' }}
      />
    </div>
  )
}

export function FormListPage() {
  return (
    <AntApp>
      <FormListInner />
    </AntApp>
  )
}
