module.exports = [
"[project]/.next-internal/server/app/cookie-policy/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/cookie-policy/dompurifire.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const sanitizeHTML = (html)=>{
    const scriptTagRegex = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
    const eventHandlerRegex = /on[a-z]+=\s*"[^"]*"/gi;
    const javascriptProtocolRegex = /href=\s*"javascript:[^"]*"/gi;
    const iframeTagRegex = /<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi;
    const objectTagRegex = /<object\b[^>]*>[\s\S]*?<\/object>/gi;
    const embedTagRegex = /<embed\b[^>]*>[\s\S]*?<\/embed>/gi;
    let sanitized = html.replace(scriptTagRegex, "").replace(eventHandlerRegex, "").replace(javascriptProtocolRegex, "").replace(iframeTagRegex, "").replace(objectTagRegex, "").replace(embedTagRegex, "");
    return sanitized;
};
const DOMPurify = {
    sanitize: sanitizeHTML
};
const __TURBOPACK__default__export__ = DOMPurify;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/services/axiosClient.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-rsc] (ecmascript)");
;
const axiosClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://app.realtimebiometrics.net/api",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false
});
const __TURBOPACK__default__export__ = axiosClient;
}),
"[project]/src/services/cookiePolicyService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCookiePolicyData",
    ()=>getCookiePolicyData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$axiosClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/axiosClient.ts [app-rsc] (ecmascript)");
;
const getCookiePolicyData = async ()=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$axiosClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(`/content/site/cookie-policy`);
    return response.data;
};
}),
"[project]/src/app/cookie-policy/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$cookie$2d$policy$2f$dompurifire$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/cookie-policy/dompurifire.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cookiePolicyService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cookiePolicyService.ts [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: "Cookie Policy"
};
const CookiePolicyPage = async ()=>{
    let decodedContent = "";
    let title = "";
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cookiePolicyService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCookiePolicyData"])();
        if (res.success && res.data) {
            title = res.data.title;
            const encodedContent = res.data.content;
            decodedContent = decodeURIComponent(encodedContent.replace(/\"/g, '"').replace(/\\/g, "").replace(/\n/g, "").replace(/\r/g, ""));
        } else {
            decodedContent = "<p>No content found.</p>";
        }
    } catch (error) {
        console.error("Failed to fetch cookie policy data:", error);
        decodedContent = "<p>Error loading content. Please try again later.</p>";
    }
    const sanitizedContent = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$cookie$2d$policy$2f$dompurifire$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].sanitize(decodedContent);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "prose max-w-none p-6 bg-white rounded-lg shadow-md min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            dangerouslySetInnerHTML: {
                __html: sanitizedContent
            }
        }, void 0, false, {
            fileName: "[project]/src/app/cookie-policy/page.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/cookie-policy/page.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CookiePolicyPage;
}),
"[project]/src/app/cookie-policy/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/cookie-policy/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4659b2d4._.js.map