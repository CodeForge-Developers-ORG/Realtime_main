(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/common/FloatingButtons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
"use client";
;
;
;
const FloatingButtons = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden md:flex fixed right-8 bottom-8 z-50 flex-col gap-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "https://wa.me/918860886086",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-center w-18 h-18 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300",
            "aria-label": "Contact us on WhatsApp",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-13 h-13 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/watsapp.png",
                    alt: "WhatsApp",
                    height: 50,
                    width: 50,
                    className: "h-full w-full object-contain"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/FloatingButtons.tsx",
                    lineNumber: 19,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/common/FloatingButtons.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/common/FloatingButtons.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/common/FloatingButtons.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = FloatingButtons;
const __TURBOPACK__default__export__ = FloatingButtons;
var _c;
__turbopack_context__.k.register(_c, "FloatingButtons");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/axiosClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const axiosClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL || "https://app.realtimebiometrics.net/api",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false
});
const __TURBOPACK__default__export__ = axiosClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/constant.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baseUri",
    ()=>baseUri
]);
const baseUri = "https://app.realtimebiometrics.net/storage/";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/common/PopupModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/axiosClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$constant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/constant.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const PopupModal = ()=>{
    var _popup_styles, _popup_styles1, _popup_styles2, _popup_styles3, _popup_styles4;
    _s();
    const [popup, setPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PopupModal.useEffect": ()=>{
            const fetchPopup = {
                "PopupModal.useEffect.fetchPopup": async ()=>{
                    try {
                        var _json_data;
                        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/content/popups");
                        const json = res.data;
                        if (json.success && ((_json_data = json.data) === null || _json_data === void 0 ? void 0 : _json_data.length) > 0) {
                            const popupData = json.data[0];
                            // Show only once per day if configured
                            if (popupData.show_frequency === "once_per_day") {
                                const lastShown = localStorage.getItem("popupLastShown");
                                const today = new Date().toDateString();
                                if (lastShown === today) return; // already shown today
                                localStorage.setItem("popupLastShown", today);
                            }
                            setPopup(popupData);
                            const delay = (popupData.show_after || 10) * 1000;
                            setTimeout({
                                "PopupModal.useEffect.fetchPopup": ()=>setVisible(true)
                            }["PopupModal.useEffect.fetchPopup"], delay);
                        }
                    } catch (error) {
                        console.error("Error fetching popup:", error);
                    }
                }
            }["PopupModal.useEffect.fetchPopup"];
            fetchPopup();
        }
    }["PopupModal.useEffect"], []);
    if (!popup || !visible) return null;
    const handleClose = ()=>setVisible(false);
    const modalSize = popup.size === "small" ? "max-w-sm" : popup.size === "medium" ? "max-w-md" : "max-w-2xl";
    const positionClass = popup.position === "top" ? "items-start mt-10" : popup.position === "bottom" ? "items-end mb-10" : "items-center";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex justify-center bg-black/25 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex ".concat(positionClass, " justify-center w-full"),
            onClick: handleClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (e)=>e.stopPropagation(),
                className: "relative ".concat(modalSize, " bg-white rounded-xl shadow-lg p-6 text-center"),
                style: {
                    backgroundColor: (_popup_styles = popup.styles) === null || _popup_styles === void 0 ? void 0 : _popup_styles["background-color"],
                    color: (_popup_styles1 = popup.styles) === null || _popup_styles1 === void 0 ? void 0 : _popup_styles1.color,
                    borderColor: (_popup_styles2 = popup.styles) === null || _popup_styles2 === void 0 ? void 0 : _popup_styles2["border-color"],
                    borderRadius: (_popup_styles3 = popup.styles) === null || _popup_styles3 === void 0 ? void 0 : _popup_styles3["border-radius"],
                    borderWidth: ((_popup_styles4 = popup.styles) === null || _popup_styles4 === void 0 ? void 0 : _popup_styles4["border-color"]) ? "1px" : "0px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClose,
                        className: "absolute top-2 right-2 text-gray-500 hover:text-black",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/PopupModal.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    popup.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$constant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseUri"]).concat(popup.image),
                            alt: "Popup",
                            className: "rounded-md max-h-48 object-contain",
                            width: 300,
                            height: 200
                        }, void 0, false, {
                            fileName: "[project]/src/components/common/PopupModal.tsx",
                            lineNumber: 100,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/PopupModal.tsx",
                        lineNumber: 99,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold mb-2",
                        children: popup.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/PopupModal.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mb-4",
                        children: popup.content
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/PopupModal.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    popup.button_text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: popup.button_url || "#",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-all",
                        children: popup.button_text
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/PopupModal.tsx",
                        lineNumber: 118,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/common/PopupModal.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/common/PopupModal.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/common/PopupModal.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PopupModal, "zwmJw0v+M79qsM1qX5XHF2zZWpo=");
