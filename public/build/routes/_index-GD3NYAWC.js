import {
  createHotContext
} from "/build/_shared/chunk-QJRH7GVM.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.tsx"
  );
  import.meta.hot.lastModified = "1730304598751.361";
}
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { id: "index-page", children: [
    "Remix JS \u30D5\u30EC\u30E0\u30EF\u30AF\u3054\u4F7F\u7528\u3044\u305F\u3060\u304D\u307E\u3057\u305F\u3002",
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this),
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://remix.run", children: "remix.run \u3067\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u78BA\u8A8D .." }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 27,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
}
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/_index-GD3NYAWC.js.map
