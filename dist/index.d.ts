import { FormSchema } from '@zdy-oa/form';
import { JSX } from 'react';
import { ReactNode } from 'react';

/**
 * 设计器独立 SPA 布局：全屏占满视口，不含 OA 主应用的侧边栏与顶部栏。
 */
export declare function DesignerLayout({ children, scroll }: DesignerLayoutProps): JSX.Element;

export declare interface DesignerLayoutProps {
    children: ReactNode;
    /** 内容区是否可纵向滚动（列表页需要，编辑器页不需要） */
    scroll?: boolean;
}

export declare function FormDesigner({ schema: initialSchema, onChange }: FormDesignerProps): JSX.Element;

export declare function FormDesignerPage(): JSX.Element;

export declare interface FormDesignerProps {
    schema: FormSchema;
    onChange?: (schema: FormSchema) => void;
}

export declare function FormListPage(): JSX.Element;

export { }
