import type { ReactNode } from 'react'
import './designer.css'

export interface DesignerLayoutProps {
  children: ReactNode
  /** 内容区是否可纵向滚动（列表页需要，编辑器页不需要） */
  scroll?: boolean
}

/**
 * 设计器独立 SPA 布局：全屏占满视口，不含 OA 主应用的侧边栏与顶部栏。
 */
export function DesignerLayout({ children, scroll = false }: DesignerLayoutProps) {
  return (
    <div
      className={
        scroll ? 'oa-designer-standalone oa-designer-standalone--scroll' : 'oa-designer-standalone'
      }
    >
      {children}
    </div>
  )
}
