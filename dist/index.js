import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import { useState as r } from "react";
import { useNavigate as i, useParams as a } from "react-router-dom";
import { App as o, Button as s, Input as c, Popconfirm as l, Select as u, Space as d, Switch as f, Table as p, Upload as m } from "antd";
import { AlignLeftOutlined as h, ArrowDownOutlined as g, ArrowUpOutlined as _, CalendarOutlined as v, DeleteOutlined as y, DownloadOutlined as b, EditOutlined as x, EyeOutlined as S, FileTextOutlined as C, NumberOutlined as w, PlusOutlined as T, UnorderedListOutlined as E, UploadOutlined as D, UserOutlined as O } from "@ant-design/icons";
import { FormRenderer as k, sampleLeaveFormSchema as A } from "@my-oa/form";
//#region src/DesignerLayout.tsx
function j({ children: e, scroll: n = !1 }) {
	return /* @__PURE__ */ t("div", {
		className: n ? "oa-designer-standalone oa-designer-standalone--scroll" : "oa-designer-standalone",
		children: e
	});
}
//#endregion
//#region src/storage.ts
var M = "oa-designer:forms", N = "oa-designer:seeded";
function P() {
	return (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", { hour12: !1 });
}
function F() {
	try {
		let e = localStorage.getItem(M);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}
function I(e) {
	localStorage.setItem(M, JSON.stringify(e));
}
function L() {
	let e = F(), t = localStorage.getItem(N);
	if (e.length === 0 && !t) {
		let e = [{
			...A,
			updatedAt: P()
		}];
		return I(e), localStorage.setItem(N, "1"), e;
	}
	return e;
}
function R(e) {
	return F().find((t) => t.id === e);
}
function z(e) {
	let t = F(), n = t.findIndex((t) => t.id === e.id), r = {
		...e,
		updatedAt: P()
	};
	return n >= 0 ? t[n] = r : t.push(r), I(t), r;
}
function B(e) {
	I(F().filter((t) => t.id !== e));
}
function V() {
	return z({
		id: `form-${Date.now()}`,
		title: "未命名表单",
		fields: []
	});
}
//#endregion
//#region src/pages/FormListPage.tsx
function H(e) {
	let t = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
	r.href = n, r.download = `${e.id || "form"}.json`, r.click(), URL.revokeObjectURL(n);
}
function U() {
	let e = i(), { message: a } = o.useApp(), [c, u] = r(() => L()), f = () => u(L()), h = () => {
		let t = V();
		e(`/designer/${t.id}`);
	}, g = (e) => {
		B(e), f(), a.success("已删除");
	}, _ = (e) => {
		let t = new FileReader();
		t.onload = () => {
			try {
				let e = JSON.parse(String(t.result));
				if (!e.id || !Array.isArray(e.fields) || typeof e.title != "string") throw Error("invalid schema");
				z(e), f(), a.success("导入成功");
			} catch {
				a.error("JSON 格式不正确");
			}
		}, t.readAsText(e);
	};
	return /* @__PURE__ */ t(j, {
		scroll: !0,
		children: /* @__PURE__ */ n("div", {
			className: "oa-module-page",
			children: [
				/* @__PURE__ */ t(s, {
					type: "link",
					onClick: () => e("/dashboard"),
					style: {
						padding: 0,
						width: "fit-content"
					},
					children: "← 返回主应用"
				}),
				/* @__PURE__ */ t("h2", { children: "表单设计" }),
				/* @__PURE__ */ t("p", {
					className: "oa-module-page__desc",
					children: "低代码设计流程表单 · oa-designer"
				}),
				/* @__PURE__ */ t("div", {
					className: "oa-designer__list-toolbar",
					children: /* @__PURE__ */ n(d, { children: [/* @__PURE__ */ t(s, {
						type: "primary",
						icon: /* @__PURE__ */ t(T, {}),
						onClick: h,
						children: "新建表单"
					}), /* @__PURE__ */ t(m, {
						accept: ".json,application/json",
						showUploadList: !1,
						beforeUpload: (e) => (_(e), !1),
						children: /* @__PURE__ */ t(s, {
							icon: /* @__PURE__ */ t(D, {}),
							children: "导入 JSON"
						})
					})] })
				}),
				/* @__PURE__ */ t(p, {
					rowKey: "id",
					dataSource: c,
					columns: [
						{
							title: "标题",
							dataIndex: "title",
							render: (e) => e || "(未命名)"
						},
						{
							title: "字段数",
							width: 90,
							render: (e, t) => t.fields.length
						},
						{
							title: "更新时间",
							dataIndex: "updatedAt",
							width: 200
						},
						{
							title: "操作",
							width: 230,
							render: (r, i) => /* @__PURE__ */ n(d, { children: [
								/* @__PURE__ */ t(s, {
									size: "small",
									type: "link",
									icon: /* @__PURE__ */ t(x, {}),
									onClick: () => e(`/designer/${i.id}`),
									children: "编辑"
								}),
								/* @__PURE__ */ t(s, {
									size: "small",
									type: "link",
									icon: /* @__PURE__ */ t(b, {}),
									onClick: () => H(i),
									children: "导出"
								}),
								/* @__PURE__ */ t(l, {
									title: "确认删除该表单？",
									onConfirm: () => g(i.id),
									children: /* @__PURE__ */ t(s, {
										size: "small",
										type: "link",
										danger: !0,
										icon: /* @__PURE__ */ t(y, {}),
										children: "删除"
									})
								})
							] })
						}
					],
					pagination: !1,
					locale: { emptyText: "暂无表单，点击「新建表单」开始设计" }
				})
			]
		})
	});
}
function W() {
	return /* @__PURE__ */ t(o, { children: /* @__PURE__ */ t(U, {}) });
}
//#endregion
//#region src/fieldMeta.ts
var G = [
	{
		type: "text",
		label: "单行文本"
	},
	{
		type: "textarea",
		label: "多行文本"
	},
	{
		type: "number",
		label: "数字"
	},
	{
		type: "date",
		label: "日期"
	},
	{
		type: "select",
		label: "下拉选择"
	},
	{
		type: "user-picker",
		label: "人员选择"
	}
], K = {
	text: "单行文本",
	textarea: "多行文本",
	number: "数字",
	date: "日期",
	select: "下拉选择",
	"user-picker": "人员选择"
};
function q(e) {
	return K[e];
}
function J() {
	return `f_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
//#endregion
//#region src/components/FieldPalette.tsx
var Y = {
	text: /* @__PURE__ */ t(h, {}),
	textarea: /* @__PURE__ */ t(C, {}),
	number: /* @__PURE__ */ t(w, {}),
	date: /* @__PURE__ */ t(v, {}),
	select: /* @__PURE__ */ t(E, {}),
	"user-picker": /* @__PURE__ */ t(O, {})
};
function X({ onAdd: e }) {
	return /* @__PURE__ */ n("div", {
		className: "oa-designer__palette",
		children: [
			/* @__PURE__ */ t("div", {
				className: "oa-designer__panel-title",
				children: "字段库"
			}),
			/* @__PURE__ */ t("div", {
				className: "oa-designer__palette-grid",
				children: G.map((n) => /* @__PURE__ */ t(s, {
					className: "oa-designer__palette-item",
					icon: Y[n.type],
					onClick: () => e(n.type),
					block: !0,
					children: n.label
				}, n.type))
			}),
			/* @__PURE__ */ t("p", {
				className: "oa-designer__palette-tip",
				children: "点击添加字段到表单"
			})
		]
	});
}
//#endregion
//#region src/components/DesignCanvas.tsx
function Z({ schema: e, selectedId: r, onSelect: i, onMove: a, onRemove: o, onTitleChange: c }) {
	return /* @__PURE__ */ n("div", {
		className: "oa-designer__canvas",
		children: [/* @__PURE__ */ n("div", {
			className: "oa-designer__canvas-head",
			children: [/* @__PURE__ */ t("input", {
				className: "oa-designer__title-input",
				value: e.title,
				onChange: (e) => c(e.target.value),
				placeholder: "表单标题"
			}), /* @__PURE__ */ n("span", {
				className: "oa-designer__field-count",
				children: [e.fields.length, " 个字段"]
			})]
		}), /* @__PURE__ */ t("div", {
			className: "oa-designer__canvas-body",
			children: e.fields.length === 0 ? /* @__PURE__ */ t("div", {
				className: "oa-designer__empty",
				children: "从左侧字段库点击添加字段"
			}) : e.fields.map((c, l) => /* @__PURE__ */ n("div", {
				className: `oa-designer__field-row${r === c.id ? " is-selected" : ""}`,
				onClick: () => i(c.id),
				children: [/* @__PURE__ */ n("div", {
					className: "oa-designer__field-info",
					children: [
						/* @__PURE__ */ t("span", {
							className: "oa-designer__field-label",
							children: c.label || "(未命名)"
						}),
						/* @__PURE__ */ t("span", {
							className: "oa-designer__field-type",
							children: K[c.type]
						}),
						c.required ? /* @__PURE__ */ t("span", {
							className: "oa-designer__field-required",
							children: "必填"
						}) : null
					]
				}), /* @__PURE__ */ n("div", {
					className: "oa-designer__field-actions",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ t(s, {
							size: "small",
							disabled: l === 0,
							onClick: () => a(c.id, "up"),
							icon: /* @__PURE__ */ t(_, {})
						}),
						/* @__PURE__ */ t(s, {
							size: "small",
							disabled: l === e.fields.length - 1,
							onClick: () => a(c.id, "down"),
							icon: /* @__PURE__ */ t(g, {})
						}),
						/* @__PURE__ */ t(s, {
							size: "small",
							danger: !0,
							onClick: () => o(c.id),
							icon: /* @__PURE__ */ t(y, {})
						})
					]
				})]
			}, c.id))
		})]
	});
}
//#endregion
//#region src/components/PropertyPanel.tsx
function Q({ field: r, onChange: i }) {
	return /* @__PURE__ */ n("div", {
		className: "oa-designer__props",
		children: [/* @__PURE__ */ t("div", {
			className: "oa-designer__panel-title",
			children: "属性配置"
		}), r ? /* @__PURE__ */ n(e, { children: [
			/* @__PURE__ */ n("div", {
				className: "oa-designer__prop",
				children: [/* @__PURE__ */ t("label", { children: "标签" }), /* @__PURE__ */ t(c, {
					value: r.label,
					onChange: (e) => i({ label: e.target.value }),
					placeholder: "字段标签"
				})]
			}),
			/* @__PURE__ */ n("div", {
				className: "oa-designer__prop",
				children: [/* @__PURE__ */ t("label", { children: "字段标识" }), /* @__PURE__ */ t(c, {
					value: r.id,
					disabled: !0
				})]
			}),
			/* @__PURE__ */ n("div", {
				className: "oa-designer__prop",
				children: [/* @__PURE__ */ t("label", { children: "类型" }), /* @__PURE__ */ t(u, {
					value: r.type,
					onChange: (e) => i({ type: e }),
					options: G.map((e) => ({
						value: e.type,
						label: e.label
					})),
					style: { width: "100%" }
				})]
			}),
			/* @__PURE__ */ n("div", {
				className: "oa-designer__prop oa-designer__prop--inline",
				children: [/* @__PURE__ */ t("label", { children: "必填" }), /* @__PURE__ */ t(f, {
					checked: !!r.required,
					onChange: (e) => i({ required: e })
				})]
			}),
			r.type === "user-picker" ? null : /* @__PURE__ */ n("div", {
				className: "oa-designer__prop",
				children: [/* @__PURE__ */ t("label", { children: "占位提示" }), /* @__PURE__ */ t(c, {
					value: r.placeholder ?? "",
					onChange: (e) => i({ placeholder: e.target.value }),
					placeholder: "placeholder"
				})]
			}),
			r.type === "select" ? /* @__PURE__ */ n("div", {
				className: "oa-designer__prop",
				children: [/* @__PURE__ */ n("label", { children: ["选项", /* @__PURE__ */ t(s, {
					size: "small",
					type: "link",
					icon: /* @__PURE__ */ t(T, {}),
					onClick: () => i({ options: [...r.options ?? [], {
						label: "",
						value: ""
					}] }),
					children: "添加"
				})] }), /* @__PURE__ */ t("div", {
					className: "oa-designer__options",
					children: (r.options ?? []).map((e, a) => /* @__PURE__ */ n("div", {
						className: "oa-designer__option-row",
						children: [
							/* @__PURE__ */ t(c, {
								placeholder: "显示名",
								value: e.label,
								onChange: (e) => {
									let t = [...r.options ?? []];
									t[a] = {
										...t[a],
										label: e.target.value
									}, i({ options: t });
								}
							}),
							/* @__PURE__ */ t(c, {
								placeholder: "值",
								value: e.value,
								onChange: (e) => {
									let t = [...r.options ?? []];
									t[a] = {
										...t[a],
										value: e.target.value
									}, i({ options: t });
								}
							}),
							/* @__PURE__ */ t(s, {
								size: "small",
								danger: !0,
								icon: /* @__PURE__ */ t(y, {}),
								onClick: () => {
									let e = [...r.options ?? []];
									e.splice(a, 1), i({ options: e });
								}
							})
						]
					}, a))
				})]
			}) : null
		] }) : /* @__PURE__ */ t("div", {
			className: "oa-designer__empty",
			children: "选择一个字段以编辑属性"
		})]
	});
}
//#endregion
//#region src/components/FormDesigner.tsx
function $({ schema: i, onChange: a }) {
	let [o, c] = r(i), [l, u] = r(null), [f, p] = r(!1), m = (e) => {
		c(e), a?.(e);
	}, h = (e) => {
		let t = {
			id: J(),
			type: e,
			label: q(e),
			required: !1,
			...e === "select" ? { options: [{
				label: "",
				value: ""
			}] } : {}
		};
		m({
			...o,
			fields: [...o.fields, t]
		}), u(t.id);
	}, g = (e, t) => {
		m({
			...o,
			fields: o.fields.map((n) => n.id === e ? {
				...n,
				...t
			} : n)
		});
	}, _ = (e) => {
		m({
			...o,
			fields: o.fields.filter((t) => t.id !== e)
		}), l === e && u(null);
	}, v = (e, t) => {
		let n = o.fields.findIndex((t) => t.id === e);
		if (n < 0) return;
		let r = t === "up" ? n - 1 : n + 1;
		if (r < 0 || r >= o.fields.length) return;
		let i = [...o.fields], a = i[n];
		i[n] = i[r], i[r] = a, m({
			...o,
			fields: i
		});
	}, y = () => {
		let e = new Blob([JSON.stringify(o, null, 2)], { type: "application/json" }), t = URL.createObjectURL(e), n = document.createElement("a");
		n.href = t, n.download = `${o.id || "form"}.json`, n.click(), URL.revokeObjectURL(t);
	}, C = o.fields.find((e) => e.id === l) ?? null;
	return /* @__PURE__ */ n("div", {
		className: "oa-designer",
		children: [/* @__PURE__ */ n("div", {
			className: "oa-designer__toolbar",
			children: [/* @__PURE__ */ t("span", {
				className: "oa-designer__autosave-hint",
				children: "改动自动保存到本地"
			}), /* @__PURE__ */ n(d, { children: [/* @__PURE__ */ t(s, {
				icon: /* @__PURE__ */ t(b, {}),
				onClick: y,
				children: "导出 JSON"
			}), /* @__PURE__ */ t(s, {
				type: f ? "default" : "primary",
				icon: t(f ? x : S, {}),
				onClick: () => p((e) => !e),
				children: f ? "返回编辑" : "预览"
			})] })]
		}), /* @__PURE__ */ t("div", {
			className: "oa-designer__main",
			children: f ? /* @__PURE__ */ t("div", {
				className: "oa-designer__preview",
				children: /* @__PURE__ */ t(k, { schema: o })
			}) : /* @__PURE__ */ n(e, { children: [
				/* @__PURE__ */ t(X, { onAdd: h }),
				/* @__PURE__ */ t(Z, {
					schema: o,
					selectedId: l,
					onSelect: u,
					onMove: v,
					onRemove: _,
					onTitleChange: (e) => m({
						...o,
						title: e
					})
				}),
				/* @__PURE__ */ t(Q, {
					field: C,
					onChange: (e) => l && g(l, e)
				})
			] })
		})]
	});
}
//#endregion
//#region src/pages/FormDesignerPage.tsx
function ee() {
	let { formId: e } = a(), r = i(), o = e ? R(e) : void 0;
	return o ? /* @__PURE__ */ t(j, { children: /* @__PURE__ */ n("div", {
		className: "oa-designer-page",
		children: [/* @__PURE__ */ t(s, {
			type: "link",
			onClick: () => r("/designer"),
			style: {
				padding: 0,
				width: "fit-content"
			},
			children: "← 返回表单列表"
		}), /* @__PURE__ */ t($, {
			schema: o,
			onChange: (e) => z(e)
		}, o.id)]
	}) }) : /* @__PURE__ */ t(j, {
		scroll: !0,
		children: /* @__PURE__ */ n("div", {
			className: "oa-module-page",
			children: [/* @__PURE__ */ t("p", { children: "未找到表单" }), /* @__PURE__ */ t(s, {
				onClick: () => r("/designer"),
				children: "返回列表"
			})]
		})
	});
}
//#endregion
export { j as DesignerLayout, $ as FormDesigner, ee as FormDesignerPage, W as FormListPage };
