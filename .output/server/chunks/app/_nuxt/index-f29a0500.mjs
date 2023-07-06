import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { M as Mode, _ as __nuxt_component_0, a as _sfc_main$3 } from './index-6d93112d.mjs';
import { d as defineStore, u as useCollection, a as collection, b as useFirestore, s as storeToRefs, e as setDoc, f as doc, g as updateDoc, h as deleteDoc } from '../server.mjs';
import { ref, computed, useSSRContext, defineComponent, unref, withCtx, openBlock, createBlock, createVNode, createCommentVNode, watchEffect, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import createError from 'http-errors';
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

const _imports_0 = "" + buildAssetsURL("edit.7d0726f5.svg");
const _imports_1 = "" + buildAssetsURL("delete.dfcbe6e0.svg");
const _imports_2 = "" + buildAssetsURL("close.a6e336b3.svg");
const _imports_3 = "" + buildAssetsURL("arrow-down.d226c7e9.svg");
const useModeStore = defineStore("modeStore", () => {
  const mode = ref(Mode.Overview);
  const getMode = computed(() => mode);
  function setOverviewMode() {
    this.mode = Mode.Overview;
  }
  function setReadMode() {
    this.mode = Mode.Read;
  }
  function setEditMode() {
    this.mode = Mode.Edit;
  }
  function setNewMode() {
    this.mode = Mode.New;
  }
  return {
    mode,
    getMode,
    setOverviewMode,
    setReadMode,
    setEditMode,
    setNewMode
  };
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    selectedproject: {}
  },
  emits: [
    "addToProject",
    "deleteProject",
    "setEditMode",
    "closeDialog"
  ],
  setup(__props, { emit }) {
    const { selectedproject } = __props;
    const modeStore = useModeStore();
    const { mode } = storeToRefs(modeStore);
    const tagOptions = useCollection(collection(useFirestore(), "competence-tags"));
    const title = ref("");
    const description = ref("");
    const contact = ref("");
    const tags = ref([]);
    const comment = ref("");
    const link = ref("");
    const heading = ref("");
    const isInputDisabled = ref(
      mode.value === Mode.Edit || mode.value === Mode.New ? false : true
    );
    if (mode.value === Mode.Read) {
      title.value = selectedproject.title;
      description.value = selectedproject.description;
      contact.value = selectedproject.contact;
      tags.value = selectedproject.tags;
      comment.value = selectedproject.comment;
      link.value = selectedproject.link;
    }
    watchEffect(() => {
      switch (mode.value) {
        case Mode.Overview:
        case Mode.Read: {
          heading.value = `Project ${selectedproject == null ? void 0 : selectedproject.title}`;
          isInputDisabled.value = true;
          break;
        }
        case Mode.Edit: {
          heading.value = `Edit project ${selectedproject == null ? void 0 : selectedproject.title}`;
          isInputDisabled.value = false;
          break;
        }
        case Mode.New: {
          heading.value = "Create new project";
          isInputDisabled.value = false;
          break;
        }
      }
    });
    const submit = (e) => {
      e.preventDefault();
      emit(
        "addToProject",
        {
          title: title.value,
          description: description.value,
          contact: contact.value,
          tags: tags.value,
          comment: comment.value,
          link: link.value
        },
        mode.value
      );
      e.target.reset();
    };
    const deleteTag = (tag) => {
      console.log("delete function");
      console.log("tag to delete", tag);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-lg shadow-lg p-6 overflow-hidden" }, _attrs))}><div class="text-gray-700 mb-4 flex justify-between"><h1 class="tracking-wider text-2xl font-bold">${ssrInterpolate(unref(heading))}</h1><div class="flex gap-2">`);
      if (unref(mode) === unref(Mode).Read) {
        _push(`<button${ssrRenderAttr("onClick", () => _ctx.$emit("setEditMode"))} type="button" class="btn bg-blue-500 hover:bg-blue-700 inline-flex"><img${ssrRenderAttr("src", _imports_0)} class="mr-2" alt="edit" width="20" height="20"><span>Edit</span></button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(mode) !== unref(Mode).New) {
        _push(`<button type="button" class="btn bg-red-500 hover:bg-red-700 inline-flex"${ssrRenderAttr("onClick", () => _ctx.$emit("deleteProject", unref(title)))}><img${ssrRenderAttr("src", _imports_1)} class="mr-2" alt="delete" width="20" height="20"><span>Delete</span></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<img${ssrRenderAttr("onClick", () => _ctx.$emit("closeDialog"))}${ssrRenderAttr("src", _imports_2)} class="ml-4 cursor-pointer transition hover:bg-gray-200 rounded-full" alt="close" width="30"></div></div><form class="grid grid-cols-2 gap-4"${ssrRenderAttr("onSubmit", submit)}><div class="col-span-2"><label class="uppercase tracking-wider text-xs font-bold text-gray-700" for="project-title"> Title </label><input class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500" id="project-title" type="text" required placeholder="Enter a title for the project"${ssrRenderAttr("value", unref(title))}${ssrIncludeBooleanAttr(unref(isInputDisabled)) ? " disabled" : ""}></div><div class="col-span-2"><label class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700" for="project-description"> Description </label><input class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500" id="project-description" placeholder="Enter a description for the project" type="text" required${ssrRenderAttr("value", unref(description))}${ssrIncludeBooleanAttr(unref(isInputDisabled)) ? " disabled" : ""}></div><div class="col-span-1"><label class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700" for="project-contact"> Contact (Email) </label><input class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500" id="project-contact" type="email" required placeholder="Enter your email"${ssrRenderAttr("value", unref(contact))}${ssrIncludeBooleanAttr(unref(isInputDisabled)) ? " disabled" : ""}></div><div class="col-span-1"><label class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700" for="project-tags"> Tags </label><div class="relative"><select class="appearance-none cursor-pointer w-full border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="project-tags" name="tags"${ssrIncludeBooleanAttr(unref(isInputDisabled)) ? " disabled" : ""}><!--[-->`);
      ssrRenderList(unref(tagOptions), (tag) => {
        _push(`<option${ssrRenderAttr("value", tag.value)}>${ssrInterpolate(tag.value)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><img${ssrRenderAttr("onClick", () => _ctx.$emit("closeDialog"))}${ssrRenderAttr("src", _imports_3)} alt="arrow down" width="20"></div></div></div><div class="col-span-2"><label class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700" for="project-comment"> Comments </label><textarea class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500" id="project-comment" placeholder="Enter the purpose of the project" type="text" required${ssrIncludeBooleanAttr(unref(isInputDisabled)) ? " disabled" : ""}>${ssrInterpolate(unref(comment))}</textarea></div><div class="col-span-2"><label class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700" for="project-link"> Github </label><input class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500" id="project-link" type="link" required placeholder="Enter the projects github url"${ssrRenderAttr("value", unref(link))}${ssrIncludeBooleanAttr(unref(isInputDisabled)) ? " disabled" : ""}></div>`);
      if (unref(mode) === unref(Mode).Edit) {
        _push(`<div class="mt-4"><!--[-->`);
        ssrRenderList(_ctx.selectedproject.tags, (tag) => {
          _push(ssrRenderComponent(_component_Tag, {
            tag,
            edit: true,
            onDeleteTag: deleteTag
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(mode) === unref(Mode).Edit || unref(mode) === unref(Mode).New) {
        _push(`<div class="col-span-2 flex justify-center items-center mt-4"><button class="w-full btn" type="submit">Submit</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Form.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProjectCard",
  __ssrInlineRender: true,
  props: ["project"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "card transition hover:bg-slate-100 cursor-pointer overflow-hidden",
        onClick: () => _ctx.$emit("setSelectedProject", __props.project)
      }, _attrs))}><h1 class="font-bold pb-4">${ssrInterpolate(__props.project.title)}</h1><p class="truncate">${ssrInterpolate(__props.project.description)}</p><p>${ssrInterpolate(__props.project.contact)}</p><div class="flex flex-row flex-wrap py-4 mt-auto"><!--[-->`);
      ssrRenderList(__props.project.tags, (tag) => {
        _push(ssrRenderComponent(_component_Tag, { tag }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    let projects = useCollection(collection(useFirestore(), "competence-projects"));
    if (!projects) {
      throw createError({ statusCode: 404, statusMessage: "No projects" });
    }
    let selectedproject = ref();
    const modeStore = useModeStore();
    const { getMode } = storeToRefs(modeStore);
    const mode = getMode.value;
    const { setReadMode, setEditMode, setNewMode, setOverviewMode } = modeStore;
    const addToProject = (p, mode2) => {
      if (isProjectFormValid(p)) {
        const body = {
          id: p.id,
          title: p.title,
          description: p.description,
          contact: p.contact,
          tags: p.tags,
          comment: p.comment,
          link: p.link
        };
        mode2 === Mode.New ? setDoc(doc(useFirestore(), "competence-projects", p.title), body) : updateDoc(doc(useFirestore(), "competence-projects", p.title), body);
      }
      setReadMode();
      readProject();
      closeDialog();
    };
    const isProjectFormValid = (p) => {
      return p.title != "" || p.description != "" || p.contact != "" || p.comment != "" || p.link != "" || p.tags.length === 0;
    };
    const deleteProject = (title) => {
      deleteDoc(doc(useFirestore(), "competence-projects", title));
      closeDialog();
    };
    const readProject = () => {
      projects = useCollection(collection(useFirestore(), "competence-projects"));
    };
    const showDialog = (project) => {
      if (project) {
        selectedproject.value = project;
        setReadMode();
      } else {
        setNewMode();
      }
      const dialog = document.getElementById("projectDialog");
      dialog.addEventListener("click", closeDialogIfOutside);
      dialog.addEventListener("cancel", closeDialogIfOutside);
      dialog.showModal();
    };
    function closeDialogIfOutside(ev) {
      if (ev.target.id === "projectDialog") {
        closeDialog();
      }
    }
    function closeDialog() {
      const dialog = document.getElementById("projectDialog");
      dialog.removeEventListener("click", closeDialogIfOutside);
      dialog.removeEventListener("cancel", closeDialogIfOutside);
      dialog.close();
      selectedproject.value = void 0;
      setOverviewMode();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = __nuxt_component_0;
      const _component_Form = _sfc_main$2;
      const _component_ProjectCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-center items-center mb-8"><button class="btn mr-4"${ssrRenderAttr(
        "onClick",
        () => {
          showDialog();
        }
      )}> Create new project </button><button class="btn"${ssrRenderAttr("onClick", unref(setOverviewMode))}>Go to overview</button></div>`);
      _push(ssrRenderComponent(_component_Dialog, { id: "projectDialog" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(mode) != unref(Mode).Overview) {
              _push2(`<div id="wrapper"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Form, {
                selectedproject: unref(selectedproject),
                onAddToProject: addToProject,
                onDeleteProject: deleteProject,
                onSetEditMode: unref(setEditMode),
                onCloseDialog: closeDialog
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(mode) != unref(Mode).Overview ? (openBlock(), createBlock("div", {
                key: 0,
                id: "wrapper"
              }, [
                createVNode(_component_Form, {
                  selectedproject: unref(selectedproject),
                  onAddToProject: addToProject,
                  onDeleteProject: deleteProject,
                  onSetEditMode: unref(setEditMode),
                  onCloseDialog: closeDialog
                }, null, 8, ["selectedproject", "onSetEditMode"])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid md:grid-cols-4 sm:grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(unref(projects), (project) => {
        _push(ssrRenderComponent(_component_ProjectCard, {
          key: project.id,
          project,
          onSetSelectedProject: showDialog
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-f29a0500.mjs.map
