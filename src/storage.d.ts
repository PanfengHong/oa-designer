import type { LayoutSchema } from './types';
export interface StoredLayout extends LayoutSchema {
    updatedAt: string;
}
/** 读取全部布局，首次访问时种入一个示例 */
export declare function loadLayouts(): StoredLayout[];
export declare function getLayout(id: string): StoredLayout | undefined;
/** 新增或更新布局，刷新 updatedAt */
export declare function upsertLayout(schema: LayoutSchema): StoredLayout;
export declare function removeLayout(id: string): void;
/** 创建一个空白布局并入库，返回可立即编辑的布局 */
export declare function createLayout(): StoredLayout;
