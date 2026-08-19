import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import { useNavigate as r, useParams as i } from "react-router-dom";
import { Button as a, Form as o, Input as s, InputNumber as c, Result as l, Space as u, Spin as d, message as f } from "antd";
import { useEffect as p, useState as m } from "react";
import { ArrowDownOutlined as h, ArrowUpOutlined as g, DeleteOutlined as _, DownloadOutlined as v, EditOutlined as y, EyeOutlined as b, SaveOutlined as x } from "@ant-design/icons";
import { FormRenderer as S, getAllWidgets as C } from "@zdy-oa/form";
import { request as w } from "@zdy-oa/utils";
//#region src/DesignerLayout.tsx
function T({ children: e, scroll: n = !1 }) {
	return /* @__PURE__ */ t("div", {
		className: n ? "oa-designer-standalone oa-designer-standalone--scroll" : "oa-designer-standalone",
		children: e
	});
}
//#endregion
//#region src/fieldMeta.ts
function E() {
	return C();
}
function D(e) {
	return C().find((t) => t.type === e);
}
function O(e) {
	return D(e)?.label ?? e;
}
function k() {
	return `f_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
//#endregion
//#region src/components/FieldPalette.tsx
var A = "application/x-oa-field-type";
function j({ onAdd: e }) {
	let r = E(), i = r.filter((e) => e.category === "input"), o = r.filter((e) => e.category === "display"), s = (n) => /* @__PURE__ */ t(a, {
		className: "oa-designer__palette-item",
		icon: n.icon,
		onClick: () => e(n.type),
		draggable: !0,
		onDragStart: (e) => {
			e.dataTransfer.setData(A, n.type), e.dataTransfer.setData("text/plain", n.type), e.dataTransfer.effectAllowed = "copy";
		},
		children: n.label
	}, n.type);
	return /* @__PURE__ */ n("div", {
		className: "oa-designer__palette",
		children: [
			/* @__PURE__ */ t("div", {
				className: "oa-designer__panel-title",
				children: "字段库"
			}),
			i.length > 0 ? /* @__PURE__ */ n("div", {
				className: "oa-designer__palette-section",
				children: [/* @__PURE__ */ t("div", {
					className: "oa-designer__palette-section-title",
					children: "输入采集"
				}), /* @__PURE__ */ t("div", {
					className: "oa-designer__palette-grid",
					children: i.map(s)
				})]
			}) : null,
			o.length > 0 ? /* @__PURE__ */ n("div", {
				className: "oa-designer__palette-section",
				children: [/* @__PURE__ */ t("div", {
					className: "oa-designer__palette-section-title",
					children: "信息展示"
				}), /* @__PURE__ */ t("div", {
					className: "oa-designer__palette-grid",
					children: o.map(s)
				})]
			}) : null,
			/* @__PURE__ */ t("p", {
				className: "oa-designer__palette-tip",
				children: "点击或拖拽到中间画布添加字段"
			})
		]
	});
}
//#endregion
//#region src/components/DesignCanvas.tsx
function M({ schema: e, selectedId: r, onSelect: i, onMove: o, onRemove: s, onNameChange: c, onAdd: l }) {
	let [u, d] = m(null), f = (e) => e.dataTransfer.getData("application/x-oa-field-type") || e.dataTransfer.getData("text/plain") || null, p = (e) => {
		let t = e.dataTransfer.types;
		return t.includes("application/x-oa-field-type") || t.includes("text/plain");
	}, v = (e, t) => {
		e.preventDefault(), e.stopPropagation();
		let n = f(e);
		n && l(n, t), d(null);
	}, y = (e, t) => {
		let n = e.currentTarget.getBoundingClientRect();
		return e.clientY - n.top < n.height / 2 ? t : t + 1;
	};
	return /* @__PURE__ */ t("div", {
		className: "oa-designer__canvas",
		children: /* @__PURE__ */ n("div", {
			className: "oa-designer__canvas-wrapper",
			children: [/* @__PURE__ */ n("div", {
				className: "oa-designer__canvas-head",
				children: [/* @__PURE__ */ t("input", {
					className: "oa-designer__title-input",
					value: e.name,
					onChange: (e) => c(e.target.value),
					placeholder: "布局名称（可作为页面标题）"
				}), /* @__PURE__ */ n("span", {
					className: "oa-designer__field-count",
					children: [
						e.fields.length,
						" 个字段 · ",
						e.type
					]
				})]
			}), /* @__PURE__ */ t("div", {
				className: `oa-designer__canvas-body${u === null ? "" : " is-drag-over"}${e.fields.length === 0 ? " is-empty" : ""}`,
				onDragOver: (t) => {
					p(t) && (t.preventDefault(), t.dataTransfer.dropEffect = "copy", u !== e.fields.length && d(e.fields.length));
				},
				onDragLeave: (e) => {
					let t = e.relatedTarget;
					e.currentTarget.contains(t) || d(null);
				},
				onDrop: (e) => v(e, void 0),
				children: e.fields.length === 0 ? /* @__PURE__ */ t("div", {
					className: "oa-designer__empty",
					children: u === null ? "从左侧字段库拖拽或点击添加字段" : "松开以添加该字段"
				}) : e.fields.map((c, l) => {
					let f = D(c.type);
					return /* @__PURE__ */ n("div", { children: [
						u === l && /* @__PURE__ */ t("div", { className: "oa-designer__drop-indicator" }),
						/* @__PURE__ */ n("div", {
							className: `oa-designer__field-row${r === c.id ? " is-selected" : ""}${u === l || u === l + 1 ? " is-drop-target" : ""}`,
							onClick: () => i(c.id),
							onDragOver: (e) => {
								if (!p(e)) return;
								e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy";
								let t = y(e, l);
								t !== u && d(t);
							},
							onDrop: (e) => v(e, y(e, l)),
							children: [
								/* @__PURE__ */ n("div", {
									className: "oa-designer__field-info",
									children: [/* @__PURE__ */ n("span", {
										className: "oa-designer__field-label",
										children: [c.label || "(未命名)", /* @__PURE__ */ n("small", {
											style: {
												marginLeft: 6,
												color: "#999"
											},
											children: [
												"[",
												f?.label ?? c.type,
												"]"
											]
										})]
									}), c.required ? /* @__PURE__ */ t("span", {
										className: "oa-designer__field-required",
										children: "必填"
									}) : null]
								}),
								/* @__PURE__ */ t("div", {
									className: "oa-designer__field-preview",
									style: { pointerEvents: "none" },
									children: f ? /* @__PURE__ */ t(f.DesignView, {
										field: c,
										selected: r === c.id
									}) : null
								}),
								/* @__PURE__ */ n("div", {
									className: "oa-designer__field-actions",
									onClick: (e) => e.stopPropagation(),
									children: [
										/* @__PURE__ */ t(a, {
											size: "small",
											disabled: l === 0,
											onClick: () => o(c.id, "up"),
											icon: /* @__PURE__ */ t(g, {})
										}),
										/* @__PURE__ */ t(a, {
											size: "small",
											disabled: l === e.fields.length - 1,
											onClick: () => o(c.id, "down"),
											icon: /* @__PURE__ */ t(h, {})
										}),
										/* @__PURE__ */ t(a, {
											size: "small",
											danger: !0,
											onClick: () => s(c.id),
											icon: /* @__PURE__ */ t(_, {})
										})
									]
								})
							]
						}),
						l === e.fields.length - 1 && u === l + 1 && /* @__PURE__ */ t("div", { className: "oa-designer__drop-indicator" })
					] }, c.id);
				})
			})]
		})
	});
}
//#endregion
//#region src/components/PropertyPanel.tsx
function N({ field: r, onChange: i }) {
	return /* @__PURE__ */ n("div", {
		className: "oa-designer__props",
		children: [/* @__PURE__ */ t("div", {
			className: "oa-designer__panel-title",
			children: "属性配置"
		}), r ? /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ n(o, {
			layout: "vertical",
			className: "oa-designer__common-props",
			children: [
				/* @__PURE__ */ t(o.Item, {
					label: "标签/标题",
					children: /* @__PURE__ */ t(s, {
						value: r.label,
						onChange: (e) => i({ label: e.target.value }),
						placeholder: "字段标签"
					})
				}),
				/* @__PURE__ */ t(o.Item, {
					label: "字段标识",
					children: /* @__PURE__ */ t(s, {
						value: r.id,
						disabled: !0
					})
				}),
				/* @__PURE__ */ t(o.Item, {
					label: "跨列数 (grid)",
					children: /* @__PURE__ */ t(c, {
						min: 1,
						max: 12,
						value: r.colSpan,
						onChange: (e) => i({ colSpan: typeof e == "number" ? e : void 0 }),
						style: { width: "100%" }
					})
				})
			]
		}), (() => {
			let e = D(r.type);
			if (!e) return /* @__PURE__ */ n("div", {
				className: "oa-designer__empty",
				children: ["不支持的字段类型：", r.type]
			});
			let a = e.ConfigView;
			return /* @__PURE__ */ t(a, {
				field: r,
				onChange: i
			});
		})()] }) : /* @__PURE__ */ t("div", {
			className: "oa-designer__empty",
			children: "选择一个字段以编辑属性"
		})]
	});
}
//#endregion
//#region src/components/Designer.tsx
function P({ formId: r, schema: i, onChange: o, onSave: s }) {
	let [c, l] = m(i), [d, f] = m(null), [p, h] = m(!1), g = (e) => {
		l(e), o?.(e);
	}, _ = (e, t) => {
		let n = {
			id: k(),
			type: e,
			label: O(e),
			required: !1,
			...e === "select" || e === "radio" || e === "checkbox" ? { options: [{
				label: "",
				value: ""
			}] } : {},
			...e === "heading" ? { content: O(e) } : {},
			...e === "paragraph" ? { content: "" } : {}
		}, r = [...c.fields];
		t === void 0 || t >= r.length ? r.push(n) : t <= 0 ? r.unshift(n) : r.splice(t, 0, n), g({
			...c,
			fields: r
		}), f(n.id);
	}, C = (e, t) => {
		g({
			...c,
			fields: c.fields.map((n) => n.id === e ? {
				...n,
				...t
			} : n)
		});
	}, w = (e) => {
		g({
			...c,
			fields: c.fields.filter((t) => t.id !== e)
		}), d === e && f(null);
	}, T = (e, t) => {
		let n = c.fields.findIndex((t) => t.id === e);
		if (n < 0) return;
		let r = t === "up" ? n - 1 : n + 1;
		if (r < 0 || r >= c.fields.length) return;
		let i = [...c.fields], a = i[n];
		i[n] = i[r], i[r] = a, g({
			...c,
			fields: i
		});
	}, E = () => {
		let e = new Blob([JSON.stringify(c, null, 2)], { type: "application/json" }), t = URL.createObjectURL(e), n = document.createElement("a");
		n.href = t, n.download = `${c.id || "layout"}.json`, n.click(), URL.revokeObjectURL(t);
	}, D = () => {
		s?.(c);
	}, A = c.fields.find((e) => e.id === d) ?? null;
	return /* @__PURE__ */ n("div", {
		className: "oa-designer",
		children: [/* @__PURE__ */ n("div", {
			className: "oa-designer__header",
			children: [/* @__PURE__ */ t("span", {
				className: "oa-designer__logo",
				children: "页面设计器"
			}), /* @__PURE__ */ n(u, { children: [
				/* @__PURE__ */ t(a, {
					icon: /* @__PURE__ */ t(v, {}),
					onClick: E,
					children: "导出 JSON"
				}),
				/* @__PURE__ */ t(a, {
					icon: t(p ? y : b, {}),
					onClick: () => h((e) => !e),
					children: p ? "返回编辑" : "预览"
				}),
				/* @__PURE__ */ t(a, {
					icon: /* @__PURE__ */ t(x, {}),
					type: "primary",
					onClick: D,
					children: "保存"
				})
			] })]
		}), /* @__PURE__ */ t("div", {
			className: "oa-designer__main",
			children: p ? /* @__PURE__ */ t("div", {
				className: "oa-designer__preview",
				children: /* @__PURE__ */ t(S, { schema: {
					id: r,
					name: c.name,
					layout: c,
					createdAt: Date.now().toString(),
					updatedAt: Date.now().toString()
				} })
			}) : /* @__PURE__ */ n(e, { children: [
				/* @__PURE__ */ t(j, { onAdd: _ }),
				/* @__PURE__ */ t(M, {
					schema: c,
					selectedId: d,
					onSelect: f,
					onMove: T,
					onRemove: w,
					onAdd: _,
					onNameChange: (e) => g({
						...c,
						name: e
					})
				}),
				/* @__PURE__ */ t(N, {
					field: A,
					onChange: (e) => d && C(d, e)
				})
			] })
		})]
	});
}
//#endregion
//#region src/storage.ts
var F = "oa-designer:layouts";
function I() {
	return (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", { hour12: !1 });
}
function L() {
	try {
		let e = localStorage.getItem(F);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}
function R(e) {
	localStorage.setItem(F, JSON.stringify(e));
}
function z(e) {
	let t = L(), n = t.findIndex((t) => t.id === e.id), r = {
		...e,
		updatedAt: I()
	};
	return n >= 0 ? t[n] = r : t.push(r), R(t), r;
}
//#endregion
//#region src/api/index.ts
var B = (e) => w.request({
	url: `/api/form/detail/${e}`,
	method: "GET"
}), V = (e, t) => w.request({
	url: `/api/form/update/${e}`,
	method: "PATCH",
	data: t
});
//#endregion
//#region src/pages/DesignerPage.tsx
function H() {
	let { formId: o = "" } = i(), [s, c] = f.useMessage(), [u, h] = m(!0), [g, _] = m(), v = r();
	return p(() => {
		if (console.log("formId", o), !o) {
			h(!1);
			return;
		}
		B(o).then((e) => {
			console.log(e), e.code === 200 && _(e.data?.layout), h(!1);
		}).catch((e) => {
			console.error("getFormDetail error:", e?.code, e?.message), h(!1);
		});
	}, [o]), u ? /* @__PURE__ */ t(d, {
		fullscreen: !0,
		size: "large"
	}) : g ? /* @__PURE__ */ n(e, { children: [c, /* @__PURE__ */ t(T, { children: /* @__PURE__ */ t(P, {
		formId: o,
		schema: g,
		onChange: (e) => z(e),
		onSave: (e) => {
			V(o || "", { layout: e }).then((e) => {
				console.log(e), e.code === 200 && s.open({
					content: "保存成功",
					type: "success"
				});
			});
		}
	}) })] }) : /* @__PURE__ */ t(T, {
		scroll: !0,
		children: /* @__PURE__ */ t(l, {
			status: "404",
			title: "未找到布局",
			subTitle: "该表单布局可能已被删除或不存在",
			extra: /* @__PURE__ */ t(a, {
				type: "primary",
				onClick: () => v("/designer"),
				children: "返回表单管理"
			})
		})
	});
}
//#endregion
export { P as Designer, T as DesignerLayout, H as DesignerPage };
