import type { FieldType, WidgetDefinition } from './types';
/**
 * 字段库列表：从 oa-form 的 widget registry 获取
 * designer 不再自己维护字段类型清单，而是从 form 的 registry 读取
 */
export declare function listWidgets(): WidgetDefinition[];
/** 按类型获取 widget 定义 */
export declare function findWidget(type: FieldType): WidgetDefinition | undefined;
/** 给定字段类型，返回默认 label 文本 */
export declare function defaultLabelFor(type: FieldType): string;
/** 判断字段类型是否为输入采集类 */
export declare function isInputField(type: FieldType): boolean;
/** 生成字段 id：f_{时间戳}_{随机串} */
export declare function genFieldId(): string;
