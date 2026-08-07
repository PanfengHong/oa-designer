import { useNavigate, useParams } from 'react-router-dom'
import { Button, Result } from 'antd'
import { FormDesigner } from '../components/FormDesigner'
import { DesignerLayout } from '../DesignerLayout'
import { getForm, upsertForm } from '../storage'

export function FormDesignerPage() {
  const { formId } = useParams()
  const navigate = useNavigate()
  const stored = formId ? getForm(formId) : undefined

  if (!stored) {
    return (
      <DesignerLayout scroll>
        <Result
          status="404"
          title="未找到表单"
          subTitle="该表单可能已被删除或不存在"
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
    <DesignerLayout>
      <FormDesigner key={stored.id} schema={stored} onChange={(s) => upsertForm(s)} />
    </DesignerLayout>
  )
}
