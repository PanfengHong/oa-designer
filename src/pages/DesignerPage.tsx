import { useNavigate, useParams } from 'react-router-dom'
import { Button, Result, Spin } from 'antd'
import { Designer } from '../components/Designer'
import { DesignerLayout } from '../DesignerLayout'
import { upsertLayout } from '../storage'
import { useEffect, useState } from 'react'
import { getFormDetail, updateForm } from '../api'
import type { LayoutSchema } from '../types/index'
import { message } from 'antd'



export function DesignerPage() {
  const { formId } = useParams()
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(true);
  const [schema, setSchema] = useState<LayoutSchema>()
   const navigate = useNavigate()

   const handleSave = (schema: LayoutSchema) => {
    updateForm(formId || '', { layout: schema }).then((res) => {
      console.log(res);
      if (res.code === 200) {
        messageApi.open({
          content: '保存成功',
          type: 'success',
        })
      }
    })
   }

  useEffect(() => {
    console.log('formId', formId)
    if (!formId) {
      setLoading(false)
      return
    }
    getFormDetail(formId).then((res) => {
      console.log(res)
      if (res.code === 200) {
        // 后端返回的 FormSchema.layout 就是 LayoutSchema
        setSchema(res.data?.layout as LayoutSchema)
      }
      setLoading(false)
    }).catch((err) => {
      console.error('getFormDetail error:', err?.code, err?.message)
      setLoading(false)
    })
  }, [formId])

  if (loading) {
    return (
      <Spin fullscreen size="large" />
    )
  }

  if (!schema) {
    return (
      <DesignerLayout scroll>
        <Result
          status="404"
          title="未找到布局"
          subTitle="该表单布局可能已被删除或不存在"
          extra={
            <Button type="primary" onClick={() => navigate('/designer')}>
              返回表单管理
            </Button>
          }
        />
      </DesignerLayout>
    )
  }

  return (
    <>
      {contextHolder}
      <DesignerLayout>
      <Designer formId={formId} schema={schema} onChange={(s) => upsertLayout(s)} onSave={handleSave} />
    </DesignerLayout>
    </>
  )
}
