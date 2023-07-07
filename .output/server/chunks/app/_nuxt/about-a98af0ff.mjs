import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
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

const _imports_0 = "" + buildAssetsURL("github.7a0dd11e.svg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({ class: "transition inline-flex items-center text-2xl" }, _attrs))}><img${ssrRenderAttr("src", _imports_0)} class="mr-4" alt="edit" width="50" height="50"><a href="https://github.com/cygni/competence-hub/" target="_blank" class="transition hover:text-blue-500"> Source code on Github </a></button>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { about as default };
//# sourceMappingURL=about-a98af0ff.mjs.map
