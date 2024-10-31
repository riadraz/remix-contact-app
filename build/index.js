var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  mode: () => mode,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
var import_node_stream = require("node:stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough(), stream = (0, import_node.createReadableStreamFromReadable)(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough(), stream = (0, import_node.createReadableStreamFromReadable)(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  action: () => action,
  default: () => App,
  links: () => links,
  loader: () => loader
});
var import_node2 = require("@remix-run/node"), import_react2 = require("react"), import_react3 = require("@remix-run/react");

// app/app.css
var app_default = "/build/_assets/app-GPTBXXYE.css";

// app/data.ts
var import_match_sorter = require("match-sorter"), import_sort_by = __toESM(require("sort-by")), import_tiny_invariant = __toESM(require("tiny-invariant")), fakeContacts = {
  records: {},
  async getAll() {
    return Object.keys(fakeContacts.records).map((key) => fakeContacts.records[key]).sort((0, import_sort_by.default)("-createdAt", "last"));
  },
  async get(id) {
    return fakeContacts.records[id] || null;
  },
  async create(values) {
    let id = values.id || Math.random().toString(36).substring(2, 9), createdAt = (/* @__PURE__ */ new Date()).toISOString(), newContact = { id, createdAt, ...values };
    return fakeContacts.records[id] = newContact, newContact;
  },
  async set(id, values) {
    let contact = await fakeContacts.get(id);
    (0, import_tiny_invariant.default)(contact, `No contact found for ${id}`);
    let updatedContact = { ...contact, ...values };
    return fakeContacts.records[id] = updatedContact, updatedContact;
  },
  destroy(id) {
    return delete fakeContacts.records[id], null;
  }
};
async function getContacts(query) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  return query && (contacts = (0, import_match_sorter.matchSorter)(contacts, query, {
    keys: ["first", "last"]
  })), contacts.sort((0, import_sort_by.default)("last", "createdAt"));
}
async function createEmptyContact() {
  return await fakeContacts.create({});
}
async function getContact(id) {
  return fakeContacts.get(id);
}
async function updateContact(id, updates) {
  let contact = await fakeContacts.get(id);
  if (!contact)
    throw new Error(`No contact found for ${id}`);
  return await fakeContacts.set(id, { ...contact, ...updates }), contact;
}
async function deleteContact(id) {
  fakeContacts.destroy(id);
}
[
  {
    avatar: "https://sessionize.com/image/124e-400o400o2-wHVdAuNaxi8KJrgtN3ZKci.jpg",
    first: "Shruti",
    last: "Kapoor",
    twitter: "@shrutikapoor08"
  },
  {
    avatar: "https://sessionize.com/image/1940-400o400o2-Enh9dnYmrLYhJSTTPSw3MH.jpg",
    first: "Glenn",
    last: "Reyes",
    twitter: "@glnnrys"
  },
  {
    avatar: "https://sessionize.com/image/9273-400o400o2-3tyrUE3HjsCHJLU5aUJCja.jpg",
    first: "Ryan",
    last: "Florence"
  },
  {
    avatar: "https://sessionize.com/image/d14d-400o400o2-pyB229HyFPCnUcZhHf3kWS.png",
    first: "Oscar",
    last: "Newman",
    twitter: "@__oscarnewman"
  },
  {
    avatar: "https://sessionize.com/image/fd45-400o400o2-fw91uCdGU9hFP334dnyVCr.jpg",
    first: "Michael",
    last: "Jackson"
  },
  {
    avatar: "https://sessionize.com/image/b07e-400o400o2-KgNRF3S9sD5ZR4UsG7hG4g.jpg",
    first: "Christopher",
    last: "Chedeau",
    twitter: "@Vjeux"
  },
  {
    avatar: "https://sessionize.com/image/262f-400o400o2-UBPQueK3fayaCmsyUc1Ljf.jpg",
    first: "Cameron",
    last: "Matheson",
    twitter: "@cmatheson"
  },
  {
    avatar: "https://sessionize.com/image/820b-400o400o2-Ja1KDrBAu5NzYTPLSC3GW8.jpg",
    first: "Brooks",
    last: "Lybrand",
    twitter: "@BrooksLybrand"
  },
  {
    avatar: "https://sessionize.com/image/df38-400o400o2-JwbChVUj6V7DwZMc9vJEHc.jpg",
    first: "Alex",
    last: "Anderson",
    twitter: "@ralex1993"
  },
  {
    avatar: "https://sessionize.com/image/5578-400o400o2-BMT43t5kd2U1XstaNnM6Ax.jpg",
    first: "Kent C.",
    last: "Dodds",
    twitter: "@kentcdodds"
  },
  {
    avatar: "https://sessionize.com/image/c9d5-400o400o2-Sri5qnQmscaJXVB8m3VBgf.jpg",
    first: "Nevi",
    last: "Shah",
    twitter: "@nevikashah"
  },
  {
    avatar: "https://sessionize.com/image/2694-400o400o2-MYYTsnszbLKTzyqJV17w2q.png",
    first: "Andrew",
    last: "Petersen"
  },
  {
    avatar: "https://sessionize.com/image/907a-400o400o2-9TM2CCmvrw6ttmJiTw4Lz8.jpg",
    first: "Scott",
    last: "Smerchek",
    twitter: "@smerchek"
  },
  {
    avatar: "https://sessionize.com/image/08be-400o400o2-WtYGFFR1ZUJHL9tKyVBNPV.jpg",
    first: "Giovanni",
    last: "Benussi",
    twitter: "@giovannibenussi"
  },
  {
    avatar: "https://sessionize.com/image/f814-400o400o2-n2ua5nM9qwZA2hiGdr1T7N.jpg",
    first: "Igor",
    last: "Minar",
    twitter: "@IgorMinar"
  },
  {
    avatar: "https://sessionize.com/image/fb82-400o400o2-LbvwhTVMrYLDdN3z4iEFMp.jpeg",
    first: "Brandon",
    last: "Kish"
  },
  {
    avatar: "https://sessionize.com/image/fcda-400o400o2-XiYRtKK5Dvng5AeyC8PiUA.png",
    first: "Arisa",
    last: "Fukuzaki",
    twitter: "@arisa_dev"
  },
  {
    avatar: "https://sessionize.com/image/c8c3-400o400o2-PR5UsgApAVEADZRixV4H8e.jpeg",
    first: "Alexandra",
    last: "Spalato",
    twitter: "@alexadark"
  },
  {
    avatar: "https://sessionize.com/image/7594-400o400o2-hWtdCjbdFdLgE2vEXBJtyo.jpg",
    first: "Cat",
    last: "Johnson"
  },
  {
    avatar: "https://sessionize.com/image/5636-400o400o2-TWgi8vELMFoB3hB9uPw62d.jpg",
    first: "Ashley",
    last: "Narcisse",
    twitter: "@_darkfadr"
  },
  {
    avatar: "https://sessionize.com/image/6aeb-400o400o2-Q5tAiuzKGgzSje9ZsK3Yu5.JPG",
    first: "Edmund",
    last: "Hung",
    twitter: "@_edmundhung"
  },
  {
    avatar: "https://sessionize.com/image/30f1-400o400o2-wJBdJ6sFayjKmJycYKoHSe.jpg",
    first: "Clifford",
    last: "Fajardo",
    twitter: "@cliffordfajard0"
  },
  {
    avatar: "https://sessionize.com/image/6faa-400o400o2-amseBRDkdg7wSK5tjsFDiG.jpg",
    first: "Erick",
    last: "Tamayo",
    twitter: "@ericktamayo"
  },
  {
    avatar: "https://sessionize.com/image/feba-400o400o2-R4GE7eqegJNFf3cQ567obs.jpg",
    first: "Paul",
    last: "Bratslavsky",
    twitter: "@codingthirty"
  },
  {
    avatar: "https://sessionize.com/image/c315-400o400o2-spjM5A6VVfVNnQsuwvX3DY.jpg",
    first: "Pedro",
    last: "Cattori",
    twitter: "@pcattori"
  },
  {
    avatar: "https://sessionize.com/image/eec1-400o400o2-HkvWKLFqecmFxLwqR9KMRw.jpg",
    first: "Andre",
    last: "Landgraf",
    twitter: "@AndreLandgraf94"
  },
  {
    avatar: "https://sessionize.com/image/c73a-400o400o2-4MTaTq6ftC15hqwtqUJmTC.jpg",
    first: "Monica",
    last: "Powell",
    twitter: "@indigitalcolor"
  },
  {
    avatar: "https://sessionize.com/image/cef7-400o400o2-KBZUydbjfkfGACQmjbHEvX.jpeg",
    first: "Brian",
    last: "Lee",
    twitter: "@brian_dlee"
  },
  {
    avatar: "https://sessionize.com/image/f83b-400o400o2-Pyw3chmeHMxGsNoj3nQmWU.jpg",
    first: "Sean",
    last: "McQuaid",
    twitter: "@SeanMcQuaidCode"
  },
  {
    avatar: "https://sessionize.com/image/a9fc-400o400o2-JHBnWZRoxp7QX74Hdac7AZ.jpg",
    first: "Shane",
    last: "Walker",
    twitter: "@swalker326"
  },
  {
    avatar: "https://sessionize.com/image/6644-400o400o2-aHnGHb5Pdu3D32MbfrnQbj.jpg",
    first: "Jon",
    last: "Jensen",
    twitter: "@jenseng"
  }
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`
  });
});

// app/root.tsx
var import_jsx_runtime2 = require("react/jsx-runtime"), links = () => [
  { rel: "stylesheet", href: app_default }
], action = async () => {
  let contact = await createEmptyContact();
  return (0, import_node2.redirect)(`/contacts/${contact.id}/edit`);
}, loader = async ({
  request
}) => {
  let q = new URL(request.url).searchParams.get("q"), contacts = await getContacts(q);
  return (0, import_node2.json)({ contacts, q });
};
function App() {
  let navigation = (0, import_react3.useNavigation)(), { contacts, q } = (0, import_react3.useLoaderData)(), submit = (0, import_react3.useSubmit)();
  (0, import_react2.useEffect)(() => {
    let searchField = document.getElementById("q");
    searchField instanceof HTMLInputElement && (searchField.value = q || "");
  }, [q]);
  let searching = navigation.location && new URLSearchParams(navigation.location.search).has(
    "q"
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { id: "sidebar", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { children: "\u30EC\u30DF\u30AF\u30B9Javascript " }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            import_react3.Form,
            {
              id: "search-form",
              onChange: (event) => {
                let isFirstSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch
                });
              },
              role: "search",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "input",
                  {
                    id: "q",
                    "aria-label": "Search contacts",
                    className: searching ? "loading" : "",
                    defaultValue: q || "",
                    placeholder: "\u691C\u7D22",
                    type: "search",
                    name: "q"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "div",
                  {
                    id: "search-spinner",
                    "aria-hidden": !0,
                    hidden: !searching
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "submit", children: "\u65B0" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("nav", { children: contacts.length ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { children: contacts.map(
          (contact) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            import_react3.NavLink,
            {
              className: ({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : "",
              to: `contacts/${contact.id}`,
              children: [
                contact.first || contact.last ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                  contact.first,
                  " ",
                  contact.last
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { children: "No Name" }),
                " ",
                contact.favorite ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u2605" }) : null
              ]
            }
          ) }, contact.id)
        ) }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { children: "No contacts" }) }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: navigation.state === "loading" && !searching ? "loading" : "",
          id: "detail",
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.Outlet, {})
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.LiveReload, {})
    ] })
  ] });
}

// app/routes/contacts.$contactId.destroy.tsx
var contacts_contactId_destroy_exports = {};
__export(contacts_contactId_destroy_exports, {
  action: () => action2
});
var import_node3 = require("@remix-run/node"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));
var action2 = async ({
  params
}) => ((0, import_tiny_invariant2.default)(params.contactId, "Missing contactId param"), await deleteContact(params.contactId), (0, import_node3.redirect)("/"));

// app/routes/contacts.$contactId_.edit.tsx
var contacts_contactId_edit_exports = {};
__export(contacts_contactId_edit_exports, {
  action: () => action3,
  default: () => EditContact,
  loader: () => loader2
});
var import_node4 = require("@remix-run/node"), import_react4 = require("@remix-run/react"), import_tiny_invariant3 = __toESM(require("tiny-invariant"));
var import_jsx_runtime3 = require("react/jsx-runtime"), loader2 = async ({
  params
}) => {
  (0, import_tiny_invariant3.default)(params.contactId, "Missing contactId param");
  let contact = await getContact(params.contactId);
  if (!contact)
    throw new Response("Not Found", { status: 404 });
  return (0, import_node4.json)({ contact });
}, action3 = async ({
  params,
  request
}) => {
  (0, import_tiny_invariant3.default)(params.contactId, "Missing contactId param");
  let formData = await request.formData(), updates = Object.fromEntries(formData);
  return await updateContact(params.contactId, updates), (0, import_node4.redirect)(`/contacts/${params.contactId}`);
};
function EditContact() {
  let { contact } = (0, import_react4.useLoaderData)(), navigate = (0, import_react4.useNavigate)();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react4.Form, { id: "contact-form", method: "post", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u540D\u524D" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          defaultValue: contact.first,
          "aria-label": "First name",
          name: "first",
          type: "text",
          placeholder: "\u6700\u521D\u540D"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          "aria-label": "Last name",
          defaultValue: contact.last,
          name: "last",
          placeholder: "\u6700\u5F8C\u540D",
          type: "text"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u30C4\u30A4\u30C3\u30BF\u30FC" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          defaultValue: contact.twitter,
          name: "twitter",
          placeholder: "@jack",
          type: "text"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u30A2\u30D0\u30BF\u30FC URL" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          "aria-label": "Avatar URL",
          defaultValue: contact.avatar,
          name: "avatar",
          placeholder: "https://example.com/avatar.jpg",
          type: "text"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u30E1\u30E2\u5E33" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "textarea",
        {
          defaultValue: contact.notes,
          name: "notes",
          rows: 6
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "submit", children: "\u4FDD\u5B58" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { onClick: () => navigate(-1), type: "button", children: "\u30AD\u30E3\u30F3\u30BB\u30EB" })
    ] })
  ] });
}

// app/routes/contacts.$contactId.tsx
var contacts_contactId_exports = {};
__export(contacts_contactId_exports, {
  action: () => action4,
  default: () => Contact,
  loader: () => loader3
});
var import_node5 = require("@remix-run/node"), import_react5 = require("@remix-run/react"), import_tiny_invariant4 = __toESM(require("tiny-invariant"));
var import_jsx_runtime4 = require("react/jsx-runtime"), loader3 = async ({
  params
}) => {
  (0, import_tiny_invariant4.default)(params.contactId, "Missing contactId param");
  let contact = await getContact(params.contactId);
  if (!contact)
    throw new Response("Not Found", { status: 404 });
  return (0, import_node5.json)({ contact });
}, action4 = async ({
  params,
  request
}) => {
  (0, import_tiny_invariant4.default)(params.contactId, "Missing contactId param");
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true"
  });
};
function Contact() {
  let { contact } = (0, import_react5.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { id: "contact", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "img",
      {
        alt: `${contact.first} ${contact.last} avatar`,
        src: contact.avatar
      },
      contact.avatar
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h1", { children: [
        contact.first || contact.last ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
          contact.first,
          " ",
          contact.last
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { children: "No Name" }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Favorite, { contact })
      ] }),
      contact.twitter ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "a",
        {
          href: `https://twitter.com/${contact.twitter}`,
          children: contact.twitter
        }
      ) }) : null,
      contact.notes ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: contact.notes }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react5.Form, { action: "edit", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "submit", children: "\u7DE8\u96C6" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          import_react5.Form,
          {
            action: "destroy",
            method: "post",
            onSubmit: (event) => {
              confirm(
                "\u3053\u306E\u30EC\u30B3\u30FC\u30C9\u3092\u524A\u9664\u3059\u308B\u3053\u3068\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
              ) || event.preventDefault();
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "submit", children: "\u524A\u9664" })
          }
        )
      ] })
    ] })
  ] });
}
var Favorite = ({ contact }) => {
  let fetcher = (0, import_react5.useFetcher)(), favorite = fetcher.formData ? fetcher.formData.get("favorite") === "true" : contact.favorite;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(fetcher.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "button",
    {
      "aria-label": favorite ? "Remove from favorites" : "Add to favorites",
      name: "favorite",
      value: favorite ? "false" : "true",
      children: favorite ? "\u2605" : "\u2606"
    }
  ) });
};

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});
var import_jsx_runtime5 = require("react/jsx-runtime");
function Index() {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { id: "index-page", children: [
    "Remix JS \u30D5\u30EC\u30E0\u30EF\u30AF\u3054\u4F7F\u7528\u3044\u305F\u3060\u304D\u307E\u3057\u305F\u3002",
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {}),
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("a", { href: "https://remix.run", children: "remix.run \u3067\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u78BA\u8A8D .." })
  ] });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-QQJB2NMY.js", imports: ["/build/_shared/chunk-3VTHAQY2.js", "/build/_shared/chunk-GDLBX7ER.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-7Z6PKC2Q.js", imports: ["/build/_shared/chunk-PGOH7JLP.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-FIWHDU57.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/contacts.$contactId": { id: "routes/contacts.$contactId", parentId: "root", path: "contacts/:contactId", index: void 0, caseSensitive: void 0, module: "/build/routes/contacts.$contactId-JM2NRKBL.js", imports: ["/build/_shared/chunk-URNZPFSF.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/contacts.$contactId.destroy": { id: "routes/contacts.$contactId.destroy", parentId: "routes/contacts.$contactId", path: "destroy", index: void 0, caseSensitive: void 0, module: "/build/routes/contacts.$contactId.destroy-Z27RBOGT.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/contacts.$contactId_.edit": { id: "routes/contacts.$contactId_.edit", parentId: "root", path: "contacts/:contactId/edit", index: void 0, caseSensitive: void 0, module: "/build/routes/contacts.$contactId_.edit-NW4GOJ6X.js", imports: ["/build/_shared/chunk-URNZPFSF.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "1fd7492b", hmr: void 0, url: "/build/manifest-1FD7492B.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/contacts.$contactId.destroy": {
    id: "routes/contacts.$contactId.destroy",
    parentId: "routes/contacts.$contactId",
    path: "destroy",
    index: void 0,
    caseSensitive: void 0,
    module: contacts_contactId_destroy_exports
  },
  "routes/contacts.$contactId_.edit": {
    id: "routes/contacts.$contactId_.edit",
    parentId: "root",
    path: "contacts/:contactId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: contacts_contactId_edit_exports
  },
  "routes/contacts.$contactId": {
    id: "routes/contacts.$contactId",
    parentId: "root",
    path: "contacts/:contactId",
    index: void 0,
    caseSensitive: void 0,
    module: contacts_contactId_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
});
