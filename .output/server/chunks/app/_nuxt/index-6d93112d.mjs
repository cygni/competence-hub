import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  __ssrInlineRender: true,
  props: ["id"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<dialog${ssrRenderAttrs(mergeProps({
        id: __props.id,
        class: "min-w-[33%] p-0 shadow rounded-lg"
      }, _attrs))} data-v-1889c5e8>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</dialog>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1889c5e8"]]);
const _imports_0 = "" + buildAssetsURL("close-white.15e1c8c9.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Tag",
  __ssrInlineRender: true,
  props: {
    tag: {},
    edit: { type: Boolean }
  },
  emits: ["setSelectedTag"],
  setup(__props, { emit }) {
    const props = __props;
    const fullstackColors = ["#000735", "#440B45"];
    const backendColors = ["#00b3b0", "#00966d"];
    const frontendColors = ["#eab8b2", "#DD5928"];
    const embeddedColors = ["#f9e79f", "#e3d9d7"];
    const colors = [
      "#000735",
      "#eab8b2",
      "#231F20",
      "#440B45",
      "#DD5928",
      "#0f4c81",
      "#00b3b0",
      "#00966d",
      "#f9e79f"
    ];
    const randomBackground = (tag) => {
      if (!tag.aspect) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return {
          "background-color": colors[randomIndex]
        };
      }
      switch (tag.aspect) {
        case "backend": {
          const randomIndex = Math.floor(Math.random() * backendColors.length);
          return {
            "background-color": backendColors[randomIndex]
          };
        }
        case "frontend": {
          const randomIndex = Math.floor(Math.random() * frontendColors.length);
          return {
            "background-color": frontendColors[randomIndex]
          };
        }
        case "fullstack": {
          const randomIndex = Math.floor(Math.random() * fullstackColors.length);
          return {
            "background-color": fullstackColors[randomIndex]
          };
        }
        case "embedded": {
          const randomIndex = Math.floor(Math.random() * fullstackColors.length);
          return {
            "background-color": embeddedColors[randomIndex],
            color: "#000735"
          };
        }
      }
    };
    const showConfirmDialog = (tag) => {
      console.log("lalala");
      console.log("show confirm dialog set selected tag", tag);
      emit("setSelectedTag", tag);
      const dialog = document.getElementById("confirmDialog");
      dialog.addEventListener("click", closeDialogIfOutside);
      dialog.addEventListener("cancel", closeDialogIfOutside);
      dialog.showModal();
    };
    const closeDialogIfOutside = (ev) => {
      if (ev.target.id === "confirmDialog")
        ;
      switch (props.tag.aspect) {
        case "backend": {
          const randomIndex = Math.floor(Math.random() * backendColors.length);
          return backendColors[randomIndex];
        }
        case "frontend": {
          const randomIndex = Math.floor(Math.random() * frontendColors.length);
          return frontendColors[randomIndex];
        }
        case "fullstack": {
          const randomIndex = Math.floor(Math.random() * fullstackColors.length);
          return fullstackColors[randomIndex];
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "text-white p-2 mr-2 mb-2 rounded-xl inline-flex transition max-w-20 group",
        style: randomBackground(_ctx.tag)
      }, _attrs))}><div${ssrRenderAttr("id", "tag-" + _ctx.tag)}>${ssrInterpolate(_ctx.tag.value ? _ctx.tag.value : _ctx.tag)}</div>`);
      if (_ctx.edit) {
        _push(`<div${ssrRenderAttr("onClick", () => showConfirmDialog(_ctx.tag))} class="cursor-pointer transition-width ease-in-out max-w-0 group-hover:max-w-full"><img${ssrRenderAttr("src", _imports_0)} alt="delete" width="25"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tag.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Mode = /* @__PURE__ */ ((Mode2) => {
  Mode2["Overview"] = "Overview";
  Mode2["Edit"] = "Edit";
  Mode2["Read"] = "Read";
  Mode2["New"] = "New";
  return Mode2;
})(Mode || {});
var Aspect = /* @__PURE__ */ ((Aspect2) => {
  Aspect2["Backend"] = "backend";
  Aspect2["Fullstack"] = "fullstack";
  Aspect2["Frontend"] = "frontend";
  Aspect2["Embedded"] = "embedded";
  return Aspect2;
})(Aspect || {});

export { Aspect as A, Mode as M, __nuxt_component_0 as _, _sfc_main as a };
//# sourceMappingURL=index-6d93112d.mjs.map