_c = PopupModal;
const __TURBOPACK__default__export__ = PopupModal;
var _c;
__turbopack_context__.k.register(_c, "PopupModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/analytics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "queueActivity",
    ()=>queueActivity,
    "recordActivity",
    ()=>recordActivity,
    "recordVisit",
    ()=>recordVisit,
    "updateVisit",
    ()=>updateVisit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/axiosClient.ts [app-client] (ecmascript)");
"use client";
;
// --------------------- Constants ---------------------
const API_BASE = "/analytics";
// --------------------- Helpers ---------------------
function getSessionId() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let sessionId = sessionStorage.getItem("session_id");
    if (!sessionId) {
        sessionId = "sess_" + Math.random().toString(36).substring(2, 12);
        sessionStorage.setItem("session_id", sessionId);
    }
    return sessionId;
}
function getDeviceInfo() {
    if (typeof navigator === "undefined" || "object" === "undefined") {
        return {
            device_type: "desktop",
            browser: "unknown",
            platform: "unknown",
            screen_width: 0,
            screen_height: 0
        };
    }
    return {
        device_type: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
        browser: navigator.userAgent,
        platform: navigator.platform,
        screen_width: window.innerWidth,
        screen_height: window.innerHeight
    };
}
function getUTMParams() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const params = new URLSearchParams(window.location.search);
    return {
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign")
    };
}
async function recordVisit() {
    try {
        var _res_data;
        const session_id = getSessionId();
        const device = getDeviceInfo();
        const utm = getUTMParams();
        const payload = {
            session_id,
            url: window.location.href,
            page_title: document.title,
            referrer: document.referrer || null,
            ...utm,
            ...device
        };
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(API_BASE, "/visits"), payload);
        return ((_res_data = res.data) === null || _res_data === void 0 ? void 0 : _res_data.data) || res.data || null;
    } catch (err) {
        console.error("❌ Error recording visit:", err);
        return null;
    }
}
async function updateVisit(visit_id, time_on_page) {
    try {
        const payload = {
            visit_id,
            time_on_page,
            is_bounce: time_on_page < 5000
        };
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put("".concat(API_BASE, "/visits"), payload);
    } catch (err) {
        console.error("❌ Error updating visit:", err);
    }
}
async function recordActivity(action, element, event) {
    try {
        var _element_tagName, _element_textContent;
        const session_id = getSessionId();
        const device_type = getDeviceInfo().device_type;
        const payload = {
            session_id,
            action,
            element: (element === null || element === void 0 ? void 0 : (_element_tagName = element.tagName) === null || _element_tagName === void 0 ? void 0 : _element_tagName.toLowerCase()) || null,
            element_id: (element === null || element === void 0 ? void 0 : element.id) || null,
            element_text: (element === null || element === void 0 ? void 0 : (_element_textContent = element.textContent) === null || _element_textContent === void 0 ? void 0 : _element_textContent.substring(0, 100)) || null,
            page_url: window.location.href,
            coordinates_x: event ? Math.round(event.clientX) : null,
            coordinates_y: event ? Math.round(event.clientY) : null,
            device_type
        };
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(API_BASE, "/activities"), payload);
    } catch (err) {
        console.error("❌ Error recording activity:", err);
    }
}
// ✅ Batch Multiple Activities Together
const activityQueue = [];
let batchTimer = null;
function queueActivity(action, element, event) {
    var _element_tagName, _element_textContent;
    const session_id = getSessionId();
    const device_type = getDeviceInfo().device_type;
    const activity = {
        session_id,
        action,
        element: (element === null || element === void 0 ? void 0 : (_element_tagName = element.tagName) === null || _element_tagName === void 0 ? void 0 : _element_tagName.toLowerCase()) || null,
        element_id: (element === null || element === void 0 ? void 0 : element.id) || null,
        element_text: (element === null || element === void 0 ? void 0 : (_element_textContent = element.textContent) === null || _element_textContent === void 0 ? void 0 : _element_textContent.substring(0, 100)) || null,
        page_url: window.location.href,
        coordinates_x: event ? Math.round(event.clientX) : null,
        coordinates_y: event ? Math.round(event.clientY) : null,
        device_type
    };
    activityQueue.push(activity);
    if (!batchTimer) {
        batchTimer = setTimeout(sendActivityBatch, 4000); // send every 4 seconds
    }
}
async function sendActivityBatch() {
    if (activityQueue.length === 0) return;
    const batchToSend = activityQueue.splice(0, 100);
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(API_BASE, "/activities/batch"), {
            activities: batchToSend
        });
    } catch (err) {
        console.error("❌ Error sending batch activities:", err);
    } finally{
        batchTimer = null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/AnalyticsProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalyticsProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/analytics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AnalyticsProvider() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalyticsProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            let visitId = null;
            const startTime = Date.now();
            // ✅ 1. Record a visit when page loads
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recordVisit"])().then({
                "AnalyticsProvider.useEffect": (res)=>{
                    if (!res) return;
                    var _res__id, _ref;
                    visitId = (_ref = (_res__id = res._id) !== null && _res__id !== void 0 ? _res__id : res.visit_id) !== null && _ref !== void 0 ? _ref : null;
                }
            }["AnalyticsProvider.useEffect"]).catch({
                "AnalyticsProvider.useEffect": (err)=>{
                    console.error("Error recording visit:", err);
                }
            }["AnalyticsProvider.useEffect"]);
            // ✅ 2. Update time spent on page before leaving
            const handleUnload = {
                "AnalyticsProvider.useEffect.handleUnload": ()=>{
                    if (!visitId) return;
                    const timeOnPage = Date.now() - startTime;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateVisit"])(visitId, timeOnPage).catch({
                        "AnalyticsProvider.useEffect.handleUnload": (err)=>console.error("Error updating visit:", err)
                    }["AnalyticsProvider.useEffect.handleUnload"]);
                }
            }["AnalyticsProvider.useEffect.handleUnload"];
            window.addEventListener("beforeunload", handleUnload);
            // ✅ 3. Track clicks (batched every 4 seconds)
            const handleClick = {
                "AnalyticsProvider.useEffect.handleClick": (e)=>{
                    const el = e.target;
                    if (el) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queueActivity"])("click", el);
                }
            }["AnalyticsProvider.useEffect.handleClick"];
            window.addEventListener("click", handleClick);
            // ✅ 4. Track scroll activity (batched every 4 seconds)
            const handleScroll = {
                "AnalyticsProvider.useEffect.handleScroll": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queueActivity"])("scroll", document.body);
                }
            }["AnalyticsProvider.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll);
            // ✅ Cleanup listeners
            return ({
                "AnalyticsProvider.useEffect": ()=>{
                    window.removeEventListener("beforeunload", handleUnload);
                    window.removeEventListener("click", handleClick);
                    window.removeEventListener("scroll", handleScroll);
                }
            })["AnalyticsProvider.useEffect"];
        }
    }["AnalyticsProvider.useEffect"], []);
    return null;
}
_s(AnalyticsProvider, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = AnalyticsProvider;
var _c;
__turbopack_context__.k.register(_c, "AnalyticsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0332ae87._.js.map