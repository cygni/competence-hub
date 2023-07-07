import { A as Aspect, a as _sfc_main$2, _ as __nuxt_component_0 } from './index-6d93112d.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
import { u as useCollection, a as collection, b as useFirestore, e as setDoc, f as doc, c as createError$1, h as deleteDoc } from '../server.mjs';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'h3';
import 'devalue';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'firebase/auth';
import '@firebase/app';
import 'firebase-admin/app';
import 'firebase-admin/auth';
import 'lru-cache';
import '@firebase/component';
import '@firebase/logger';
import 'util';
import '@firebase/util';
import 'crypto';
import '@firebase/webchannel-wrapper';
import '@grpc/grpc-js';
import '@grpc/proto-loader';

const collection_name = "competence-tags";
const getFilteredTags = () => {
  const doc_refs = useCollection(collection(useFirestore(), collection_name));
  const res = [];
  doc_refs.value.forEach((tag) => {
    res.push({
      ...tag
    });
  });
  const filteredTags = filterTags(res);
  return filteredTags;
};
const deleteTag = (tag) => {
  deleteDoc(doc(useFirestore(), "competence-tags", tag.value));
};
const getAllTags = () => {
  const doc_refs = useCollection(collection(useFirestore(), collection_name));
  const res = [];
  doc_refs.value.forEach((tag) => {
    res.push({
      ...tag
    });
  });
  return res;
};
const filterTags = (tags) => {
  let filter = { aspect: "frontend" };
  const frontendTags = tags == null ? void 0 : tags.filter(function(tag) {
    for (let key in filter) {
      if (tag[key] === void 0 || tag[key] != filter[key])
        return false;
    }
    return true;
  });
  filter.aspect = "backend";
  const backendTags = tags == null ? void 0 : tags.filter(function(tag) {
    for (let key in filter) {
      if (tag[key] === void 0 || tag[key] != filter[key])
        return false;
    }
    return true;
  });
  filter.aspect = "fullstack";
  const fullstackTags = tags == null ? void 0 : tags.filter(function(tag) {
    for (let key in filter) {
      if (tag[key] === void 0 || tag[key] != filter[key])
        return false;
    }
    return true;
  });
  filter.aspect = "embedded";
  const embeddedTags = tags == null ? void 0 : tags.filter(function(tag) {
    for (let key in filter) {
      if (tag[key] === void 0 || tag[key] != filter[key])
        return false;
    }
    return true;
  });
  return {
    fullstack: fullstackTags,
    frontend: frontendTags,
    backend: backendTags,
    embedded: embeddedTags
  };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ConfirmDialog",
  __ssrInlineRender: true,
  props: {
    tag: {}
  },
  emits: ["updateTagsList"],
  setup(__props, { emit }) {
    const closeDialogIfOutside = (ev) => {
      if (ev.target.id === "confirmDialog") {
        closeDialog();
      }
    };
    const closeDialog = (e) => {
      const dialog = document.getElementById("confirmDialog");
      dialog.removeEventListener("click", closeDialogIfOutside);
      dialog.removeEventListener("cancel", closeDialogIfOutside);
      dialog.close();
    };
    const confirmDeleteTag = (tag) => {
      console.log("delete tag hmm", tag);
      deleteTag(tag);
      emit("updateTagsList");
      closeDialog();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = __nuxt_component_0;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({ id: "confirmDialog" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative w-full max-h-full"${_scopeId}><div class="relative bg-white rounded-lg shadow dark:bg-gray-700"${_scopeId}><button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal"${ssrRenderAttr("onClick", () => closeDialog())}${_scopeId}><svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"${_scopeId}><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"${_scopeId}></path></svg><span class="sr-only"${_scopeId}>Close modal</span></button><div class="p-6 text-center"${_scopeId}><svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"${_scopeId}><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"${_scopeId}></path></svg><h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"${_scopeId}> Are you sure you want to delete the tag <u${_scopeId}>${ssrInterpolate(_ctx.tag.value)}</u>? </h3><button${ssrRenderAttr("onClick", () => confirmDeleteTag(_ctx.tag))} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"${_scopeId}> Yes, I&#39;m sure </button><button${ssrRenderAttr("onClick", () => closeDialog())} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"${_scopeId}> No, cancel </button></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "relative w-full max-h-full" }, [
                createVNode("div", { class: "relative bg-white rounded-lg shadow dark:bg-gray-700" }, [
                  createVNode("button", {
                    type: "button",
                    class: "absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white",
                    "data-modal-hide": "popup-modal",
                    onClick: () => closeDialog()
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-3 h-3",
                      "aria-hidden": "true",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 14 14"
                    }, [
                      createVNode("path", {
                        stroke: "currentColor",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      })
                    ])),
                    createVNode("span", { class: "sr-only" }, "Close modal")
                  ], 8, ["onClick"]),
                  createVNode("div", { class: "p-6 text-center" }, [
                    (openBlock(), createBlock("svg", {
                      class: "mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200",
                      "aria-hidden": "true",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 20 20"
                    }, [
                      createVNode("path", {
                        stroke: "currentColor",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      })
                    ])),
                    createVNode("h3", { class: "mb-5 text-lg font-normal text-gray-500 dark:text-gray-400" }, [
                      createTextVNode(" Are you sure you want to delete the tag "),
                      createVNode("u", null, toDisplayString(_ctx.tag.value), 1),
                      createTextVNode("? ")
                    ]),
                    createVNode("button", {
                      onClick: () => confirmDeleteTag(_ctx.tag),
                      "data-modal-hide": "popup-modal",
                      type: "button",
                      class: "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    }, " Yes, I'm sure ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: () => closeDialog(),
                      "data-modal-hide": "popup-modal",
                      type: "button",
                      class: "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    }, " No, cancel ", 8, ["onClick"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ConfirmDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tags",
  __ssrInlineRender: true,
  setup(__props) {
    let newTag = ref({ value: "", aspect: "" });
    let tags = ref(getFilteredTags());
    let selectedTag = ref({ value: "", aspect: "" });
    const isDuplicate = (newTagValue) => {
      const tagValues = getAllTags().map((tag) => tag.value);
      return tagValues.includes(newTagValue);
    };
    const addTag = () => {
      console.log("tag", newTag);
      if (!isDuplicate(newTag.value.value)) {
        let aspect = "";
        switch (newTag.value.aspect) {
          case Aspect.Fullstack: {
            aspect = "fullstack";
            break;
          }
          case Aspect.Frontend: {
            aspect = "frontend";
            break;
          }
          case Aspect.Backend: {
            aspect = "backend";
            break;
          }
          case Aspect.Embedded: {
            aspect = "embedded";
            break;
          }
        }
        if (newTag.value.value != "" || aspect != "") {
          setDoc(doc(useFirestore(), "competence-tags", newTag.value.value), {
            aspect,
            value: newTag.value.value
          }).then(() => {
            tags.value = getFilteredTags();
          });
        }
      } else {
        throw createError$1({
          statusCode: 403,
          statusMessage: "Cant add duplicate tech tags"
        });
      }
    };
    const updateTagsList = () => {
      setTimeout(() => {
        tags.value = getFilteredTags();
      }, 1e3);
    };
    const setSelectedTag = (tag) => {
      console.log("set selectedTag", tag);
      selectedTag.value = tag;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_Tag = _sfc_main$2;
      const _component_ConfirmDialog = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-gray-700" }, _attrs))}><h2 class="text-2xl mb-6">Available tech-tags</h2><div class="flex flex-row"><div class="rounded basis-1/4 shadow-lg bg-white p-3 mr-3"><h2 class="text-xl mb-3">Frontend</h2><div class="flex flex-wrap max-w-[80%]">`);
      if (((_a = unref(tags).frontend) == null ? void 0 : _a.length) > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(tags).frontend, (tag) => {
          _push(ssrRenderComponent(_component_Tag, {
            edit: true,
            tag,
            onSetSelectedTag: setSelectedTag
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="rounded basis-1/4 shadow-lg bg-white p-3 mx-3"><h2 class="text-xl mb-3">Backend</h2><div class="flex flex-wrap max-w-[80%]">`);
      if (((_b = unref(tags).backend) == null ? void 0 : _b.length) > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(tags).backend, (tag) => {
          _push(ssrRenderComponent(_component_Tag, {
            edit: true,
            tag,
            onSetSelectedTag: setSelectedTag
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="rounded basis-1/4 shadow-lg bg-white p-3 mx-3"><h2 class="text-xl mb-3">Fullstack</h2><div class="flex flex-wrap max-w-[80%]">`);
      if (((_c = unref(tags).fullstack) == null ? void 0 : _c.length) > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(tags).fullstack, (tag) => {
          _push(ssrRenderComponent(_component_Tag, {
            edit: true,
            tag,
            onSetSelectedTag: setSelectedTag
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="rounded basis-1/4 shadow-lg bg-white p-3 ml-3"><h2 class="text-xl mb-3">Embedded</h2><div class="flex flex-wrap max-w-[80%]">`);
      if (((_d = unref(tags).embedded) == null ? void 0 : _d.length) > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(tags).embedded, (tag) => {
          _push(ssrRenderComponent(_component_Tag, {
            edit: true,
            tag,
            onSetSelectedTag: setSelectedTag
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><form class="grid grid-cols-1 gap-4 mt-9"${ssrRenderAttr("onSubmit", addTag)}><div class="col-span-1 max-w-md"><label class="uppercase tracking-wider text-xs font-bold text-gray-700" for="techtag-value"> Tech tag </label><input${ssrRenderAttr("value", unref(newTag).value)} id="techtag-value" class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500" placeholder="New tech tag..."></div><div class="col-span-1 max-w-lg"><label class="uppercase tracking-wider text-xs font-bold text-gray-700">Aspect</label><div class="appearance-none w-full text-gray-700 rounded py-3 px-2 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"><input class="mr-2" type="radio" id="backend"${ssrRenderAttr("value", unref(Aspect).Backend)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(newTag).aspect, unref(Aspect).Backend)) ? " checked" : ""}><label class="mr-8" for="backend">Backend</label><input class="mr-2" type="radio" id="frontend"${ssrRenderAttr("value", unref(Aspect).Frontend)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(newTag).aspect, unref(Aspect).Frontend)) ? " checked" : ""}><label class="mr-8" for="frontend">Frontend</label><input class="mr-2" type="radio" id="fullstack"${ssrRenderAttr("value", unref(Aspect).Fullstack)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(newTag).aspect, unref(Aspect).Fullstack)) ? " checked" : ""}><label class="mr-8" for="fullstack">Fullstack</label><input class="mr-2" type="radio" id="embedded"${ssrRenderAttr("value", unref(Aspect).Embedded)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(newTag).aspect, unref(Aspect).Embedded)) ? " checked" : ""}><label class="mr-8" for="embedded">Embedded</label></div></div></form>`);
      _push(ssrRenderComponent(_component_ConfirmDialog, {
        tag: unref(selectedTag),
        onUpdateTagsList: updateTagsList
      }, null, _parent));
      _push(`<div class="col-span-1 flex justify-center items-center mt-4 max-w-xs"><button class="w-full btn"${ssrIncludeBooleanAttr(!unref(newTag).value || !unref(newTag).aspect) ? " disabled" : ""}> Add tech tag </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tags.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tags-6da9de34.mjs.map
