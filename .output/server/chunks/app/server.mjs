import { toRaw, isRef, isReactive, toRef, version as version$3, ref, hasInjectionContext, getCurrentInstance, inject, unref, shallowRef, getCurrentScope, watch, onServerPrefetch, onScopeDispose, useSSRContext, createApp, reactive, effectScope, ssrContextKey, nextTick, computed, isReadonly, provide, onErrorCaptured, createVNode, resolveDynamicComponent, markRaw, toRefs, isShallow, defineAsyncComponent, withCtx, defineComponent, h, Suspense, Transition } from 'vue';
import { $fetch } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { klona } from 'klona';
import { createError as createError$2, sanitizeStatusCode, getCookie } from 'h3';
import { renderSSRHead } from '@unhead/ssr';
import { createServerHead as createServerHead$1 } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { createMemoryHistory, createRouter, START_LOCATION, useRoute as useRoute$1, RouterView } from 'vue-router';
import { hasProtocol, parseURL, joinURL } from 'ufo';
import { getAuth as getAuth$1, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { registerVersion, deleteApp, initializeApp, getApp, _getProvider, _registerComponent, SDK_VERSION as SDK_VERSION$1 } from '@firebase/app';
import { getApps, initializeApp as initializeApp$1, cert, applicationDefault, getApp as getApp$1 } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import LRU from 'lru-cache';
import { Component } from '@firebase/component';
import { Logger, LogLevel } from '@firebase/logger';
import { inspect, TextEncoder } from 'util';
import { getModularInstance, FirebaseError, getDefaultEmulatorHostnameAndPort, createMockUserToken } from '@firebase/util';
import { randomBytes as randomBytes$1 } from 'crypto';
import { Integer, Md5 } from '@firebase/webchannel-wrapper';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import { defu } from 'defu';
import { a as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.5.3";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => callWithNuxt(nuxtApp, fn),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name2, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name2, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name2, value) => {
    const $name = "$" + name2;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext._payloadReducers = {};
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 !== "function") {
    return;
  }
  const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a;
  const parallels = [];
  const errors = [];
  for (const plugin2 of plugins2) {
    const promise = applyPlugin(nuxtApp, plugin2);
    if ((_a = plugin2.meta) == null ? void 0 : _a.parallel) {
      parallels.push(promise.catch((e) => errors.push(e)));
    } else {
      await promise;
    }
  }
  await Promise.all(parallels);
  if (errors.length) {
    throw errors[0];
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = [];
  for (const plugin2 of _plugins2) {
    if (typeof plugin2 !== "function") {
      continue;
    }
    let _plugin = plugin2;
    if (plugin2.length > 1) {
      _plugin = (nuxtApp) => plugin2(nuxtApp, nuxtApp.provide);
    }
    plugins2.push(_plugin);
  }
  plugins2.sort((a, b) => {
    var _a, _b;
    return (((_a = a.meta) == null ? void 0 : _a.order) || orderMap.default) - (((_b = b.meta) == null ? void 0 : _b.order) || orderMap.default);
  });
  return plugins2;
}
const orderMap = {
  pre: -20,
  default: 0,
  post: 20
};
function defineNuxtPlugin(plugin2, meta) {
  var _a;
  if (typeof plugin2 === "function") {
    return /* @__PURE__ */ defineNuxtPlugin({ setup: plugin2 }, meta);
  }
  const wrapper = (nuxtApp) => {
    if (plugin2.hooks) {
      nuxtApp.hooks.addHooks(plugin2.hooks);
    }
    if (plugin2.setup) {
      return plugin2.setup(nuxtApp);
    }
  };
  wrapper.meta = {
    name: (meta == null ? void 0 : meta.name) || plugin2.name || ((_a = plugin2.setup) == null ? void 0 : _a.name),
    parallel: plugin2.parallel,
    order: (meta == null ? void 0 : meta.order) || plugin2.order || orderMap[plugin2.enforce || "default"] || orderMap.default
  };
  wrapper[NuxtPluginIndicator] = true;
  return wrapper;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function useNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const isVue2 = false;
/*!
  * pinia v2.1.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject$1(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop$1 = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop$1) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name2) => {
      computedGetters[name2] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name2].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop$1
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name2, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: name2,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return runWithContext(() => scope.run(setup));
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function storeToRefs(store) {
  {
    store = toRaw(store);
    const refs = {};
    for (const key in store) {
      const value = store[key];
      if (isRef(value) || isReactive(value)) {
        refs[key] = // ---
        toRef(store, key);
      }
    }
    return refs;
  }
}
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
const Vue3 = version$3.startsWith("3");
const headSymbol = "usehead";
function vueInstall(head) {
  const plugin2 = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin2.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1({
    ...options,
    plugins: [
      VueReactiveUseHeadPlugin(),
      ...(options == null ? void 0 : options.plugins) || []
    ]
  });
  head.install = vueInstall(head);
  return head;
}
function VueReactiveUseHeadPlugin() {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry2 of ctx.entries)
          entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
      }
    }
  });
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, fullPath);
      async function redirect() {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return inMiddleware ? (
          /* abort route navigation */
          false
        ) : void 0;
      }
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect() : void 0);
        return to;
      }
      return redirect();
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError$1(_err);
  try {
    const nuxtApp = useNuxtApp();
    const error = useError();
    if (false)
      ;
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError$1 = (err) => {
  const _err = createError$2(err);
  _err.__nuxt_error = true;
  return _err;
};
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [], "title": "Competence Hub" };
const appPageTransition = { "name": "page", "mode": "out-in" };
const appLayoutTransition = false;
const appKeepalive = false;
function definePayloadReducer(name2, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name2] = reduce;
  }
}
function isObject$1(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject$1(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject$1(value) && isObject$1(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defuFn = createDefu((object, key, currentValue) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const inlineConfig = {
  "firebaseConfig": {
    "apiKey": "AIzaSyCv2SZo5e62v566bJOgLRPe5erL7VCUGok",
    "authDomain": "cygnicompetencehub.firebaseapp.com",
    "projectId": "cygnicompetencehub",
    "storageBucket": "cygnicompetencehub.appspot.com",
    "messagingSenderId": "225273337132",
    "appId": "1:225273337132:web:161ab4d7909b78531e0889",
    "measurementId": "G-JY96C7V423"
  },
  "vuefireOptions": {
    "optionsApiPlugin": false,
    "auth": true,
    "config": {
      "apiKey": "AIzaSyCv2SZo5e62v566bJOgLRPe5erL7VCUGok",
      "authDomain": "cygnicompetencehub.firebaseapp.com",
      "projectId": "cygnicompetencehub",
      "storageBucket": "cygnicompetencehub.appspot.com",
      "messagingSenderId": "225273337132",
      "appId": "1:225273337132:web:161ab4d7909b78531e0889",
      "measurementId": "G-JY96C7V423"
    },
    "admin": {
      "serviceAccount": "credentials.json"
    }
  },
  "firebaseAdmin": {
    "serviceAccount": "credentials.json"
  }
};
const __appConfig = /* @__PURE__ */ defuFn(inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = klona(__appConfig);
  }
  return nuxtApp._appConfig;
}
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  setup(nuxtApp) {
    const createHead = createServerHead;
    const head = createHead();
    head.push(appHead);
    nuxtApp.vueApp.use(head);
    {
      nuxtApp.ssrContext.renderMeta = async () => {
        const meta = await renderSSRHead(head);
        return {
          ...meta,
          bodyScriptsPrepend: meta.bodyTagsOpen,
          // resolves naming difference with NuxtMeta and Unhead
          bodyScripts: meta.bodyTags
        };
      };
    }
  }
});
const _routes = [
  {
    name: "about",
    path: "/about",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/about-a98af0ff.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-f29a0500.mjs').then((m) => m.default || m)
  },
  {
    name: "tags",
    path: "/tags",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/tags-6da9de34.mjs').then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useNuxtApp();
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
var name$1 = "firebase";
var version$2 = "9.22.2";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
registerVersion(name$1, version$2, "app");
const _FirebaseAppInjectionKey = Symbol("firebaseApp");
function useFirebaseApp$1(name2) {
  return getCurrentInstance() && inject(
    _FirebaseAppInjectionKey,
    // avoid the inject not found warning
    null
  ) || getApp(name2);
}
const noop = () => {
};
function walkGet(obj, path) {
  return path.split(".").reduce((target, key) => target && target[key], obj);
}
function walkSet(obj, path, value) {
  const keys = ("" + path).split(".");
  const key = keys.pop();
  const target = keys.reduce(
    (target2, key2) => (
      // @ts-expect-error:
      target2 && target2[key2]
    ),
    obj
  );
  if (target == null)
    return;
  return Array.isArray(target) ? target.splice(Number(key), 1, value) : target[key] = value;
}
function isObject(o) {
  return !!o && typeof o === "object";
}
const ObjectPrototype = Object.prototype;
function isPOJO(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) === ObjectPrototype;
}
function isDocumentRef(o) {
  return isObject(o) && o.type === "document";
}
function isCollectionRef(o) {
  return isObject(o) && o.type === "collection";
}
function isFirestoreDataReference(source) {
  return isDocumentRef(source) || isCollectionRef(source);
}
function isFirestoreQuery(source) {
  return isObject(source) && source.type === "query";
}
function isDatabaseReference(source) {
  return isObject(source) && "ref" in source;
}
function isStorageReference(source) {
  return isObject(source) && typeof source.bucket === "string";
}
function callOnceWithArg(fn, argFn) {
  let called;
  return () => {
    if (!called) {
      called = true;
      return fn(argFn());
    }
  };
}
function isSSR() {
  return !!(getCurrentInstance() && inject(ssrContextKey, null));
}
const scopeMap = /* @__PURE__ */ new WeakMap();
function getGlobalScope(firebaseApp, app) {
  if (!scopeMap.has(firebaseApp)) {
    const scope = effectScope(true);
    scopeMap.set(firebaseApp, scope);
    const { unmount } = app;
    app.unmount = () => {
      unmount.call(app);
      scope.stop();
      scopeMap.delete(firebaseApp);
    };
  }
  return scopeMap.get(firebaseApp);
}
const authUserMap = /* @__PURE__ */ new WeakMap();
const initialUserMap = /* @__PURE__ */ new WeakMap();
function _setInitialUser(firebaseApp, user) {
  initialUserMap.set(firebaseApp, user);
}
function _getCurrentUserState(name2) {
  const firebaseApp = useFirebaseApp$1(name2);
  if (!initialUserMap.has(firebaseApp)) {
    let resolve;
    const promise = new Promise((_resolve) => {
      resolve = _resolve;
    });
    const userState = [
      promise,
      (user) => {
        initialUserMap.set(firebaseApp, user);
        resolve(user.value);
      }
    ];
    initialUserMap.set(firebaseApp, userState);
  }
  return initialUserMap.get(firebaseApp);
}
function getCurrentUser$1(name2) {
  const userOrPromise = _getCurrentUserState(name2);
  return Array.isArray(userOrPromise) ? userOrPromise[0] : Promise.resolve(userOrPromise.value);
}
const name = "@firebase/firestore";
const version$1 = "3.12.2";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class User {
  constructor(uid) {
    this.uid = uid;
  }
  isAuthenticated() {
    return this.uid != null;
  }
  /**
   * Returns a key representing this user, suitable for inclusion in a
   * dictionary.
   */
  toKey() {
    if (this.isAuthenticated()) {
      return "uid:" + this.uid;
    } else {
      return "anonymous-user";
    }
  }
  isEqual(otherUser) {
    return otherUser.uid === this.uid;
  }
}
User.UNAUTHENTICATED = new User(null);
User.GOOGLE_CREDENTIALS = new User("google-credentials-uid");
User.FIRST_PARTY = new User("first-party-uid");
User.MOCK_USER = new User("mock-user");
const version = "9.22.2";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let SDK_VERSION = version;
function setSDKVersion(version2) {
  SDK_VERSION = version2;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function formatJSON(value) {
  return inspect(value, { depth: 100 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logClient = new Logger("@firebase/firestore");
function getLogLevel() {
  return logClient.logLevel;
}
function logDebug(msg, ...obj) {
  if (logClient.logLevel <= LogLevel.DEBUG) {
    const args = obj.map(argToString);
    logClient.debug(`Firestore (${SDK_VERSION}): ${msg}`, ...args);
  }
}
function logError(msg, ...obj) {
  if (logClient.logLevel <= LogLevel.ERROR) {
    const args = obj.map(argToString);
    logClient.error(`Firestore (${SDK_VERSION}): ${msg}`, ...args);
  }
}
function logWarn(msg, ...obj) {
  if (logClient.logLevel <= LogLevel.WARN) {
    const args = obj.map(argToString);
    logClient.warn(`Firestore (${SDK_VERSION}): ${msg}`, ...args);
  }
}
function argToString(obj) {
  if (typeof obj === "string") {
    return obj;
  } else {
    try {
      return formatJSON(obj);
    } catch (e) {
      return obj;
    }
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function fail(failure = "Unexpected state") {
  const message = `FIRESTORE (${SDK_VERSION}) INTERNAL ASSERTION FAILED: ` + failure;
  logError(message);
  throw new Error(message);
}
function hardAssert(assertion, message) {
  if (!assertion) {
    fail();
  }
}
function debugCast(obj, constructor) {
  return obj;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Code = {
  // Causes are copied from:
  // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
  /** Not an error; returned on success. */
  OK: "ok",
  /** The operation was cancelled (typically by the caller). */
  CANCELLED: "cancelled",
  /** Unknown error or an error from a different error domain. */
  UNKNOWN: "unknown",
  /**
   * Client specified an invalid argument. Note that this differs from
   * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
   * problematic regardless of the state of the system (e.g., a malformed file
   * name).
   */
  INVALID_ARGUMENT: "invalid-argument",
  /**
   * Deadline expired before operation could complete. For operations that
   * change the state of the system, this error may be returned even if the
   * operation has completed successfully. For example, a successful response
   * from a server could have been delayed long enough for the deadline to
   * expire.
   */
  DEADLINE_EXCEEDED: "deadline-exceeded",
  /** Some requested entity (e.g., file or directory) was not found. */
  NOT_FOUND: "not-found",
  /**
   * Some entity that we attempted to create (e.g., file or directory) already
   * exists.
   */
  ALREADY_EXISTS: "already-exists",
  /**
   * The caller does not have permission to execute the specified operation.
   * PERMISSION_DENIED must not be used for rejections caused by exhausting
   * some resource (use RESOURCE_EXHAUSTED instead for those errors).
   * PERMISSION_DENIED must not be used if the caller can not be identified
   * (use UNAUTHENTICATED instead for those errors).
   */
  PERMISSION_DENIED: "permission-denied",
  /**
   * The request does not have valid authentication credentials for the
   * operation.
   */
  UNAUTHENTICATED: "unauthenticated",
  /**
   * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
   * entire file system is out of space.
   */
  RESOURCE_EXHAUSTED: "resource-exhausted",
  /**
   * Operation was rejected because the system is not in a state required for
   * the operation's execution. For example, directory to be deleted may be
   * non-empty, an rmdir operation is applied to a non-directory, etc.
   *
   * A litmus test that may help a service implementor in deciding
   * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
   *  (a) Use UNAVAILABLE if the client can retry just the failing call.
   *  (b) Use ABORTED if the client should retry at a higher-level
   *      (e.g., restarting a read-modify-write sequence).
   *  (c) Use FAILED_PRECONDITION if the client should not retry until
   *      the system state has been explicitly fixed. E.g., if an "rmdir"
   *      fails because the directory is non-empty, FAILED_PRECONDITION
   *      should be returned since the client should not retry unless
   *      they have first fixed up the directory by deleting files from it.
   *  (d) Use FAILED_PRECONDITION if the client performs conditional
   *      REST Get/Update/Delete on a resource and the resource on the
   *      server does not match the condition. E.g., conflicting
   *      read-modify-write on the same resource.
   */
  FAILED_PRECONDITION: "failed-precondition",
  /**
   * The operation was aborted, typically due to a concurrency issue like
   * sequencer check failures, transaction aborts, etc.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
   * and UNAVAILABLE.
   */
  ABORTED: "aborted",
  /**
   * Operation was attempted past the valid range. E.g., seeking or reading
   * past end of file.
   *
   * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
   * if the system state changes. For example, a 32-bit file system will
   * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
   * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
   * an offset past the current file size.
   *
   * There is a fair bit of overlap between FAILED_PRECONDITION and
   * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
   * when it applies so that callers who are iterating through a space can
   * easily look for an OUT_OF_RANGE error to detect when they are done.
   */
  OUT_OF_RANGE: "out-of-range",
  /** Operation is not implemented or not supported/enabled in this service. */
  UNIMPLEMENTED: "unimplemented",
  /**
   * Internal errors. Means some invariants expected by underlying System has
   * been broken. If you see one of these errors, Something is very broken.
   */
  INTERNAL: "internal",
  /**
   * The service is currently unavailable. This is a most likely a transient
   * condition and may be corrected by retrying with a backoff.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
   * and UNAVAILABLE.
   */
  UNAVAILABLE: "unavailable",
  /** Unrecoverable data loss or corruption. */
  DATA_LOSS: "data-loss"
};
class FirestoreError extends FirebaseError {
  /** @hideconstructor */
  constructor(code, message) {
    super(code, message);
    this.code = code;
    this.message = message;
    this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class OAuthToken {
  constructor(value, user) {
    this.user = user;
    this.type = "OAuth";
    this.headers = /* @__PURE__ */ new Map();
    this.headers.set("Authorization", `Bearer ${value}`);
  }
}
class EmptyAuthCredentialsProvider {
  getToken() {
    return Promise.resolve(null);
  }
  invalidateToken() {
  }
  start(asyncQueue, changeListener) {
    asyncQueue.enqueueRetryable(() => changeListener(User.UNAUTHENTICATED));
  }
  shutdown() {
  }
}
class EmulatorAuthCredentialsProvider {
  constructor(token) {
    this.token = token;
    this.changeListener = null;
  }
  getToken() {
    return Promise.resolve(this.token);
  }
  invalidateToken() {
  }
  start(asyncQueue, changeListener) {
    this.changeListener = changeListener;
    asyncQueue.enqueueRetryable(() => changeListener(this.token.user));
  }
  shutdown() {
    this.changeListener = null;
  }
}
class FirebaseAuthCredentialsProvider {
  constructor(authProvider) {
    this.authProvider = authProvider;
    this.currentUser = User.UNAUTHENTICATED;
    this.tokenCounter = 0;
    this.forceRefresh = false;
    this.auth = null;
  }
  start(asyncQueue, changeListener) {
    let lastTokenId = this.tokenCounter;
    const guardedChangeListener = (user) => {
      if (this.tokenCounter !== lastTokenId) {
        lastTokenId = this.tokenCounter;
        return changeListener(user);
      } else {
        return Promise.resolve();
      }
    };
    let nextToken = new Deferred();
    this.tokenListener = () => {
      this.tokenCounter++;
      this.currentUser = this.getUser();
      nextToken.resolve();
      nextToken = new Deferred();
      asyncQueue.enqueueRetryable(() => guardedChangeListener(this.currentUser));
    };
    const awaitNextToken = () => {
      const currentTokenAttempt = nextToken;
      asyncQueue.enqueueRetryable(async () => {
        await currentTokenAttempt.promise;
        await guardedChangeListener(this.currentUser);
      });
    };
    const registerAuth = (auth) => {
      logDebug("FirebaseAuthCredentialsProvider", "Auth detected");
      this.auth = auth;
      this.auth.addAuthTokenListener(this.tokenListener);
      awaitNextToken();
    };
    this.authProvider.onInit((auth) => registerAuth(auth));
    setTimeout(() => {
      if (!this.auth) {
        const auth = this.authProvider.getImmediate({ optional: true });
        if (auth) {
          registerAuth(auth);
        } else {
          logDebug("FirebaseAuthCredentialsProvider", "Auth not yet detected");
          nextToken.resolve();
          nextToken = new Deferred();
        }
      }
    }, 0);
    awaitNextToken();
  }
  getToken() {
    const initialTokenCounter = this.tokenCounter;
    const forceRefresh = this.forceRefresh;
    this.forceRefresh = false;
    if (!this.auth) {
      return Promise.resolve(null);
    }
    return this.auth.getToken(forceRefresh).then((tokenData) => {
      if (this.tokenCounter !== initialTokenCounter) {
        logDebug("FirebaseAuthCredentialsProvider", "getToken aborted due to token change.");
        return this.getToken();
      } else {
        if (tokenData) {
          hardAssert(typeof tokenData.accessToken === "string");
          return new OAuthToken(tokenData.accessToken, this.currentUser);
        } else {
          return null;
        }
      }
    });
  }
  invalidateToken() {
    this.forceRefresh = true;
  }
  shutdown() {
    if (this.auth) {
      this.auth.removeAuthTokenListener(this.tokenListener);
    }
  }
  // Auth.getUid() can return null even with a user logged in. It is because
  // getUid() is synchronous, but the auth code populating Uid is asynchronous.
  // This method should only be called in the AuthTokenListener callback
  // to guarantee to get the actual user.
  getUser() {
    const currentUid = this.auth && this.auth.getUid();
    hardAssert(currentUid === null || typeof currentUid === "string");
    return new User(currentUid);
  }
}
class FirstPartyToken {
  constructor(sessionIndex, iamToken, authTokenFactory) {
    this.sessionIndex = sessionIndex;
    this.iamToken = iamToken;
    this.authTokenFactory = authTokenFactory;
    this.type = "FirstParty";
    this.user = User.FIRST_PARTY;
    this._headers = /* @__PURE__ */ new Map();
  }
  /**
   * Gets an authorization token, using a provided factory function, or return
   * null.
   */
  getAuthToken() {
    if (this.authTokenFactory) {
      return this.authTokenFactory();
    } else {
      return null;
    }
  }
  get headers() {
    this._headers.set("X-Goog-AuthUser", this.sessionIndex);
    const authHeaderTokenValue = this.getAuthToken();
    if (authHeaderTokenValue) {
      this._headers.set("Authorization", authHeaderTokenValue);
    }
    if (this.iamToken) {
      this._headers.set("X-Goog-Iam-Authorization-Token", this.iamToken);
    }
    return this._headers;
  }
}
class FirstPartyAuthCredentialsProvider {
  constructor(sessionIndex, iamToken, authTokenFactory) {
    this.sessionIndex = sessionIndex;
    this.iamToken = iamToken;
    this.authTokenFactory = authTokenFactory;
  }
  getToken() {
    return Promise.resolve(new FirstPartyToken(this.sessionIndex, this.iamToken, this.authTokenFactory));
  }
  start(asyncQueue, changeListener) {
    asyncQueue.enqueueRetryable(() => changeListener(User.FIRST_PARTY));
  }
  shutdown() {
  }
  invalidateToken() {
  }
}
class AppCheckToken {
  constructor(value) {
    this.value = value;
    this.type = "AppCheck";
    this.headers = /* @__PURE__ */ new Map();
    if (value && value.length > 0) {
      this.headers.set("x-firebase-appcheck", this.value);
    }
  }
}
class FirebaseAppCheckTokenProvider {
  constructor(appCheckProvider) {
    this.appCheckProvider = appCheckProvider;
    this.forceRefresh = false;
    this.appCheck = null;
    this.latestAppCheckToken = null;
  }
  start(asyncQueue, changeListener) {
    const onTokenChanged = (tokenResult) => {
      if (tokenResult.error != null) {
        logDebug("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${tokenResult.error.message}`);
      }
      const tokenUpdated = tokenResult.token !== this.latestAppCheckToken;
      this.latestAppCheckToken = tokenResult.token;
      logDebug("FirebaseAppCheckTokenProvider", `Received ${tokenUpdated ? "new" : "existing"} token.`);
      return tokenUpdated ? changeListener(tokenResult.token) : Promise.resolve();
    };
    this.tokenListener = (tokenResult) => {
      asyncQueue.enqueueRetryable(() => onTokenChanged(tokenResult));
    };
    const registerAppCheck = (appCheck) => {
      logDebug("FirebaseAppCheckTokenProvider", "AppCheck detected");
      this.appCheck = appCheck;
      this.appCheck.addTokenListener(this.tokenListener);
    };
    this.appCheckProvider.onInit((appCheck) => registerAppCheck(appCheck));
    setTimeout(() => {
      if (!this.appCheck) {
        const appCheck = this.appCheckProvider.getImmediate({ optional: true });
        if (appCheck) {
          registerAppCheck(appCheck);
        } else {
          logDebug("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
        }
      }
    }, 0);
  }
  getToken() {
    const forceRefresh = this.forceRefresh;
    this.forceRefresh = false;
    if (!this.appCheck) {
      return Promise.resolve(null);
    }
    return this.appCheck.getToken(forceRefresh).then((tokenResult) => {
      if (tokenResult) {
        hardAssert(typeof tokenResult.token === "string");
        this.latestAppCheckToken = tokenResult.token;
        return new AppCheckToken(tokenResult.token);
      } else {
        return null;
      }
    });
  }
  invalidateToken() {
    this.forceRefresh = true;
  }
  shutdown() {
    if (this.appCheck) {
      this.appCheck.removeTokenListener(this.tokenListener);
    }
  }
}
function makeAuthCredentialsProvider(credentials) {
  if (!credentials) {
    return new EmptyAuthCredentialsProvider();
  }
  switch (credentials["type"]) {
    case "firstParty":
      return new FirstPartyAuthCredentialsProvider(credentials["sessionIndex"] || "0", credentials["iamToken"] || null, credentials["authTokenFactory"] || null);
    case "provider":
      return credentials["client"];
    default:
      throw new FirestoreError(Code.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function randomBytes(nBytes) {
  return randomBytes$1(nBytes);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AutoId {
  static newId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const maxMultiple = Math.floor(256 / chars.length) * chars.length;
    let autoId = "";
    const targetLength = 20;
    while (autoId.length < targetLength) {
      const bytes = randomBytes(40);
      for (let i = 0; i < bytes.length; ++i) {
        if (autoId.length < targetLength && bytes[i] < maxMultiple) {
          autoId += chars.charAt(bytes[i] % chars.length);
        }
      }
    }
    return autoId;
  }
}
function primitiveComparator(left, right) {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}
function arrayEquals(left, right, comparator) {
  if (left.length !== right.length) {
    return false;
  }
  return left.every((value, index) => comparator(value, right[index]));
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const MIN_SECONDS = -62135596800;
const MS_TO_NANOS = 1e6;
class Timestamp {
  /**
   * Creates a new timestamp.
   *
   * @param seconds - The number of seconds of UTC time since Unix epoch
   *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   *     9999-12-31T23:59:59Z inclusive.
   * @param nanoseconds - The non-negative fractions of a second at nanosecond
   *     resolution. Negative second values with fractions must still have
   *     non-negative nanoseconds values that count forward in time. Must be
   *     from 0 to 999,999,999 inclusive.
   */
  constructor(seconds, nanoseconds) {
    this.seconds = seconds;
    this.nanoseconds = nanoseconds;
    if (nanoseconds < 0) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + nanoseconds);
    }
    if (nanoseconds >= 1e9) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + nanoseconds);
    }
    if (seconds < MIN_SECONDS) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp seconds out of range: " + seconds);
    }
    if (seconds >= 253402300800) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp seconds out of range: " + seconds);
    }
  }
  /**
   * Creates a new timestamp with the current date, with millisecond precision.
   *
   * @returns a new timestamp representing the current date.
   */
  static now() {
    return Timestamp.fromMillis(Date.now());
  }
  /**
   * Creates a new timestamp from the given date.
   *
   * @param date - The date to initialize the `Timestamp` from.
   * @returns A new `Timestamp` representing the same point in time as the given
   *     date.
   */
  static fromDate(date) {
    return Timestamp.fromMillis(date.getTime());
  }
  /**
   * Creates a new timestamp from the given number of milliseconds.
   *
   * @param milliseconds - Number of milliseconds since Unix epoch
   *     1970-01-01T00:00:00Z.
   * @returns A new `Timestamp` representing the same point in time as the given
   *     number of milliseconds.
   */
  static fromMillis(milliseconds) {
    const seconds = Math.floor(milliseconds / 1e3);
    const nanos = Math.floor((milliseconds - seconds * 1e3) * MS_TO_NANOS);
    return new Timestamp(seconds, nanos);
  }
  /**
   * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
   * causes a loss of precision since `Date` objects only support millisecond
   * precision.
   *
   * @returns JavaScript `Date` object representing the same point in time as
   *     this `Timestamp`, with millisecond precision.
   */
  toDate() {
    return new Date(this.toMillis());
  }
  /**
   * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
   * epoch). This operation causes a loss of precision.
   *
   * @returns The point in time corresponding to this timestamp, represented as
   *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
   */
  toMillis() {
    return this.seconds * 1e3 + this.nanoseconds / MS_TO_NANOS;
  }
  _compareTo(other) {
    if (this.seconds === other.seconds) {
      return primitiveComparator(this.nanoseconds, other.nanoseconds);
    }
    return primitiveComparator(this.seconds, other.seconds);
  }
  /**
   * Returns true if this `Timestamp` is equal to the provided one.
   *
   * @param other - The `Timestamp` to compare against.
   * @returns true if this `Timestamp` is equal to the provided one.
   */
  isEqual(other) {
    return other.seconds === this.seconds && other.nanoseconds === this.nanoseconds;
  }
  /** Returns a textual representation of this `Timestamp`. */
  toString() {
    return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
  }
  /** Returns a JSON-serializable representation of this `Timestamp`. */
  toJSON() {
    return { seconds: this.seconds, nanoseconds: this.nanoseconds };
  }
  /**
   * Converts this object to a primitive string, which allows `Timestamp` objects
   * to be compared using the `>`, `<=`, `>=` and `>` operators.
   */
  valueOf() {
    const adjustedSeconds = this.seconds - MIN_SECONDS;
    const formattedSeconds = String(adjustedSeconds).padStart(12, "0");
    const formattedNanoseconds = String(this.nanoseconds).padStart(9, "0");
    return formattedSeconds + "." + formattedNanoseconds;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class SnapshotVersion {
  constructor(timestamp) {
    this.timestamp = timestamp;
  }
  static fromTimestamp(value) {
    return new SnapshotVersion(value);
  }
  static min() {
    return new SnapshotVersion(new Timestamp(0, 0));
  }
  static max() {
    return new SnapshotVersion(new Timestamp(253402300799, 1e9 - 1));
  }
  compareTo(other) {
    return this.timestamp._compareTo(other.timestamp);
  }
  isEqual(other) {
    return this.timestamp.isEqual(other.timestamp);
  }
  /** Returns a number representation of the version for use in spec tests. */
  toMicroseconds() {
    return this.timestamp.seconds * 1e6 + this.timestamp.nanoseconds / 1e3;
  }
  toString() {
    return "SnapshotVersion(" + this.timestamp.toString() + ")";
  }
  toTimestamp() {
    return this.timestamp;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DOCUMENT_KEY_NAME = "__name__";
class BasePath {
  constructor(segments, offset, length) {
    if (offset === void 0) {
      offset = 0;
    } else if (offset > segments.length) {
      fail();
    }
    if (length === void 0) {
      length = segments.length - offset;
    } else if (length > segments.length - offset) {
      fail();
    }
    this.segments = segments;
    this.offset = offset;
    this.len = length;
  }
  get length() {
    return this.len;
  }
  isEqual(other) {
    return BasePath.comparator(this, other) === 0;
  }
  child(nameOrPath) {
    const segments = this.segments.slice(this.offset, this.limit());
    if (nameOrPath instanceof BasePath) {
      nameOrPath.forEach((segment) => {
        segments.push(segment);
      });
    } else {
      segments.push(nameOrPath);
    }
    return this.construct(segments);
  }
  /** The index of one past the last segment of the path. */
  limit() {
    return this.offset + this.length;
  }
  popFirst(size) {
    size = size === void 0 ? 1 : size;
    return this.construct(this.segments, this.offset + size, this.length - size);
  }
  popLast() {
    return this.construct(this.segments, this.offset, this.length - 1);
  }
  firstSegment() {
    return this.segments[this.offset];
  }
  lastSegment() {
    return this.get(this.length - 1);
  }
  get(index) {
    return this.segments[this.offset + index];
  }
  isEmpty() {
    return this.length === 0;
  }
  isPrefixOf(other) {
    if (other.length < this.length) {
      return false;
    }
    for (let i = 0; i < this.length; i++) {
      if (this.get(i) !== other.get(i)) {
        return false;
      }
    }
    return true;
  }
  isImmediateParentOf(potentialChild) {
    if (this.length + 1 !== potentialChild.length) {
      return false;
    }
    for (let i = 0; i < this.length; i++) {
      if (this.get(i) !== potentialChild.get(i)) {
        return false;
      }
    }
    return true;
  }
  forEach(fn) {
    for (let i = this.offset, end = this.limit(); i < end; i++) {
      fn(this.segments[i]);
    }
  }
  toArray() {
    return this.segments.slice(this.offset, this.limit());
  }
  static comparator(p1, p2) {
    const len = Math.min(p1.length, p2.length);
    for (let i = 0; i < len; i++) {
      const left = p1.get(i);
      const right = p2.get(i);
      if (left < right) {
        return -1;
      }
      if (left > right) {
        return 1;
      }
    }
    if (p1.length < p2.length) {
      return -1;
    }
    if (p1.length > p2.length) {
      return 1;
    }
    return 0;
  }
}
class ResourcePath extends BasePath {
  construct(segments, offset, length) {
    return new ResourcePath(segments, offset, length);
  }
  canonicalString() {
    return this.toArray().join("/");
  }
  toString() {
    return this.canonicalString();
  }
  /**
   * Creates a resource path from the given slash-delimited string. If multiple
   * arguments are provided, all components are combined. Leading and trailing
   * slashes from all components are ignored.
   */
  static fromString(...pathComponents) {
    const segments = [];
    for (const path of pathComponents) {
      if (path.indexOf("//") >= 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid segment (${path}). Paths must not contain // in them.`);
      }
      segments.push(...path.split("/").filter((segment) => segment.length > 0));
    }
    return new ResourcePath(segments);
  }
  static emptyPath() {
    return new ResourcePath([]);
  }
}
const identifierRegExp = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
class FieldPath$1 extends BasePath {
  construct(segments, offset, length) {
    return new FieldPath$1(segments, offset, length);
  }
  /**
   * Returns true if the string could be used as a segment in a field path
   * without escaping.
   */
  static isValidIdentifier(segment) {
    return identifierRegExp.test(segment);
  }
  canonicalString() {
    return this.toArray().map((str) => {
      str = str.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
      if (!FieldPath$1.isValidIdentifier(str)) {
        str = "`" + str + "`";
      }
      return str;
    }).join(".");
  }
  toString() {
    return this.canonicalString();
  }
  /**
   * Returns true if this field references the key of a document.
   */
  isKeyField() {
    return this.length === 1 && this.get(0) === DOCUMENT_KEY_NAME;
  }
  /**
   * The field designating the key of a document.
   */
  static keyField() {
    return new FieldPath$1([DOCUMENT_KEY_NAME]);
  }
  /**
   * Parses a field string from the given server-formatted string.
   *
   * - Splitting the empty string is not allowed (for now at least).
   * - Empty segments within the string (e.g. if there are two consecutive
   *   separators) are not allowed.
   *
   * TODO(b/37244157): we should make this more strict. Right now, it allows
   * non-identifier path components, even if they aren't escaped.
   */
  static fromServerFormat(path) {
    const segments = [];
    let current = "";
    let i = 0;
    const addCurrentSegment = () => {
      if (current.length === 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid field path (${path}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
      }
      segments.push(current);
      current = "";
    };
    let inBackticks = false;
    while (i < path.length) {
      const c = path[i];
      if (c === "\\") {
        if (i + 1 === path.length) {
          throw new FirestoreError(Code.INVALID_ARGUMENT, "Path has trailing escape character: " + path);
        }
        const next = path[i + 1];
        if (!(next === "\\" || next === "." || next === "`")) {
          throw new FirestoreError(Code.INVALID_ARGUMENT, "Path has invalid escape sequence: " + path);
        }
        current += next;
        i += 2;
      } else if (c === "`") {
        inBackticks = !inBackticks;
        i++;
      } else if (c === "." && !inBackticks) {
        addCurrentSegment();
        i++;
      } else {
        current += c;
        i++;
      }
    }
    addCurrentSegment();
    if (inBackticks) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Unterminated ` in path: " + path);
    }
    return new FieldPath$1(segments);
  }
  static emptyPath() {
    return new FieldPath$1([]);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class DocumentKey {
  constructor(path) {
    this.path = path;
  }
  static fromPath(path) {
    return new DocumentKey(ResourcePath.fromString(path));
  }
  static fromName(name2) {
    return new DocumentKey(ResourcePath.fromString(name2).popFirst(5));
  }
  static empty() {
    return new DocumentKey(ResourcePath.emptyPath());
  }
  get collectionGroup() {
    return this.path.popLast().lastSegment();
  }
  /** Returns true if the document is in the specified collectionId. */
  hasCollectionId(collectionId) {
    return this.path.length >= 2 && this.path.get(this.path.length - 2) === collectionId;
  }
  /** Returns the collection group (i.e. the name of the parent collection) for this key. */
  getCollectionGroup() {
    return this.path.get(this.path.length - 2);
  }
  /** Returns the fully qualified path to the parent collection. */
  getCollectionPath() {
    return this.path.popLast();
  }
  isEqual(other) {
    return other !== null && ResourcePath.comparator(this.path, other.path) === 0;
  }
  toString() {
    return this.path.toString();
  }
  static comparator(k1, k2) {
    return ResourcePath.comparator(k1.path, k2.path);
  }
  static isDocumentKey(path) {
    return path.length % 2 === 0;
  }
  /**
   * Creates and returns a new document key with the given segments.
   *
   * @param segments - The segments of the path to the document
   * @returns A new instance of DocumentKey
   */
  static fromSegments(segments) {
    return new DocumentKey(new ResourcePath(segments.slice()));
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const INITIAL_LARGEST_BATCH_ID = -1;
function newIndexOffsetSuccessorFromReadTime(readTime, largestBatchId) {
  const successorSeconds = readTime.toTimestamp().seconds;
  const successorNanos = readTime.toTimestamp().nanoseconds + 1;
  const successor = SnapshotVersion.fromTimestamp(successorNanos === 1e9 ? new Timestamp(successorSeconds + 1, 0) : new Timestamp(successorSeconds, successorNanos));
  return new IndexOffset(successor, DocumentKey.empty(), largestBatchId);
}
function newIndexOffsetFromDocument(document2) {
  return new IndexOffset(document2.readTime, document2.key, INITIAL_LARGEST_BATCH_ID);
}
class IndexOffset {
  constructor(readTime, documentKey, largestBatchId) {
    this.readTime = readTime;
    this.documentKey = documentKey;
    this.largestBatchId = largestBatchId;
  }
  /** Returns an offset that sorts before all regular offsets. */
  static min() {
    return new IndexOffset(SnapshotVersion.min(), DocumentKey.empty(), INITIAL_LARGEST_BATCH_ID);
  }
  /** Returns an offset that sorts after all regular offsets. */
  static max() {
    return new IndexOffset(SnapshotVersion.max(), DocumentKey.empty(), INITIAL_LARGEST_BATCH_ID);
  }
}
function indexOffsetComparator(left, right) {
  let cmp = left.readTime.compareTo(right.readTime);
  if (cmp !== 0) {
    return cmp;
  }
  cmp = DocumentKey.comparator(left.documentKey, right.documentKey);
  if (cmp !== 0) {
    return cmp;
  }
  return primitiveComparator(left.largestBatchId, right.largestBatchId);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const PRIMARY_LEASE_LOST_ERROR_MSG = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
class PersistenceTransaction {
  constructor() {
    this.onCommittedListeners = [];
  }
  addOnCommittedListener(listener) {
    this.onCommittedListeners.push(listener);
  }
  raiseOnCommittedEvent() {
    this.onCommittedListeners.forEach((listener) => listener());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ignoreIfPrimaryLeaseLoss(err) {
  if (err.code === Code.FAILED_PRECONDITION && err.message === PRIMARY_LEASE_LOST_ERROR_MSG) {
    logDebug("LocalStore", "Unexpectedly lost primary lease");
  } else {
    throw err;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PersistencePromise {
  constructor(callback) {
    this.nextCallback = null;
    this.catchCallback = null;
    this.result = void 0;
    this.error = void 0;
    this.isDone = false;
    this.callbackAttached = false;
    callback((value) => {
      this.isDone = true;
      this.result = value;
      if (this.nextCallback) {
        this.nextCallback(value);
      }
    }, (error) => {
      this.isDone = true;
      this.error = error;
      if (this.catchCallback) {
        this.catchCallback(error);
      }
    });
  }
  catch(fn) {
    return this.next(void 0, fn);
  }
  next(nextFn, catchFn) {
    if (this.callbackAttached) {
      fail();
    }
    this.callbackAttached = true;
    if (this.isDone) {
      if (!this.error) {
        return this.wrapSuccess(nextFn, this.result);
      } else {
        return this.wrapFailure(catchFn, this.error);
      }
    } else {
      return new PersistencePromise((resolve, reject) => {
        this.nextCallback = (value) => {
          this.wrapSuccess(nextFn, value).next(resolve, reject);
        };
        this.catchCallback = (error) => {
          this.wrapFailure(catchFn, error).next(resolve, reject);
        };
      });
    }
  }
  toPromise() {
    return new Promise((resolve, reject) => {
      this.next(resolve, reject);
    });
  }
  wrapUserFunction(fn) {
    try {
      const result = fn();
      if (result instanceof PersistencePromise) {
        return result;
      } else {
        return PersistencePromise.resolve(result);
      }
    } catch (e) {
      return PersistencePromise.reject(e);
    }
  }
  wrapSuccess(nextFn, value) {
    if (nextFn) {
      return this.wrapUserFunction(() => nextFn(value));
    } else {
      return PersistencePromise.resolve(value);
    }
  }
  wrapFailure(catchFn, error) {
    if (catchFn) {
      return this.wrapUserFunction(() => catchFn(error));
    } else {
      return PersistencePromise.reject(error);
    }
  }
  static resolve(result) {
    return new PersistencePromise((resolve, reject) => {
      resolve(result);
    });
  }
  static reject(error) {
    return new PersistencePromise((resolve, reject) => {
      reject(error);
    });
  }
  static waitFor(all) {
    return new PersistencePromise((resolve, reject) => {
      let expectedCount = 0;
      let resolvedCount = 0;
      let done = false;
      all.forEach((element) => {
        ++expectedCount;
        element.next(() => {
          ++resolvedCount;
          if (done && resolvedCount === expectedCount) {
            resolve();
          }
        }, (err) => reject(err));
      });
      done = true;
      if (resolvedCount === expectedCount) {
        resolve();
      }
    });
  }
  /**
   * Given an array of predicate functions that asynchronously evaluate to a
   * boolean, implements a short-circuiting `or` between the results. Predicates
   * will be evaluated until one of them returns `true`, then stop. The final
   * result will be whether any of them returned `true`.
   */
  static or(predicates) {
    let p = PersistencePromise.resolve(false);
    for (const predicate of predicates) {
      p = p.next((isTrue) => {
        if (isTrue) {
          return PersistencePromise.resolve(isTrue);
        } else {
          return predicate();
        }
      });
    }
    return p;
  }
  static forEach(collection2, f) {
    const promises = [];
    collection2.forEach((r, s) => {
      promises.push(f.call(this, r, s));
    });
    return this.waitFor(promises);
  }
  /**
   * Concurrently map all array elements through asynchronous function.
   */
  static mapArray(array, f) {
    return new PersistencePromise((resolve, reject) => {
      const expectedCount = array.length;
      const results = new Array(expectedCount);
      let resolvedCount = 0;
      for (let i = 0; i < expectedCount; i++) {
        const current = i;
        f(array[current]).next((result) => {
          results[current] = result;
          ++resolvedCount;
          if (resolvedCount === expectedCount) {
            resolve(results);
          }
        }, (err) => reject(err));
      }
    });
  }
  /**
   * An alternative to recursive PersistencePromise calls, that avoids
   * potential memory problems from unbounded chains of promises.
   *
   * The `action` will be called repeatedly while `condition` is true.
   */
  static doWhile(condition, action) {
    return new PersistencePromise((resolve, reject) => {
      const process2 = () => {
        if (condition() === true) {
          action().next(() => {
            process2();
          }, reject);
        } else {
          resolve();
        }
      };
      process2();
    });
  }
}
function isIndexedDbTransactionError(e) {
  return e.name === "IndexedDbTransactionError";
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ListenSequence {
  constructor(previousValue, sequenceNumberSyncer) {
    this.previousValue = previousValue;
    if (sequenceNumberSyncer) {
      sequenceNumberSyncer.sequenceNumberHandler = (sequenceNumber) => this.setPreviousValue(sequenceNumber);
      this.writeNewSequenceNumber = (sequenceNumber) => sequenceNumberSyncer.writeSequenceNumber(sequenceNumber);
    }
  }
  setPreviousValue(externalPreviousValue) {
    this.previousValue = Math.max(externalPreviousValue, this.previousValue);
    return this.previousValue;
  }
  next() {
    const nextValue = ++this.previousValue;
    if (this.writeNewSequenceNumber) {
      this.writeNewSequenceNumber(nextValue);
    }
    return nextValue;
  }
}
ListenSequence.INVALID = -1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function objectSize(obj) {
  let count = 0;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      count++;
    }
  }
  return count;
}
function forEach(obj, fn) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn(key, obj[key]);
    }
  }
}
function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class SortedMap {
  constructor(comparator, root) {
    this.comparator = comparator;
    this.root = root ? root : LLRBNode.EMPTY;
  }
  // Returns a copy of the map, with the specified key/value added or replaced.
  insert(key, value) {
    return new SortedMap(this.comparator, this.root.insert(key, value, this.comparator).copy(null, null, LLRBNode.BLACK, null, null));
  }
  // Returns a copy of the map, with the specified key removed.
  remove(key) {
    return new SortedMap(this.comparator, this.root.remove(key, this.comparator).copy(null, null, LLRBNode.BLACK, null, null));
  }
  // Returns the value of the node with the given key, or null.
  get(key) {
    let node = this.root;
    while (!node.isEmpty()) {
      const cmp = this.comparator(key, node.key);
      if (cmp === 0) {
        return node.value;
      } else if (cmp < 0) {
        node = node.left;
      } else if (cmp > 0) {
        node = node.right;
      }
    }
    return null;
  }
  // Returns the index of the element in this sorted map, or -1 if it doesn't
  // exist.
  indexOf(key) {
    let prunedNodes = 0;
    let node = this.root;
    while (!node.isEmpty()) {
      const cmp = this.comparator(key, node.key);
      if (cmp === 0) {
        return prunedNodes + node.left.size;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        prunedNodes += node.left.size + 1;
        node = node.right;
      }
    }
    return -1;
  }
  isEmpty() {
    return this.root.isEmpty();
  }
  // Returns the total number of nodes in the map.
  get size() {
    return this.root.size;
  }
  // Returns the minimum key in the map.
  minKey() {
    return this.root.minKey();
  }
  // Returns the maximum key in the map.
  maxKey() {
    return this.root.maxKey();
  }
  // Traverses the map in key order and calls the specified action function
  // for each key/value pair. If action returns true, traversal is aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  inorderTraversal(action) {
    return this.root.inorderTraversal(action);
  }
  forEach(fn) {
    this.inorderTraversal((k, v) => {
      fn(k, v);
      return false;
    });
  }
  toString() {
    const descriptions = [];
    this.inorderTraversal((k, v) => {
      descriptions.push(`${k}:${v}`);
      return false;
    });
    return `{${descriptions.join(", ")}}`;
  }
  // Traverses the map in reverse key order and calls the specified action
  // function for each key/value pair. If action returns true, traversal is
  // aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  reverseTraversal(action) {
    return this.root.reverseTraversal(action);
  }
  // Returns an iterator over the SortedMap.
  getIterator() {
    return new SortedMapIterator(this.root, null, this.comparator, false);
  }
  getIteratorFrom(key) {
    return new SortedMapIterator(this.root, key, this.comparator, false);
  }
  getReverseIterator() {
    return new SortedMapIterator(this.root, null, this.comparator, true);
  }
  getReverseIteratorFrom(key) {
    return new SortedMapIterator(this.root, key, this.comparator, true);
  }
}
class SortedMapIterator {
  constructor(node, startKey, comparator, isReverse) {
    this.isReverse = isReverse;
    this.nodeStack = [];
    let cmp = 1;
    while (!node.isEmpty()) {
      cmp = startKey ? comparator(node.key, startKey) : 1;
      if (startKey && isReverse) {
        cmp *= -1;
      }
      if (cmp < 0) {
        if (this.isReverse) {
          node = node.left;
        } else {
          node = node.right;
        }
      } else if (cmp === 0) {
        this.nodeStack.push(node);
        break;
      } else {
        this.nodeStack.push(node);
        if (this.isReverse) {
          node = node.right;
        } else {
          node = node.left;
        }
      }
    }
  }
  getNext() {
    let node = this.nodeStack.pop();
    const result = { key: node.key, value: node.value };
    if (this.isReverse) {
      node = node.left;
      while (!node.isEmpty()) {
        this.nodeStack.push(node);
        node = node.right;
      }
    } else {
      node = node.right;
      while (!node.isEmpty()) {
        this.nodeStack.push(node);
        node = node.left;
      }
    }
    return result;
  }
  hasNext() {
    return this.nodeStack.length > 0;
  }
  peek() {
    if (this.nodeStack.length === 0) {
      return null;
    }
    const node = this.nodeStack[this.nodeStack.length - 1];
    return { key: node.key, value: node.value };
  }
}
class LLRBNode {
  constructor(key, value, color, left, right) {
    this.key = key;
    this.value = value;
    this.color = color != null ? color : LLRBNode.RED;
    this.left = left != null ? left : LLRBNode.EMPTY;
    this.right = right != null ? right : LLRBNode.EMPTY;
    this.size = this.left.size + 1 + this.right.size;
  }
  // Returns a copy of the current node, optionally replacing pieces of it.
  copy(key, value, color, left, right) {
    return new LLRBNode(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
  }
  isEmpty() {
    return false;
  }
  // Traverses the tree in key order and calls the specified action function
  // for each node. If action returns true, traversal is aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  inorderTraversal(action) {
    return this.left.inorderTraversal(action) || action(this.key, this.value) || this.right.inorderTraversal(action);
  }
  // Traverses the tree in reverse key order and calls the specified action
  // function for each node. If action returns true, traversal is aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  reverseTraversal(action) {
    return this.right.reverseTraversal(action) || action(this.key, this.value) || this.left.reverseTraversal(action);
  }
  // Returns the minimum node in the tree.
  min() {
    if (this.left.isEmpty()) {
      return this;
    } else {
      return this.left.min();
    }
  }
  // Returns the maximum key in the tree.
  minKey() {
    return this.min().key;
  }
  // Returns the maximum key in the tree.
  maxKey() {
    if (this.right.isEmpty()) {
      return this.key;
    } else {
      return this.right.maxKey();
    }
  }
  // Returns new tree, with the key/value added.
  insert(key, value, comparator) {
    let n = this;
    const cmp = comparator(key, n.key);
    if (cmp < 0) {
      n = n.copy(null, null, null, n.left.insert(key, value, comparator), null);
    } else if (cmp === 0) {
      n = n.copy(null, value, null, null, null);
    } else {
      n = n.copy(null, null, null, null, n.right.insert(key, value, comparator));
    }
    return n.fixUp();
  }
  removeMin() {
    if (this.left.isEmpty()) {
      return LLRBNode.EMPTY;
    }
    let n = this;
    if (!n.left.isRed() && !n.left.left.isRed()) {
      n = n.moveRedLeft();
    }
    n = n.copy(null, null, null, n.left.removeMin(), null);
    return n.fixUp();
  }
  // Returns new tree, with the specified item removed.
  remove(key, comparator) {
    let smallest;
    let n = this;
    if (comparator(key, n.key) < 0) {
      if (!n.left.isEmpty() && !n.left.isRed() && !n.left.left.isRed()) {
        n = n.moveRedLeft();
      }
      n = n.copy(null, null, null, n.left.remove(key, comparator), null);
    } else {
      if (n.left.isRed()) {
        n = n.rotateRight();
      }
      if (!n.right.isEmpty() && !n.right.isRed() && !n.right.left.isRed()) {
        n = n.moveRedRight();
      }
      if (comparator(key, n.key) === 0) {
        if (n.right.isEmpty()) {
          return LLRBNode.EMPTY;
        } else {
          smallest = n.right.min();
          n = n.copy(smallest.key, smallest.value, null, null, n.right.removeMin());
        }
      }
      n = n.copy(null, null, null, null, n.right.remove(key, comparator));
    }
    return n.fixUp();
  }
  isRed() {
    return this.color;
  }
  // Returns new tree after performing any needed rotations.
  fixUp() {
    let n = this;
    if (n.right.isRed() && !n.left.isRed()) {
      n = n.rotateLeft();
    }
    if (n.left.isRed() && n.left.left.isRed()) {
      n = n.rotateRight();
    }
    if (n.left.isRed() && n.right.isRed()) {
      n = n.colorFlip();
    }
    return n;
  }
  moveRedLeft() {
    let n = this.colorFlip();
    if (n.right.left.isRed()) {
      n = n.copy(null, null, null, null, n.right.rotateRight());
      n = n.rotateLeft();
      n = n.colorFlip();
    }
    return n;
  }
  moveRedRight() {
    let n = this.colorFlip();
    if (n.left.left.isRed()) {
      n = n.rotateRight();
      n = n.colorFlip();
    }
    return n;
  }
  rotateLeft() {
    const nl = this.copy(null, null, LLRBNode.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, nl, null);
  }
  rotateRight() {
    const nr = this.copy(null, null, LLRBNode.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, nr);
  }
  colorFlip() {
    const left = this.left.copy(null, null, !this.left.color, null, null);
    const right = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, left, right);
  }
  // For testing.
  checkMaxDepth() {
    const blackDepth = this.check();
    if (Math.pow(2, blackDepth) <= this.size + 1) {
      return true;
    } else {
      return false;
    }
  }
  // In a balanced RB tree, the black-depth (number of black nodes) from root to
  // leaves is equal on both sides.  This function verifies that or asserts.
  check() {
    if (this.isRed() && this.left.isRed()) {
      throw fail();
    }
    if (this.right.isRed()) {
      throw fail();
    }
    const blackDepth = this.left.check();
    if (blackDepth !== this.right.check()) {
      throw fail();
    } else {
      return blackDepth + (this.isRed() ? 0 : 1);
    }
  }
}
LLRBNode.EMPTY = null;
LLRBNode.RED = true;
LLRBNode.BLACK = false;
class LLRBEmptyNode {
  constructor() {
    this.size = 0;
  }
  get key() {
    throw fail();
  }
  get value() {
    throw fail();
  }
  get color() {
    throw fail();
  }
  get left() {
    throw fail();
  }
  get right() {
    throw fail();
  }
  // Returns a copy of the current node.
  copy(key, value, color, left, right) {
    return this;
  }
  // Returns a copy of the tree, with the specified key/value added.
  insert(key, value, comparator) {
    return new LLRBNode(key, value);
  }
  // Returns a copy of the tree, with the specified key removed.
  remove(key, comparator) {
    return this;
  }
  isEmpty() {
    return true;
  }
  inorderTraversal(action) {
    return false;
  }
  reverseTraversal(action) {
    return false;
  }
  minKey() {
    return null;
  }
  maxKey() {
    return null;
  }
  isRed() {
    return false;
  }
  // For testing.
  checkMaxDepth() {
    return true;
  }
  check() {
    return 0;
  }
}
LLRBNode.EMPTY = new LLRBEmptyNode();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class SortedSet {
  constructor(comparator) {
    this.comparator = comparator;
    this.data = new SortedMap(this.comparator);
  }
  has(elem) {
    return this.data.get(elem) !== null;
  }
  first() {
    return this.data.minKey();
  }
  last() {
    return this.data.maxKey();
  }
  get size() {
    return this.data.size;
  }
  indexOf(elem) {
    return this.data.indexOf(elem);
  }
  /** Iterates elements in order defined by "comparator" */
  forEach(cb) {
    this.data.inorderTraversal((k, v) => {
      cb(k);
      return false;
    });
  }
  /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */
  forEachInRange(range, cb) {
    const iter = this.data.getIteratorFrom(range[0]);
    while (iter.hasNext()) {
      const elem = iter.getNext();
      if (this.comparator(elem.key, range[1]) >= 0) {
        return;
      }
      cb(elem.key);
    }
  }
  /**
   * Iterates over `elem`s such that: start &lt;= elem until false is returned.
   */
  forEachWhile(cb, start) {
    let iter;
    if (start !== void 0) {
      iter = this.data.getIteratorFrom(start);
    } else {
      iter = this.data.getIterator();
    }
    while (iter.hasNext()) {
      const elem = iter.getNext();
      const result = cb(elem.key);
      if (!result) {
        return;
      }
    }
  }
  /** Finds the least element greater than or equal to `elem`. */
  firstAfterOrEqual(elem) {
    const iter = this.data.getIteratorFrom(elem);
    return iter.hasNext() ? iter.getNext().key : null;
  }
  getIterator() {
    return new SortedSetIterator(this.data.getIterator());
  }
  getIteratorFrom(key) {
    return new SortedSetIterator(this.data.getIteratorFrom(key));
  }
  /** Inserts or updates an element */
  add(elem) {
    return this.copy(this.data.remove(elem).insert(elem, true));
  }
  /** Deletes an element */
  delete(elem) {
    if (!this.has(elem)) {
      return this;
    }
    return this.copy(this.data.remove(elem));
  }
  isEmpty() {
    return this.data.isEmpty();
  }
  unionWith(other) {
    let result = this;
    if (result.size < other.size) {
      result = other;
      other = this;
    }
    other.forEach((elem) => {
      result = result.add(elem);
    });
    return result;
  }
  isEqual(other) {
    if (!(other instanceof SortedSet)) {
      return false;
    }
    if (this.size !== other.size) {
      return false;
    }
    const thisIt = this.data.getIterator();
    const otherIt = other.data.getIterator();
    while (thisIt.hasNext()) {
      const thisElem = thisIt.getNext().key;
      const otherElem = otherIt.getNext().key;
      if (this.comparator(thisElem, otherElem) !== 0) {
        return false;
      }
    }
    return true;
  }
  toArray() {
    const res = [];
    this.forEach((targetId) => {
      res.push(targetId);
    });
    return res;
  }
  toString() {
    const result = [];
    this.forEach((elem) => result.push(elem));
    return "SortedSet(" + result.toString() + ")";
  }
  copy(data) {
    const result = new SortedSet(this.comparator);
    result.data = data;
    return result;
  }
}
class SortedSetIterator {
  constructor(iter) {
    this.iter = iter;
  }
  getNext() {
    return this.iter.getNext().key;
  }
  hasNext() {
    return this.iter.hasNext();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FieldMask {
  constructor(fields) {
    this.fields = fields;
    fields.sort(FieldPath$1.comparator);
  }
  static empty() {
    return new FieldMask([]);
  }
  /**
   * Returns a new FieldMask object that is the result of adding all the given
   * fields paths to this field mask.
   */
  unionWith(extraFields) {
    let mergedMaskSet = new SortedSet(FieldPath$1.comparator);
    for (const fieldPath of this.fields) {
      mergedMaskSet = mergedMaskSet.add(fieldPath);
    }
    for (const fieldPath of extraFields) {
      mergedMaskSet = mergedMaskSet.add(fieldPath);
    }
    return new FieldMask(mergedMaskSet.toArray());
  }
  /**
   * Verifies that `fieldPath` is included by at least one field in this field
   * mask.
   *
   * This is an O(n) operation, where `n` is the size of the field mask.
   */
  covers(fieldPath) {
    for (const fieldMaskPath of this.fields) {
      if (fieldMaskPath.isPrefixOf(fieldPath)) {
        return true;
      }
    }
    return false;
  }
  isEqual(other) {
    return arrayEquals(this.fields, other.fields, (l, r) => l.isEqual(r));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function decodeBase64(encoded) {
  return Buffer.from(encoded, "base64").toString("binary");
}
function encodeBase64(raw) {
  return Buffer.from(raw, "binary").toString("base64");
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ByteString {
  constructor(binaryString) {
    this.binaryString = binaryString;
  }
  static fromBase64String(base64) {
    const binaryString = decodeBase64(base64);
    return new ByteString(binaryString);
  }
  static fromUint8Array(array) {
    const binaryString = binaryStringFromUint8Array(array);
    return new ByteString(binaryString);
  }
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        if (i < this.binaryString.length) {
          return { value: this.binaryString.charCodeAt(i++), done: false };
        } else {
          return { value: void 0, done: true };
        }
      }
    };
  }
  toBase64() {
    return encodeBase64(this.binaryString);
  }
  toUint8Array() {
    return uint8ArrayFromBinaryString(this.binaryString);
  }
  approximateByteSize() {
    return this.binaryString.length * 2;
  }
  compareTo(other) {
    return primitiveComparator(this.binaryString, other.binaryString);
  }
  isEqual(other) {
    return this.binaryString === other.binaryString;
  }
}
ByteString.EMPTY_BYTE_STRING = new ByteString("");
function binaryStringFromUint8Array(array) {
  let binaryString = "";
  for (let i = 0; i < array.length; ++i) {
    binaryString += String.fromCharCode(array[i]);
  }
  return binaryString;
}
function uint8ArrayFromBinaryString(binaryString) {
  const buffer = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    buffer[i] = binaryString.charCodeAt(i);
  }
  return buffer;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ISO_TIMESTAMP_REG_EXP = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function normalizeTimestamp(date) {
  hardAssert(!!date);
  if (typeof date === "string") {
    let nanos = 0;
    const fraction = ISO_TIMESTAMP_REG_EXP.exec(date);
    hardAssert(!!fraction);
    if (fraction[1]) {
      let nanoStr = fraction[1];
      nanoStr = (nanoStr + "000000000").substr(0, 9);
      nanos = Number(nanoStr);
    }
    const parsedDate = new Date(date);
    const seconds = Math.floor(parsedDate.getTime() / 1e3);
    return { seconds, nanos };
  } else {
    const seconds = normalizeNumber(date.seconds);
    const nanos = normalizeNumber(date.nanos);
    return { seconds, nanos };
  }
}
function normalizeNumber(value) {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return Number(value);
  } else {
    return 0;
  }
}
function normalizeByteString(blob) {
  if (typeof blob === "string") {
    return ByteString.fromBase64String(blob);
  } else {
    return ByteString.fromUint8Array(blob);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const SERVER_TIMESTAMP_SENTINEL = "server_timestamp";
const TYPE_KEY = "__type__";
const PREVIOUS_VALUE_KEY = "__previous_value__";
const LOCAL_WRITE_TIME_KEY = "__local_write_time__";
function isServerTimestamp(value) {
  var _a, _b;
  const type = (_b = (((_a = value === null || value === void 0 ? void 0 : value.mapValue) === null || _a === void 0 ? void 0 : _a.fields) || {})[TYPE_KEY]) === null || _b === void 0 ? void 0 : _b.stringValue;
  return type === SERVER_TIMESTAMP_SENTINEL;
}
function serverTimestamp$1(localWriteTime, previousValue) {
  const mapValue = {
    fields: {
      [TYPE_KEY]: {
        stringValue: SERVER_TIMESTAMP_SENTINEL
      },
      [LOCAL_WRITE_TIME_KEY]: {
        timestampValue: {
          seconds: localWriteTime.seconds,
          nanos: localWriteTime.nanoseconds
        }
      }
    }
  };
  if (previousValue && isServerTimestamp(previousValue)) {
    previousValue = getPreviousValue(previousValue);
  }
  if (previousValue) {
    mapValue.fields[PREVIOUS_VALUE_KEY] = previousValue;
  }
  return { mapValue };
}
function getPreviousValue(value) {
  const previousValue = value.mapValue.fields[PREVIOUS_VALUE_KEY];
  if (isServerTimestamp(previousValue)) {
    return getPreviousValue(previousValue);
  }
  return previousValue;
}
function getLocalWriteTime(value) {
  const localWriteTime = normalizeTimestamp(value.mapValue.fields[LOCAL_WRITE_TIME_KEY].timestampValue);
  return new Timestamp(localWriteTime.seconds, localWriteTime.nanos);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class DatabaseInfo {
  /**
   * Constructs a DatabaseInfo using the provided host, databaseId and
   * persistenceKey.
   *
   * @param databaseId - The database to use.
   * @param appId - The Firebase App Id.
   * @param persistenceKey - A unique identifier for this Firestore's local
   * storage (used in conjunction with the databaseId).
   * @param host - The Firestore backend host to connect to.
   * @param ssl - Whether to use SSL when connecting.
   * @param forceLongPolling - Whether to use the forceLongPolling option
   * when using WebChannel as the network transport.
   * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
   * option when using WebChannel as the network transport.
   * @param longPollingOptions Options that configure long-polling.
   * @param useFetchStreams Whether to use the Fetch API instead of
   * XMLHTTPRequest
   */
  constructor(databaseId, appId, persistenceKey, host, ssl, forceLongPolling, autoDetectLongPolling, longPollingOptions, useFetchStreams) {
    this.databaseId = databaseId;
    this.appId = appId;
    this.persistenceKey = persistenceKey;
    this.host = host;
    this.ssl = ssl;
    this.forceLongPolling = forceLongPolling;
    this.autoDetectLongPolling = autoDetectLongPolling;
    this.longPollingOptions = longPollingOptions;
    this.useFetchStreams = useFetchStreams;
  }
}
const DEFAULT_DATABASE_NAME = "(default)";
class DatabaseId {
  constructor(projectId, database) {
    this.projectId = projectId;
    this.database = database ? database : DEFAULT_DATABASE_NAME;
  }
  static empty() {
    return new DatabaseId("", "");
  }
  get isDefaultDatabase() {
    return this.database === DEFAULT_DATABASE_NAME;
  }
  isEqual(other) {
    return other instanceof DatabaseId && other.projectId === this.projectId && other.database === this.database;
  }
}
function databaseIdFromApp(app, database) {
  if (!Object.prototype.hasOwnProperty.apply(app.options, ["projectId"])) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
  }
  return new DatabaseId(app.options.projectId, database);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const BATCHID_UNKNOWN = -1;
function isNullOrUndefined(value) {
  return value === null || value === void 0;
}
function isNegativeZero(value) {
  return value === 0 && 1 / value === 1 / -0;
}
function isSafeInteger(value) {
  return typeof value === "number" && Number.isInteger(value) && !isNegativeZero(value) && value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const MAX_VALUE_TYPE = "__max__";
const MAX_VALUE = {
  mapValue: {
    fields: {
      "__type__": { stringValue: MAX_VALUE_TYPE }
    }
  }
};
function typeOrder(value) {
  if ("nullValue" in value) {
    return 0;
  } else if ("booleanValue" in value) {
    return 1;
  } else if ("integerValue" in value || "doubleValue" in value) {
    return 2;
  } else if ("timestampValue" in value) {
    return 3;
  } else if ("stringValue" in value) {
    return 5;
  } else if ("bytesValue" in value) {
    return 6;
  } else if ("referenceValue" in value) {
    return 7;
  } else if ("geoPointValue" in value) {
    return 8;
  } else if ("arrayValue" in value) {
    return 9;
  } else if ("mapValue" in value) {
    if (isServerTimestamp(value)) {
      return 4;
    } else if (isMaxValue(value)) {
      return 9007199254740991;
    }
    return 10;
  } else {
    return fail();
  }
}
function valueEquals(left, right) {
  if (left === right) {
    return true;
  }
  const leftType = typeOrder(left);
  const rightType = typeOrder(right);
  if (leftType !== rightType) {
    return false;
  }
  switch (leftType) {
    case 0:
      return true;
    case 1:
      return left.booleanValue === right.booleanValue;
    case 4:
      return getLocalWriteTime(left).isEqual(getLocalWriteTime(right));
    case 3:
      return timestampEquals(left, right);
    case 5:
      return left.stringValue === right.stringValue;
    case 6:
      return blobEquals(left, right);
    case 7:
      return left.referenceValue === right.referenceValue;
    case 8:
      return geoPointEquals(left, right);
    case 2:
      return numberEquals(left, right);
    case 9:
      return arrayEquals(left.arrayValue.values || [], right.arrayValue.values || [], valueEquals);
    case 10:
      return objectEquals(left, right);
    case 9007199254740991:
      return true;
    default:
      return fail();
  }
}
function timestampEquals(left, right) {
  if (typeof left.timestampValue === "string" && typeof right.timestampValue === "string" && left.timestampValue.length === right.timestampValue.length) {
    return left.timestampValue === right.timestampValue;
  }
  const leftTimestamp = normalizeTimestamp(left.timestampValue);
  const rightTimestamp = normalizeTimestamp(right.timestampValue);
  return leftTimestamp.seconds === rightTimestamp.seconds && leftTimestamp.nanos === rightTimestamp.nanos;
}
function geoPointEquals(left, right) {
  return normalizeNumber(left.geoPointValue.latitude) === normalizeNumber(right.geoPointValue.latitude) && normalizeNumber(left.geoPointValue.longitude) === normalizeNumber(right.geoPointValue.longitude);
}
function blobEquals(left, right) {
  return normalizeByteString(left.bytesValue).isEqual(normalizeByteString(right.bytesValue));
}
function numberEquals(left, right) {
  if ("integerValue" in left && "integerValue" in right) {
    return normalizeNumber(left.integerValue) === normalizeNumber(right.integerValue);
  } else if ("doubleValue" in left && "doubleValue" in right) {
    const n1 = normalizeNumber(left.doubleValue);
    const n2 = normalizeNumber(right.doubleValue);
    if (n1 === n2) {
      return isNegativeZero(n1) === isNegativeZero(n2);
    } else {
      return isNaN(n1) && isNaN(n2);
    }
  }
  return false;
}
function objectEquals(left, right) {
  const leftMap = left.mapValue.fields || {};
  const rightMap = right.mapValue.fields || {};
  if (objectSize(leftMap) !== objectSize(rightMap)) {
    return false;
  }
  for (const key in leftMap) {
    if (leftMap.hasOwnProperty(key)) {
      if (rightMap[key] === void 0 || !valueEquals(leftMap[key], rightMap[key])) {
        return false;
      }
    }
  }
  return true;
}
function arrayValueContains(haystack, needle) {
  return (haystack.values || []).find((v) => valueEquals(v, needle)) !== void 0;
}
function valueCompare(left, right) {
  if (left === right) {
    return 0;
  }
  const leftType = typeOrder(left);
  const rightType = typeOrder(right);
  if (leftType !== rightType) {
    return primitiveComparator(leftType, rightType);
  }
  switch (leftType) {
    case 0:
    case 9007199254740991:
      return 0;
    case 1:
      return primitiveComparator(left.booleanValue, right.booleanValue);
    case 2:
      return compareNumbers(left, right);
    case 3:
      return compareTimestamps(left.timestampValue, right.timestampValue);
    case 4:
      return compareTimestamps(getLocalWriteTime(left), getLocalWriteTime(right));
    case 5:
      return primitiveComparator(left.stringValue, right.stringValue);
    case 6:
      return compareBlobs(left.bytesValue, right.bytesValue);
    case 7:
      return compareReferences(left.referenceValue, right.referenceValue);
    case 8:
      return compareGeoPoints(left.geoPointValue, right.geoPointValue);
    case 9:
      return compareArrays(left.arrayValue, right.arrayValue);
    case 10:
      return compareMaps(left.mapValue, right.mapValue);
    default:
      throw fail();
  }
}
function compareNumbers(left, right) {
  const leftNumber = normalizeNumber(left.integerValue || left.doubleValue);
  const rightNumber = normalizeNumber(right.integerValue || right.doubleValue);
  if (leftNumber < rightNumber) {
    return -1;
  } else if (leftNumber > rightNumber) {
    return 1;
  } else if (leftNumber === rightNumber) {
    return 0;
  } else {
    if (isNaN(leftNumber)) {
      return isNaN(rightNumber) ? 0 : -1;
    } else {
      return 1;
    }
  }
}
function compareTimestamps(left, right) {
  if (typeof left === "string" && typeof right === "string" && left.length === right.length) {
    return primitiveComparator(left, right);
  }
  const leftTimestamp = normalizeTimestamp(left);
  const rightTimestamp = normalizeTimestamp(right);
  const comparison = primitiveComparator(leftTimestamp.seconds, rightTimestamp.seconds);
  if (comparison !== 0) {
    return comparison;
  }
  return primitiveComparator(leftTimestamp.nanos, rightTimestamp.nanos);
}
function compareReferences(leftPath, rightPath) {
  const leftSegments = leftPath.split("/");
  const rightSegments = rightPath.split("/");
  for (let i = 0; i < leftSegments.length && i < rightSegments.length; i++) {
    const comparison = primitiveComparator(leftSegments[i], rightSegments[i]);
    if (comparison !== 0) {
      return comparison;
    }
  }
  return primitiveComparator(leftSegments.length, rightSegments.length);
}
function compareGeoPoints(left, right) {
  const comparison = primitiveComparator(normalizeNumber(left.latitude), normalizeNumber(right.latitude));
  if (comparison !== 0) {
    return comparison;
  }
  return primitiveComparator(normalizeNumber(left.longitude), normalizeNumber(right.longitude));
}
function compareBlobs(left, right) {
  const leftBytes = normalizeByteString(left);
  const rightBytes = normalizeByteString(right);
  return leftBytes.compareTo(rightBytes);
}
function compareArrays(left, right) {
  const leftArray = left.values || [];
  const rightArray = right.values || [];
  for (let i = 0; i < leftArray.length && i < rightArray.length; ++i) {
    const compare = valueCompare(leftArray[i], rightArray[i]);
    if (compare) {
      return compare;
    }
  }
  return primitiveComparator(leftArray.length, rightArray.length);
}
function compareMaps(left, right) {
  if (left === MAX_VALUE.mapValue && right === MAX_VALUE.mapValue) {
    return 0;
  } else if (left === MAX_VALUE.mapValue) {
    return 1;
  } else if (right === MAX_VALUE.mapValue) {
    return -1;
  }
  const leftMap = left.fields || {};
  const leftKeys = Object.keys(leftMap);
  const rightMap = right.fields || {};
  const rightKeys = Object.keys(rightMap);
  leftKeys.sort();
  rightKeys.sort();
  for (let i = 0; i < leftKeys.length && i < rightKeys.length; ++i) {
    const keyCompare = primitiveComparator(leftKeys[i], rightKeys[i]);
    if (keyCompare !== 0) {
      return keyCompare;
    }
    const compare = valueCompare(leftMap[leftKeys[i]], rightMap[rightKeys[i]]);
    if (compare !== 0) {
      return compare;
    }
  }
  return primitiveComparator(leftKeys.length, rightKeys.length);
}
function canonicalId(value) {
  return canonifyValue(value);
}
function canonifyValue(value) {
  if ("nullValue" in value) {
    return "null";
  } else if ("booleanValue" in value) {
    return "" + value.booleanValue;
  } else if ("integerValue" in value) {
    return "" + value.integerValue;
  } else if ("doubleValue" in value) {
    return "" + value.doubleValue;
  } else if ("timestampValue" in value) {
    return canonifyTimestamp(value.timestampValue);
  } else if ("stringValue" in value) {
    return value.stringValue;
  } else if ("bytesValue" in value) {
    return canonifyByteString(value.bytesValue);
  } else if ("referenceValue" in value) {
    return canonifyReference(value.referenceValue);
  } else if ("geoPointValue" in value) {
    return canonifyGeoPoint(value.geoPointValue);
  } else if ("arrayValue" in value) {
    return canonifyArray(value.arrayValue);
  } else if ("mapValue" in value) {
    return canonifyMap(value.mapValue);
  } else {
    return fail();
  }
}
function canonifyByteString(byteString) {
  return normalizeByteString(byteString).toBase64();
}
function canonifyTimestamp(timestamp) {
  const normalizedTimestamp = normalizeTimestamp(timestamp);
  return `time(${normalizedTimestamp.seconds},${normalizedTimestamp.nanos})`;
}
function canonifyGeoPoint(geoPoint) {
  return `geo(${geoPoint.latitude},${geoPoint.longitude})`;
}
function canonifyReference(referenceValue) {
  return DocumentKey.fromName(referenceValue).toString();
}
function canonifyMap(mapValue) {
  const sortedKeys = Object.keys(mapValue.fields || {}).sort();
  let result = "{";
  let first = true;
  for (const key of sortedKeys) {
    if (!first) {
      result += ",";
    } else {
      first = false;
    }
    result += `${key}:${canonifyValue(mapValue.fields[key])}`;
  }
  return result + "}";
}
function canonifyArray(arrayValue) {
  let result = "[";
  let first = true;
  for (const value of arrayValue.values || []) {
    if (!first) {
      result += ",";
    } else {
      first = false;
    }
    result += canonifyValue(value);
  }
  return result + "]";
}
function isInteger(value) {
  return !!value && "integerValue" in value;
}
function isDouble(value) {
  return !!value && "doubleValue" in value;
}
function isNumber(value) {
  return isInteger(value) || isDouble(value);
}
function isArray(value) {
  return !!value && "arrayValue" in value;
}
function isNullValue(value) {
  return !!value && "nullValue" in value;
}
function isNanValue(value) {
  return !!value && "doubleValue" in value && isNaN(Number(value.doubleValue));
}
function isMapValue(value) {
  return !!value && "mapValue" in value;
}
function deepClone(source) {
  if (source.geoPointValue) {
    return { geoPointValue: Object.assign({}, source.geoPointValue) };
  } else if (source.timestampValue && typeof source.timestampValue === "object") {
    return { timestampValue: Object.assign({}, source.timestampValue) };
  } else if (source.mapValue) {
    const target = { mapValue: { fields: {} } };
    forEach(source.mapValue.fields, (key, val) => target.mapValue.fields[key] = deepClone(val));
    return target;
  } else if (source.arrayValue) {
    const target = { arrayValue: { values: [] } };
    for (let i = 0; i < (source.arrayValue.values || []).length; ++i) {
      target.arrayValue.values[i] = deepClone(source.arrayValue.values[i]);
    }
    return target;
  } else {
    return Object.assign({}, source);
  }
}
function isMaxValue(value) {
  return (((value.mapValue || {}).fields || {})["__type__"] || {}).stringValue === MAX_VALUE_TYPE;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ObjectValue {
  constructor(value) {
    this.value = value;
  }
  static empty() {
    return new ObjectValue({ mapValue: {} });
  }
  /**
   * Returns the value at the given path or null.
   *
   * @param path - the path to search
   * @returns The value at the path or null if the path is not set.
   */
  field(path) {
    if (path.isEmpty()) {
      return this.value;
    } else {
      let currentLevel = this.value;
      for (let i = 0; i < path.length - 1; ++i) {
        currentLevel = (currentLevel.mapValue.fields || {})[path.get(i)];
        if (!isMapValue(currentLevel)) {
          return null;
        }
      }
      currentLevel = (currentLevel.mapValue.fields || {})[path.lastSegment()];
      return currentLevel || null;
    }
  }
  /**
   * Sets the field to the provided value.
   *
   * @param path - The field path to set.
   * @param value - The value to set.
   */
  set(path, value) {
    const fieldsMap = this.getFieldsMap(path.popLast());
    fieldsMap[path.lastSegment()] = deepClone(value);
  }
  /**
   * Sets the provided fields to the provided values.
   *
   * @param data - A map of fields to values (or null for deletes).
   */
  setAll(data) {
    let parent = FieldPath$1.emptyPath();
    let upserts = {};
    let deletes = [];
    data.forEach((value, path) => {
      if (!parent.isImmediateParentOf(path)) {
        const fieldsMap2 = this.getFieldsMap(parent);
        this.applyChanges(fieldsMap2, upserts, deletes);
        upserts = {};
        deletes = [];
        parent = path.popLast();
      }
      if (value) {
        upserts[path.lastSegment()] = deepClone(value);
      } else {
        deletes.push(path.lastSegment());
      }
    });
    const fieldsMap = this.getFieldsMap(parent);
    this.applyChanges(fieldsMap, upserts, deletes);
  }
  /**
   * Removes the field at the specified path. If there is no field at the
   * specified path, nothing is changed.
   *
   * @param path - The field path to remove.
   */
  delete(path) {
    const nestedValue = this.field(path.popLast());
    if (isMapValue(nestedValue) && nestedValue.mapValue.fields) {
      delete nestedValue.mapValue.fields[path.lastSegment()];
    }
  }
  isEqual(other) {
    return valueEquals(this.value, other.value);
  }
  /**
   * Returns the map that contains the leaf element of `path`. If the parent
   * entry does not yet exist, or if it is not a map, a new map will be created.
   */
  getFieldsMap(path) {
    let current = this.value;
    if (!current.mapValue.fields) {
      current.mapValue = { fields: {} };
    }
    for (let i = 0; i < path.length; ++i) {
      let next = current.mapValue.fields[path.get(i)];
      if (!isMapValue(next) || !next.mapValue.fields) {
        next = { mapValue: { fields: {} } };
        current.mapValue.fields[path.get(i)] = next;
      }
      current = next;
    }
    return current.mapValue.fields;
  }
  /**
   * Modifies `fieldsMap` by adding, replacing or deleting the specified
   * entries.
   */
  applyChanges(fieldsMap, inserts, deletes) {
    forEach(inserts, (key, val) => fieldsMap[key] = val);
    for (const field of deletes) {
      delete fieldsMap[field];
    }
  }
  clone() {
    return new ObjectValue(deepClone(this.value));
  }
}
function extractFieldMask(value) {
  const fields = [];
  forEach(value.fields, (key, value2) => {
    const currentPath = new FieldPath$1([key]);
    if (isMapValue(value2)) {
      const nestedMask = extractFieldMask(value2.mapValue);
      const nestedFields = nestedMask.fields;
      if (nestedFields.length === 0) {
        fields.push(currentPath);
      } else {
        for (const nestedPath of nestedFields) {
          fields.push(currentPath.child(nestedPath));
        }
      }
    } else {
      fields.push(currentPath);
    }
  });
  return new FieldMask(fields);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MutableDocument {
  constructor(key, documentType, version2, readTime, createTime, data, documentState) {
    this.key = key;
    this.documentType = documentType;
    this.version = version2;
    this.readTime = readTime;
    this.createTime = createTime;
    this.data = data;
    this.documentState = documentState;
  }
  /**
   * Creates a document with no known version or data, but which can serve as
   * base document for mutations.
   */
  static newInvalidDocument(documentKey) {
    return new MutableDocument(
      documentKey,
      0,
      /* version */
      SnapshotVersion.min(),
      /* readTime */
      SnapshotVersion.min(),
      /* createTime */
      SnapshotVersion.min(),
      ObjectValue.empty(),
      0
      /* DocumentState.SYNCED */
    );
  }
  /**
   * Creates a new document that is known to exist with the given data at the
   * given version.
   */
  static newFoundDocument(documentKey, version2, createTime, value) {
    return new MutableDocument(
      documentKey,
      1,
      /* version */
      version2,
      /* readTime */
      SnapshotVersion.min(),
      /* createTime */
      createTime,
      value,
      0
      /* DocumentState.SYNCED */
    );
  }
  /** Creates a new document that is known to not exist at the given version. */
  static newNoDocument(documentKey, version2) {
    return new MutableDocument(
      documentKey,
      2,
      /* version */
      version2,
      /* readTime */
      SnapshotVersion.min(),
      /* createTime */
      SnapshotVersion.min(),
      ObjectValue.empty(),
      0
      /* DocumentState.SYNCED */
    );
  }
  /**
   * Creates a new document that is known to exist at the given version but
   * whose data is not known (e.g. a document that was updated without a known
   * base document).
   */
  static newUnknownDocument(documentKey, version2) {
    return new MutableDocument(
      documentKey,
      3,
      /* version */
      version2,
      /* readTime */
      SnapshotVersion.min(),
      /* createTime */
      SnapshotVersion.min(),
      ObjectValue.empty(),
      2
      /* DocumentState.HAS_COMMITTED_MUTATIONS */
    );
  }
  /**
   * Changes the document type to indicate that it exists and that its version
   * and data are known.
   */
  convertToFoundDocument(version2, value) {
    if (this.createTime.isEqual(SnapshotVersion.min()) && (this.documentType === 2 || this.documentType === 0)) {
      this.createTime = version2;
    }
    this.version = version2;
    this.documentType = 1;
    this.data = value;
    this.documentState = 0;
    return this;
  }
  /**
   * Changes the document type to indicate that it doesn't exist at the given
   * version.
   */
  convertToNoDocument(version2) {
    this.version = version2;
    this.documentType = 2;
    this.data = ObjectValue.empty();
    this.documentState = 0;
    return this;
  }
  /**
   * Changes the document type to indicate that it exists at a given version but
   * that its data is not known (e.g. a document that was updated without a known
   * base document).
   */
  convertToUnknownDocument(version2) {
    this.version = version2;
    this.documentType = 3;
    this.data = ObjectValue.empty();
    this.documentState = 2;
    return this;
  }
  setHasCommittedMutations() {
    this.documentState = 2;
    return this;
  }
  setHasLocalMutations() {
    this.documentState = 1;
    this.version = SnapshotVersion.min();
    return this;
  }
  setReadTime(readTime) {
    this.readTime = readTime;
    return this;
  }
  get hasLocalMutations() {
    return this.documentState === 1;
  }
  get hasCommittedMutations() {
    return this.documentState === 2;
  }
  get hasPendingWrites() {
    return this.hasLocalMutations || this.hasCommittedMutations;
  }
  isValidDocument() {
    return this.documentType !== 0;
  }
  isFoundDocument() {
    return this.documentType === 1;
  }
  isNoDocument() {
    return this.documentType === 2;
  }
  isUnknownDocument() {
    return this.documentType === 3;
  }
  isEqual(other) {
    return other instanceof MutableDocument && this.key.isEqual(other.key) && this.version.isEqual(other.version) && this.documentType === other.documentType && this.documentState === other.documentState && this.data.isEqual(other.data);
  }
  mutableCopy() {
    return new MutableDocument(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState);
  }
  toString() {
    return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
  }
}
function compareDocumentsByField(field, d1, d2) {
  const v1 = d1.data.field(field);
  const v2 = d2.data.field(field);
  if (v1 !== null && v2 !== null) {
    return valueCompare(v1, v2);
  } else {
    return fail();
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Bound {
  constructor(position, inclusive) {
    this.position = position;
    this.inclusive = inclusive;
  }
}
function boundCompareToDocument(bound, orderBy, doc2) {
  let comparison = 0;
  for (let i = 0; i < bound.position.length; i++) {
    const orderByComponent = orderBy[i];
    const component = bound.position[i];
    if (orderByComponent.field.isKeyField()) {
      comparison = DocumentKey.comparator(DocumentKey.fromName(component.referenceValue), doc2.key);
    } else {
      const docValue = doc2.data.field(orderByComponent.field);
      comparison = valueCompare(component, docValue);
    }
    if (orderByComponent.dir === "desc") {
      comparison = comparison * -1;
    }
    if (comparison !== 0) {
      break;
    }
  }
  return comparison;
}
function boundSortsAfterDocument(bound, orderBy, doc2) {
  const comparison = boundCompareToDocument(bound, orderBy, doc2);
  return bound.inclusive ? comparison >= 0 : comparison > 0;
}
function boundSortsBeforeDocument(bound, orderBy, doc2) {
  const comparison = boundCompareToDocument(bound, orderBy, doc2);
  return bound.inclusive ? comparison <= 0 : comparison < 0;
}
function boundEquals(left, right) {
  if (left === null) {
    return right === null;
  } else if (right === null) {
    return false;
  }
  if (left.inclusive !== right.inclusive || left.position.length !== right.position.length) {
    return false;
  }
  for (let i = 0; i < left.position.length; i++) {
    const leftPosition = left.position[i];
    const rightPosition = right.position[i];
    if (!valueEquals(leftPosition, rightPosition)) {
      return false;
    }
  }
  return true;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class OrderBy {
  constructor(field, dir = "asc") {
    this.field = field;
    this.dir = dir;
  }
}
function canonifyOrderBy(orderBy) {
  return orderBy.field.canonicalString() + orderBy.dir;
}
function stringifyOrderBy(orderBy) {
  return `${orderBy.field.canonicalString()} (${orderBy.dir})`;
}
function orderByEquals(left, right) {
  return left.dir === right.dir && left.field.isEqual(right.field);
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Filter {
}
class FieldFilter extends Filter {
  constructor(field, op, value) {
    super();
    this.field = field;
    this.op = op;
    this.value = value;
  }
  /**
   * Creates a filter based on the provided arguments.
   */
  static create(field, op, value) {
    if (field.isKeyField()) {
      if (op === "in" || op === "not-in") {
        return this.createKeyFieldInFilter(field, op, value);
      } else {
        return new KeyFieldFilter(field, op, value);
      }
    } else if (op === "array-contains") {
      return new ArrayContainsFilter(field, value);
    } else if (op === "in") {
      return new InFilter(field, value);
    } else if (op === "not-in") {
      return new NotInFilter(field, value);
    } else if (op === "array-contains-any") {
      return new ArrayContainsAnyFilter(field, value);
    } else {
      return new FieldFilter(field, op, value);
    }
  }
  static createKeyFieldInFilter(field, op, value) {
    return op === "in" ? new KeyFieldInFilter(field, value) : new KeyFieldNotInFilter(field, value);
  }
  matches(doc2) {
    const other = doc2.data.field(this.field);
    if (this.op === "!=") {
      return other !== null && this.matchesComparison(valueCompare(other, this.value));
    }
    return other !== null && typeOrder(this.value) === typeOrder(other) && this.matchesComparison(valueCompare(other, this.value));
  }
  matchesComparison(comparison) {
    switch (this.op) {
      case "<":
        return comparison < 0;
      case "<=":
        return comparison <= 0;
      case "==":
        return comparison === 0;
      case "!=":
        return comparison !== 0;
      case ">":
        return comparison > 0;
      case ">=":
        return comparison >= 0;
      default:
        return fail();
    }
  }
  isInequality() {
    return [
      "<",
      "<=",
      ">",
      ">=",
      "!=",
      "not-in"
      /* Operator.NOT_IN */
    ].indexOf(this.op) >= 0;
  }
  getFlattenedFilters() {
    return [this];
  }
  getFilters() {
    return [this];
  }
  getFirstInequalityField() {
    if (this.isInequality()) {
      return this.field;
    }
    return null;
  }
}
class CompositeFilter extends Filter {
  constructor(filters, op) {
    super();
    this.filters = filters;
    this.op = op;
    this.memoizedFlattenedFilters = null;
  }
  /**
   * Creates a filter based on the provided arguments.
   */
  static create(filters, op) {
    return new CompositeFilter(filters, op);
  }
  matches(doc2) {
    if (compositeFilterIsConjunction(this)) {
      return this.filters.find((filter) => !filter.matches(doc2)) === void 0;
    } else {
      return this.filters.find((filter) => filter.matches(doc2)) !== void 0;
    }
  }
  getFlattenedFilters() {
    if (this.memoizedFlattenedFilters !== null) {
      return this.memoizedFlattenedFilters;
    }
    this.memoizedFlattenedFilters = this.filters.reduce((result, subfilter) => {
      return result.concat(subfilter.getFlattenedFilters());
    }, []);
    return this.memoizedFlattenedFilters;
  }
  // Returns a mutable copy of `this.filters`
  getFilters() {
    return Object.assign([], this.filters);
  }
  getFirstInequalityField() {
    const found = this.findFirstMatchingFilter((filter) => filter.isInequality());
    if (found !== null) {
      return found.field;
    }
    return null;
  }
  // Performs a depth-first search to find and return the first FieldFilter in the composite filter
  // that satisfies the predicate. Returns `null` if none of the FieldFilters satisfy the
  // predicate.
  findFirstMatchingFilter(predicate) {
    for (const fieldFilter of this.getFlattenedFilters()) {
      if (predicate(fieldFilter)) {
        return fieldFilter;
      }
    }
    return null;
  }
}
function compositeFilterIsConjunction(compositeFilter) {
  return compositeFilter.op === "and";
}
function compositeFilterIsFlatConjunction(compositeFilter) {
  return compositeFilterIsFlat(compositeFilter) && compositeFilterIsConjunction(compositeFilter);
}
function compositeFilterIsFlat(compositeFilter) {
  for (const filter of compositeFilter.filters) {
    if (filter instanceof CompositeFilter) {
      return false;
    }
  }
  return true;
}
function canonifyFilter(filter) {
  if (filter instanceof FieldFilter) {
    return filter.field.canonicalString() + filter.op.toString() + canonicalId(filter.value);
  } else if (compositeFilterIsFlatConjunction(filter)) {
    return filter.filters.map((filter2) => canonifyFilter(filter2)).join(",");
  } else {
    const canonicalIdsString = filter.filters.map((filter2) => canonifyFilter(filter2)).join(",");
    return `${filter.op}(${canonicalIdsString})`;
  }
}
function filterEquals(f1, f2) {
  if (f1 instanceof FieldFilter) {
    return fieldFilterEquals(f1, f2);
  } else if (f1 instanceof CompositeFilter) {
    return compositeFilterEquals(f1, f2);
  } else {
    fail();
  }
}
function fieldFilterEquals(f1, f2) {
  return f2 instanceof FieldFilter && f1.op === f2.op && f1.field.isEqual(f2.field) && valueEquals(f1.value, f2.value);
}
function compositeFilterEquals(f1, f2) {
  if (f2 instanceof CompositeFilter && f1.op === f2.op && f1.filters.length === f2.filters.length) {
    const subFiltersMatch = f1.filters.reduce((result, f1Filter, index) => result && filterEquals(f1Filter, f2.filters[index]), true);
    return subFiltersMatch;
  }
  return false;
}
function stringifyFilter(filter) {
  if (filter instanceof FieldFilter) {
    return stringifyFieldFilter(filter);
  } else if (filter instanceof CompositeFilter) {
    return stringifyCompositeFilter(filter);
  } else {
    return "Filter";
  }
}
function stringifyCompositeFilter(filter) {
  return filter.op.toString() + ` {` + filter.getFilters().map(stringifyFilter).join(" ,") + "}";
}
function stringifyFieldFilter(filter) {
  return `${filter.field.canonicalString()} ${filter.op} ${canonicalId(filter.value)}`;
}
class KeyFieldFilter extends FieldFilter {
  constructor(field, op, value) {
    super(field, op, value);
    this.key = DocumentKey.fromName(value.referenceValue);
  }
  matches(doc2) {
    const comparison = DocumentKey.comparator(doc2.key, this.key);
    return this.matchesComparison(comparison);
  }
}
class KeyFieldInFilter extends FieldFilter {
  constructor(field, value) {
    super(field, "in", value);
    this.keys = extractDocumentKeysFromArrayValue("in", value);
  }
  matches(doc2) {
    return this.keys.some((key) => key.isEqual(doc2.key));
  }
}
class KeyFieldNotInFilter extends FieldFilter {
  constructor(field, value) {
    super(field, "not-in", value);
    this.keys = extractDocumentKeysFromArrayValue("not-in", value);
  }
  matches(doc2) {
    return !this.keys.some((key) => key.isEqual(doc2.key));
  }
}
function extractDocumentKeysFromArrayValue(op, value) {
  var _a;
  return (((_a = value.arrayValue) === null || _a === void 0 ? void 0 : _a.values) || []).map((v) => {
    return DocumentKey.fromName(v.referenceValue);
  });
}
class ArrayContainsFilter extends FieldFilter {
  constructor(field, value) {
    super(field, "array-contains", value);
  }
  matches(doc2) {
    const other = doc2.data.field(this.field);
    return isArray(other) && arrayValueContains(other.arrayValue, this.value);
  }
}
class InFilter extends FieldFilter {
  constructor(field, value) {
    super(field, "in", value);
  }
  matches(doc2) {
    const other = doc2.data.field(this.field);
    return other !== null && arrayValueContains(this.value.arrayValue, other);
  }
}
class NotInFilter extends FieldFilter {
  constructor(field, value) {
    super(field, "not-in", value);
  }
  matches(doc2) {
    if (arrayValueContains(this.value.arrayValue, { nullValue: "NULL_VALUE" })) {
      return false;
    }
    const other = doc2.data.field(this.field);
    return other !== null && !arrayValueContains(this.value.arrayValue, other);
  }
}
class ArrayContainsAnyFilter extends FieldFilter {
  constructor(field, value) {
    super(field, "array-contains-any", value);
  }
  matches(doc2) {
    const other = doc2.data.field(this.field);
    if (!isArray(other) || !other.arrayValue.values) {
      return false;
    }
    return other.arrayValue.values.some((val) => arrayValueContains(this.value.arrayValue, val));
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class TargetImpl {
  constructor(path, collectionGroup = null, orderBy = [], filters = [], limit = null, startAt = null, endAt = null) {
    this.path = path;
    this.collectionGroup = collectionGroup;
    this.orderBy = orderBy;
    this.filters = filters;
    this.limit = limit;
    this.startAt = startAt;
    this.endAt = endAt;
    this.memoizedCanonicalId = null;
  }
}
function newTarget(path, collectionGroup = null, orderBy = [], filters = [], limit = null, startAt = null, endAt = null) {
  return new TargetImpl(path, collectionGroup, orderBy, filters, limit, startAt, endAt);
}
function canonifyTarget(target) {
  const targetImpl = debugCast(target);
  if (targetImpl.memoizedCanonicalId === null) {
    let str = targetImpl.path.canonicalString();
    if (targetImpl.collectionGroup !== null) {
      str += "|cg:" + targetImpl.collectionGroup;
    }
    str += "|f:";
    str += targetImpl.filters.map((f) => canonifyFilter(f)).join(",");
    str += "|ob:";
    str += targetImpl.orderBy.map((o) => canonifyOrderBy(o)).join(",");
    if (!isNullOrUndefined(targetImpl.limit)) {
      str += "|l:";
      str += targetImpl.limit;
    }
    if (targetImpl.startAt) {
      str += "|lb:";
      str += targetImpl.startAt.inclusive ? "b:" : "a:";
      str += targetImpl.startAt.position.map((p) => canonicalId(p)).join(",");
    }
    if (targetImpl.endAt) {
      str += "|ub:";
      str += targetImpl.endAt.inclusive ? "a:" : "b:";
      str += targetImpl.endAt.position.map((p) => canonicalId(p)).join(",");
    }
    targetImpl.memoizedCanonicalId = str;
  }
  return targetImpl.memoizedCanonicalId;
}
function stringifyTarget(target) {
  let str = target.path.canonicalString();
  if (target.collectionGroup !== null) {
    str += " collectionGroup=" + target.collectionGroup;
  }
  if (target.filters.length > 0) {
    str += `, filters: [${target.filters.map((f) => stringifyFilter(f)).join(", ")}]`;
  }
  if (!isNullOrUndefined(target.limit)) {
    str += ", limit: " + target.limit;
  }
  if (target.orderBy.length > 0) {
    str += `, orderBy: [${target.orderBy.map((o) => stringifyOrderBy(o)).join(", ")}]`;
  }
  if (target.startAt) {
    str += ", startAt: ";
    str += target.startAt.inclusive ? "b:" : "a:";
    str += target.startAt.position.map((p) => canonicalId(p)).join(",");
  }
  if (target.endAt) {
    str += ", endAt: ";
    str += target.endAt.inclusive ? "a:" : "b:";
    str += target.endAt.position.map((p) => canonicalId(p)).join(",");
  }
  return `Target(${str})`;
}
function targetEquals(left, right) {
  if (left.limit !== right.limit) {
    return false;
  }
  if (left.orderBy.length !== right.orderBy.length) {
    return false;
  }
  for (let i = 0; i < left.orderBy.length; i++) {
    if (!orderByEquals(left.orderBy[i], right.orderBy[i])) {
      return false;
    }
  }
  if (left.filters.length !== right.filters.length) {
    return false;
  }
  for (let i = 0; i < left.filters.length; i++) {
    if (!filterEquals(left.filters[i], right.filters[i])) {
      return false;
    }
  }
  if (left.collectionGroup !== right.collectionGroup) {
    return false;
  }
  if (!left.path.isEqual(right.path)) {
    return false;
  }
  if (!boundEquals(left.startAt, right.startAt)) {
    return false;
  }
  return boundEquals(left.endAt, right.endAt);
}
function targetIsDocumentTarget(target) {
  return DocumentKey.isDocumentKey(target.path) && target.collectionGroup === null && target.filters.length === 0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class QueryImpl {
  /**
   * Initializes a Query with a path and optional additional query constraints.
   * Path must currently be empty if this is a collection group query.
   */
  constructor(path, collectionGroup = null, explicitOrderBy = [], filters = [], limit = null, limitType = "F", startAt = null, endAt = null) {
    this.path = path;
    this.collectionGroup = collectionGroup;
    this.explicitOrderBy = explicitOrderBy;
    this.filters = filters;
    this.limit = limit;
    this.limitType = limitType;
    this.startAt = startAt;
    this.endAt = endAt;
    this.memoizedOrderBy = null;
    this.memoizedTarget = null;
    if (this.startAt)
      ;
    if (this.endAt)
      ;
  }
}
function newQuery(path, collectionGroup, explicitOrderBy, filters, limit, limitType, startAt, endAt) {
  return new QueryImpl(path, collectionGroup, explicitOrderBy, filters, limit, limitType, startAt, endAt);
}
function newQueryForPath(path) {
  return new QueryImpl(path);
}
function asCollectionQueryAtPath(query, path) {
  return new QueryImpl(
    path,
    /*collectionGroup=*/
    null,
    query.explicitOrderBy.slice(),
    query.filters.slice(),
    query.limit,
    query.limitType,
    query.startAt,
    query.endAt
  );
}
function queryMatchesAllDocuments(query) {
  return query.filters.length === 0 && query.limit === null && query.startAt == null && query.endAt == null && (query.explicitOrderBy.length === 0 || query.explicitOrderBy.length === 1 && query.explicitOrderBy[0].field.isKeyField());
}
function getFirstOrderByField(query) {
  return query.explicitOrderBy.length > 0 ? query.explicitOrderBy[0].field : null;
}
function getInequalityFilterField(query) {
  for (const filter of query.filters) {
    const result = filter.getFirstInequalityField();
    if (result !== null) {
      return result;
    }
  }
  return null;
}
function isDocumentQuery$1(query) {
  return DocumentKey.isDocumentKey(query.path) && query.collectionGroup === null && query.filters.length === 0;
}
function isCollectionGroupQuery(query) {
  return query.collectionGroup !== null;
}
function queryOrderBy(query) {
  const queryImpl = debugCast(query);
  if (queryImpl.memoizedOrderBy === null) {
    queryImpl.memoizedOrderBy = [];
    const inequalityField = getInequalityFilterField(queryImpl);
    const firstOrderByField = getFirstOrderByField(queryImpl);
    if (inequalityField !== null && firstOrderByField === null) {
      if (!inequalityField.isKeyField()) {
        queryImpl.memoizedOrderBy.push(new OrderBy(inequalityField));
      }
      queryImpl.memoizedOrderBy.push(new OrderBy(
        FieldPath$1.keyField(),
        "asc"
        /* Direction.ASCENDING */
      ));
    } else {
      let foundKeyOrdering = false;
      for (const orderBy of queryImpl.explicitOrderBy) {
        queryImpl.memoizedOrderBy.push(orderBy);
        if (orderBy.field.isKeyField()) {
          foundKeyOrdering = true;
        }
      }
      if (!foundKeyOrdering) {
        const lastDirection = queryImpl.explicitOrderBy.length > 0 ? queryImpl.explicitOrderBy[queryImpl.explicitOrderBy.length - 1].dir : "asc";
        queryImpl.memoizedOrderBy.push(new OrderBy(FieldPath$1.keyField(), lastDirection));
      }
    }
  }
  return queryImpl.memoizedOrderBy;
}
function queryToTarget(query) {
  const queryImpl = debugCast(query);
  if (!queryImpl.memoizedTarget) {
    if (queryImpl.limitType === "F") {
      queryImpl.memoizedTarget = newTarget(queryImpl.path, queryImpl.collectionGroup, queryOrderBy(queryImpl), queryImpl.filters, queryImpl.limit, queryImpl.startAt, queryImpl.endAt);
    } else {
      const orderBys = [];
      for (const orderBy of queryOrderBy(queryImpl)) {
        const dir = orderBy.dir === "desc" ? "asc" : "desc";
        orderBys.push(new OrderBy(orderBy.field, dir));
      }
      const startAt = queryImpl.endAt ? new Bound(queryImpl.endAt.position, queryImpl.endAt.inclusive) : null;
      const endAt = queryImpl.startAt ? new Bound(queryImpl.startAt.position, queryImpl.startAt.inclusive) : null;
      queryImpl.memoizedTarget = newTarget(queryImpl.path, queryImpl.collectionGroup, orderBys, queryImpl.filters, queryImpl.limit, startAt, endAt);
    }
  }
  return queryImpl.memoizedTarget;
}
function queryWithLimit(query, limit, limitType) {
  return new QueryImpl(query.path, query.collectionGroup, query.explicitOrderBy.slice(), query.filters.slice(), limit, limitType, query.startAt, query.endAt);
}
function queryEquals(left, right) {
  return targetEquals(queryToTarget(left), queryToTarget(right)) && left.limitType === right.limitType;
}
function canonifyQuery(query) {
  return `${canonifyTarget(queryToTarget(query))}|lt:${query.limitType}`;
}
function stringifyQuery(query) {
  return `Query(target=${stringifyTarget(queryToTarget(query))}; limitType=${query.limitType})`;
}
function queryMatches(query, doc2) {
  return doc2.isFoundDocument() && queryMatchesPathAndCollectionGroup(query, doc2) && queryMatchesOrderBy(query, doc2) && queryMatchesFilters(query, doc2) && queryMatchesBounds(query, doc2);
}
function queryMatchesPathAndCollectionGroup(query, doc2) {
  const docPath = doc2.key.path;
  if (query.collectionGroup !== null) {
    return doc2.key.hasCollectionId(query.collectionGroup) && query.path.isPrefixOf(docPath);
  } else if (DocumentKey.isDocumentKey(query.path)) {
    return query.path.isEqual(docPath);
  } else {
    return query.path.isImmediateParentOf(docPath);
  }
}
function queryMatchesOrderBy(query, doc2) {
  for (const orderBy of queryOrderBy(query)) {
    if (!orderBy.field.isKeyField() && doc2.data.field(orderBy.field) === null) {
      return false;
    }
  }
  return true;
}
function queryMatchesFilters(query, doc2) {
  for (const filter of query.filters) {
    if (!filter.matches(doc2)) {
      return false;
    }
  }
  return true;
}
function queryMatchesBounds(query, doc2) {
  if (query.startAt && !boundSortsBeforeDocument(query.startAt, queryOrderBy(query), doc2)) {
    return false;
  }
  if (query.endAt && !boundSortsAfterDocument(query.endAt, queryOrderBy(query), doc2)) {
    return false;
  }
  return true;
}
function queryCollectionGroup(query) {
  return query.collectionGroup || (query.path.length % 2 === 1 ? query.path.lastSegment() : query.path.get(query.path.length - 2));
}
function newQueryComparator(query) {
  return (d1, d2) => {
    let comparedOnKeyField = false;
    for (const orderBy of queryOrderBy(query)) {
      const comp = compareDocs(orderBy, d1, d2);
      if (comp !== 0) {
        return comp;
      }
      comparedOnKeyField = comparedOnKeyField || orderBy.field.isKeyField();
    }
    return 0;
  };
}
function compareDocs(orderBy, d1, d2) {
  const comparison = orderBy.field.isKeyField() ? DocumentKey.comparator(d1.key, d2.key) : compareDocumentsByField(orderBy.field, d1, d2);
  switch (orderBy.dir) {
    case "asc":
      return comparison;
    case "desc":
      return -1 * comparison;
    default:
      return fail();
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ObjectMap {
  constructor(mapKeyFn, equalsFn) {
    this.mapKeyFn = mapKeyFn;
    this.equalsFn = equalsFn;
    this.inner = {};
    this.innerSize = 0;
  }
  /** Get a value for this key, or undefined if it does not exist. */
  get(key) {
    const id = this.mapKeyFn(key);
    const matches = this.inner[id];
    if (matches === void 0) {
      return void 0;
    }
    for (const [otherKey, value] of matches) {
      if (this.equalsFn(otherKey, key)) {
        return value;
      }
    }
    return void 0;
  }
  has(key) {
    return this.get(key) !== void 0;
  }
  /** Put this key and value in the map. */
  set(key, value) {
    const id = this.mapKeyFn(key);
    const matches = this.inner[id];
    if (matches === void 0) {
      this.inner[id] = [[key, value]];
      this.innerSize++;
      return;
    }
    for (let i = 0; i < matches.length; i++) {
      if (this.equalsFn(matches[i][0], key)) {
        matches[i] = [key, value];
        return;
      }
    }
    matches.push([key, value]);
    this.innerSize++;
  }
  /**
   * Remove this key from the map. Returns a boolean if anything was deleted.
   */
  delete(key) {
    const id = this.mapKeyFn(key);
    const matches = this.inner[id];
    if (matches === void 0) {
      return false;
    }
    for (let i = 0; i < matches.length; i++) {
      if (this.equalsFn(matches[i][0], key)) {
        if (matches.length === 1) {
          delete this.inner[id];
        } else {
          matches.splice(i, 1);
        }
        this.innerSize--;
        return true;
      }
    }
    return false;
  }
  forEach(fn) {
    forEach(this.inner, (_, entries) => {
      for (const [k, v] of entries) {
        fn(k, v);
      }
    });
  }
  isEmpty() {
    return isEmpty(this.inner);
  }
  size() {
    return this.innerSize;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const EMPTY_MUTABLE_DOCUMENT_MAP = new SortedMap(DocumentKey.comparator);
function mutableDocumentMap() {
  return EMPTY_MUTABLE_DOCUMENT_MAP;
}
const EMPTY_DOCUMENT_MAP = new SortedMap(DocumentKey.comparator);
function documentMap(...docs) {
  let map = EMPTY_DOCUMENT_MAP;
  for (const doc2 of docs) {
    map = map.insert(doc2.key, doc2);
  }
  return map;
}
function newOverlayedDocumentMap() {
  return newDocumentKeyMap();
}
function convertOverlayedDocumentMapToDocumentMap(collection2) {
  let documents = EMPTY_DOCUMENT_MAP;
  collection2.forEach((k, v) => documents = documents.insert(k, v.overlayedDocument));
  return documents;
}
function newOverlayMap() {
  return newDocumentKeyMap();
}
function newMutationMap() {
  return newDocumentKeyMap();
}
function newDocumentKeyMap() {
  return new ObjectMap((key) => key.toString(), (l, r) => l.isEqual(r));
}
const EMPTY_DOCUMENT_VERSION_MAP = new SortedMap(DocumentKey.comparator);
function documentVersionMap() {
  return EMPTY_DOCUMENT_VERSION_MAP;
}
const EMPTY_DOCUMENT_KEY_SET = new SortedSet(DocumentKey.comparator);
function documentKeySet(...keys) {
  let set2 = EMPTY_DOCUMENT_KEY_SET;
  for (const key of keys) {
    set2 = set2.add(key);
  }
  return set2;
}
const EMPTY_TARGET_ID_SET = new SortedSet(primitiveComparator);
function targetIdSet() {
  return EMPTY_TARGET_ID_SET;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function toDouble(serializer, value) {
  if (serializer.useProto3Json) {
    if (isNaN(value)) {
      return { doubleValue: "NaN" };
    } else if (value === Infinity) {
      return { doubleValue: "Infinity" };
    } else if (value === -Infinity) {
      return { doubleValue: "-Infinity" };
    }
  }
  return { doubleValue: isNegativeZero(value) ? "-0" : value };
}
function toInteger(value) {
  return { integerValue: "" + value };
}
function toNumber(serializer, value) {
  return isSafeInteger(value) ? toInteger(value) : toDouble(serializer, value);
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class TransformOperation {
  constructor() {
    this._ = void 0;
  }
}
function applyTransformOperationToLocalView(transform, previousValue, localWriteTime) {
  if (transform instanceof ServerTimestampTransform) {
    return serverTimestamp$1(localWriteTime, previousValue);
  } else if (transform instanceof ArrayUnionTransformOperation) {
    return applyArrayUnionTransformOperation(transform, previousValue);
  } else if (transform instanceof ArrayRemoveTransformOperation) {
    return applyArrayRemoveTransformOperation(transform, previousValue);
  } else {
    return applyNumericIncrementTransformOperationToLocalView(transform, previousValue);
  }
}
function applyTransformOperationToRemoteDocument(transform, previousValue, transformResult) {
  if (transform instanceof ArrayUnionTransformOperation) {
    return applyArrayUnionTransformOperation(transform, previousValue);
  } else if (transform instanceof ArrayRemoveTransformOperation) {
    return applyArrayRemoveTransformOperation(transform, previousValue);
  }
  return transformResult;
}
function computeTransformOperationBaseValue(transform, previousValue) {
  if (transform instanceof NumericIncrementTransformOperation) {
    return isNumber(previousValue) ? previousValue : { integerValue: 0 };
  }
  return null;
}
function transformOperationEquals(left, right) {
  if (left instanceof ArrayUnionTransformOperation && right instanceof ArrayUnionTransformOperation) {
    return arrayEquals(left.elements, right.elements, valueEquals);
  } else if (left instanceof ArrayRemoveTransformOperation && right instanceof ArrayRemoveTransformOperation) {
    return arrayEquals(left.elements, right.elements, valueEquals);
  } else if (left instanceof NumericIncrementTransformOperation && right instanceof NumericIncrementTransformOperation) {
    return valueEquals(left.operand, right.operand);
  }
  return left instanceof ServerTimestampTransform && right instanceof ServerTimestampTransform;
}
class ServerTimestampTransform extends TransformOperation {
}
class ArrayUnionTransformOperation extends TransformOperation {
  constructor(elements) {
    super();
    this.elements = elements;
  }
}
function applyArrayUnionTransformOperation(transform, previousValue) {
  const values = coercedFieldValuesArray(previousValue);
  for (const toUnion of transform.elements) {
    if (!values.some((element) => valueEquals(element, toUnion))) {
      values.push(toUnion);
    }
  }
  return { arrayValue: { values } };
}
class ArrayRemoveTransformOperation extends TransformOperation {
  constructor(elements) {
    super();
    this.elements = elements;
  }
}
function applyArrayRemoveTransformOperation(transform, previousValue) {
  let values = coercedFieldValuesArray(previousValue);
  for (const toRemove of transform.elements) {
    values = values.filter((element) => !valueEquals(element, toRemove));
  }
  return { arrayValue: { values } };
}
class NumericIncrementTransformOperation extends TransformOperation {
  constructor(serializer, operand) {
    super();
    this.serializer = serializer;
    this.operand = operand;
  }
}
function applyNumericIncrementTransformOperationToLocalView(transform, previousValue) {
  const baseValue = computeTransformOperationBaseValue(transform, previousValue);
  const sum = asNumber(baseValue) + asNumber(transform.operand);
  if (isInteger(baseValue) && isInteger(transform.operand)) {
    return toInteger(sum);
  } else {
    return toDouble(transform.serializer, sum);
  }
}
function asNumber(value) {
  return normalizeNumber(value.integerValue || value.doubleValue);
}
function coercedFieldValuesArray(value) {
  return isArray(value) && value.arrayValue.values ? value.arrayValue.values.slice() : [];
}
function fieldTransformEquals(left, right) {
  return left.field.isEqual(right.field) && transformOperationEquals(left.transform, right.transform);
}
function fieldTransformsAreEqual(left, right) {
  if (left === void 0 && right === void 0) {
    return true;
  }
  if (left && right) {
    return arrayEquals(left, right, (l, r) => fieldTransformEquals(l, r));
  }
  return false;
}
class MutationResult {
  constructor(version2, transformResults) {
    this.version = version2;
    this.transformResults = transformResults;
  }
}
class Precondition {
  constructor(updateTime, exists) {
    this.updateTime = updateTime;
    this.exists = exists;
  }
  /** Creates a new empty Precondition. */
  static none() {
    return new Precondition();
  }
  /** Creates a new Precondition with an exists flag. */
  static exists(exists) {
    return new Precondition(void 0, exists);
  }
  /** Creates a new Precondition based on a version a document exists at. */
  static updateTime(version2) {
    return new Precondition(version2);
  }
  /** Returns whether this Precondition is empty. */
  get isNone() {
    return this.updateTime === void 0 && this.exists === void 0;
  }
  isEqual(other) {
    return this.exists === other.exists && (this.updateTime ? !!other.updateTime && this.updateTime.isEqual(other.updateTime) : !other.updateTime);
  }
}
function preconditionIsValidForDocument(precondition, document2) {
  if (precondition.updateTime !== void 0) {
    return document2.isFoundDocument() && document2.version.isEqual(precondition.updateTime);
  } else if (precondition.exists !== void 0) {
    return precondition.exists === document2.isFoundDocument();
  } else {
    return true;
  }
}
class Mutation {
}
function calculateOverlayMutation(doc2, mask) {
  if (!doc2.hasLocalMutations || mask && mask.fields.length === 0) {
    return null;
  }
  if (mask === null) {
    if (doc2.isNoDocument()) {
      return new DeleteMutation(doc2.key, Precondition.none());
    } else {
      return new SetMutation(doc2.key, doc2.data, Precondition.none());
    }
  } else {
    const docValue = doc2.data;
    const patchValue = ObjectValue.empty();
    let maskSet = new SortedSet(FieldPath$1.comparator);
    for (let path of mask.fields) {
      if (!maskSet.has(path)) {
        let value = docValue.field(path);
        if (value === null && path.length > 1) {
          path = path.popLast();
          value = docValue.field(path);
        }
        if (value === null) {
          patchValue.delete(path);
        } else {
          patchValue.set(path, value);
        }
        maskSet = maskSet.add(path);
      }
    }
    return new PatchMutation(doc2.key, patchValue, new FieldMask(maskSet.toArray()), Precondition.none());
  }
}
function mutationApplyToRemoteDocument(mutation, document2, mutationResult) {
  if (mutation instanceof SetMutation) {
    setMutationApplyToRemoteDocument(mutation, document2, mutationResult);
  } else if (mutation instanceof PatchMutation) {
    patchMutationApplyToRemoteDocument(mutation, document2, mutationResult);
  } else {
    deleteMutationApplyToRemoteDocument(mutation, document2, mutationResult);
  }
}
function mutationApplyToLocalView(mutation, document2, previousMask, localWriteTime) {
  if (mutation instanceof SetMutation) {
    return setMutationApplyToLocalView(mutation, document2, previousMask, localWriteTime);
  } else if (mutation instanceof PatchMutation) {
    return patchMutationApplyToLocalView(mutation, document2, previousMask, localWriteTime);
  } else {
    return deleteMutationApplyToLocalView(mutation, document2, previousMask);
  }
}
function mutationExtractBaseValue(mutation, document2) {
  let baseObject = null;
  for (const fieldTransform of mutation.fieldTransforms) {
    const existingValue = document2.data.field(fieldTransform.field);
    const coercedValue = computeTransformOperationBaseValue(fieldTransform.transform, existingValue || null);
    if (coercedValue != null) {
      if (baseObject === null) {
        baseObject = ObjectValue.empty();
      }
      baseObject.set(fieldTransform.field, coercedValue);
    }
  }
  return baseObject ? baseObject : null;
}
function mutationEquals(left, right) {
  if (left.type !== right.type) {
    return false;
  }
  if (!left.key.isEqual(right.key)) {
    return false;
  }
  if (!left.precondition.isEqual(right.precondition)) {
    return false;
  }
  if (!fieldTransformsAreEqual(left.fieldTransforms, right.fieldTransforms)) {
    return false;
  }
  if (left.type === 0) {
    return left.value.isEqual(right.value);
  }
  if (left.type === 1) {
    return left.data.isEqual(right.data) && left.fieldMask.isEqual(right.fieldMask);
  }
  return true;
}
class SetMutation extends Mutation {
  constructor(key, value, precondition, fieldTransforms = []) {
    super();
    this.key = key;
    this.value = value;
    this.precondition = precondition;
    this.fieldTransforms = fieldTransforms;
    this.type = 0;
  }
  getFieldMask() {
    return null;
  }
}
function setMutationApplyToRemoteDocument(mutation, document2, mutationResult) {
  const newData = mutation.value.clone();
  const transformResults = serverTransformResults(mutation.fieldTransforms, document2, mutationResult.transformResults);
  newData.setAll(transformResults);
  document2.convertToFoundDocument(mutationResult.version, newData).setHasCommittedMutations();
}
function setMutationApplyToLocalView(mutation, document2, previousMask, localWriteTime) {
  if (!preconditionIsValidForDocument(mutation.precondition, document2)) {
    return previousMask;
  }
  const newData = mutation.value.clone();
  const transformResults = localTransformResults(mutation.fieldTransforms, localWriteTime, document2);
  newData.setAll(transformResults);
  document2.convertToFoundDocument(document2.version, newData).setHasLocalMutations();
  return null;
}
class PatchMutation extends Mutation {
  constructor(key, data, fieldMask, precondition, fieldTransforms = []) {
    super();
    this.key = key;
    this.data = data;
    this.fieldMask = fieldMask;
    this.precondition = precondition;
    this.fieldTransforms = fieldTransforms;
    this.type = 1;
  }
  getFieldMask() {
    return this.fieldMask;
  }
}
function patchMutationApplyToRemoteDocument(mutation, document2, mutationResult) {
  if (!preconditionIsValidForDocument(mutation.precondition, document2)) {
    document2.convertToUnknownDocument(mutationResult.version);
    return;
  }
  const transformResults = serverTransformResults(mutation.fieldTransforms, document2, mutationResult.transformResults);
  const newData = document2.data;
  newData.setAll(getPatch(mutation));
  newData.setAll(transformResults);
  document2.convertToFoundDocument(mutationResult.version, newData).setHasCommittedMutations();
}
function patchMutationApplyToLocalView(mutation, document2, previousMask, localWriteTime) {
  if (!preconditionIsValidForDocument(mutation.precondition, document2)) {
    return previousMask;
  }
  const transformResults = localTransformResults(mutation.fieldTransforms, localWriteTime, document2);
  const newData = document2.data;
  newData.setAll(getPatch(mutation));
  newData.setAll(transformResults);
  document2.convertToFoundDocument(document2.version, newData).setHasLocalMutations();
  if (previousMask === null) {
    return null;
  }
  return previousMask.unionWith(mutation.fieldMask.fields).unionWith(mutation.fieldTransforms.map((transform) => transform.field));
}
function getPatch(mutation) {
  const result = /* @__PURE__ */ new Map();
  mutation.fieldMask.fields.forEach((fieldPath) => {
    if (!fieldPath.isEmpty()) {
      const newValue = mutation.data.field(fieldPath);
      result.set(fieldPath, newValue);
    }
  });
  return result;
}
function serverTransformResults(fieldTransforms, mutableDocument, serverTransformResults2) {
  const transformResults = /* @__PURE__ */ new Map();
  hardAssert(fieldTransforms.length === serverTransformResults2.length);
  for (let i = 0; i < serverTransformResults2.length; i++) {
    const fieldTransform = fieldTransforms[i];
    const transform = fieldTransform.transform;
    const previousValue = mutableDocument.data.field(fieldTransform.field);
    transformResults.set(fieldTransform.field, applyTransformOperationToRemoteDocument(transform, previousValue, serverTransformResults2[i]));
  }
  return transformResults;
}
function localTransformResults(fieldTransforms, localWriteTime, mutableDocument) {
  const transformResults = /* @__PURE__ */ new Map();
  for (const fieldTransform of fieldTransforms) {
    const transform = fieldTransform.transform;
    const previousValue = mutableDocument.data.field(fieldTransform.field);
    transformResults.set(fieldTransform.field, applyTransformOperationToLocalView(transform, previousValue, localWriteTime));
  }
  return transformResults;
}
class DeleteMutation extends Mutation {
  constructor(key, precondition) {
    super();
    this.key = key;
    this.precondition = precondition;
    this.type = 2;
    this.fieldTransforms = [];
  }
  getFieldMask() {
    return null;
  }
}
function deleteMutationApplyToRemoteDocument(mutation, document2, mutationResult) {
  document2.convertToNoDocument(mutationResult.version).setHasCommittedMutations();
}
function deleteMutationApplyToLocalView(mutation, document2, previousMask) {
  if (preconditionIsValidForDocument(mutation.precondition, document2)) {
    document2.convertToNoDocument(document2.version).setHasLocalMutations();
    return null;
  }
  return previousMask;
}
class VerifyMutation extends Mutation {
  constructor(key, precondition) {
    super();
    this.key = key;
    this.precondition = precondition;
    this.type = 3;
    this.fieldTransforms = [];
  }
  getFieldMask() {
    return null;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MutationBatch {
  /**
   * @param batchId - The unique ID of this mutation batch.
   * @param localWriteTime - The original write time of this mutation.
   * @param baseMutations - Mutations that are used to populate the base
   * values when this mutation is applied locally. This can be used to locally
   * overwrite values that are persisted in the remote document cache. Base
   * mutations are never sent to the backend.
   * @param mutations - The user-provided mutations in this mutation batch.
   * User-provided mutations are applied both locally and remotely on the
   * backend.
   */
  constructor(batchId, localWriteTime, baseMutations, mutations) {
    this.batchId = batchId;
    this.localWriteTime = localWriteTime;
    this.baseMutations = baseMutations;
    this.mutations = mutations;
  }
  /**
   * Applies all the mutations in this MutationBatch to the specified document
   * to compute the state of the remote document
   *
   * @param document - The document to apply mutations to.
   * @param batchResult - The result of applying the MutationBatch to the
   * backend.
   */
  applyToRemoteDocument(document2, batchResult) {
    const mutationResults = batchResult.mutationResults;
    for (let i = 0; i < this.mutations.length; i++) {
      const mutation = this.mutations[i];
      if (mutation.key.isEqual(document2.key)) {
        const mutationResult = mutationResults[i];
        mutationApplyToRemoteDocument(mutation, document2, mutationResult);
      }
    }
  }
  /**
   * Computes the local view of a document given all the mutations in this
   * batch.
   *
   * @param document - The document to apply mutations to.
   * @param mutatedFields - Fields that have been updated before applying this mutation batch.
   * @returns A `FieldMask` representing all the fields that are mutated.
   */
  applyToLocalView(document2, mutatedFields) {
    for (const mutation of this.baseMutations) {
      if (mutation.key.isEqual(document2.key)) {
        mutatedFields = mutationApplyToLocalView(mutation, document2, mutatedFields, this.localWriteTime);
      }
    }
    for (const mutation of this.mutations) {
      if (mutation.key.isEqual(document2.key)) {
        mutatedFields = mutationApplyToLocalView(mutation, document2, mutatedFields, this.localWriteTime);
      }
    }
    return mutatedFields;
  }
  /**
   * Computes the local view for all provided documents given the mutations in
   * this batch. Returns a `DocumentKey` to `Mutation` map which can be used to
   * replace all the mutation applications.
   */
  applyToLocalDocumentSet(documentMap2, documentsWithoutRemoteVersion) {
    const overlays = newMutationMap();
    this.mutations.forEach((m) => {
      const overlayedDocument = documentMap2.get(m.key);
      const mutableDocument = overlayedDocument.overlayedDocument;
      let mutatedFields = this.applyToLocalView(mutableDocument, overlayedDocument.mutatedFields);
      mutatedFields = documentsWithoutRemoteVersion.has(m.key) ? null : mutatedFields;
      const overlay = calculateOverlayMutation(mutableDocument, mutatedFields);
      if (overlay !== null) {
        overlays.set(m.key, overlay);
      }
      if (!mutableDocument.isValidDocument()) {
        mutableDocument.convertToNoDocument(SnapshotVersion.min());
      }
    });
    return overlays;
  }
  keys() {
    return this.mutations.reduce((keys, m) => keys.add(m.key), documentKeySet());
  }
  isEqual(other) {
    return this.batchId === other.batchId && arrayEquals(this.mutations, other.mutations, (l, r) => mutationEquals(l, r)) && arrayEquals(this.baseMutations, other.baseMutations, (l, r) => mutationEquals(l, r));
  }
}
class MutationBatchResult {
  constructor(batch, commitVersion, mutationResults, docVersions) {
    this.batch = batch;
    this.commitVersion = commitVersion;
    this.mutationResults = mutationResults;
    this.docVersions = docVersions;
  }
  /**
   * Creates a new MutationBatchResult for the given batch and results. There
   * must be one result for each mutation in the batch. This static factory
   * caches a document=&gt;version mapping (docVersions).
   */
  static from(batch, commitVersion, results) {
    hardAssert(batch.mutations.length === results.length);
    let versionMap = documentVersionMap();
    const mutations = batch.mutations;
    for (let i = 0; i < mutations.length; i++) {
      versionMap = versionMap.insert(mutations[i].key, results[i].version);
    }
    return new MutationBatchResult(batch, commitVersion, results, versionMap);
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Overlay {
  constructor(largestBatchId, mutation) {
    this.largestBatchId = largestBatchId;
    this.mutation = mutation;
  }
  getKey() {
    return this.mutation.key;
  }
  isEqual(other) {
    return other !== null && this.mutation === other.mutation;
  }
  toString() {
    return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ExistenceFilter {
  constructor(count, unchangedNames) {
    this.count = count;
    this.unchangedNames = unchangedNames;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var RpcCode;
(function(RpcCode2) {
  RpcCode2[RpcCode2["OK"] = 0] = "OK";
  RpcCode2[RpcCode2["CANCELLED"] = 1] = "CANCELLED";
  RpcCode2[RpcCode2["UNKNOWN"] = 2] = "UNKNOWN";
  RpcCode2[RpcCode2["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
  RpcCode2[RpcCode2["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
  RpcCode2[RpcCode2["NOT_FOUND"] = 5] = "NOT_FOUND";
  RpcCode2[RpcCode2["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
  RpcCode2[RpcCode2["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
  RpcCode2[RpcCode2["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
  RpcCode2[RpcCode2["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
  RpcCode2[RpcCode2["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
  RpcCode2[RpcCode2["ABORTED"] = 10] = "ABORTED";
  RpcCode2[RpcCode2["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
  RpcCode2[RpcCode2["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
  RpcCode2[RpcCode2["INTERNAL"] = 13] = "INTERNAL";
  RpcCode2[RpcCode2["UNAVAILABLE"] = 14] = "UNAVAILABLE";
  RpcCode2[RpcCode2["DATA_LOSS"] = 15] = "DATA_LOSS";
})(RpcCode || (RpcCode = {}));
function isPermanentError(code) {
  switch (code) {
    case Code.OK:
      return fail();
    case Code.CANCELLED:
    case Code.UNKNOWN:
    case Code.DEADLINE_EXCEEDED:
    case Code.RESOURCE_EXHAUSTED:
    case Code.INTERNAL:
    case Code.UNAVAILABLE:
    case Code.UNAUTHENTICATED:
      return false;
    case Code.INVALID_ARGUMENT:
    case Code.NOT_FOUND:
    case Code.ALREADY_EXISTS:
    case Code.PERMISSION_DENIED:
    case Code.FAILED_PRECONDITION:
    case Code.ABORTED:
    case Code.OUT_OF_RANGE:
    case Code.UNIMPLEMENTED:
    case Code.DATA_LOSS:
      return true;
    default:
      return fail();
  }
}
function isPermanentWriteError(code) {
  return isPermanentError(code) && code !== Code.ABORTED;
}
function mapCodeFromRpcCode(code) {
  if (code === void 0) {
    logError("GRPC error has no .code");
    return Code.UNKNOWN;
  }
  switch (code) {
    case RpcCode.OK:
      return Code.OK;
    case RpcCode.CANCELLED:
      return Code.CANCELLED;
    case RpcCode.UNKNOWN:
      return Code.UNKNOWN;
    case RpcCode.DEADLINE_EXCEEDED:
      return Code.DEADLINE_EXCEEDED;
    case RpcCode.RESOURCE_EXHAUSTED:
      return Code.RESOURCE_EXHAUSTED;
    case RpcCode.INTERNAL:
      return Code.INTERNAL;
    case RpcCode.UNAVAILABLE:
      return Code.UNAVAILABLE;
    case RpcCode.UNAUTHENTICATED:
      return Code.UNAUTHENTICATED;
    case RpcCode.INVALID_ARGUMENT:
      return Code.INVALID_ARGUMENT;
    case RpcCode.NOT_FOUND:
      return Code.NOT_FOUND;
    case RpcCode.ALREADY_EXISTS:
      return Code.ALREADY_EXISTS;
    case RpcCode.PERMISSION_DENIED:
      return Code.PERMISSION_DENIED;
    case RpcCode.FAILED_PRECONDITION:
      return Code.FAILED_PRECONDITION;
    case RpcCode.ABORTED:
      return Code.ABORTED;
    case RpcCode.OUT_OF_RANGE:
      return Code.OUT_OF_RANGE;
    case RpcCode.UNIMPLEMENTED:
      return Code.UNIMPLEMENTED;
    case RpcCode.DATA_LOSS:
      return Code.DATA_LOSS;
    default:
      return fail();
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Base64DecodeError extends Error {
  constructor() {
    super(...arguments);
    this.name = "Base64DecodeError";
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class TestingHooks {
  constructor() {
    this.onExistenceFilterMismatchCallbacks = /* @__PURE__ */ new Map();
  }
  /**
   * Returns the singleton instance of this class, or null if it has not been
   * initialized.
   */
  static get instance() {
    return gTestingHooksSingletonInstance;
  }
  /**
   * Returns the singleton instance of this class, creating it if is has never
   * been created before.
   */
  static getOrCreateInstance() {
    if (gTestingHooksSingletonInstance === null) {
      gTestingHooksSingletonInstance = new TestingHooks();
    }
    return gTestingHooksSingletonInstance;
  }
  /**
   * Registers a callback to be notified when an existence filter mismatch
   * occurs in the Watch listen stream.
   *
   * The relative order in which callbacks are notified is unspecified; do not
   * rely on any particular ordering. If a given callback is registered multiple
   * times then it will be notified multiple times, once per registration.
   *
   * @param callback the callback to invoke upon existence filter mismatch.
   *
   * @return a function that, when called, unregisters the given callback; only
   * the first invocation of the returned function does anything; all subsequent
   * invocations do nothing.
   */
  onExistenceFilterMismatch(callback) {
    const key = Symbol();
    this.onExistenceFilterMismatchCallbacks.set(key, callback);
    return () => this.onExistenceFilterMismatchCallbacks.delete(key);
  }
  /**
   * Invokes all currently-registered `onExistenceFilterMismatch` callbacks.
   * @param info Information about the existence filter mismatch.
   */
  notifyOnExistenceFilterMismatch(info) {
    this.onExistenceFilterMismatchCallbacks.forEach((callback) => callback(info));
  }
}
let gTestingHooksSingletonInstance = null;
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function newTextEncoder() {
  return new TextEncoder();
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const MAX_64_BIT_UNSIGNED_INTEGER = new Integer([4294967295, 4294967295], 0);
function getMd5HashValue(value) {
  const encodedValue = newTextEncoder().encode(value);
  const md5 = new Md5();
  md5.update(encodedValue);
  return new Uint8Array(md5.digest());
}
function get64BitUints(Bytes2) {
  const dataView = new DataView(Bytes2.buffer);
  const chunk1 = dataView.getUint32(
    0,
    /* littleEndian= */
    true
  );
  const chunk2 = dataView.getUint32(
    4,
    /* littleEndian= */
    true
  );
  const chunk3 = dataView.getUint32(
    8,
    /* littleEndian= */
    true
  );
  const chunk4 = dataView.getUint32(
    12,
    /* littleEndian= */
    true
  );
  const integer1 = new Integer([chunk1, chunk2], 0);
  const integer2 = new Integer([chunk3, chunk4], 0);
  return [integer1, integer2];
}
class BloomFilter {
  constructor(bitmap, padding, hashCount) {
    this.bitmap = bitmap;
    this.padding = padding;
    this.hashCount = hashCount;
    if (padding < 0 || padding >= 8) {
      throw new BloomFilterError(`Invalid padding: ${padding}`);
    }
    if (hashCount < 0) {
      throw new BloomFilterError(`Invalid hash count: ${hashCount}`);
    }
    if (bitmap.length > 0 && this.hashCount === 0) {
      throw new BloomFilterError(`Invalid hash count: ${hashCount}`);
    }
    if (bitmap.length === 0 && padding !== 0) {
      throw new BloomFilterError(`Invalid padding when bitmap length is 0: ${padding}`);
    }
    this.bitCount = bitmap.length * 8 - padding;
    this.bitCountInInteger = Integer.fromNumber(this.bitCount);
  }
  // Calculate the ith hash value based on the hashed 64bit integers,
  // and calculate its corresponding bit index in the bitmap to be checked.
  getBitIndex(num1, num2, hashIndex) {
    let hashValue = num1.add(num2.multiply(Integer.fromNumber(hashIndex)));
    if (hashValue.compare(MAX_64_BIT_UNSIGNED_INTEGER) === 1) {
      hashValue = new Integer([hashValue.getBits(0), hashValue.getBits(1)], 0);
    }
    return hashValue.modulo(this.bitCountInInteger).toNumber();
  }
  // Return whether the bit on the given index in the bitmap is set to 1.
  isBitSet(index) {
    const byte = this.bitmap[Math.floor(index / 8)];
    const offset = index % 8;
    return (byte & 1 << offset) !== 0;
  }
  mightContain(value) {
    if (this.bitCount === 0) {
      return false;
    }
    const md5HashedValue = getMd5HashValue(value);
    const [hash1, hash2] = get64BitUints(md5HashedValue);
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.getBitIndex(hash1, hash2, i);
      if (!this.isBitSet(index)) {
        return false;
      }
    }
    return true;
  }
  /** Create bloom filter for testing purposes only. */
  static create(bitCount, hashCount, contains) {
    const padding = bitCount % 8 === 0 ? 0 : 8 - bitCount % 8;
    const bitmap = new Uint8Array(Math.ceil(bitCount / 8));
    const bloomFilter = new BloomFilter(bitmap, padding, hashCount);
    contains.forEach((item) => bloomFilter.insert(item));
    return bloomFilter;
  }
  insert(value) {
    if (this.bitCount === 0) {
      return;
    }
    const md5HashedValue = getMd5HashValue(value);
    const [hash1, hash2] = get64BitUints(md5HashedValue);
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.getBitIndex(hash1, hash2, i);
      this.setBit(index);
    }
  }
  setBit(index) {
    const indexOfByte = Math.floor(index / 8);
    const offset = index % 8;
    this.bitmap[indexOfByte] |= 1 << offset;
  }
}
class BloomFilterError extends Error {
  constructor() {
    super(...arguments);
    this.name = "BloomFilterError";
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class RemoteEvent {
  constructor(snapshotVersion, targetChanges, targetMismatches, documentUpdates, resolvedLimboDocuments) {
    this.snapshotVersion = snapshotVersion;
    this.targetChanges = targetChanges;
    this.targetMismatches = targetMismatches;
    this.documentUpdates = documentUpdates;
    this.resolvedLimboDocuments = resolvedLimboDocuments;
  }
  /**
   * HACK: Views require RemoteEvents in order to determine whether the view is
   * CURRENT, but secondary tabs don't receive remote events. So this method is
   * used to create a synthesized RemoteEvent that can be used to apply a
   * CURRENT status change to a View, for queries executed in a different tab.
   */
  // PORTING NOTE: Multi-tab only
  static createSynthesizedRemoteEventForCurrentChange(targetId, current, resumeToken) {
    const targetChanges = /* @__PURE__ */ new Map();
    targetChanges.set(targetId, TargetChange.createSynthesizedTargetChangeForCurrentChange(targetId, current, resumeToken));
    return new RemoteEvent(SnapshotVersion.min(), targetChanges, new SortedMap(primitiveComparator), mutableDocumentMap(), documentKeySet());
  }
}
class TargetChange {
  constructor(resumeToken, current, addedDocuments, modifiedDocuments, removedDocuments) {
    this.resumeToken = resumeToken;
    this.current = current;
    this.addedDocuments = addedDocuments;
    this.modifiedDocuments = modifiedDocuments;
    this.removedDocuments = removedDocuments;
  }
  /**
   * This method is used to create a synthesized TargetChanges that can be used to
   * apply a CURRENT status change to a View (for queries executed in a different
   * tab) or for new queries (to raise snapshots with correct CURRENT status).
   */
  static createSynthesizedTargetChangeForCurrentChange(targetId, current, resumeToken) {
    return new TargetChange(resumeToken, current, documentKeySet(), documentKeySet(), documentKeySet());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class DocumentWatchChange {
  constructor(updatedTargetIds, removedTargetIds, key, newDoc) {
    this.updatedTargetIds = updatedTargetIds;
    this.removedTargetIds = removedTargetIds;
    this.key = key;
    this.newDoc = newDoc;
  }
}
class ExistenceFilterChange {
  constructor(targetId, existenceFilter) {
    this.targetId = targetId;
    this.existenceFilter = existenceFilter;
  }
}
class WatchTargetChange {
  constructor(state, targetIds, resumeToken = ByteString.EMPTY_BYTE_STRING, cause = null) {
    this.state = state;
    this.targetIds = targetIds;
    this.resumeToken = resumeToken;
    this.cause = cause;
  }
}
class TargetState {
  constructor() {
    this.pendingResponses = 0;
    this.documentChanges = snapshotChangesMap();
    this._resumeToken = ByteString.EMPTY_BYTE_STRING;
    this._current = false;
    this._hasPendingChanges = true;
  }
  /**
   * Whether this target has been marked 'current'.
   *
   * 'Current' has special meaning in the RPC protocol: It implies that the
   * Watch backend has sent us all changes up to the point at which the target
   * was added and that the target is consistent with the rest of the watch
   * stream.
   */
  get current() {
    return this._current;
  }
  /** The last resume token sent to us for this target. */
  get resumeToken() {
    return this._resumeToken;
  }
  /** Whether this target has pending target adds or target removes. */
  get isPending() {
    return this.pendingResponses !== 0;
  }
  /** Whether we have modified any state that should trigger a snapshot. */
  get hasPendingChanges() {
    return this._hasPendingChanges;
  }
  /**
   * Applies the resume token to the TargetChange, but only when it has a new
   * value. Empty resumeTokens are discarded.
   */
  updateResumeToken(resumeToken) {
    if (resumeToken.approximateByteSize() > 0) {
      this._hasPendingChanges = true;
      this._resumeToken = resumeToken;
    }
  }
  /**
   * Creates a target change from the current set of changes.
   *
   * To reset the document changes after raising this snapshot, call
   * `clearPendingChanges()`.
   */
  toTargetChange() {
    let addedDocuments = documentKeySet();
    let modifiedDocuments = documentKeySet();
    let removedDocuments = documentKeySet();
    this.documentChanges.forEach((key, changeType) => {
      switch (changeType) {
        case 0:
          addedDocuments = addedDocuments.add(key);
          break;
        case 2:
          modifiedDocuments = modifiedDocuments.add(key);
          break;
        case 1:
          removedDocuments = removedDocuments.add(key);
          break;
        default:
          fail();
      }
    });
    return new TargetChange(this._resumeToken, this._current, addedDocuments, modifiedDocuments, removedDocuments);
  }
  /**
   * Resets the document changes and sets `hasPendingChanges` to false.
   */
  clearPendingChanges() {
    this._hasPendingChanges = false;
    this.documentChanges = snapshotChangesMap();
  }
  addDocumentChange(key, changeType) {
    this._hasPendingChanges = true;
    this.documentChanges = this.documentChanges.insert(key, changeType);
  }
  removeDocumentChange(key) {
    this._hasPendingChanges = true;
    this.documentChanges = this.documentChanges.remove(key);
  }
  recordPendingTargetRequest() {
    this.pendingResponses += 1;
  }
  recordTargetResponse() {
    this.pendingResponses -= 1;
  }
  markCurrent() {
    this._hasPendingChanges = true;
    this._current = true;
  }
}
const LOG_TAG$g = "WatchChangeAggregator";
class WatchChangeAggregator {
  constructor(metadataProvider) {
    this.metadataProvider = metadataProvider;
    this.targetStates = /* @__PURE__ */ new Map();
    this.pendingDocumentUpdates = mutableDocumentMap();
    this.pendingDocumentTargetMapping = documentTargetMap();
    this.pendingTargetResets = new SortedMap(primitiveComparator);
  }
  /**
   * Processes and adds the DocumentWatchChange to the current set of changes.
   */
  handleDocumentChange(docChange) {
    for (const targetId of docChange.updatedTargetIds) {
      if (docChange.newDoc && docChange.newDoc.isFoundDocument()) {
        this.addDocumentToTarget(targetId, docChange.newDoc);
      } else {
        this.removeDocumentFromTarget(targetId, docChange.key, docChange.newDoc);
      }
    }
    for (const targetId of docChange.removedTargetIds) {
      this.removeDocumentFromTarget(targetId, docChange.key, docChange.newDoc);
    }
  }
  /** Processes and adds the WatchTargetChange to the current set of changes. */
  handleTargetChange(targetChange) {
    this.forEachTarget(targetChange, (targetId) => {
      const targetState = this.ensureTargetState(targetId);
      switch (targetChange.state) {
        case 0:
          if (this.isActiveTarget(targetId)) {
            targetState.updateResumeToken(targetChange.resumeToken);
          }
          break;
        case 1:
          targetState.recordTargetResponse();
          if (!targetState.isPending) {
            targetState.clearPendingChanges();
          }
          targetState.updateResumeToken(targetChange.resumeToken);
          break;
        case 2:
          targetState.recordTargetResponse();
          if (!targetState.isPending) {
            this.removeTarget(targetId);
          }
          break;
        case 3:
          if (this.isActiveTarget(targetId)) {
            targetState.markCurrent();
            targetState.updateResumeToken(targetChange.resumeToken);
          }
          break;
        case 4:
          if (this.isActiveTarget(targetId)) {
            this.resetTarget(targetId);
            targetState.updateResumeToken(targetChange.resumeToken);
          }
          break;
        default:
          fail();
      }
    });
  }
  /**
   * Iterates over all targetIds that the watch change applies to: either the
   * targetIds explicitly listed in the change or the targetIds of all currently
   * active targets.
   */
  forEachTarget(targetChange, fn) {
    if (targetChange.targetIds.length > 0) {
      targetChange.targetIds.forEach(fn);
    } else {
      this.targetStates.forEach((_, targetId) => {
        if (this.isActiveTarget(targetId)) {
          fn(targetId);
        }
      });
    }
  }
  /**
   * Handles existence filters and synthesizes deletes for filter mismatches.
   * Targets that are invalidated by filter mismatches are added to
   * `pendingTargetResets`.
   */
  handleExistenceFilter(watchChange) {
    var _a;
    const targetId = watchChange.targetId;
    const expectedCount = watchChange.existenceFilter.count;
    const targetData = this.targetDataForActiveTarget(targetId);
    if (targetData) {
      const target = targetData.target;
      if (targetIsDocumentTarget(target)) {
        if (expectedCount === 0) {
          const key = new DocumentKey(target.path);
          this.removeDocumentFromTarget(targetId, key, MutableDocument.newNoDocument(key, SnapshotVersion.min()));
        } else {
          hardAssert(expectedCount === 1);
        }
      } else {
        const currentSize = this.getCurrentDocumentCountForTarget(targetId);
        if (currentSize !== expectedCount) {
          const status = this.applyBloomFilter(watchChange, currentSize);
          if (status !== 0) {
            this.resetTarget(targetId);
            const purpose = status === 2 ? "TargetPurposeExistenceFilterMismatchBloom" : "TargetPurposeExistenceFilterMismatch";
            this.pendingTargetResets = this.pendingTargetResets.insert(targetId, purpose);
          }
          (_a = TestingHooks.instance) === null || _a === void 0 ? void 0 : _a.notifyOnExistenceFilterMismatch(createExistenceFilterMismatchInfoForTestingHooks(status, currentSize, watchChange.existenceFilter));
        }
      }
    }
  }
  /**
   * Apply bloom filter to remove the deleted documents, and return the
   * application status.
   */
  applyBloomFilter(watchChange, currentCount) {
    const { unchangedNames, count: expectedCount } = watchChange.existenceFilter;
    if (!unchangedNames || !unchangedNames.bits) {
      return 1;
    }
    const { bits: { bitmap = "", padding = 0 }, hashCount = 0 } = unchangedNames;
    let normalizedBitmap;
    try {
      normalizedBitmap = normalizeByteString(bitmap).toUint8Array();
    } catch (err) {
      if (err instanceof Base64DecodeError) {
        logWarn("Decoding the base64 bloom filter in existence filter failed (" + err.message + "); ignoring the bloom filter and falling back to full re-query.");
        return 1;
      } else {
        throw err;
      }
    }
    let bloomFilter;
    try {
      bloomFilter = new BloomFilter(normalizedBitmap, padding, hashCount);
    } catch (err) {
      if (err instanceof BloomFilterError) {
        logWarn("BloomFilter error: ", err);
      } else {
        logWarn("Applying bloom filter failed: ", err);
      }
      return 1;
    }
    if (bloomFilter.bitCount === 0) {
      return 1;
    }
    const removedDocumentCount = this.filterRemovedDocuments(watchChange.targetId, bloomFilter);
    if (expectedCount !== currentCount - removedDocumentCount) {
      return 2;
    }
    return 0;
  }
  /**
   * Filter out removed documents based on bloom filter membership result and
   * return number of documents removed.
   */
  filterRemovedDocuments(targetId, bloomFilter) {
    const existingKeys = this.metadataProvider.getRemoteKeysForTarget(targetId);
    let removalCount = 0;
    existingKeys.forEach((key) => {
      const databaseId = this.metadataProvider.getDatabaseId();
      const documentPath = `projects/${databaseId.projectId}/databases/${databaseId.database}/documents/${key.path.canonicalString()}`;
      if (!bloomFilter.mightContain(documentPath)) {
        this.removeDocumentFromTarget(
          targetId,
          key,
          /*updatedDocument=*/
          null
        );
        removalCount++;
      }
    });
    return removalCount;
  }
  /**
   * Converts the currently accumulated state into a remote event at the
   * provided snapshot version. Resets the accumulated changes before returning.
   */
  createRemoteEvent(snapshotVersion) {
    const targetChanges = /* @__PURE__ */ new Map();
    this.targetStates.forEach((targetState, targetId) => {
      const targetData = this.targetDataForActiveTarget(targetId);
      if (targetData) {
        if (targetState.current && targetIsDocumentTarget(targetData.target)) {
          const key = new DocumentKey(targetData.target.path);
          if (this.pendingDocumentUpdates.get(key) === null && !this.targetContainsDocument(targetId, key)) {
            this.removeDocumentFromTarget(targetId, key, MutableDocument.newNoDocument(key, snapshotVersion));
          }
        }
        if (targetState.hasPendingChanges) {
          targetChanges.set(targetId, targetState.toTargetChange());
          targetState.clearPendingChanges();
        }
      }
    });
    let resolvedLimboDocuments = documentKeySet();
    this.pendingDocumentTargetMapping.forEach((key, targets) => {
      let isOnlyLimboTarget = true;
      targets.forEachWhile((targetId) => {
        const targetData = this.targetDataForActiveTarget(targetId);
        if (targetData && targetData.purpose !== "TargetPurposeLimboResolution") {
          isOnlyLimboTarget = false;
          return false;
        }
        return true;
      });
      if (isOnlyLimboTarget) {
        resolvedLimboDocuments = resolvedLimboDocuments.add(key);
      }
    });
    this.pendingDocumentUpdates.forEach((_, doc2) => doc2.setReadTime(snapshotVersion));
    const remoteEvent = new RemoteEvent(snapshotVersion, targetChanges, this.pendingTargetResets, this.pendingDocumentUpdates, resolvedLimboDocuments);
    this.pendingDocumentUpdates = mutableDocumentMap();
    this.pendingDocumentTargetMapping = documentTargetMap();
    this.pendingTargetResets = new SortedMap(primitiveComparator);
    return remoteEvent;
  }
  /**
   * Adds the provided document to the internal list of document updates and
   * its document key to the given target's mapping.
   */
  // Visible for testing.
  addDocumentToTarget(targetId, document2) {
    if (!this.isActiveTarget(targetId)) {
      return;
    }
    const changeType = this.targetContainsDocument(targetId, document2.key) ? 2 : 0;
    const targetState = this.ensureTargetState(targetId);
    targetState.addDocumentChange(document2.key, changeType);
    this.pendingDocumentUpdates = this.pendingDocumentUpdates.insert(document2.key, document2);
    this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(document2.key, this.ensureDocumentTargetMapping(document2.key).add(targetId));
  }
  /**
   * Removes the provided document from the target mapping. If the
   * document no longer matches the target, but the document's state is still
   * known (e.g. we know that the document was deleted or we received the change
   * that caused the filter mismatch), the new document can be provided
   * to update the remote document cache.
   */
  // Visible for testing.
  removeDocumentFromTarget(targetId, key, updatedDocument) {
    if (!this.isActiveTarget(targetId)) {
      return;
    }
    const targetState = this.ensureTargetState(targetId);
    if (this.targetContainsDocument(targetId, key)) {
      targetState.addDocumentChange(
        key,
        1
        /* ChangeType.Removed */
      );
    } else {
      targetState.removeDocumentChange(key);
    }
    this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(key, this.ensureDocumentTargetMapping(key).delete(targetId));
    if (updatedDocument) {
      this.pendingDocumentUpdates = this.pendingDocumentUpdates.insert(key, updatedDocument);
    }
  }
  removeTarget(targetId) {
    this.targetStates.delete(targetId);
  }
  /**
   * Returns the current count of documents in the target. This includes both
   * the number of documents that the LocalStore considers to be part of the
   * target as well as any accumulated changes.
   */
  getCurrentDocumentCountForTarget(targetId) {
    const targetState = this.ensureTargetState(targetId);
    const targetChange = targetState.toTargetChange();
    return this.metadataProvider.getRemoteKeysForTarget(targetId).size + targetChange.addedDocuments.size - targetChange.removedDocuments.size;
  }
  /**
   * Increment the number of acks needed from watch before we can consider the
   * server to be 'in-sync' with the client's active targets.
   */
  recordPendingTargetRequest(targetId) {
    const targetState = this.ensureTargetState(targetId);
    targetState.recordPendingTargetRequest();
  }
  ensureTargetState(targetId) {
    let result = this.targetStates.get(targetId);
    if (!result) {
      result = new TargetState();
      this.targetStates.set(targetId, result);
    }
    return result;
  }
  ensureDocumentTargetMapping(key) {
    let targetMapping = this.pendingDocumentTargetMapping.get(key);
    if (!targetMapping) {
      targetMapping = new SortedSet(primitiveComparator);
      this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(key, targetMapping);
    }
    return targetMapping;
  }
  /**
   * Verifies that the user is still interested in this target (by calling
   * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
   * from watch.
   */
  isActiveTarget(targetId) {
    const targetActive = this.targetDataForActiveTarget(targetId) !== null;
    if (!targetActive) {
      logDebug(LOG_TAG$g, "Detected inactive target", targetId);
    }
    return targetActive;
  }
  /**
   * Returns the TargetData for an active target (i.e. a target that the user
   * is still interested in that has no outstanding target change requests).
   */
  targetDataForActiveTarget(targetId) {
    const targetState = this.targetStates.get(targetId);
    return targetState && targetState.isPending ? null : this.metadataProvider.getTargetDataForTarget(targetId);
  }
  /**
   * Resets the state of a Watch target to its initial state (e.g. sets
   * 'current' to false, clears the resume token and removes its target mapping
   * from all documents).
   */
  resetTarget(targetId) {
    this.targetStates.set(targetId, new TargetState());
    const existingKeys = this.metadataProvider.getRemoteKeysForTarget(targetId);
    existingKeys.forEach((key) => {
      this.removeDocumentFromTarget(
        targetId,
        key,
        /*updatedDocument=*/
        null
      );
    });
  }
  /**
   * Returns whether the LocalStore considers the document to be part of the
   * specified target.
   */
  targetContainsDocument(targetId, key) {
    const existingKeys = this.metadataProvider.getRemoteKeysForTarget(targetId);
    return existingKeys.has(key);
  }
}
function documentTargetMap() {
  return new SortedMap(DocumentKey.comparator);
}
function snapshotChangesMap() {
  return new SortedMap(DocumentKey.comparator);
}
function createExistenceFilterMismatchInfoForTestingHooks(status, localCacheCount, existenceFilter) {
  var _a, _b, _c, _d, _e, _f;
  const result = {
    localCacheCount,
    existenceFilterCount: existenceFilter.count
  };
  const unchangedNames = existenceFilter.unchangedNames;
  if (unchangedNames) {
    result.bloomFilter = {
      applied: status === 0,
      hashCount: (_a = unchangedNames === null || unchangedNames === void 0 ? void 0 : unchangedNames.hashCount) !== null && _a !== void 0 ? _a : 0,
      bitmapLength: (_d = (_c = (_b = unchangedNames === null || unchangedNames === void 0 ? void 0 : unchangedNames.bits) === null || _b === void 0 ? void 0 : _b.bitmap) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0,
      padding: (_f = (_e = unchangedNames === null || unchangedNames === void 0 ? void 0 : unchangedNames.bits) === null || _e === void 0 ? void 0 : _e.padding) !== null && _f !== void 0 ? _f : 0
    };
  }
  return result;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DIRECTIONS = (() => {
  const dirs = {};
  dirs[
    "asc"
    /* Direction.ASCENDING */
  ] = "ASCENDING";
  dirs[
    "desc"
    /* Direction.DESCENDING */
  ] = "DESCENDING";
  return dirs;
})();
const OPERATORS = (() => {
  const ops2 = {};
  ops2[
    "<"
    /* Operator.LESS_THAN */
  ] = "LESS_THAN";
  ops2[
    "<="
    /* Operator.LESS_THAN_OR_EQUAL */
  ] = "LESS_THAN_OR_EQUAL";
  ops2[
    ">"
    /* Operator.GREATER_THAN */
  ] = "GREATER_THAN";
  ops2[
    ">="
    /* Operator.GREATER_THAN_OR_EQUAL */
  ] = "GREATER_THAN_OR_EQUAL";
  ops2[
    "=="
    /* Operator.EQUAL */
  ] = "EQUAL";
  ops2[
    "!="
    /* Operator.NOT_EQUAL */
  ] = "NOT_EQUAL";
  ops2[
    "array-contains"
    /* Operator.ARRAY_CONTAINS */
  ] = "ARRAY_CONTAINS";
  ops2[
    "in"
    /* Operator.IN */
  ] = "IN";
  ops2[
    "not-in"
    /* Operator.NOT_IN */
  ] = "NOT_IN";
  ops2[
    "array-contains-any"
    /* Operator.ARRAY_CONTAINS_ANY */
  ] = "ARRAY_CONTAINS_ANY";
  return ops2;
})();
const COMPOSITE_OPERATORS = (() => {
  const ops2 = {};
  ops2[
    "and"
    /* CompositeOperator.AND */
  ] = "AND";
  ops2[
    "or"
    /* CompositeOperator.OR */
  ] = "OR";
  return ops2;
})();
function assertPresent(value, description) {
}
class JsonProtoSerializer {
  constructor(databaseId, useProto3Json) {
    this.databaseId = databaseId;
    this.useProto3Json = useProto3Json;
  }
}
function fromRpcStatus(status) {
  const code = status.code === void 0 ? Code.UNKNOWN : mapCodeFromRpcCode(status.code);
  return new FirestoreError(code, status.message || "");
}
function toInt32Proto(serializer, val) {
  if (serializer.useProto3Json || isNullOrUndefined(val)) {
    return val;
  } else {
    return { value: val };
  }
}
function fromInt32Proto(val) {
  let result;
  if (typeof val === "object") {
    result = val.value;
  } else {
    result = val;
  }
  return isNullOrUndefined(result) ? null : result;
}
function toTimestamp(serializer, timestamp) {
  if (serializer.useProto3Json) {
    const jsDateStr = new Date(timestamp.seconds * 1e3).toISOString();
    const strUntilSeconds = jsDateStr.replace(/\.\d*/, "").replace("Z", "");
    const nanoStr = ("000000000" + timestamp.nanoseconds).slice(-9);
    return `${strUntilSeconds}.${nanoStr}Z`;
  } else {
    return {
      seconds: "" + timestamp.seconds,
      nanos: timestamp.nanoseconds
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
  }
}
function fromTimestamp(date) {
  const timestamp = normalizeTimestamp(date);
  return new Timestamp(timestamp.seconds, timestamp.nanos);
}
function toBytes(serializer, bytes) {
  if (serializer.useProto3Json) {
    return bytes.toBase64();
  } else {
    return bytes.toUint8Array();
  }
}
function fromBytes(serializer, value) {
  if (serializer.useProto3Json) {
    hardAssert(value === void 0 || typeof value === "string");
    return ByteString.fromBase64String(value ? value : "");
  } else {
    hardAssert(value === void 0 || value instanceof Uint8Array);
    return ByteString.fromUint8Array(value ? value : new Uint8Array());
  }
}
function toVersion(serializer, version2) {
  return toTimestamp(serializer, version2.toTimestamp());
}
function fromVersion(version2) {
  hardAssert(!!version2);
  return SnapshotVersion.fromTimestamp(fromTimestamp(version2));
}
function toResourceName(databaseId, path) {
  return fullyQualifiedPrefixPath(databaseId).child("documents").child(path).canonicalString();
}
function fromResourceName(name2) {
  const resource = ResourcePath.fromString(name2);
  hardAssert(isValidResourceName(resource));
  return resource;
}
function toName(serializer, key) {
  return toResourceName(serializer.databaseId, key.path);
}
function fromName(serializer, name2) {
  const resource = fromResourceName(name2);
  if (resource.get(1) !== serializer.databaseId.projectId) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + resource.get(1) + " vs " + serializer.databaseId.projectId);
  }
  if (resource.get(3) !== serializer.databaseId.database) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + resource.get(3) + " vs " + serializer.databaseId.database);
  }
  return new DocumentKey(extractLocalPathFromResourceName(resource));
}
function toQueryPath(serializer, path) {
  return toResourceName(serializer.databaseId, path);
}
function fromQueryPath(name2) {
  const resourceName = fromResourceName(name2);
  if (resourceName.length === 4) {
    return ResourcePath.emptyPath();
  }
  return extractLocalPathFromResourceName(resourceName);
}
function getEncodedDatabaseId(serializer) {
  const path = new ResourcePath([
    "projects",
    serializer.databaseId.projectId,
    "databases",
    serializer.databaseId.database
  ]);
  return path.canonicalString();
}
function fullyQualifiedPrefixPath(databaseId) {
  return new ResourcePath([
    "projects",
    databaseId.projectId,
    "databases",
    databaseId.database
  ]);
}
function extractLocalPathFromResourceName(resourceName) {
  hardAssert(resourceName.length > 4 && resourceName.get(4) === "documents");
  return resourceName.popFirst(5);
}
function toMutationDocument(serializer, key, fields) {
  return {
    name: toName(serializer, key),
    fields: fields.value.mapValue.fields
  };
}
function fromWatchChange(serializer, change) {
  let watchChange;
  if ("targetChange" in change) {
    assertPresent(change.targetChange);
    const state = fromWatchTargetChangeState(change.targetChange.targetChangeType || "NO_CHANGE");
    const targetIds = change.targetChange.targetIds || [];
    const resumeToken = fromBytes(serializer, change.targetChange.resumeToken);
    const causeProto = change.targetChange.cause;
    const cause = causeProto && fromRpcStatus(causeProto);
    watchChange = new WatchTargetChange(state, targetIds, resumeToken, cause || null);
  } else if ("documentChange" in change) {
    assertPresent(change.documentChange);
    const entityChange = change.documentChange;
    assertPresent(entityChange.document);
    assertPresent(entityChange.document.name);
    assertPresent(entityChange.document.updateTime);
    const key = fromName(serializer, entityChange.document.name);
    const version2 = fromVersion(entityChange.document.updateTime);
    const createTime = entityChange.document.createTime ? fromVersion(entityChange.document.createTime) : SnapshotVersion.min();
    const data = new ObjectValue({
      mapValue: { fields: entityChange.document.fields }
    });
    const doc2 = MutableDocument.newFoundDocument(key, version2, createTime, data);
    const updatedTargetIds = entityChange.targetIds || [];
    const removedTargetIds = entityChange.removedTargetIds || [];
    watchChange = new DocumentWatchChange(updatedTargetIds, removedTargetIds, doc2.key, doc2);
  } else if ("documentDelete" in change) {
    assertPresent(change.documentDelete);
    const docDelete = change.documentDelete;
    assertPresent(docDelete.document);
    const key = fromName(serializer, docDelete.document);
    const version2 = docDelete.readTime ? fromVersion(docDelete.readTime) : SnapshotVersion.min();
    const doc2 = MutableDocument.newNoDocument(key, version2);
    const removedTargetIds = docDelete.removedTargetIds || [];
    watchChange = new DocumentWatchChange([], removedTargetIds, doc2.key, doc2);
  } else if ("documentRemove" in change) {
    assertPresent(change.documentRemove);
    const docRemove = change.documentRemove;
    assertPresent(docRemove.document);
    const key = fromName(serializer, docRemove.document);
    const removedTargetIds = docRemove.removedTargetIds || [];
    watchChange = new DocumentWatchChange([], removedTargetIds, key, null);
  } else if ("filter" in change) {
    assertPresent(change.filter);
    const filter = change.filter;
    assertPresent(filter.targetId);
    const { count = 0, unchangedNames } = filter;
    const existenceFilter = new ExistenceFilter(count, unchangedNames);
    const targetId = filter.targetId;
    watchChange = new ExistenceFilterChange(targetId, existenceFilter);
  } else {
    return fail();
  }
  return watchChange;
}
function fromWatchTargetChangeState(state) {
  if (state === "NO_CHANGE") {
    return 0;
  } else if (state === "ADD") {
    return 1;
  } else if (state === "REMOVE") {
    return 2;
  } else if (state === "CURRENT") {
    return 3;
  } else if (state === "RESET") {
    return 4;
  } else {
    return fail();
  }
}
function versionFromListenResponse(change) {
  if (!("targetChange" in change)) {
    return SnapshotVersion.min();
  }
  const targetChange = change.targetChange;
  if (targetChange.targetIds && targetChange.targetIds.length) {
    return SnapshotVersion.min();
  }
  if (!targetChange.readTime) {
    return SnapshotVersion.min();
  }
  return fromVersion(targetChange.readTime);
}
function toMutation(serializer, mutation) {
  let result;
  if (mutation instanceof SetMutation) {
    result = {
      update: toMutationDocument(serializer, mutation.key, mutation.value)
    };
  } else if (mutation instanceof DeleteMutation) {
    result = { delete: toName(serializer, mutation.key) };
  } else if (mutation instanceof PatchMutation) {
    result = {
      update: toMutationDocument(serializer, mutation.key, mutation.data),
      updateMask: toDocumentMask(mutation.fieldMask)
    };
  } else if (mutation instanceof VerifyMutation) {
    result = {
      verify: toName(serializer, mutation.key)
    };
  } else {
    return fail();
  }
  if (mutation.fieldTransforms.length > 0) {
    result.updateTransforms = mutation.fieldTransforms.map((transform) => toFieldTransform(serializer, transform));
  }
  if (!mutation.precondition.isNone) {
    result.currentDocument = toPrecondition(serializer, mutation.precondition);
  }
  return result;
}
function toPrecondition(serializer, precondition) {
  if (precondition.updateTime !== void 0) {
    return {
      updateTime: toVersion(serializer, precondition.updateTime)
    };
  } else if (precondition.exists !== void 0) {
    return { exists: precondition.exists };
  } else {
    return fail();
  }
}
function fromWriteResult(proto, commitTime) {
  let version2 = proto.updateTime ? fromVersion(proto.updateTime) : fromVersion(commitTime);
  if (version2.isEqual(SnapshotVersion.min())) {
    version2 = fromVersion(commitTime);
  }
  return new MutationResult(version2, proto.transformResults || []);
}
function fromWriteResults(protos2, commitTime) {
  if (protos2 && protos2.length > 0) {
    hardAssert(commitTime !== void 0);
    return protos2.map((proto) => fromWriteResult(proto, commitTime));
  } else {
    return [];
  }
}
function toFieldTransform(serializer, fieldTransform) {
  const transform = fieldTransform.transform;
  if (transform instanceof ServerTimestampTransform) {
    return {
      fieldPath: fieldTransform.field.canonicalString(),
      setToServerValue: "REQUEST_TIME"
    };
  } else if (transform instanceof ArrayUnionTransformOperation) {
    return {
      fieldPath: fieldTransform.field.canonicalString(),
      appendMissingElements: {
        values: transform.elements
      }
    };
  } else if (transform instanceof ArrayRemoveTransformOperation) {
    return {
      fieldPath: fieldTransform.field.canonicalString(),
      removeAllFromArray: {
        values: transform.elements
      }
    };
  } else if (transform instanceof NumericIncrementTransformOperation) {
    return {
      fieldPath: fieldTransform.field.canonicalString(),
      increment: transform.operand
    };
  } else {
    throw fail();
  }
}
function toDocumentsTarget(serializer, target) {
  return { documents: [toQueryPath(serializer, target.path)] };
}
function toQueryTarget(serializer, target) {
  const result = { structuredQuery: {} };
  const path = target.path;
  if (target.collectionGroup !== null) {
    result.parent = toQueryPath(serializer, path);
    result.structuredQuery.from = [
      {
        collectionId: target.collectionGroup,
        allDescendants: true
      }
    ];
  } else {
    result.parent = toQueryPath(serializer, path.popLast());
    result.structuredQuery.from = [{ collectionId: path.lastSegment() }];
  }
  const where = toFilters(target.filters);
  if (where) {
    result.structuredQuery.where = where;
  }
  const orderBy = toOrder(target.orderBy);
  if (orderBy) {
    result.structuredQuery.orderBy = orderBy;
  }
  const limit = toInt32Proto(serializer, target.limit);
  if (limit !== null) {
    result.structuredQuery.limit = limit;
  }
  if (target.startAt) {
    result.structuredQuery.startAt = toStartAtCursor(target.startAt);
  }
  if (target.endAt) {
    result.structuredQuery.endAt = toEndAtCursor(target.endAt);
  }
  return result;
}
function convertQueryTargetToQuery(target) {
  let path = fromQueryPath(target.parent);
  const query = target.structuredQuery;
  const fromCount = query.from ? query.from.length : 0;
  let collectionGroup = null;
  if (fromCount > 0) {
    hardAssert(fromCount === 1);
    const from = query.from[0];
    if (from.allDescendants) {
      collectionGroup = from.collectionId;
    } else {
      path = path.child(from.collectionId);
    }
  }
  let filterBy = [];
  if (query.where) {
    filterBy = fromFilters(query.where);
  }
  let orderBy = [];
  if (query.orderBy) {
    orderBy = fromOrder(query.orderBy);
  }
  let limit = null;
  if (query.limit) {
    limit = fromInt32Proto(query.limit);
  }
  let startAt = null;
  if (query.startAt) {
    startAt = fromStartAtCursor(query.startAt);
  }
  let endAt = null;
  if (query.endAt) {
    endAt = fromEndAtCursor(query.endAt);
  }
  return newQuery(path, collectionGroup, orderBy, filterBy, limit, "F", startAt, endAt);
}
function toListenRequestLabels(serializer, targetData) {
  const value = toLabel(targetData.purpose);
  if (value == null) {
    return null;
  } else {
    return {
      "goog-listen-tags": value
    };
  }
}
function toLabel(purpose) {
  switch (purpose) {
    case "TargetPurposeListen":
      return null;
    case "TargetPurposeExistenceFilterMismatch":
      return "existence-filter-mismatch";
    case "TargetPurposeExistenceFilterMismatchBloom":
      return "existence-filter-mismatch-bloom";
    case "TargetPurposeLimboResolution":
      return "limbo-document";
    default:
      return fail();
  }
}
function toTarget(serializer, targetData) {
  let result;
  const target = targetData.target;
  if (targetIsDocumentTarget(target)) {
    result = { documents: toDocumentsTarget(serializer, target) };
  } else {
    result = { query: toQueryTarget(serializer, target) };
  }
  result.targetId = targetData.targetId;
  if (targetData.resumeToken.approximateByteSize() > 0) {
    result.resumeToken = toBytes(serializer, targetData.resumeToken);
    const expectedCount = toInt32Proto(serializer, targetData.expectedCount);
    if (expectedCount !== null) {
      result.expectedCount = expectedCount;
    }
  } else if (targetData.snapshotVersion.compareTo(SnapshotVersion.min()) > 0) {
    result.readTime = toTimestamp(serializer, targetData.snapshotVersion.toTimestamp());
    const expectedCount = toInt32Proto(serializer, targetData.expectedCount);
    if (expectedCount !== null) {
      result.expectedCount = expectedCount;
    }
  }
  return result;
}
function toFilters(filters) {
  if (filters.length === 0) {
    return;
  }
  return toFilter(CompositeFilter.create(
    filters,
    "and"
    /* CompositeOperator.AND */
  ));
}
function fromFilters(filter) {
  const result = fromFilter(filter);
  if (result instanceof CompositeFilter && compositeFilterIsFlatConjunction(result)) {
    return result.getFilters();
  }
  return [result];
}
function fromFilter(filter) {
  if (filter.unaryFilter !== void 0) {
    return fromUnaryFilter(filter);
  } else if (filter.fieldFilter !== void 0) {
    return fromFieldFilter(filter);
  } else if (filter.compositeFilter !== void 0) {
    return fromCompositeFilter(filter);
  } else {
    return fail();
  }
}
function toOrder(orderBys) {
  if (orderBys.length === 0) {
    return;
  }
  return orderBys.map((order) => toPropertyOrder(order));
}
function fromOrder(orderBys) {
  return orderBys.map((order) => fromPropertyOrder(order));
}
function toStartAtCursor(cursor) {
  return {
    before: cursor.inclusive,
    values: cursor.position
  };
}
function toEndAtCursor(cursor) {
  return {
    before: !cursor.inclusive,
    values: cursor.position
  };
}
function fromStartAtCursor(cursor) {
  const inclusive = !!cursor.before;
  const position = cursor.values || [];
  return new Bound(position, inclusive);
}
function fromEndAtCursor(cursor) {
  const inclusive = !cursor.before;
  const position = cursor.values || [];
  return new Bound(position, inclusive);
}
function toDirection(dir) {
  return DIRECTIONS[dir];
}
function fromDirection(dir) {
  switch (dir) {
    case "ASCENDING":
      return "asc";
    case "DESCENDING":
      return "desc";
    default:
      return void 0;
  }
}
function toOperatorName(op) {
  return OPERATORS[op];
}
function toCompositeOperatorName(op) {
  return COMPOSITE_OPERATORS[op];
}
function fromOperatorName(op) {
  switch (op) {
    case "EQUAL":
      return "==";
    case "NOT_EQUAL":
      return "!=";
    case "GREATER_THAN":
      return ">";
    case "GREATER_THAN_OR_EQUAL":
      return ">=";
    case "LESS_THAN":
      return "<";
    case "LESS_THAN_OR_EQUAL":
      return "<=";
    case "ARRAY_CONTAINS":
      return "array-contains";
    case "IN":
      return "in";
    case "NOT_IN":
      return "not-in";
    case "ARRAY_CONTAINS_ANY":
      return "array-contains-any";
    case "OPERATOR_UNSPECIFIED":
      return fail();
    default:
      return fail();
  }
}
function fromCompositeOperatorName(op) {
  switch (op) {
    case "AND":
      return "and";
    case "OR":
      return "or";
    default:
      return fail();
  }
}
function toFieldPathReference(path) {
  return { fieldPath: path.canonicalString() };
}
function fromFieldPathReference(fieldReference) {
  return FieldPath$1.fromServerFormat(fieldReference.fieldPath);
}
function toPropertyOrder(orderBy) {
  return {
    field: toFieldPathReference(orderBy.field),
    direction: toDirection(orderBy.dir)
  };
}
function fromPropertyOrder(orderBy) {
  return new OrderBy(fromFieldPathReference(orderBy.field), fromDirection(orderBy.direction));
}
function toFilter(filter) {
  if (filter instanceof FieldFilter) {
    return toUnaryOrFieldFilter(filter);
  } else if (filter instanceof CompositeFilter) {
    return toCompositeFilter(filter);
  } else {
    return fail();
  }
}
function toCompositeFilter(filter) {
  const protos2 = filter.getFilters().map((filter2) => toFilter(filter2));
  if (protos2.length === 1) {
    return protos2[0];
  }
  return {
    compositeFilter: {
      op: toCompositeOperatorName(filter.op),
      filters: protos2
    }
  };
}
function toUnaryOrFieldFilter(filter) {
  if (filter.op === "==") {
    if (isNanValue(filter.value)) {
      return {
        unaryFilter: {
          field: toFieldPathReference(filter.field),
          op: "IS_NAN"
        }
      };
    } else if (isNullValue(filter.value)) {
      return {
        unaryFilter: {
          field: toFieldPathReference(filter.field),
          op: "IS_NULL"
        }
      };
    }
  } else if (filter.op === "!=") {
    if (isNanValue(filter.value)) {
      return {
        unaryFilter: {
          field: toFieldPathReference(filter.field),
          op: "IS_NOT_NAN"
        }
      };
    } else if (isNullValue(filter.value)) {
      return {
        unaryFilter: {
          field: toFieldPathReference(filter.field),
          op: "IS_NOT_NULL"
        }
      };
    }
  }
  return {
    fieldFilter: {
      field: toFieldPathReference(filter.field),
      op: toOperatorName(filter.op),
      value: filter.value
    }
  };
}
function fromUnaryFilter(filter) {
  switch (filter.unaryFilter.op) {
    case "IS_NAN":
      const nanField = fromFieldPathReference(filter.unaryFilter.field);
      return FieldFilter.create(nanField, "==", {
        doubleValue: NaN
      });
    case "IS_NULL":
      const nullField = fromFieldPathReference(filter.unaryFilter.field);
      return FieldFilter.create(nullField, "==", {
        nullValue: "NULL_VALUE"
      });
    case "IS_NOT_NAN":
      const notNanField = fromFieldPathReference(filter.unaryFilter.field);
      return FieldFilter.create(notNanField, "!=", {
        doubleValue: NaN
      });
    case "IS_NOT_NULL":
      const notNullField = fromFieldPathReference(filter.unaryFilter.field);
      return FieldFilter.create(notNullField, "!=", {
        nullValue: "NULL_VALUE"
      });
    case "OPERATOR_UNSPECIFIED":
      return fail();
    default:
      return fail();
  }
}
function fromFieldFilter(filter) {
  return FieldFilter.create(fromFieldPathReference(filter.fieldFilter.field), fromOperatorName(filter.fieldFilter.op), filter.fieldFilter.value);
}
function fromCompositeFilter(filter) {
  return CompositeFilter.create(filter.compositeFilter.filters.map((filter2) => fromFilter(filter2)), fromCompositeOperatorName(filter.compositeFilter.op));
}
function toDocumentMask(fieldMask) {
  const canonicalFields = [];
  fieldMask.fields.forEach((field) => canonicalFields.push(field.canonicalString()));
  return {
    fieldPaths: canonicalFields
  };
}
function isValidResourceName(path) {
  return path.length >= 4 && path.get(0) === "projects" && path.get(2) === "databases";
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class TargetData {
  constructor(target, targetId, purpose, sequenceNumber, snapshotVersion = SnapshotVersion.min(), lastLimboFreeSnapshotVersion = SnapshotVersion.min(), resumeToken = ByteString.EMPTY_BYTE_STRING, expectedCount = null) {
    this.target = target;
    this.targetId = targetId;
    this.purpose = purpose;
    this.sequenceNumber = sequenceNumber;
    this.snapshotVersion = snapshotVersion;
    this.lastLimboFreeSnapshotVersion = lastLimboFreeSnapshotVersion;
    this.resumeToken = resumeToken;
    this.expectedCount = expectedCount;
  }
  /** Creates a new target data instance with an updated sequence number. */
  withSequenceNumber(sequenceNumber) {
    return new TargetData(this.target, this.targetId, this.purpose, sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount);
  }
  /**
   * Creates a new target data instance with an updated resume token and
   * snapshot version.
   */
  withResumeToken(resumeToken, snapshotVersion) {
    return new TargetData(
      this.target,
      this.targetId,
      this.purpose,
      this.sequenceNumber,
      snapshotVersion,
      this.lastLimboFreeSnapshotVersion,
      resumeToken,
      /* expectedCount= */
      null
    );
  }
  /**
   * Creates a new target data instance with an updated expected count.
   */
  withExpectedCount(expectedCount) {
    return new TargetData(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, expectedCount);
  }
  /**
   * Creates a new target data instance with an updated last limbo free
   * snapshot version number.
   */
  withLastLimboFreeSnapshotVersion(lastLimboFreeSnapshotVersion) {
    return new TargetData(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class LocalSerializer {
  constructor(remoteSerializer) {
    this.remoteSerializer = remoteSerializer;
  }
}
function fromBundledQuery(bundledQuery) {
  const query = convertQueryTargetToQuery({
    parent: bundledQuery.parent,
    structuredQuery: bundledQuery.structuredQuery
  });
  if (bundledQuery.limitType === "LAST") {
    return queryWithLimit(
      query,
      query.limit,
      "L"
      /* LimitType.Last */
    );
  }
  return query;
}
function fromProtoNamedQuery(namedQuery) {
  return {
    name: namedQuery.name,
    query: fromBundledQuery(namedQuery.bundledQuery),
    readTime: fromVersion(namedQuery.readTime)
  };
}
function fromBundleMetadata(metadata) {
  return {
    id: metadata.id,
    version: metadata.version,
    createTime: fromVersion(metadata.createTime)
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MemoryIndexManager {
  constructor() {
    this.collectionParentIndex = new MemoryCollectionParentIndex();
  }
  addToCollectionParentIndex(transaction, collectionPath) {
    this.collectionParentIndex.add(collectionPath);
    return PersistencePromise.resolve();
  }
  getCollectionParents(transaction, collectionId) {
    return PersistencePromise.resolve(this.collectionParentIndex.getEntries(collectionId));
  }
  addFieldIndex(transaction, index) {
    return PersistencePromise.resolve();
  }
  deleteFieldIndex(transaction, index) {
    return PersistencePromise.resolve();
  }
  getDocumentsMatchingTarget(transaction, target) {
    return PersistencePromise.resolve(null);
  }
  getIndexType(transaction, target) {
    return PersistencePromise.resolve(
      0
      /* IndexType.NONE */
    );
  }
  getFieldIndexes(transaction, collectionGroup) {
    return PersistencePromise.resolve([]);
  }
  getNextCollectionGroupToUpdate(transaction) {
    return PersistencePromise.resolve(null);
  }
  getMinOffset(transaction, target) {
    return PersistencePromise.resolve(IndexOffset.min());
  }
  getMinOffsetFromCollectionGroup(transaction, collectionGroup) {
    return PersistencePromise.resolve(IndexOffset.min());
  }
  updateCollectionGroup(transaction, collectionGroup, offset) {
    return PersistencePromise.resolve();
  }
  updateIndexEntries(transaction, documents) {
    return PersistencePromise.resolve();
  }
}
class MemoryCollectionParentIndex {
  constructor() {
    this.index = {};
  }
  // Returns false if the entry already existed.
  add(collectionPath) {
    const collectionId = collectionPath.lastSegment();
    const parentPath = collectionPath.popLast();
    const existingParents = this.index[collectionId] || new SortedSet(ResourcePath.comparator);
    const added = !existingParents.has(parentPath);
    this.index[collectionId] = existingParents.add(parentPath);
    return added;
  }
  has(collectionPath) {
    const collectionId = collectionPath.lastSegment();
    const parentPath = collectionPath.popLast();
    const existingParents = this.index[collectionId];
    return existingParents && existingParents.has(parentPath);
  }
  getEntries(collectionId) {
    const parentPaths = this.index[collectionId] || new SortedSet(ResourcePath.comparator);
    return parentPaths.toArray();
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const OFFSET = 2;
class TargetIdGenerator {
  constructor(lastId) {
    this.lastId = lastId;
  }
  next() {
    this.lastId += OFFSET;
    return this.lastId;
  }
  static forTargetCache() {
    return new TargetIdGenerator(2 - OFFSET);
  }
  static forSyncEngine() {
    return new TargetIdGenerator(1 - OFFSET);
  }
}
const LRU_COLLECTION_DISABLED = -1;
const LRU_DEFAULT_CACHE_SIZE_BYTES = 40 * 1024 * 1024;
const LRU_MINIMUM_CACHE_SIZE_BYTES = 1 * 1024 * 1024;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class RemoteDocumentChangeBuffer {
  constructor() {
    this.changes = new ObjectMap((key) => key.toString(), (l, r) => l.isEqual(r));
    this.changesApplied = false;
  }
  /**
   * Buffers a `RemoteDocumentCache.addEntry()` call.
   *
   * You can only modify documents that have already been retrieved via
   * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
   */
  addEntry(document2) {
    this.assertNotApplied();
    this.changes.set(document2.key, document2);
  }
  /**
   * Buffers a `RemoteDocumentCache.removeEntry()` call.
   *
   * You can only remove documents that have already been retrieved via
   * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
   */
  removeEntry(key, readTime) {
    this.assertNotApplied();
    this.changes.set(key, MutableDocument.newInvalidDocument(key).setReadTime(readTime));
  }
  /**
   * Looks up an entry in the cache. The buffered changes will first be checked,
   * and if no buffered change applies, this will forward to
   * `RemoteDocumentCache.getEntry()`.
   *
   * @param transaction - The transaction in which to perform any persistence
   *     operations.
   * @param documentKey - The key of the entry to look up.
   * @returns The cached document or an invalid document if we have nothing
   * cached.
   */
  getEntry(transaction, documentKey) {
    this.assertNotApplied();
    const bufferedEntry = this.changes.get(documentKey);
    if (bufferedEntry !== void 0) {
      return PersistencePromise.resolve(bufferedEntry);
    } else {
      return this.getFromCache(transaction, documentKey);
    }
  }
  /**
   * Looks up several entries in the cache, forwarding to
   * `RemoteDocumentCache.getEntry()`.
   *
   * @param transaction - The transaction in which to perform any persistence
   *     operations.
   * @param documentKeys - The keys of the entries to look up.
   * @returns A map of cached documents, indexed by key. If an entry cannot be
   *     found, the corresponding key will be mapped to an invalid document.
   */
  getEntries(transaction, documentKeys) {
    return this.getAllFromCache(transaction, documentKeys);
  }
  /**
   * Applies buffered changes to the underlying RemoteDocumentCache, using
   * the provided transaction.
   */
  apply(transaction) {
    this.assertNotApplied();
    this.changesApplied = true;
    return this.applyChanges(transaction);
  }
  /** Helper to assert this.changes is not null  */
  assertNotApplied() {
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class OverlayedDocument {
  constructor(overlayedDocument, mutatedFields) {
    this.overlayedDocument = overlayedDocument;
    this.mutatedFields = mutatedFields;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class LocalDocumentsView {
  constructor(remoteDocumentCache, mutationQueue, documentOverlayCache, indexManager) {
    this.remoteDocumentCache = remoteDocumentCache;
    this.mutationQueue = mutationQueue;
    this.documentOverlayCache = documentOverlayCache;
    this.indexManager = indexManager;
  }
  /**
   * Get the local view of the document identified by `key`.
   *
   * @returns Local view of the document or null if we don't have any cached
   * state for it.
   */
  getDocument(transaction, key) {
    let overlay = null;
    return this.documentOverlayCache.getOverlay(transaction, key).next((value) => {
      overlay = value;
      return this.remoteDocumentCache.getEntry(transaction, key);
    }).next((document2) => {
      if (overlay !== null) {
        mutationApplyToLocalView(overlay.mutation, document2, FieldMask.empty(), Timestamp.now());
      }
      return document2;
    });
  }
  /**
   * Gets the local view of the documents identified by `keys`.
   *
   * If we don't have cached state for a document in `keys`, a NoDocument will
   * be stored for that key in the resulting set.
   */
  getDocuments(transaction, keys) {
    return this.remoteDocumentCache.getEntries(transaction, keys).next((docs) => this.getLocalViewOfDocuments(transaction, docs, documentKeySet()).next(() => docs));
  }
  /**
   * Similar to `getDocuments`, but creates the local view from the given
   * `baseDocs` without retrieving documents from the local store.
   *
   * @param transaction - The transaction this operation is scoped to.
   * @param docs - The documents to apply local mutations to get the local views.
   * @param existenceStateChanged - The set of document keys whose existence state
   *   is changed. This is useful to determine if some documents overlay needs
   *   to be recalculated.
   */
  getLocalViewOfDocuments(transaction, docs, existenceStateChanged = documentKeySet()) {
    const overlays = newOverlayMap();
    return this.populateOverlays(transaction, overlays, docs).next(() => {
      return this.computeViews(transaction, docs, overlays, existenceStateChanged).next((computeViewsResult) => {
        let result = documentMap();
        computeViewsResult.forEach((documentKey, overlayedDocument) => {
          result = result.insert(documentKey, overlayedDocument.overlayedDocument);
        });
        return result;
      });
    });
  }
  /**
   * Gets the overlayed documents for the given document map, which will include
   * the local view of those documents and a `FieldMask` indicating which fields
   * are mutated locally, `null` if overlay is a Set or Delete mutation.
   */
  getOverlayedDocuments(transaction, docs) {
    const overlays = newOverlayMap();
    return this.populateOverlays(transaction, overlays, docs).next(() => this.computeViews(transaction, docs, overlays, documentKeySet()));
  }
  /**
   * Fetches the overlays for {@code docs} and adds them to provided overlay map
   * if the map does not already contain an entry for the given document key.
   */
  populateOverlays(transaction, overlays, docs) {
    const missingOverlays = [];
    docs.forEach((key) => {
      if (!overlays.has(key)) {
        missingOverlays.push(key);
      }
    });
    return this.documentOverlayCache.getOverlays(transaction, missingOverlays).next((result) => {
      result.forEach((key, val) => {
        overlays.set(key, val);
      });
    });
  }
  /**
   * Computes the local view for the given documents.
   *
   * @param docs - The documents to compute views for. It also has the base
   *   version of the documents.
   * @param overlays - The overlays that need to be applied to the given base
   *   version of the documents.
   * @param existenceStateChanged - A set of documents whose existence states
   *   might have changed. This is used to determine if we need to re-calculate
   *   overlays from mutation queues.
   * @return A map represents the local documents view.
   */
  computeViews(transaction, docs, overlays, existenceStateChanged) {
    let recalculateDocuments = mutableDocumentMap();
    const mutatedFields = newDocumentKeyMap();
    const results = newOverlayedDocumentMap();
    docs.forEach((_, doc2) => {
      const overlay = overlays.get(doc2.key);
      if (existenceStateChanged.has(doc2.key) && (overlay === void 0 || overlay.mutation instanceof PatchMutation)) {
        recalculateDocuments = recalculateDocuments.insert(doc2.key, doc2);
      } else if (overlay !== void 0) {
        mutatedFields.set(doc2.key, overlay.mutation.getFieldMask());
        mutationApplyToLocalView(overlay.mutation, doc2, overlay.mutation.getFieldMask(), Timestamp.now());
      } else {
        mutatedFields.set(doc2.key, FieldMask.empty());
      }
    });
    return this.recalculateAndSaveOverlays(transaction, recalculateDocuments).next((recalculatedFields) => {
      recalculatedFields.forEach((documentKey, mask) => mutatedFields.set(documentKey, mask));
      docs.forEach((documentKey, document2) => {
        var _a;
        return results.set(documentKey, new OverlayedDocument(document2, (_a = mutatedFields.get(documentKey)) !== null && _a !== void 0 ? _a : null));
      });
      return results;
    });
  }
  recalculateAndSaveOverlays(transaction, docs) {
    const masks = newDocumentKeyMap();
    let documentsByBatchId = new SortedMap((key1, key2) => key1 - key2);
    let processed = documentKeySet();
    return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(transaction, docs).next((batches) => {
      for (const batch of batches) {
        batch.keys().forEach((key) => {
          const baseDoc = docs.get(key);
          if (baseDoc === null) {
            return;
          }
          let mask = masks.get(key) || FieldMask.empty();
          mask = batch.applyToLocalView(baseDoc, mask);
          masks.set(key, mask);
          const newSet = (documentsByBatchId.get(batch.batchId) || documentKeySet()).add(key);
          documentsByBatchId = documentsByBatchId.insert(batch.batchId, newSet);
        });
      }
    }).next(() => {
      const promises = [];
      const iter = documentsByBatchId.getReverseIterator();
      while (iter.hasNext()) {
        const entry2 = iter.getNext();
        const batchId = entry2.key;
        const keys = entry2.value;
        const overlays = newMutationMap();
        keys.forEach((key) => {
          if (!processed.has(key)) {
            const overlayMutation = calculateOverlayMutation(docs.get(key), masks.get(key));
            if (overlayMutation !== null) {
              overlays.set(key, overlayMutation);
            }
            processed = processed.add(key);
          }
        });
        promises.push(this.documentOverlayCache.saveOverlays(transaction, batchId, overlays));
      }
      return PersistencePromise.waitFor(promises);
    }).next(() => masks);
  }
  /**
   * Recalculates overlays by reading the documents from remote document cache
   * first, and saves them after they are calculated.
   */
  recalculateAndSaveOverlaysForDocumentKeys(transaction, documentKeys) {
    return this.remoteDocumentCache.getEntries(transaction, documentKeys).next((docs) => this.recalculateAndSaveOverlays(transaction, docs));
  }
  /**
   * Performs a query against the local view of all documents.
   *
   * @param transaction - The persistence transaction.
   * @param query - The query to match documents against.
   * @param offset - Read time and key to start scanning by (exclusive).
   */
  getDocumentsMatchingQuery(transaction, query, offset) {
    if (isDocumentQuery$1(query)) {
      return this.getDocumentsMatchingDocumentQuery(transaction, query.path);
    } else if (isCollectionGroupQuery(query)) {
      return this.getDocumentsMatchingCollectionGroupQuery(transaction, query, offset);
    } else {
      return this.getDocumentsMatchingCollectionQuery(transaction, query, offset);
    }
  }
  /**
   * Given a collection group, returns the next documents that follow the provided offset, along
   * with an updated batch ID.
   *
   * <p>The documents returned by this method are ordered by remote version from the provided
   * offset. If there are no more remote documents after the provided offset, documents with
   * mutations in order of batch id from the offset are returned. Since all documents in a batch are
   * returned together, the total number of documents returned can exceed {@code count}.
   *
   * @param transaction
   * @param collectionGroup The collection group for the documents.
   * @param offset The offset to index into.
   * @param count The number of documents to return
   * @return A LocalWriteResult with the documents that follow the provided offset and the last processed batch id.
   */
  getNextDocuments(transaction, collectionGroup, offset, count) {
    return this.remoteDocumentCache.getAllFromCollectionGroup(transaction, collectionGroup, offset, count).next((originalDocs) => {
      const overlaysPromise = count - originalDocs.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(transaction, collectionGroup, offset.largestBatchId, count - originalDocs.size) : PersistencePromise.resolve(newOverlayMap());
      let largestBatchId = INITIAL_LARGEST_BATCH_ID;
      let modifiedDocs = originalDocs;
      return overlaysPromise.next((overlays) => {
        return PersistencePromise.forEach(overlays, (key, overlay) => {
          if (largestBatchId < overlay.largestBatchId) {
            largestBatchId = overlay.largestBatchId;
          }
          if (originalDocs.get(key)) {
            return PersistencePromise.resolve();
          }
          return this.remoteDocumentCache.getEntry(transaction, key).next((doc2) => {
            modifiedDocs = modifiedDocs.insert(key, doc2);
          });
        }).next(() => this.populateOverlays(transaction, overlays, originalDocs)).next(() => this.computeViews(transaction, modifiedDocs, overlays, documentKeySet())).next((localDocs) => ({
          batchId: largestBatchId,
          changes: convertOverlayedDocumentMapToDocumentMap(localDocs)
        }));
      });
    });
  }
  getDocumentsMatchingDocumentQuery(transaction, docPath) {
    return this.getDocument(transaction, new DocumentKey(docPath)).next((document2) => {
      let result = documentMap();
      if (document2.isFoundDocument()) {
        result = result.insert(document2.key, document2);
      }
      return result;
    });
  }
  getDocumentsMatchingCollectionGroupQuery(transaction, query, offset) {
    const collectionId = query.collectionGroup;
    let results = documentMap();
    return this.indexManager.getCollectionParents(transaction, collectionId).next((parents) => {
      return PersistencePromise.forEach(parents, (parent) => {
        const collectionQuery = asCollectionQueryAtPath(query, parent.child(collectionId));
        return this.getDocumentsMatchingCollectionQuery(transaction, collectionQuery, offset).next((r) => {
          r.forEach((key, doc2) => {
            results = results.insert(key, doc2);
          });
        });
      }).next(() => results);
    });
  }
  getDocumentsMatchingCollectionQuery(transaction, query, offset) {
    let overlays;
    return this.documentOverlayCache.getOverlaysForCollection(transaction, query.path, offset.largestBatchId).next((result) => {
      overlays = result;
      return this.remoteDocumentCache.getDocumentsMatchingQuery(transaction, query, offset, overlays);
    }).next((remoteDocuments) => {
      overlays.forEach((_, overlay) => {
        const key = overlay.getKey();
        if (remoteDocuments.get(key) === null) {
          remoteDocuments = remoteDocuments.insert(key, MutableDocument.newInvalidDocument(key));
        }
      });
      let results = documentMap();
      remoteDocuments.forEach((key, document2) => {
        const overlay = overlays.get(key);
        if (overlay !== void 0) {
          mutationApplyToLocalView(overlay.mutation, document2, FieldMask.empty(), Timestamp.now());
        }
        if (queryMatches(query, document2)) {
          results = results.insert(key, document2);
        }
      });
      return results;
    });
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MemoryBundleCache {
  constructor(serializer) {
    this.serializer = serializer;
    this.bundles = /* @__PURE__ */ new Map();
    this.namedQueries = /* @__PURE__ */ new Map();
  }
  getBundleMetadata(transaction, bundleId) {
    return PersistencePromise.resolve(this.bundles.get(bundleId));
  }
  saveBundleMetadata(transaction, bundleMetadata) {
    this.bundles.set(bundleMetadata.id, fromBundleMetadata(bundleMetadata));
    return PersistencePromise.resolve();
  }
  getNamedQuery(transaction, queryName) {
    return PersistencePromise.resolve(this.namedQueries.get(queryName));
  }
  saveNamedQuery(transaction, query) {
    this.namedQueries.set(query.name, fromProtoNamedQuery(query));
    return PersistencePromise.resolve();
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MemoryDocumentOverlayCache {
  constructor() {
    this.overlays = new SortedMap(DocumentKey.comparator);
    this.overlayByBatchId = /* @__PURE__ */ new Map();
  }
  getOverlay(transaction, key) {
    return PersistencePromise.resolve(this.overlays.get(key));
  }
  getOverlays(transaction, keys) {
    const result = newOverlayMap();
    return PersistencePromise.forEach(keys, (key) => {
      return this.getOverlay(transaction, key).next((overlay) => {
        if (overlay !== null) {
          result.set(key, overlay);
        }
      });
    }).next(() => result);
  }
  saveOverlays(transaction, largestBatchId, overlays) {
    overlays.forEach((_, mutation) => {
      this.saveOverlay(transaction, largestBatchId, mutation);
    });
    return PersistencePromise.resolve();
  }
  removeOverlaysForBatchId(transaction, documentKeys, batchId) {
    const keys = this.overlayByBatchId.get(batchId);
    if (keys !== void 0) {
      keys.forEach((key) => this.overlays = this.overlays.remove(key));
      this.overlayByBatchId.delete(batchId);
    }
    return PersistencePromise.resolve();
  }
  getOverlaysForCollection(transaction, collection2, sinceBatchId) {
    const result = newOverlayMap();
    const immediateChildrenPathLength = collection2.length + 1;
    const prefix = new DocumentKey(collection2.child(""));
    const iter = this.overlays.getIteratorFrom(prefix);
    while (iter.hasNext()) {
      const entry2 = iter.getNext();
      const overlay = entry2.value;
      const key = overlay.getKey();
      if (!collection2.isPrefixOf(key.path)) {
        break;
      }
      if (key.path.length !== immediateChildrenPathLength) {
        continue;
      }
      if (overlay.largestBatchId > sinceBatchId) {
        result.set(overlay.getKey(), overlay);
      }
    }
    return PersistencePromise.resolve(result);
  }
  getOverlaysForCollectionGroup(transaction, collectionGroup, sinceBatchId, count) {
    let batchIdToOverlays = new SortedMap((key1, key2) => key1 - key2);
    const iter = this.overlays.getIterator();
    while (iter.hasNext()) {
      const entry2 = iter.getNext();
      const overlay = entry2.value;
      const key = overlay.getKey();
      if (key.getCollectionGroup() !== collectionGroup) {
        continue;
      }
      if (overlay.largestBatchId > sinceBatchId) {
        let overlaysForBatchId = batchIdToOverlays.get(overlay.largestBatchId);
        if (overlaysForBatchId === null) {
          overlaysForBatchId = newOverlayMap();
          batchIdToOverlays = batchIdToOverlays.insert(overlay.largestBatchId, overlaysForBatchId);
        }
        overlaysForBatchId.set(overlay.getKey(), overlay);
      }
    }
    const result = newOverlayMap();
    const batchIter = batchIdToOverlays.getIterator();
    while (batchIter.hasNext()) {
      const entry2 = batchIter.getNext();
      const overlays = entry2.value;
      overlays.forEach((key, overlay) => result.set(key, overlay));
      if (result.size() >= count) {
        break;
      }
    }
    return PersistencePromise.resolve(result);
  }
  saveOverlay(transaction, largestBatchId, mutation) {
    const existing = this.overlays.get(mutation.key);
    if (existing !== null) {
      const newSet = this.overlayByBatchId.get(existing.largestBatchId).delete(mutation.key);
      this.overlayByBatchId.set(existing.largestBatchId, newSet);
    }
    this.overlays = this.overlays.insert(mutation.key, new Overlay(largestBatchId, mutation));
    let batch = this.overlayByBatchId.get(largestBatchId);
    if (batch === void 0) {
      batch = documentKeySet();
      this.overlayByBatchId.set(largestBatchId, batch);
    }
    this.overlayByBatchId.set(largestBatchId, batch.add(mutation.key));
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ReferenceSet {
  constructor() {
    this.refsByKey = new SortedSet(DocReference.compareByKey);
    this.refsByTarget = new SortedSet(DocReference.compareByTargetId);
  }
  /** Returns true if the reference set contains no references. */
  isEmpty() {
    return this.refsByKey.isEmpty();
  }
  /** Adds a reference to the given document key for the given ID. */
  addReference(key, id) {
    const ref2 = new DocReference(key, id);
    this.refsByKey = this.refsByKey.add(ref2);
    this.refsByTarget = this.refsByTarget.add(ref2);
  }
  /** Add references to the given document keys for the given ID. */
  addReferences(keys, id) {
    keys.forEach((key) => this.addReference(key, id));
  }
  /**
   * Removes a reference to the given document key for the given
   * ID.
   */
  removeReference(key, id) {
    this.removeRef(new DocReference(key, id));
  }
  removeReferences(keys, id) {
    keys.forEach((key) => this.removeReference(key, id));
  }
  /**
   * Clears all references with a given ID. Calls removeRef() for each key
   * removed.
   */
  removeReferencesForId(id) {
    const emptyKey = new DocumentKey(new ResourcePath([]));
    const startRef = new DocReference(emptyKey, id);
    const endRef = new DocReference(emptyKey, id + 1);
    const keys = [];
    this.refsByTarget.forEachInRange([startRef, endRef], (ref2) => {
      this.removeRef(ref2);
      keys.push(ref2.key);
    });
    return keys;
  }
  removeAllReferences() {
    this.refsByKey.forEach((ref2) => this.removeRef(ref2));
  }
  removeRef(ref2) {
    this.refsByKey = this.refsByKey.delete(ref2);
    this.refsByTarget = this.refsByTarget.delete(ref2);
  }
  referencesForId(id) {
    const emptyKey = new DocumentKey(new ResourcePath([]));
    const startRef = new DocReference(emptyKey, id);
    const endRef = new DocReference(emptyKey, id + 1);
    let keys = documentKeySet();
    this.refsByTarget.forEachInRange([startRef, endRef], (ref2) => {
      keys = keys.add(ref2.key);
    });
    return keys;
  }
  containsKey(key) {
    const ref2 = new DocReference(key, 0);
    const firstRef = this.refsByKey.firstAfterOrEqual(ref2);
    return firstRef !== null && key.isEqual(firstRef.key);
  }
}
class DocReference {
  constructor(key, targetOrBatchId) {
    this.key = key;
    this.targetOrBatchId = targetOrBatchId;
  }
  /** Compare by key then by ID */
  static compareByKey(left, right) {
    return DocumentKey.comparator(left.key, right.key) || primitiveComparator(left.targetOrBatchId, right.targetOrBatchId);
  }
  /** Compare by ID then by key */
  static compareByTargetId(left, right) {
    return primitiveComparator(left.targetOrBatchId, right.targetOrBatchId) || DocumentKey.comparator(left.key, right.key);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MemoryMutationQueue {
  constructor(indexManager, referenceDelegate) {
    this.indexManager = indexManager;
    this.referenceDelegate = referenceDelegate;
    this.mutationQueue = [];
    this.nextBatchId = 1;
    this.batchesByDocumentKey = new SortedSet(DocReference.compareByKey);
  }
  checkEmpty(transaction) {
    return PersistencePromise.resolve(this.mutationQueue.length === 0);
  }
  addMutationBatch(transaction, localWriteTime, baseMutations, mutations) {
    const batchId = this.nextBatchId;
    this.nextBatchId++;
    if (this.mutationQueue.length > 0) {
      this.mutationQueue[this.mutationQueue.length - 1];
    }
    const batch = new MutationBatch(batchId, localWriteTime, baseMutations, mutations);
    this.mutationQueue.push(batch);
    for (const mutation of mutations) {
      this.batchesByDocumentKey = this.batchesByDocumentKey.add(new DocReference(mutation.key, batchId));
      this.indexManager.addToCollectionParentIndex(transaction, mutation.key.path.popLast());
    }
    return PersistencePromise.resolve(batch);
  }
  lookupMutationBatch(transaction, batchId) {
    return PersistencePromise.resolve(this.findMutationBatch(batchId));
  }
  getNextMutationBatchAfterBatchId(transaction, batchId) {
    const nextBatchId = batchId + 1;
    const rawIndex = this.indexOfBatchId(nextBatchId);
    const index = rawIndex < 0 ? 0 : rawIndex;
    return PersistencePromise.resolve(this.mutationQueue.length > index ? this.mutationQueue[index] : null);
  }
  getHighestUnacknowledgedBatchId() {
    return PersistencePromise.resolve(this.mutationQueue.length === 0 ? BATCHID_UNKNOWN : this.nextBatchId - 1);
  }
  getAllMutationBatches(transaction) {
    return PersistencePromise.resolve(this.mutationQueue.slice());
  }
  getAllMutationBatchesAffectingDocumentKey(transaction, documentKey) {
    const start = new DocReference(documentKey, 0);
    const end = new DocReference(documentKey, Number.POSITIVE_INFINITY);
    const result = [];
    this.batchesByDocumentKey.forEachInRange([start, end], (ref2) => {
      const batch = this.findMutationBatch(ref2.targetOrBatchId);
      result.push(batch);
    });
    return PersistencePromise.resolve(result);
  }
  getAllMutationBatchesAffectingDocumentKeys(transaction, documentKeys) {
    let uniqueBatchIDs = new SortedSet(primitiveComparator);
    documentKeys.forEach((documentKey) => {
      const start = new DocReference(documentKey, 0);
      const end = new DocReference(documentKey, Number.POSITIVE_INFINITY);
      this.batchesByDocumentKey.forEachInRange([start, end], (ref2) => {
        uniqueBatchIDs = uniqueBatchIDs.add(ref2.targetOrBatchId);
      });
    });
    return PersistencePromise.resolve(this.findMutationBatches(uniqueBatchIDs));
  }
  getAllMutationBatchesAffectingQuery(transaction, query) {
    const prefix = query.path;
    const immediateChildrenPathLength = prefix.length + 1;
    let startPath = prefix;
    if (!DocumentKey.isDocumentKey(startPath)) {
      startPath = startPath.child("");
    }
    const start = new DocReference(new DocumentKey(startPath), 0);
    let uniqueBatchIDs = new SortedSet(primitiveComparator);
    this.batchesByDocumentKey.forEachWhile((ref2) => {
      const rowKeyPath = ref2.key.path;
      if (!prefix.isPrefixOf(rowKeyPath)) {
        return false;
      } else {
        if (rowKeyPath.length === immediateChildrenPathLength) {
          uniqueBatchIDs = uniqueBatchIDs.add(ref2.targetOrBatchId);
        }
        return true;
      }
    }, start);
    return PersistencePromise.resolve(this.findMutationBatches(uniqueBatchIDs));
  }
  findMutationBatches(batchIDs) {
    const result = [];
    batchIDs.forEach((batchId) => {
      const batch = this.findMutationBatch(batchId);
      if (batch !== null) {
        result.push(batch);
      }
    });
    return result;
  }
  removeMutationBatch(transaction, batch) {
    const batchIndex = this.indexOfExistingBatchId(batch.batchId, "removed");
    hardAssert(batchIndex === 0);
    this.mutationQueue.shift();
    let references = this.batchesByDocumentKey;
    return PersistencePromise.forEach(batch.mutations, (mutation) => {
      const ref2 = new DocReference(mutation.key, batch.batchId);
      references = references.delete(ref2);
      return this.referenceDelegate.markPotentiallyOrphaned(transaction, mutation.key);
    }).next(() => {
      this.batchesByDocumentKey = references;
    });
  }
  removeCachedMutationKeys(batchId) {
  }
  containsKey(txn, key) {
    const ref2 = new DocReference(key, 0);
    const firstRef = this.batchesByDocumentKey.firstAfterOrEqual(ref2);
    return PersistencePromise.resolve(key.isEqual(firstRef && firstRef.key));
  }
  performConsistencyCheck(txn) {
    if (this.mutationQueue.length === 0)
      ;
    return PersistencePromise.resolve();
  }
  /**
   * Finds the index of the given batchId in the mutation queue and asserts that
   * the resulting index is within the bounds of the queue.
   *
   * @param batchId - The batchId to search for
   * @param action - A description of what the caller is doing, phrased in passive
   * form (e.g. "acknowledged" in a routine that acknowledges batches).
   */
  indexOfExistingBatchId(batchId, action) {
    const index = this.indexOfBatchId(batchId);
    return index;
  }
  /**
   * Finds the index of the given batchId in the mutation queue. This operation
   * is O(1).
   *
   * @returns The computed index of the batch with the given batchId, based on
   * the state of the queue. Note this index can be negative if the requested
   * batchId has already been remvoed from the queue or past the end of the
   * queue if the batchId is larger than the last added batch.
   */
  indexOfBatchId(batchId) {
    if (this.mutationQueue.length === 0) {
      return 0;
    }
    const firstBatchId = this.mutationQueue[0].batchId;
    return batchId - firstBatchId;
  }
  /**
   * A version of lookupMutationBatch that doesn't return a promise, this makes
   * other functions that uses this code easier to read and more efficent.
   */
  findMutationBatch(batchId) {
    const index = this.indexOfBatchId(batchId);
    if (index < 0 || index >= this.mutationQueue.length) {
      return null;
    }
    const batch = this.mutationQueue[index];
    return batch;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function documentEntryMap() {
  return new SortedMap(DocumentKey.comparator);
}
class MemoryRemoteDocumentCacheImpl {
  /**
   * @param sizer - Used to assess the size of a document. For eager GC, this is
   * expected to just return 0 to avoid unnecessarily doing the work of
   * calculating the size.
   */
  constructor(sizer) {
    this.sizer = sizer;
    this.docs = documentEntryMap();
    this.size = 0;
  }
  setIndexManager(indexManager) {
    this.indexManager = indexManager;
  }
  /**
   * Adds the supplied entry to the cache and updates the cache size as appropriate.
   *
   * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
   * returned by `newChangeBuffer()`.
   */
  addEntry(transaction, doc2) {
    const key = doc2.key;
    const entry2 = this.docs.get(key);
    const previousSize = entry2 ? entry2.size : 0;
    const currentSize = this.sizer(doc2);
    this.docs = this.docs.insert(key, {
      document: doc2.mutableCopy(),
      size: currentSize
    });
    this.size += currentSize - previousSize;
    return this.indexManager.addToCollectionParentIndex(transaction, key.path.popLast());
  }
  /**
   * Removes the specified entry from the cache and updates the cache size as appropriate.
   *
   * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
   * returned by `newChangeBuffer()`.
   */
  removeEntry(documentKey) {
    const entry2 = this.docs.get(documentKey);
    if (entry2) {
      this.docs = this.docs.remove(documentKey);
      this.size -= entry2.size;
    }
  }
  getEntry(transaction, documentKey) {
    const entry2 = this.docs.get(documentKey);
    return PersistencePromise.resolve(entry2 ? entry2.document.mutableCopy() : MutableDocument.newInvalidDocument(documentKey));
  }
  getEntries(transaction, documentKeys) {
    let results = mutableDocumentMap();
    documentKeys.forEach((documentKey) => {
      const entry2 = this.docs.get(documentKey);
      results = results.insert(documentKey, entry2 ? entry2.document.mutableCopy() : MutableDocument.newInvalidDocument(documentKey));
    });
    return PersistencePromise.resolve(results);
  }
  getDocumentsMatchingQuery(transaction, query, offset, mutatedDocs) {
    let results = mutableDocumentMap();
    const collectionPath = query.path;
    const prefix = new DocumentKey(collectionPath.child(""));
    const iterator = this.docs.getIteratorFrom(prefix);
    while (iterator.hasNext()) {
      const { key, value: { document: document2 } } = iterator.getNext();
      if (!collectionPath.isPrefixOf(key.path)) {
        break;
      }
      if (key.path.length > collectionPath.length + 1) {
        continue;
      }
      if (indexOffsetComparator(newIndexOffsetFromDocument(document2), offset) <= 0) {
        continue;
      }
      if (!mutatedDocs.has(document2.key) && !queryMatches(query, document2)) {
        continue;
      }
      results = results.insert(document2.key, document2.mutableCopy());
    }
    return PersistencePromise.resolve(results);
  }
  getAllFromCollectionGroup(transaction, collectionGroup, offset, limti) {
    fail();
  }
  forEachDocumentKey(transaction, f) {
    return PersistencePromise.forEach(this.docs, (key) => f(key));
  }
  newChangeBuffer(options) {
    return new MemoryRemoteDocumentChangeBuffer(this);
  }
  getSize(txn) {
    return PersistencePromise.resolve(this.size);
  }
}
function newMemoryRemoteDocumentCache(sizer) {
  return new MemoryRemoteDocumentCacheImpl(sizer);
}
class MemoryRemoteDocumentChangeBuffer extends RemoteDocumentChangeBuffer {
  constructor(documentCache) {
    super();
    this.documentCache = documentCache;
  }
  applyChanges(transaction) {
    const promises = [];
    this.changes.forEach((key, doc2) => {
      if (doc2.isValidDocument()) {
        promises.push(this.documentCache.addEntry(transaction, doc2));
      } else {
        this.documentCache.removeEntry(key);
      }
    });
    return PersistencePromise.waitFor(promises);
  }
  getFromCache(transaction, documentKey) {
    return this.documentCache.getEntry(transaction, documentKey);
  }
  getAllFromCache(transaction, documentKeys) {
    return this.documentCache.getEntries(transaction, documentKeys);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MemoryTargetCache {
  constructor(persistence) {
    this.persistence = persistence;
    this.targets = new ObjectMap((t) => canonifyTarget(t), targetEquals);
    this.lastRemoteSnapshotVersion = SnapshotVersion.min();
    this.highestTargetId = 0;
    this.highestSequenceNumber = 0;
    this.references = new ReferenceSet();
    this.targetCount = 0;
    this.targetIdGenerator = TargetIdGenerator.forTargetCache();
  }
  forEachTarget(txn, f) {
    this.targets.forEach((_, targetData) => f(targetData));
    return PersistencePromise.resolve();
  }
  getLastRemoteSnapshotVersion(transaction) {
    return PersistencePromise.resolve(this.lastRemoteSnapshotVersion);
  }
  getHighestSequenceNumber(transaction) {
    return PersistencePromise.resolve(this.highestSequenceNumber);
  }
  allocateTargetId(transaction) {
    this.highestTargetId = this.targetIdGenerator.next();
    return PersistencePromise.resolve(this.highestTargetId);
  }
  setTargetsMetadata(transaction, highestListenSequenceNumber, lastRemoteSnapshotVersion) {
    if (lastRemoteSnapshotVersion) {
      this.lastRemoteSnapshotVersion = lastRemoteSnapshotVersion;
    }
    if (highestListenSequenceNumber > this.highestSequenceNumber) {
      this.highestSequenceNumber = highestListenSequenceNumber;
    }
    return PersistencePromise.resolve();
  }
  saveTargetData(targetData) {
    this.targets.set(targetData.target, targetData);
    const targetId = targetData.targetId;
    if (targetId > this.highestTargetId) {
      this.targetIdGenerator = new TargetIdGenerator(targetId);
      this.highestTargetId = targetId;
    }
    if (targetData.sequenceNumber > this.highestSequenceNumber) {
      this.highestSequenceNumber = targetData.sequenceNumber;
    }
  }
  addTargetData(transaction, targetData) {
    this.saveTargetData(targetData);
    this.targetCount += 1;
    return PersistencePromise.resolve();
  }
  updateTargetData(transaction, targetData) {
    this.saveTargetData(targetData);
    return PersistencePromise.resolve();
  }
  removeTargetData(transaction, targetData) {
    this.targets.delete(targetData.target);
    this.references.removeReferencesForId(targetData.targetId);
    this.targetCount -= 1;
    return PersistencePromise.resolve();
  }
  removeTargets(transaction, upperBound, activeTargetIds) {
    let count = 0;
    const removals = [];
    this.targets.forEach((key, targetData) => {
      if (targetData.sequenceNumber <= upperBound && activeTargetIds.get(targetData.targetId) === null) {
        this.targets.delete(key);
        removals.push(this.removeMatchingKeysForTargetId(transaction, targetData.targetId));
        count++;
      }
    });
    return PersistencePromise.waitFor(removals).next(() => count);
  }
  getTargetCount(transaction) {
    return PersistencePromise.resolve(this.targetCount);
  }
  getTargetData(transaction, target) {
    const targetData = this.targets.get(target) || null;
    return PersistencePromise.resolve(targetData);
  }
  addMatchingKeys(txn, keys, targetId) {
    this.references.addReferences(keys, targetId);
    return PersistencePromise.resolve();
  }
  removeMatchingKeys(txn, keys, targetId) {
    this.references.removeReferences(keys, targetId);
    const referenceDelegate = this.persistence.referenceDelegate;
    const promises = [];
    if (referenceDelegate) {
      keys.forEach((key) => {
        promises.push(referenceDelegate.markPotentiallyOrphaned(txn, key));
      });
    }
    return PersistencePromise.waitFor(promises);
  }
  removeMatchingKeysForTargetId(txn, targetId) {
    this.references.removeReferencesForId(targetId);
    return PersistencePromise.resolve();
  }
  getMatchingKeysForTargetId(txn, targetId) {
    const matchingKeys = this.references.referencesForId(targetId);
    return PersistencePromise.resolve(matchingKeys);
  }
  containsKey(txn, key) {
    return PersistencePromise.resolve(this.references.containsKey(key));
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_TAG$d = "MemoryPersistence";
class MemoryPersistence {
  /**
   * The constructor accepts a factory for creating a reference delegate. This
   * allows both the delegate and this instance to have strong references to
   * each other without having nullable fields that would then need to be
   * checked or asserted on every access.
   */
  constructor(referenceDelegateFactory, serializer) {
    this.mutationQueues = {};
    this.overlays = {};
    this.listenSequence = new ListenSequence(0);
    this._started = false;
    this._started = true;
    this.referenceDelegate = referenceDelegateFactory(this);
    this.targetCache = new MemoryTargetCache(this);
    const sizer = (doc2) => this.referenceDelegate.documentSize(doc2);
    this.indexManager = new MemoryIndexManager();
    this.remoteDocumentCache = newMemoryRemoteDocumentCache(sizer);
    this.serializer = new LocalSerializer(serializer);
    this.bundleCache = new MemoryBundleCache(this.serializer);
  }
  start() {
    return Promise.resolve();
  }
  shutdown() {
    this._started = false;
    return Promise.resolve();
  }
  get started() {
    return this._started;
  }
  setDatabaseDeletedListener() {
  }
  setNetworkEnabled() {
  }
  getIndexManager(user) {
    return this.indexManager;
  }
  getDocumentOverlayCache(user) {
    let overlay = this.overlays[user.toKey()];
    if (!overlay) {
      overlay = new MemoryDocumentOverlayCache();
      this.overlays[user.toKey()] = overlay;
    }
    return overlay;
  }
  getMutationQueue(user, indexManager) {
    let queue = this.mutationQueues[user.toKey()];
    if (!queue) {
      queue = new MemoryMutationQueue(indexManager, this.referenceDelegate);
      this.mutationQueues[user.toKey()] = queue;
    }
    return queue;
  }
  getTargetCache() {
    return this.targetCache;
  }
  getRemoteDocumentCache() {
    return this.remoteDocumentCache;
  }
  getBundleCache() {
    return this.bundleCache;
  }
  runTransaction(action, mode, transactionOperation) {
    logDebug(LOG_TAG$d, "Starting transaction:", action);
    const txn = new MemoryTransaction(this.listenSequence.next());
    this.referenceDelegate.onTransactionStarted();
    return transactionOperation(txn).next((result) => {
      return this.referenceDelegate.onTransactionCommitted(txn).next(() => result);
    }).toPromise().then((result) => {
      txn.raiseOnCommittedEvent();
      return result;
    });
  }
  mutationQueuesContainKey(transaction, key) {
    return PersistencePromise.or(Object.values(this.mutationQueues).map((queue) => () => queue.containsKey(transaction, key)));
  }
}
class MemoryTransaction extends PersistenceTransaction {
  constructor(currentSequenceNumber) {
    super();
    this.currentSequenceNumber = currentSequenceNumber;
  }
}
class MemoryEagerDelegate {
  constructor(persistence) {
    this.persistence = persistence;
    this.localViewReferences = new ReferenceSet();
    this._orphanedDocuments = null;
  }
  static factory(persistence) {
    return new MemoryEagerDelegate(persistence);
  }
  get orphanedDocuments() {
    if (!this._orphanedDocuments) {
      throw fail();
    } else {
      return this._orphanedDocuments;
    }
  }
  addReference(txn, targetId, key) {
    this.localViewReferences.addReference(key, targetId);
    this.orphanedDocuments.delete(key.toString());
    return PersistencePromise.resolve();
  }
  removeReference(txn, targetId, key) {
    this.localViewReferences.removeReference(key, targetId);
    this.orphanedDocuments.add(key.toString());
    return PersistencePromise.resolve();
  }
  markPotentiallyOrphaned(txn, key) {
    this.orphanedDocuments.add(key.toString());
    return PersistencePromise.resolve();
  }
  removeTarget(txn, targetData) {
    const orphaned = this.localViewReferences.removeReferencesForId(targetData.targetId);
    orphaned.forEach((key) => this.orphanedDocuments.add(key.toString()));
    const cache = this.persistence.getTargetCache();
    return cache.getMatchingKeysForTargetId(txn, targetData.targetId).next((keys) => {
      keys.forEach((key) => this.orphanedDocuments.add(key.toString()));
    }).next(() => cache.removeTargetData(txn, targetData));
  }
  onTransactionStarted() {
    this._orphanedDocuments = /* @__PURE__ */ new Set();
  }
  onTransactionCommitted(txn) {
    const cache = this.persistence.getRemoteDocumentCache();
    const changeBuffer = cache.newChangeBuffer();
    return PersistencePromise.forEach(this.orphanedDocuments, (path) => {
      const key = DocumentKey.fromPath(path);
      return this.isReferenced(txn, key).next((isReferenced) => {
        if (!isReferenced) {
          changeBuffer.removeEntry(key, SnapshotVersion.min());
        }
      });
    }).next(() => {
      this._orphanedDocuments = null;
      return changeBuffer.apply(txn);
    });
  }
  updateLimboDocument(txn, key) {
    return this.isReferenced(txn, key).next((isReferenced) => {
      if (isReferenced) {
        this.orphanedDocuments.delete(key.toString());
      } else {
        this.orphanedDocuments.add(key.toString());
      }
    });
  }
  documentSize(doc2) {
    return 0;
  }
  isReferenced(txn, key) {
    return PersistencePromise.or([
      () => PersistencePromise.resolve(this.localViewReferences.containsKey(key)),
      () => this.persistence.getTargetCache().containsKey(txn, key),
      () => this.persistence.mutationQueuesContainKey(txn, key)
    ]);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_TAG$b = "LocalStore";
const RESUME_TOKEN_MAX_AGE_MICROS = 5 * 60 * 1e6;
class LocalStoreImpl {
  constructor(persistence, queryEngine, initialUser, serializer) {
    this.persistence = persistence;
    this.queryEngine = queryEngine;
    this.serializer = serializer;
    this.targetDataByTarget = new SortedMap(primitiveComparator);
    this.targetIdByTarget = new ObjectMap((t) => canonifyTarget(t), targetEquals);
    this.collectionGroupReadTime = /* @__PURE__ */ new Map();
    this.remoteDocuments = persistence.getRemoteDocumentCache();
    this.targetCache = persistence.getTargetCache();
    this.bundleCache = persistence.getBundleCache();
    this.initializeUserComponents(initialUser);
  }
  initializeUserComponents(user) {
    this.documentOverlayCache = this.persistence.getDocumentOverlayCache(user);
    this.indexManager = this.persistence.getIndexManager(user);
    this.mutationQueue = this.persistence.getMutationQueue(user, this.indexManager);
    this.localDocuments = new LocalDocumentsView(this.remoteDocuments, this.mutationQueue, this.documentOverlayCache, this.indexManager);
    this.remoteDocuments.setIndexManager(this.indexManager);
    this.queryEngine.initialize(this.localDocuments, this.indexManager);
  }
  collectGarbage(garbageCollector) {
    return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (txn) => garbageCollector.collect(txn, this.targetDataByTarget));
  }
}
function newLocalStore(persistence, queryEngine, initialUser, serializer) {
  return new LocalStoreImpl(persistence, queryEngine, initialUser, serializer);
}
async function localStoreHandleUserChange(localStore, user) {
  const localStoreImpl = debugCast(localStore);
  const result = await localStoreImpl.persistence.runTransaction("Handle user change", "readonly", (txn) => {
    let oldBatches;
    return localStoreImpl.mutationQueue.getAllMutationBatches(txn).next((promisedOldBatches) => {
      oldBatches = promisedOldBatches;
      localStoreImpl.initializeUserComponents(user);
      return localStoreImpl.mutationQueue.getAllMutationBatches(txn);
    }).next((newBatches) => {
      const removedBatchIds = [];
      const addedBatchIds = [];
      let changedKeys = documentKeySet();
      for (const batch of oldBatches) {
        removedBatchIds.push(batch.batchId);
        for (const mutation of batch.mutations) {
          changedKeys = changedKeys.add(mutation.key);
        }
      }
      for (const batch of newBatches) {
        addedBatchIds.push(batch.batchId);
        for (const mutation of batch.mutations) {
          changedKeys = changedKeys.add(mutation.key);
        }
      }
      return localStoreImpl.localDocuments.getDocuments(txn, changedKeys).next((affectedDocuments) => {
        return {
          affectedDocuments,
          removedBatchIds,
          addedBatchIds
        };
      });
    });
  });
  return result;
}
function localStoreWriteLocally(localStore, mutations) {
  const localStoreImpl = debugCast(localStore);
  const localWriteTime = Timestamp.now();
  const keys = mutations.reduce((keys2, m) => keys2.add(m.key), documentKeySet());
  let overlayedDocuments;
  let mutationBatch;
  return localStoreImpl.persistence.runTransaction("Locally write mutations", "readwrite", (txn) => {
    let remoteDocs = mutableDocumentMap();
    let docsWithoutRemoteVersion = documentKeySet();
    return localStoreImpl.remoteDocuments.getEntries(txn, keys).next((docs) => {
      remoteDocs = docs;
      remoteDocs.forEach((key, doc2) => {
        if (!doc2.isValidDocument()) {
          docsWithoutRemoteVersion = docsWithoutRemoteVersion.add(key);
        }
      });
    }).next(() => {
      return localStoreImpl.localDocuments.getOverlayedDocuments(txn, remoteDocs);
    }).next((docs) => {
      overlayedDocuments = docs;
      const baseMutations = [];
      for (const mutation of mutations) {
        const baseValue = mutationExtractBaseValue(mutation, overlayedDocuments.get(mutation.key).overlayedDocument);
        if (baseValue != null) {
          baseMutations.push(new PatchMutation(mutation.key, baseValue, extractFieldMask(baseValue.value.mapValue), Precondition.exists(true)));
        }
      }
      return localStoreImpl.mutationQueue.addMutationBatch(txn, localWriteTime, baseMutations, mutations);
    }).next((batch) => {
      mutationBatch = batch;
      const overlays = batch.applyToLocalDocumentSet(overlayedDocuments, docsWithoutRemoteVersion);
      return localStoreImpl.documentOverlayCache.saveOverlays(txn, batch.batchId, overlays);
    });
  }).then(() => ({
    batchId: mutationBatch.batchId,
    changes: convertOverlayedDocumentMapToDocumentMap(overlayedDocuments)
  }));
}
function localStoreAcknowledgeBatch(localStore, batchResult) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (txn) => {
    const affected = batchResult.batch.keys();
    const documentBuffer = localStoreImpl.remoteDocuments.newChangeBuffer({
      trackRemovals: true
      // Make sure document removals show up in `getNewDocumentChanges()`
    });
    return applyWriteToRemoteDocuments(localStoreImpl, txn, batchResult, documentBuffer).next(() => documentBuffer.apply(txn)).next(() => localStoreImpl.mutationQueue.performConsistencyCheck(txn)).next(() => localStoreImpl.documentOverlayCache.removeOverlaysForBatchId(txn, affected, batchResult.batch.batchId)).next(() => localStoreImpl.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(txn, getKeysWithTransformResults(batchResult))).next(() => localStoreImpl.localDocuments.getDocuments(txn, affected));
  });
}
function getKeysWithTransformResults(batchResult) {
  let result = documentKeySet();
  for (let i = 0; i < batchResult.mutationResults.length; ++i) {
    const mutationResult = batchResult.mutationResults[i];
    if (mutationResult.transformResults.length > 0) {
      result = result.add(batchResult.batch.mutations[i].key);
    }
  }
  return result;
}
function localStoreRejectBatch(localStore, batchId) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Reject batch", "readwrite-primary", (txn) => {
    let affectedKeys;
    return localStoreImpl.mutationQueue.lookupMutationBatch(txn, batchId).next((batch) => {
      hardAssert(batch !== null);
      affectedKeys = batch.keys();
      return localStoreImpl.mutationQueue.removeMutationBatch(txn, batch);
    }).next(() => localStoreImpl.mutationQueue.performConsistencyCheck(txn)).next(() => localStoreImpl.documentOverlayCache.removeOverlaysForBatchId(txn, affectedKeys, batchId)).next(() => localStoreImpl.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(txn, affectedKeys)).next(() => localStoreImpl.localDocuments.getDocuments(txn, affectedKeys));
  });
}
function localStoreGetLastRemoteSnapshotVersion(localStore) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Get last remote snapshot version", "readonly", (txn) => localStoreImpl.targetCache.getLastRemoteSnapshotVersion(txn));
}
function localStoreApplyRemoteEventToLocalCache(localStore, remoteEvent) {
  const localStoreImpl = debugCast(localStore);
  const remoteVersion = remoteEvent.snapshotVersion;
  let newTargetDataByTargetMap = localStoreImpl.targetDataByTarget;
  return localStoreImpl.persistence.runTransaction("Apply remote event", "readwrite-primary", (txn) => {
    const documentBuffer = localStoreImpl.remoteDocuments.newChangeBuffer({
      trackRemovals: true
      // Make sure document removals show up in `getNewDocumentChanges()`
    });
    newTargetDataByTargetMap = localStoreImpl.targetDataByTarget;
    const promises = [];
    remoteEvent.targetChanges.forEach((change, targetId) => {
      const oldTargetData = newTargetDataByTargetMap.get(targetId);
      if (!oldTargetData) {
        return;
      }
      promises.push(localStoreImpl.targetCache.removeMatchingKeys(txn, change.removedDocuments, targetId).next(() => {
        return localStoreImpl.targetCache.addMatchingKeys(txn, change.addedDocuments, targetId);
      }));
      let newTargetData = oldTargetData.withSequenceNumber(txn.currentSequenceNumber);
      if (remoteEvent.targetMismatches.get(targetId) !== null) {
        newTargetData = newTargetData.withResumeToken(ByteString.EMPTY_BYTE_STRING, SnapshotVersion.min()).withLastLimboFreeSnapshotVersion(SnapshotVersion.min());
      } else if (change.resumeToken.approximateByteSize() > 0) {
        newTargetData = newTargetData.withResumeToken(change.resumeToken, remoteVersion);
      }
      newTargetDataByTargetMap = newTargetDataByTargetMap.insert(targetId, newTargetData);
      if (shouldPersistTargetData(oldTargetData, newTargetData, change)) {
        promises.push(localStoreImpl.targetCache.updateTargetData(txn, newTargetData));
      }
    });
    let changedDocs = mutableDocumentMap();
    let existenceChangedKeys = documentKeySet();
    remoteEvent.documentUpdates.forEach((key) => {
      if (remoteEvent.resolvedLimboDocuments.has(key)) {
        promises.push(localStoreImpl.persistence.referenceDelegate.updateLimboDocument(txn, key));
      }
    });
    promises.push(populateDocumentChangeBuffer(txn, documentBuffer, remoteEvent.documentUpdates).next((result) => {
      changedDocs = result.changedDocuments;
      existenceChangedKeys = result.existenceChangedKeys;
    }));
    if (!remoteVersion.isEqual(SnapshotVersion.min())) {
      const updateRemoteVersion = localStoreImpl.targetCache.getLastRemoteSnapshotVersion(txn).next((lastRemoteSnapshotVersion) => {
        return localStoreImpl.targetCache.setTargetsMetadata(txn, txn.currentSequenceNumber, remoteVersion);
      });
      promises.push(updateRemoteVersion);
    }
    return PersistencePromise.waitFor(promises).next(() => documentBuffer.apply(txn)).next(() => localStoreImpl.localDocuments.getLocalViewOfDocuments(txn, changedDocs, existenceChangedKeys)).next(() => changedDocs);
  }).then((changedDocs) => {
    localStoreImpl.targetDataByTarget = newTargetDataByTargetMap;
    return changedDocs;
  });
}
function populateDocumentChangeBuffer(txn, documentBuffer, documents) {
  let updatedKeys = documentKeySet();
  let existenceChangedKeys = documentKeySet();
  documents.forEach((k) => updatedKeys = updatedKeys.add(k));
  return documentBuffer.getEntries(txn, updatedKeys).next((existingDocs) => {
    let changedDocuments = mutableDocumentMap();
    documents.forEach((key, doc2) => {
      const existingDoc = existingDocs.get(key);
      if (doc2.isFoundDocument() !== existingDoc.isFoundDocument()) {
        existenceChangedKeys = existenceChangedKeys.add(key);
      }
      if (doc2.isNoDocument() && doc2.version.isEqual(SnapshotVersion.min())) {
        documentBuffer.removeEntry(key, doc2.readTime);
        changedDocuments = changedDocuments.insert(key, doc2);
      } else if (!existingDoc.isValidDocument() || doc2.version.compareTo(existingDoc.version) > 0 || doc2.version.compareTo(existingDoc.version) === 0 && existingDoc.hasPendingWrites) {
        documentBuffer.addEntry(doc2);
        changedDocuments = changedDocuments.insert(key, doc2);
      } else {
        logDebug(LOG_TAG$b, "Ignoring outdated watch update for ", key, ". Current version:", existingDoc.version, " Watch version:", doc2.version);
      }
    });
    return { changedDocuments, existenceChangedKeys };
  });
}
function shouldPersistTargetData(oldTargetData, newTargetData, change) {
  if (oldTargetData.resumeToken.approximateByteSize() === 0) {
    return true;
  }
  const timeDelta = newTargetData.snapshotVersion.toMicroseconds() - oldTargetData.snapshotVersion.toMicroseconds();
  if (timeDelta >= RESUME_TOKEN_MAX_AGE_MICROS) {
    return true;
  }
  const changes = change.addedDocuments.size + change.modifiedDocuments.size + change.removedDocuments.size;
  return changes > 0;
}
async function localStoreNotifyLocalViewChanges(localStore, viewChanges) {
  const localStoreImpl = debugCast(localStore);
  try {
    await localStoreImpl.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (txn) => {
      return PersistencePromise.forEach(viewChanges, (viewChange) => {
        return PersistencePromise.forEach(viewChange.addedKeys, (key) => localStoreImpl.persistence.referenceDelegate.addReference(txn, viewChange.targetId, key)).next(() => PersistencePromise.forEach(viewChange.removedKeys, (key) => localStoreImpl.persistence.referenceDelegate.removeReference(txn, viewChange.targetId, key)));
      });
    });
  } catch (e) {
    if (isIndexedDbTransactionError(e)) {
      logDebug(LOG_TAG$b, "Failed to update sequence numbers: " + e);
    } else {
      throw e;
    }
  }
  for (const viewChange of viewChanges) {
    const targetId = viewChange.targetId;
    if (!viewChange.fromCache) {
      const targetData = localStoreImpl.targetDataByTarget.get(targetId);
      const lastLimboFreeSnapshotVersion = targetData.snapshotVersion;
      const updatedTargetData = targetData.withLastLimboFreeSnapshotVersion(lastLimboFreeSnapshotVersion);
      localStoreImpl.targetDataByTarget = localStoreImpl.targetDataByTarget.insert(targetId, updatedTargetData);
    }
  }
}
function localStoreGetNextMutationBatch(localStore, afterBatchId) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Get next mutation batch", "readonly", (txn) => {
    if (afterBatchId === void 0) {
      afterBatchId = BATCHID_UNKNOWN;
    }
    return localStoreImpl.mutationQueue.getNextMutationBatchAfterBatchId(txn, afterBatchId);
  });
}
function localStoreAllocateTarget(localStore, target) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Allocate target", "readwrite", (txn) => {
    let targetData;
    return localStoreImpl.targetCache.getTargetData(txn, target).next((cached) => {
      if (cached) {
        targetData = cached;
        return PersistencePromise.resolve(targetData);
      } else {
        return localStoreImpl.targetCache.allocateTargetId(txn).next((targetId) => {
          targetData = new TargetData(target, targetId, "TargetPurposeListen", txn.currentSequenceNumber);
          return localStoreImpl.targetCache.addTargetData(txn, targetData).next(() => targetData);
        });
      }
    });
  }).then((targetData) => {
    const cachedTargetData = localStoreImpl.targetDataByTarget.get(targetData.targetId);
    if (cachedTargetData === null || targetData.snapshotVersion.compareTo(cachedTargetData.snapshotVersion) > 0) {
      localStoreImpl.targetDataByTarget = localStoreImpl.targetDataByTarget.insert(targetData.targetId, targetData);
      localStoreImpl.targetIdByTarget.set(target, targetData.targetId);
    }
    return targetData;
  });
}
function localStoreGetTargetData(localStore, transaction, target) {
  const localStoreImpl = debugCast(localStore);
  const targetId = localStoreImpl.targetIdByTarget.get(target);
  if (targetId !== void 0) {
    return PersistencePromise.resolve(localStoreImpl.targetDataByTarget.get(targetId));
  } else {
    return localStoreImpl.targetCache.getTargetData(transaction, target);
  }
}
async function localStoreReleaseTarget(localStore, targetId, keepPersistedTargetData) {
  const localStoreImpl = debugCast(localStore);
  const targetData = localStoreImpl.targetDataByTarget.get(targetId);
  const mode = keepPersistedTargetData ? "readwrite" : "readwrite-primary";
  try {
    if (!keepPersistedTargetData) {
      await localStoreImpl.persistence.runTransaction("Release target", mode, (txn) => {
        return localStoreImpl.persistence.referenceDelegate.removeTarget(txn, targetData);
      });
    }
  } catch (e) {
    if (isIndexedDbTransactionError(e)) {
      logDebug(LOG_TAG$b, `Failed to update sequence numbers for target ${targetId}: ${e}`);
    } else {
      throw e;
    }
  }
  localStoreImpl.targetDataByTarget = localStoreImpl.targetDataByTarget.remove(targetId);
  localStoreImpl.targetIdByTarget.delete(targetData.target);
}
function localStoreExecuteQuery(localStore, query, usePreviousResults) {
  const localStoreImpl = debugCast(localStore);
  let lastLimboFreeSnapshotVersion = SnapshotVersion.min();
  let remoteKeys = documentKeySet();
  return localStoreImpl.persistence.runTransaction("Execute query", "readonly", (txn) => {
    return localStoreGetTargetData(localStoreImpl, txn, queryToTarget(query)).next((targetData) => {
      if (targetData) {
        lastLimboFreeSnapshotVersion = targetData.lastLimboFreeSnapshotVersion;
        return localStoreImpl.targetCache.getMatchingKeysForTargetId(txn, targetData.targetId).next((result) => {
          remoteKeys = result;
        });
      }
    }).next(() => localStoreImpl.queryEngine.getDocumentsMatchingQuery(txn, query, usePreviousResults ? lastLimboFreeSnapshotVersion : SnapshotVersion.min(), usePreviousResults ? remoteKeys : documentKeySet())).next((documents) => {
      setMaxReadTime(localStoreImpl, queryCollectionGroup(query), documents);
      return { documents, remoteKeys };
    });
  });
}
function applyWriteToRemoteDocuments(localStoreImpl, txn, batchResult, documentBuffer) {
  const batch = batchResult.batch;
  const docKeys = batch.keys();
  let promiseChain = PersistencePromise.resolve();
  docKeys.forEach((docKey) => {
    promiseChain = promiseChain.next(() => documentBuffer.getEntry(txn, docKey)).next((doc2) => {
      const ackVersion = batchResult.docVersions.get(docKey);
      hardAssert(ackVersion !== null);
      if (doc2.version.compareTo(ackVersion) < 0) {
        batch.applyToRemoteDocument(doc2, batchResult);
        if (doc2.isValidDocument()) {
          doc2.setReadTime(batchResult.commitVersion);
          documentBuffer.addEntry(doc2);
        }
      }
    });
  });
  return promiseChain.next(() => localStoreImpl.mutationQueue.removeMutationBatch(txn, batch));
}
function setMaxReadTime(localStoreImpl, collectionGroup, changedDocs) {
  let readTime = localStoreImpl.collectionGroupReadTime.get(collectionGroup) || SnapshotVersion.min();
  changedDocs.forEach((_, doc2) => {
    if (doc2.readTime.compareTo(readTime) > 0) {
      readTime = doc2.readTime;
    }
  });
  localStoreImpl.collectionGroupReadTime.set(collectionGroup, readTime);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class QueryEngine {
  constructor() {
    this.initialized = false;
  }
  /** Sets the document view to query against. */
  initialize(localDocuments, indexManager) {
    this.localDocumentsView = localDocuments;
    this.indexManager = indexManager;
    this.initialized = true;
  }
  /** Returns all local documents matching the specified query. */
  getDocumentsMatchingQuery(transaction, query, lastLimboFreeSnapshotVersion, remoteKeys) {
    return this.performQueryUsingIndex(transaction, query).next((result) => result ? result : this.performQueryUsingRemoteKeys(transaction, query, remoteKeys, lastLimboFreeSnapshotVersion)).next((result) => result ? result : this.executeFullCollectionScan(transaction, query));
  }
  /**
   * Performs an indexed query that evaluates the query based on a collection's
   * persisted index values. Returns `null` if an index is not available.
   */
  performQueryUsingIndex(transaction, query) {
    if (queryMatchesAllDocuments(query)) {
      return PersistencePromise.resolve(null);
    }
    let target = queryToTarget(query);
    return this.indexManager.getIndexType(transaction, target).next((indexType) => {
      if (indexType === 0) {
        return null;
      }
      if (query.limit !== null && indexType === 1) {
        query = queryWithLimit(
          query,
          null,
          "F"
          /* LimitType.First */
        );
        target = queryToTarget(query);
      }
      return this.indexManager.getDocumentsMatchingTarget(transaction, target).next((keys) => {
        const sortedKeys = documentKeySet(...keys);
        return this.localDocumentsView.getDocuments(transaction, sortedKeys).next((indexedDocuments) => {
          return this.indexManager.getMinOffset(transaction, target).next((offset) => {
            const previousResults = this.applyQuery(query, indexedDocuments);
            if (this.needsRefill(query, previousResults, sortedKeys, offset.readTime)) {
              return this.performQueryUsingIndex(transaction, queryWithLimit(
                query,
                null,
                "F"
                /* LimitType.First */
              ));
            }
            return this.appendRemainingResults(transaction, previousResults, query, offset);
          });
        });
      });
    });
  }
  /**
   * Performs a query based on the target's persisted query mapping. Returns
   * `null` if the mapping is not available or cannot be used.
   */
  performQueryUsingRemoteKeys(transaction, query, remoteKeys, lastLimboFreeSnapshotVersion) {
    if (queryMatchesAllDocuments(query)) {
      return this.executeFullCollectionScan(transaction, query);
    }
    if (lastLimboFreeSnapshotVersion.isEqual(SnapshotVersion.min())) {
      return this.executeFullCollectionScan(transaction, query);
    }
    return this.localDocumentsView.getDocuments(transaction, remoteKeys).next((documents) => {
      const previousResults = this.applyQuery(query, documents);
      if (this.needsRefill(query, previousResults, remoteKeys, lastLimboFreeSnapshotVersion)) {
        return this.executeFullCollectionScan(transaction, query);
      }
      if (getLogLevel() <= LogLevel.DEBUG) {
        logDebug("QueryEngine", "Re-using previous result from %s to execute query: %s", lastLimboFreeSnapshotVersion.toString(), stringifyQuery(query));
      }
      return this.appendRemainingResults(transaction, previousResults, query, newIndexOffsetSuccessorFromReadTime(lastLimboFreeSnapshotVersion, INITIAL_LARGEST_BATCH_ID));
    });
  }
  /** Applies the query filter and sorting to the provided documents.  */
  applyQuery(query, documents) {
    let queryResults = new SortedSet(newQueryComparator(query));
    documents.forEach((_, maybeDoc) => {
      if (queryMatches(query, maybeDoc)) {
        queryResults = queryResults.add(maybeDoc);
      }
    });
    return queryResults;
  }
  /**
   * Determines if a limit query needs to be refilled from cache, making it
   * ineligible for index-free execution.
   *
   * @param query - The query.
   * @param sortedPreviousResults - The documents that matched the query when it
   * was last synchronized, sorted by the query's comparator.
   * @param remoteKeys - The document keys that matched the query at the last
   * snapshot.
   * @param limboFreeSnapshotVersion - The version of the snapshot when the
   * query was last synchronized.
   */
  needsRefill(query, sortedPreviousResults, remoteKeys, limboFreeSnapshotVersion) {
    if (query.limit === null) {
      return false;
    }
    if (remoteKeys.size !== sortedPreviousResults.size) {
      return true;
    }
    const docAtLimitEdge = query.limitType === "F" ? sortedPreviousResults.last() : sortedPreviousResults.first();
    if (!docAtLimitEdge) {
      return false;
    }
    return docAtLimitEdge.hasPendingWrites || docAtLimitEdge.version.compareTo(limboFreeSnapshotVersion) > 0;
  }
  executeFullCollectionScan(transaction, query) {
    if (getLogLevel() <= LogLevel.DEBUG) {
      logDebug("QueryEngine", "Using full collection scan to execute query:", stringifyQuery(query));
    }
    return this.localDocumentsView.getDocumentsMatchingQuery(transaction, query, IndexOffset.min());
  }
  /**
   * Combines the results from an indexed execution with the remaining documents
   * that have not yet been indexed.
   */
  appendRemainingResults(transaction, indexedResults, query, offset) {
    return this.localDocumentsView.getDocumentsMatchingQuery(transaction, query, offset).next((remainingResults) => {
      indexedResults.forEach((d) => {
        remainingResults = remainingResults.insert(d.key, d);
      });
      return remainingResults;
    });
  }
}
class LocalClientState {
  constructor() {
    this.activeTargetIds = targetIdSet();
  }
  addQueryTarget(targetId) {
    this.activeTargetIds = this.activeTargetIds.add(targetId);
  }
  removeQueryTarget(targetId) {
    this.activeTargetIds = this.activeTargetIds.delete(targetId);
  }
  /**
   * Converts this entry into a JSON-encoded format we can use for WebStorage.
   * Does not encode `clientId` as it is part of the key in WebStorage.
   */
  toWebStorageJSON() {
    const data = {
      activeTargetIds: this.activeTargetIds.toArray(),
      updateTimeMs: Date.now()
      // Modify the existing value to trigger update.
    };
    return JSON.stringify(data);
  }
}
class MemorySharedClientState {
  constructor() {
    this.localState = new LocalClientState();
    this.queryState = {};
    this.onlineStateHandler = null;
    this.sequenceNumberHandler = null;
  }
  addPendingMutation(batchId) {
  }
  updateMutationState(batchId, state, error) {
  }
  addLocalQueryTarget(targetId) {
    this.localState.addQueryTarget(targetId);
    return this.queryState[targetId] || "not-current";
  }
  updateQueryState(targetId, state, error) {
    this.queryState[targetId] = state;
  }
  removeLocalQueryTarget(targetId) {
    this.localState.removeQueryTarget(targetId);
  }
  isLocalQueryTarget(targetId) {
    return this.localState.activeTargetIds.has(targetId);
  }
  clearQueryState(targetId) {
    delete this.queryState[targetId];
  }
  getAllActiveQueryTargets() {
    return this.localState.activeTargetIds;
  }
  isActiveQueryTarget(targetId) {
    return this.localState.activeTargetIds.has(targetId);
  }
  start() {
    this.localState = new LocalClientState();
    return Promise.resolve();
  }
  handleUserChange(user, removedBatchIds, addedBatchIds) {
  }
  setOnlineState(onlineState) {
  }
  shutdown() {
  }
  writeSequenceNumber(sequenceNumber) {
  }
  notifyBundleLoaded(collectionGroups) {
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class NoopConnectivityMonitor {
  addCallback(callback) {
  }
  shutdown() {
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class StreamBridge {
  constructor(args) {
    this.sendFn = args.sendFn;
    this.closeFn = args.closeFn;
  }
  onOpen(callback) {
    this.wrappedOnOpen = callback;
  }
  onClose(callback) {
    this.wrappedOnClose = callback;
  }
  onMessage(callback) {
    this.wrappedOnMessage = callback;
  }
  close() {
    this.closeFn();
  }
  send(msg) {
    this.sendFn(msg);
  }
  callOnOpen() {
    this.wrappedOnOpen();
  }
  callOnClose(err) {
    this.wrappedOnClose(err);
  }
  callOnMessage(msg) {
    this.wrappedOnMessage(msg);
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let lastUniqueDebugId = null;
function generateInitialUniqueDebugId() {
  const minResult = 268435456;
  const maxResult = 2415919104;
  const resultRange = maxResult - minResult;
  const resultOffset = Math.round(resultRange * Math.random());
  return minResult + resultOffset;
}
function generateUniqueDebugId() {
  if (lastUniqueDebugId === null) {
    lastUniqueDebugId = generateInitialUniqueDebugId();
  } else {
    lastUniqueDebugId++;
  }
  return "0x" + lastUniqueDebugId.toString(16);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function nodePromise(action) {
  return new Promise((resolve, reject) => {
    action((error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const grpcVersion = "1.7.3";
const LOG_TAG$9 = "GrpcConnection";
const X_GOOG_API_CLIENT_VALUE = `gl-node/${process.versions.node} fire/${SDK_VERSION} grpc/${grpcVersion}`;
function createMetadata(databasePath, authToken, appCheckToken, appId) {
  hardAssert(authToken === null || authToken.type === "OAuth");
  const metadata = new grpc.Metadata();
  if (authToken) {
    authToken.headers.forEach((value, key) => metadata.set(key, value));
  }
  if (appCheckToken) {
    appCheckToken.headers.forEach((value, key) => metadata.set(key, value));
  }
  if (appId) {
    metadata.set("X-Firebase-GMPID", appId);
  }
  metadata.set("X-Goog-Api-Client", X_GOOG_API_CLIENT_VALUE);
  metadata.set("Google-Cloud-Resource-Prefix", databasePath);
  metadata.set("x-goog-request-params", databasePath);
  return metadata;
}
class GrpcConnection {
  constructor(protos2, databaseInfo) {
    this.databaseInfo = databaseInfo;
    this.cachedStub = null;
    this.firestore = protos2["google"]["firestore"]["v1"];
    this.databasePath = `projects/${databaseInfo.databaseId.projectId}/databases/${databaseInfo.databaseId.database}`;
  }
  get shouldResourcePathBeIncludedInRequest() {
    return true;
  }
  ensureActiveStub() {
    if (!this.cachedStub) {
      logDebug(LOG_TAG$9, "Creating Firestore stub.");
      const credentials = this.databaseInfo.ssl ? grpc.credentials.createSsl() : grpc.credentials.createInsecure();
      this.cachedStub = new this.firestore.Firestore(this.databaseInfo.host, credentials);
    }
    return this.cachedStub;
  }
  invokeRPC(rpcName, path, request, authToken, appCheckToken) {
    const streamId = generateUniqueDebugId();
    const stub = this.ensureActiveStub();
    const metadata = createMetadata(this.databasePath, authToken, appCheckToken, this.databaseInfo.appId);
    const jsonRequest = Object.assign({ database: this.databasePath }, request);
    return nodePromise((callback) => {
      logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} invoked with request:`, request);
      return stub[rpcName](jsonRequest, metadata, (grpcError, value) => {
        if (grpcError) {
          logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} failed with error:`, grpcError);
          callback(new FirestoreError(mapCodeFromRpcCode(grpcError.code), grpcError.message));
        } else {
          logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} completed with response:`, value);
          callback(void 0, value);
        }
      });
    });
  }
  invokeStreamingRPC(rpcName, path, request, authToken, appCheckToken, expectedResponseCount) {
    const streamId = generateUniqueDebugId();
    const results = [];
    const responseDeferred = new Deferred();
    logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} invoked (streaming) with request:`, request);
    const stub = this.ensureActiveStub();
    const metadata = createMetadata(this.databasePath, authToken, appCheckToken, this.databaseInfo.appId);
    const jsonRequest = Object.assign(Object.assign({}, request), { database: this.databasePath });
    const stream = stub[rpcName](jsonRequest, metadata);
    let callbackFired = false;
    stream.on("data", (response) => {
      logDebug(LOG_TAG$9, `RPC ${rpcName} ${streamId} received result:`, response);
      results.push(response);
      if (expectedResponseCount !== void 0 && results.length === expectedResponseCount) {
        callbackFired = true;
        responseDeferred.resolve(results);
      }
    });
    stream.on("end", () => {
      logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} completed.`);
      if (!callbackFired) {
        callbackFired = true;
        responseDeferred.resolve(results);
      }
    });
    stream.on("error", (grpcError) => {
      logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} failed with error:`, grpcError);
      const code = mapCodeFromRpcCode(grpcError.code);
      responseDeferred.reject(new FirestoreError(code, grpcError.message));
    });
    return responseDeferred.promise;
  }
  // TODO(mikelehen): This "method" is a monster. Should be refactored.
  openStream(rpcName, authToken, appCheckToken) {
    const streamId = generateUniqueDebugId();
    const stub = this.ensureActiveStub();
    const metadata = createMetadata(this.databasePath, authToken, appCheckToken, this.databaseInfo.appId);
    const grpcStream = stub[rpcName](metadata);
    let closed = false;
    const close = (err) => {
      if (!closed) {
        closed = true;
        stream.callOnClose(err);
        grpcStream.end();
      }
    };
    const stream = new StreamBridge({
      sendFn: (msg) => {
        if (!closed) {
          logDebug(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} sending:`, msg);
          try {
            grpcStream.write(msg);
          } catch (e) {
            logError("Failure sending:", msg);
            logError("Error:", e);
            throw e;
          }
        } else {
          logDebug(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} not sending because gRPC stream is closed:`, msg);
        }
      },
      closeFn: () => {
        logDebug(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} closed locally via close().`);
        close();
      }
    });
    grpcStream.on("data", (msg) => {
      if (!closed) {
        logDebug(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} received:`, msg);
        stream.callOnMessage(msg);
      }
    });
    grpcStream.on("end", () => {
      logDebug(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} ended.`);
      close();
    });
    grpcStream.on("error", (grpcError) => {
      if (!closed) {
        logWarn(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} error. Code:`, grpcError.code, "Message:", grpcError.message);
        const code = mapCodeFromRpcCode(grpcError.code);
        close(new FirestoreError(code, grpcError.message));
      }
    });
    logDebug(LOG_TAG$9, `Opening RPC '${rpcName}' stream ${streamId} to ${this.databaseInfo.host}`);
    setTimeout(() => {
      stream.callOnOpen();
    }, 0);
    return stream;
  }
}
const nested = {
  google: {
    nested: {
      protobuf: {
        options: {
          csharp_namespace: "Google.Protobuf.WellKnownTypes",
          go_package: "github.com/golang/protobuf/ptypes/wrappers",
          java_package: "com.google.protobuf",
          java_outer_classname: "WrappersProto",
          java_multiple_files: true,
          objc_class_prefix: "GPB",
          cc_enable_arenas: true,
          optimize_for: "SPEED"
        },
        nested: {
          Timestamp: {
            fields: {
              seconds: {
                type: "int64",
                id: 1
              },
              nanos: {
                type: "int32",
                id: 2
              }
            }
          },
          FileDescriptorSet: {
            fields: {
              file: {
                rule: "repeated",
                type: "FileDescriptorProto",
                id: 1
              }
            }
          },
          FileDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              "package": {
                type: "string",
                id: 2
              },
              dependency: {
                rule: "repeated",
                type: "string",
                id: 3
              },
              publicDependency: {
                rule: "repeated",
                type: "int32",
                id: 10,
                options: {
                  packed: false
                }
              },
              weakDependency: {
                rule: "repeated",
                type: "int32",
                id: 11,
                options: {
                  packed: false
                }
              },
              messageType: {
                rule: "repeated",
                type: "DescriptorProto",
                id: 4
              },
              enumType: {
                rule: "repeated",
                type: "EnumDescriptorProto",
                id: 5
              },
              service: {
                rule: "repeated",
                type: "ServiceDescriptorProto",
                id: 6
              },
              extension: {
                rule: "repeated",
                type: "FieldDescriptorProto",
                id: 7
              },
              options: {
                type: "FileOptions",
                id: 8
              },
              sourceCodeInfo: {
                type: "SourceCodeInfo",
                id: 9
              },
              syntax: {
                type: "string",
                id: 12
              }
            }
          },
          DescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              field: {
                rule: "repeated",
                type: "FieldDescriptorProto",
                id: 2
              },
              extension: {
                rule: "repeated",
                type: "FieldDescriptorProto",
                id: 6
              },
              nestedType: {
                rule: "repeated",
                type: "DescriptorProto",
                id: 3
              },
              enumType: {
                rule: "repeated",
                type: "EnumDescriptorProto",
                id: 4
              },
              extensionRange: {
                rule: "repeated",
                type: "ExtensionRange",
                id: 5
              },
              oneofDecl: {
                rule: "repeated",
                type: "OneofDescriptorProto",
                id: 8
              },
              options: {
                type: "MessageOptions",
                id: 7
              },
              reservedRange: {
                rule: "repeated",
                type: "ReservedRange",
                id: 9
              },
              reservedName: {
                rule: "repeated",
                type: "string",
                id: 10
              }
            },
            nested: {
              ExtensionRange: {
                fields: {
                  start: {
                    type: "int32",
                    id: 1
                  },
                  end: {
                    type: "int32",
                    id: 2
                  }
                }
              },
              ReservedRange: {
                fields: {
                  start: {
                    type: "int32",
                    id: 1
                  },
                  end: {
                    type: "int32",
                    id: 2
                  }
                }
              }
            }
          },
          FieldDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              number: {
                type: "int32",
                id: 3
              },
              label: {
                type: "Label",
                id: 4
              },
              type: {
                type: "Type",
                id: 5
              },
              typeName: {
                type: "string",
                id: 6
              },
              extendee: {
                type: "string",
                id: 2
              },
              defaultValue: {
                type: "string",
                id: 7
              },
              oneofIndex: {
                type: "int32",
                id: 9
              },
              jsonName: {
                type: "string",
                id: 10
              },
              options: {
                type: "FieldOptions",
                id: 8
              }
            },
            nested: {
              Type: {
                values: {
                  TYPE_DOUBLE: 1,
                  TYPE_FLOAT: 2,
                  TYPE_INT64: 3,
                  TYPE_UINT64: 4,
                  TYPE_INT32: 5,
                  TYPE_FIXED64: 6,
                  TYPE_FIXED32: 7,
                  TYPE_BOOL: 8,
                  TYPE_STRING: 9,
                  TYPE_GROUP: 10,
                  TYPE_MESSAGE: 11,
                  TYPE_BYTES: 12,
                  TYPE_UINT32: 13,
                  TYPE_ENUM: 14,
                  TYPE_SFIXED32: 15,
                  TYPE_SFIXED64: 16,
                  TYPE_SINT32: 17,
                  TYPE_SINT64: 18
                }
              },
              Label: {
                values: {
                  LABEL_OPTIONAL: 1,
                  LABEL_REQUIRED: 2,
                  LABEL_REPEATED: 3
                }
              }
            }
          },
          OneofDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              options: {
                type: "OneofOptions",
                id: 2
              }
            }
          },
          EnumDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              value: {
                rule: "repeated",
                type: "EnumValueDescriptorProto",
                id: 2
              },
              options: {
                type: "EnumOptions",
                id: 3
              }
            }
          },
          EnumValueDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              number: {
                type: "int32",
                id: 2
              },
              options: {
                type: "EnumValueOptions",
                id: 3
              }
            }
          },
          ServiceDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              method: {
                rule: "repeated",
                type: "MethodDescriptorProto",
                id: 2
              },
              options: {
                type: "ServiceOptions",
                id: 3
              }
            }
          },
          MethodDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              inputType: {
                type: "string",
                id: 2
              },
              outputType: {
                type: "string",
                id: 3
              },
              options: {
                type: "MethodOptions",
                id: 4
              },
              clientStreaming: {
                type: "bool",
                id: 5
              },
              serverStreaming: {
                type: "bool",
                id: 6
              }
            }
          },
          FileOptions: {
            fields: {
              javaPackage: {
                type: "string",
                id: 1
              },
              javaOuterClassname: {
                type: "string",
                id: 8
              },
              javaMultipleFiles: {
                type: "bool",
                id: 10
              },
              javaGenerateEqualsAndHash: {
                type: "bool",
                id: 20,
                options: {
                  deprecated: true
                }
              },
              javaStringCheckUtf8: {
                type: "bool",
                id: 27
              },
              optimizeFor: {
                type: "OptimizeMode",
                id: 9,
                options: {
                  "default": "SPEED"
                }
              },
              goPackage: {
                type: "string",
                id: 11
              },
              ccGenericServices: {
                type: "bool",
                id: 16
              },
              javaGenericServices: {
                type: "bool",
                id: 17
              },
              pyGenericServices: {
                type: "bool",
                id: 18
              },
              deprecated: {
                type: "bool",
                id: 23
              },
              ccEnableArenas: {
                type: "bool",
                id: 31
              },
              objcClassPrefix: {
                type: "string",
                id: 36
              },
              csharpNamespace: {
                type: "string",
                id: 37
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [
              [
                1e3,
                536870911
              ]
            ],
            reserved: [
              [
                38,
                38
              ]
            ],
            nested: {
              OptimizeMode: {
                values: {
                  SPEED: 1,
                  CODE_SIZE: 2,
                  LITE_RUNTIME: 3
                }
              }
            }
          },
          MessageOptions: {
            fields: {
              messageSetWireFormat: {
                type: "bool",
                id: 1
              },
              noStandardDescriptorAccessor: {
                type: "bool",
                id: 2
              },
              deprecated: {
                type: "bool",
                id: 3
              },
              mapEntry: {
                type: "bool",
                id: 7
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [
              [
                1e3,
                536870911
              ]
            ],
            reserved: [
              [
                8,
                8
              ]
            ]
          },
          FieldOptions: {
            fields: {
              ctype: {
                type: "CType",
                id: 1,
                options: {
                  "default": "STRING"
                }
              },
              packed: {
                type: "bool",
                id: 2
              },
              jstype: {
                type: "JSType",
                id: 6,
                options: {
                  "default": "JS_NORMAL"
                }
              },
              lazy: {
                type: "bool",
                id: 5
              },
              deprecated: {
                type: "bool",
                id: 3
              },
              weak: {
                type: "bool",
                id: 10
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [
              [
                1e3,
                536870911
              ]
            ],
            reserved: [
              [
                4,
                4
              ]
            ],
            nested: {
              CType: {
                values: {
                  STRING: 0,
                  CORD: 1,
                  STRING_PIECE: 2
                }
              },
              JSType: {
                values: {
                  JS_NORMAL: 0,
                  JS_STRING: 1,
                  JS_NUMBER: 2
                }
              }
            }
          },
          OneofOptions: {
            fields: {
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [
              [
                1e3,
                536870911
              ]
            ]
          },
          EnumOptions: {
            fields: {
              allowAlias: {
                type: "bool",
                id: 2
              },
              deprecated: {
                type: "bool",
                id: 3
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [
              [
                1e3,
                536870911
              ]
            ]
          },
          EnumValueOptions: {
            fields: {
              deprecated: {
                type: "bool",
                id: 1
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [
              [
                1e3,
                536870911
              ]
            ]
          },
          ServiceOptions: {
            fields: {
              deprecated: {
                type: "bool",
                id: 33
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [
              [
                1e3,
                536870911
              ]
            ]
          },
          MethodOptions: {
            fields: {
              deprecated: {
                type: "bool",
                id: 33
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [
              [
                1e3,
                536870911
              ]
            ]
          },
          UninterpretedOption: {
            fields: {
              name: {
                rule: "repeated",
                type: "NamePart",
                id: 2
              },
              identifierValue: {
                type: "string",
                id: 3
              },
              positiveIntValue: {
                type: "uint64",
                id: 4
              },
              negativeIntValue: {
                type: "int64",
                id: 5
              },
              doubleValue: {
                type: "double",
                id: 6
              },
              stringValue: {
                type: "bytes",
                id: 7
              },
              aggregateValue: {
                type: "string",
                id: 8
              }
            },
            nested: {
              NamePart: {
                fields: {
                  namePart: {
                    rule: "required",
                    type: "string",
                    id: 1
                  },
                  isExtension: {
                    rule: "required",
                    type: "bool",
                    id: 2
                  }
                }
              }
            }
          },
          SourceCodeInfo: {
            fields: {
              location: {
                rule: "repeated",
                type: "Location",
                id: 1
              }
            },
            nested: {
              Location: {
                fields: {
                  path: {
                    rule: "repeated",
                    type: "int32",
                    id: 1
                  },
                  span: {
                    rule: "repeated",
                    type: "int32",
                    id: 2
                  },
                  leadingComments: {
                    type: "string",
                    id: 3
                  },
                  trailingComments: {
                    type: "string",
                    id: 4
                  },
                  leadingDetachedComments: {
                    rule: "repeated",
                    type: "string",
                    id: 6
                  }
                }
              }
            }
          },
          GeneratedCodeInfo: {
            fields: {
              annotation: {
                rule: "repeated",
                type: "Annotation",
                id: 1
              }
            },
            nested: {
              Annotation: {
                fields: {
                  path: {
                    rule: "repeated",
                    type: "int32",
                    id: 1
                  },
                  sourceFile: {
                    type: "string",
                    id: 2
                  },
                  begin: {
                    type: "int32",
                    id: 3
                  },
                  end: {
                    type: "int32",
                    id: 4
                  }
                }
              }
            }
          },
          Struct: {
            fields: {
              fields: {
                keyType: "string",
                type: "Value",
                id: 1
              }
            }
          },
          Value: {
            oneofs: {
              kind: {
                oneof: [
                  "nullValue",
                  "numberValue",
                  "stringValue",
                  "boolValue",
                  "structValue",
                  "listValue"
                ]
              }
            },
            fields: {
              nullValue: {
                type: "NullValue",
                id: 1
              },
              numberValue: {
                type: "double",
                id: 2
              },
              stringValue: {
                type: "string",
                id: 3
              },
              boolValue: {
                type: "bool",
                id: 4
              },
              structValue: {
                type: "Struct",
                id: 5
              },
              listValue: {
                type: "ListValue",
                id: 6
              }
            }
          },
          NullValue: {
            values: {
              NULL_VALUE: 0
            }
          },
          ListValue: {
            fields: {
              values: {
                rule: "repeated",
                type: "Value",
                id: 1
              }
            }
          },
          Empty: {
            fields: {}
          },
          DoubleValue: {
            fields: {
              value: {
                type: "double",
                id: 1
              }
            }
          },
          FloatValue: {
            fields: {
              value: {
                type: "float",
                id: 1
              }
            }
          },
          Int64Value: {
            fields: {
              value: {
                type: "int64",
                id: 1
              }
            }
          },
          UInt64Value: {
            fields: {
              value: {
                type: "uint64",
                id: 1
              }
            }
          },
          Int32Value: {
            fields: {
              value: {
                type: "int32",
                id: 1
              }
            }
          },
          UInt32Value: {
            fields: {
              value: {
                type: "uint32",
                id: 1
              }
            }
          },
          BoolValue: {
            fields: {
              value: {
                type: "bool",
                id: 1
              }
            }
          },
          StringValue: {
            fields: {
              value: {
                type: "string",
                id: 1
              }
            }
          },
          BytesValue: {
            fields: {
              value: {
                type: "bytes",
                id: 1
              }
            }
          },
          Any: {
            fields: {
              typeUrl: {
                type: "string",
                id: 1
              },
              value: {
                type: "bytes",
                id: 2
              }
            }
          }
        }
      },
      firestore: {
        nested: {
          v1: {
            options: {
              csharp_namespace: "Google.Cloud.Firestore.V1",
              go_package: "google.golang.org/genproto/googleapis/firestore/v1;firestore",
              java_multiple_files: true,
              java_outer_classname: "WriteProto",
              java_package: "com.google.firestore.v1",
              objc_class_prefix: "GCFS",
              php_namespace: "Google\\Cloud\\Firestore\\V1",
              ruby_package: "Google::Cloud::Firestore::V1"
            },
            nested: {
              AggregationResult: {
                fields: {
                  aggregateFields: {
                    keyType: "string",
                    type: "Value",
                    id: 2
                  }
                }
              },
              BitSequence: {
                fields: {
                  bitmap: {
                    type: "bytes",
                    id: 1
                  },
                  padding: {
                    type: "int32",
                    id: 2
                  }
                }
              },
              BloomFilter: {
                fields: {
                  bits: {
                    type: "BitSequence",
                    id: 1
                  },
                  hashCount: {
                    type: "int32",
                    id: 2
                  }
                }
              },
              DocumentMask: {
                fields: {
                  fieldPaths: {
                    rule: "repeated",
                    type: "string",
                    id: 1
                  }
                }
              },
              Precondition: {
                oneofs: {
                  conditionType: {
                    oneof: [
                      "exists",
                      "updateTime"
                    ]
                  }
                },
                fields: {
                  exists: {
                    type: "bool",
                    id: 1
                  },
                  updateTime: {
                    type: "google.protobuf.Timestamp",
                    id: 2
                  }
                }
              },
              TransactionOptions: {
                oneofs: {
                  mode: {
                    oneof: [
                      "readOnly",
                      "readWrite"
                    ]
                  }
                },
                fields: {
                  readOnly: {
                    type: "ReadOnly",
                    id: 2
                  },
                  readWrite: {
                    type: "ReadWrite",
                    id: 3
                  }
                },
                nested: {
                  ReadWrite: {
                    fields: {
                      retryTransaction: {
                        type: "bytes",
                        id: 1
                      }
                    }
                  },
                  ReadOnly: {
                    oneofs: {
                      consistencySelector: {
                        oneof: [
                          "readTime"
                        ]
                      }
                    },
                    fields: {
                      readTime: {
                        type: "google.protobuf.Timestamp",
                        id: 2
                      }
                    }
                  }
                }
              },
              Document: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  fields: {
                    keyType: "string",
                    type: "Value",
                    id: 2
                  },
                  createTime: {
                    type: "google.protobuf.Timestamp",
                    id: 3
                  },
                  updateTime: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  }
                }
              },
              Value: {
                oneofs: {
                  valueType: {
                    oneof: [
                      "nullValue",
                      "booleanValue",
                      "integerValue",
                      "doubleValue",
                      "timestampValue",
                      "stringValue",
                      "bytesValue",
                      "referenceValue",
                      "geoPointValue",
                      "arrayValue",
                      "mapValue"
                    ]
                  }
                },
                fields: {
                  nullValue: {
                    type: "google.protobuf.NullValue",
                    id: 11
                  },
                  booleanValue: {
                    type: "bool",
                    id: 1
                  },
                  integerValue: {
                    type: "int64",
                    id: 2
                  },
                  doubleValue: {
                    type: "double",
                    id: 3
                  },
                  timestampValue: {
                    type: "google.protobuf.Timestamp",
                    id: 10
                  },
                  stringValue: {
                    type: "string",
                    id: 17
                  },
                  bytesValue: {
                    type: "bytes",
                    id: 18
                  },
                  referenceValue: {
                    type: "string",
                    id: 5
                  },
                  geoPointValue: {
                    type: "google.type.LatLng",
                    id: 8
                  },
                  arrayValue: {
                    type: "ArrayValue",
                    id: 9
                  },
                  mapValue: {
                    type: "MapValue",
                    id: 6
                  }
                }
              },
              ArrayValue: {
                fields: {
                  values: {
                    rule: "repeated",
                    type: "Value",
                    id: 1
                  }
                }
              },
              MapValue: {
                fields: {
                  fields: {
                    keyType: "string",
                    type: "Value",
                    id: 1
                  }
                }
              },
              Firestore: {
                options: {
                  "(google.api.default_host)": "firestore.googleapis.com",
                  "(google.api.oauth_scopes)": "https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/datastore"
                },
                methods: {
                  GetDocument: {
                    requestType: "GetDocumentRequest",
                    responseType: "Document",
                    options: {
                      "(google.api.http).get": "/v1/{name=projects/*/databases/*/documents/*/**}"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          get: "/v1/{name=projects/*/databases/*/documents/*/**}"
                        }
                      }
                    ]
                  },
                  ListDocuments: {
                    requestType: "ListDocumentsRequest",
                    responseType: "ListDocumentsResponse",
                    options: {
                      "(google.api.http).get": "/v1/{parent=projects/*/databases/*/documents/*/**}/{collection_id}"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          get: "/v1/{parent=projects/*/databases/*/documents/*/**}/{collection_id}"
                        }
                      }
                    ]
                  },
                  UpdateDocument: {
                    requestType: "UpdateDocumentRequest",
                    responseType: "Document",
                    options: {
                      "(google.api.http).patch": "/v1/{document.name=projects/*/databases/*/documents/*/**}",
                      "(google.api.http).body": "document",
                      "(google.api.method_signature)": "document,update_mask"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          patch: "/v1/{document.name=projects/*/databases/*/documents/*/**}",
                          body: "document"
                        }
                      },
                      {
                        "(google.api.method_signature)": "document,update_mask"
                      }
                    ]
                  },
                  DeleteDocument: {
                    requestType: "DeleteDocumentRequest",
                    responseType: "google.protobuf.Empty",
                    options: {
                      "(google.api.http).delete": "/v1/{name=projects/*/databases/*/documents/*/**}",
                      "(google.api.method_signature)": "name"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          "delete": "/v1/{name=projects/*/databases/*/documents/*/**}"
                        }
                      },
                      {
                        "(google.api.method_signature)": "name"
                      }
                    ]
                  },
                  BatchGetDocuments: {
                    requestType: "BatchGetDocumentsRequest",
                    responseType: "BatchGetDocumentsResponse",
                    responseStream: true,
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:batchGet",
                      "(google.api.http).body": "*"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{database=projects/*/databases/*}/documents:batchGet",
                          body: "*"
                        }
                      }
                    ]
                  },
                  BeginTransaction: {
                    requestType: "BeginTransactionRequest",
                    responseType: "BeginTransactionResponse",
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:beginTransaction",
                      "(google.api.http).body": "*",
                      "(google.api.method_signature)": "database"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{database=projects/*/databases/*}/documents:beginTransaction",
                          body: "*"
                        }
                      },
                      {
                        "(google.api.method_signature)": "database"
                      }
                    ]
                  },
                  Commit: {
                    requestType: "CommitRequest",
                    responseType: "CommitResponse",
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:commit",
                      "(google.api.http).body": "*",
                      "(google.api.method_signature)": "database,writes"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{database=projects/*/databases/*}/documents:commit",
                          body: "*"
                        }
                      },
                      {
                        "(google.api.method_signature)": "database,writes"
                      }
                    ]
                  },
                  Rollback: {
                    requestType: "RollbackRequest",
                    responseType: "google.protobuf.Empty",
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:rollback",
                      "(google.api.http).body": "*",
                      "(google.api.method_signature)": "database,transaction"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{database=projects/*/databases/*}/documents:rollback",
                          body: "*"
                        }
                      },
                      {
                        "(google.api.method_signature)": "database,transaction"
                      }
                    ]
                  },
                  RunQuery: {
                    requestType: "RunQueryRequest",
                    responseType: "RunQueryResponse",
                    responseStream: true,
                    options: {
                      "(google.api.http).post": "/v1/{parent=projects/*/databases/*/documents}:runQuery",
                      "(google.api.http).body": "*",
                      "(google.api.http).additional_bindings.post": "/v1/{parent=projects/*/databases/*/documents/*/**}:runQuery",
                      "(google.api.http).additional_bindings.body": "*"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{parent=projects/*/databases/*/documents}:runQuery",
                          body: "*",
                          additional_bindings: {
                            post: "/v1/{parent=projects/*/databases/*/documents/*/**}:runQuery",
                            body: "*"
                          }
                        }
                      }
                    ]
                  },
                  RunAggregationQuery: {
                    requestType: "RunAggregationQueryRequest",
                    responseType: "RunAggregationQueryResponse",
                    responseStream: true,
                    options: {
                      "(google.api.http).post": "/v1/{parent=projects/*/databases/*/documents}:runAggregationQuery",
                      "(google.api.http).body": "*",
                      "(google.api.http).additional_bindings.post": "/v1/{parent=projects/*/databases/*/documents/*/**}:runAggregationQuery",
                      "(google.api.http).additional_bindings.body": "*"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{parent=projects/*/databases/*/documents}:runAggregationQuery",
                          body: "*",
                          additional_bindings: {
                            post: "/v1/{parent=projects/*/databases/*/documents/*/**}:runAggregationQuery",
                            body: "*"
                          }
                        }
                      }
                    ]
                  },
                  PartitionQuery: {
                    requestType: "PartitionQueryRequest",
                    responseType: "PartitionQueryResponse",
                    options: {
                      "(google.api.http).post": "/v1/{parent=projects/*/databases/*/documents}:partitionQuery",
                      "(google.api.http).body": "*",
                      "(google.api.http).additional_bindings.post": "/v1/{parent=projects/*/databases/*/documents/*/**}:partitionQuery",
                      "(google.api.http).additional_bindings.body": "*"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{parent=projects/*/databases/*/documents}:partitionQuery",
                          body: "*",
                          additional_bindings: {
                            post: "/v1/{parent=projects/*/databases/*/documents/*/**}:partitionQuery",
                            body: "*"
                          }
                        }
                      }
                    ]
                  },
                  Write: {
                    requestType: "WriteRequest",
                    requestStream: true,
                    responseType: "WriteResponse",
                    responseStream: true,
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:write",
                      "(google.api.http).body": "*"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{database=projects/*/databases/*}/documents:write",
                          body: "*"
                        }
                      }
                    ]
                  },
                  Listen: {
                    requestType: "ListenRequest",
                    requestStream: true,
                    responseType: "ListenResponse",
                    responseStream: true,
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:listen",
                      "(google.api.http).body": "*"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{database=projects/*/databases/*}/documents:listen",
                          body: "*"
                        }
                      }
                    ]
                  },
                  ListCollectionIds: {
                    requestType: "ListCollectionIdsRequest",
                    responseType: "ListCollectionIdsResponse",
                    options: {
                      "(google.api.http).post": "/v1/{parent=projects/*/databases/*/documents}:listCollectionIds",
                      "(google.api.http).body": "*",
                      "(google.api.http).additional_bindings.post": "/v1/{parent=projects/*/databases/*/documents/*/**}:listCollectionIds",
                      "(google.api.http).additional_bindings.body": "*",
                      "(google.api.method_signature)": "parent"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{parent=projects/*/databases/*/documents}:listCollectionIds",
                          body: "*",
                          additional_bindings: {
                            post: "/v1/{parent=projects/*/databases/*/documents/*/**}:listCollectionIds",
                            body: "*"
                          }
                        }
                      },
                      {
                        "(google.api.method_signature)": "parent"
                      }
                    ]
                  },
                  BatchWrite: {
                    requestType: "BatchWriteRequest",
                    responseType: "BatchWriteResponse",
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:batchWrite",
                      "(google.api.http).body": "*"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{database=projects/*/databases/*}/documents:batchWrite",
                          body: "*"
                        }
                      }
                    ]
                  },
                  CreateDocument: {
                    requestType: "CreateDocumentRequest",
                    responseType: "Document",
                    options: {
                      "(google.api.http).post": "/v1/{parent=projects/*/databases/*/documents/**}/{collection_id}",
                      "(google.api.http).body": "document"
                    },
                    parsedOptions: [
                      {
                        "(google.api.http)": {
                          post: "/v1/{parent=projects/*/databases/*/documents/**}/{collection_id}",
                          body: "document"
                        }
                      }
                    ]
                  }
                }
              },
              GetDocumentRequest: {
                oneofs: {
                  consistencySelector: {
                    oneof: [
                      "transaction",
                      "readTime"
                    ]
                  }
                },
                fields: {
                  name: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  mask: {
                    type: "DocumentMask",
                    id: 2
                  },
                  transaction: {
                    type: "bytes",
                    id: 3
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 5
                  }
                }
              },
              ListDocumentsRequest: {
                oneofs: {
                  consistencySelector: {
                    oneof: [
                      "transaction",
                      "readTime"
                    ]
                  }
                },
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  collectionId: {
                    type: "string",
                    id: 2,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  pageSize: {
                    type: "int32",
                    id: 3
                  },
                  pageToken: {
                    type: "string",
                    id: 4
                  },
                  orderBy: {
                    type: "string",
                    id: 6
                  },
                  mask: {
                    type: "DocumentMask",
                    id: 7
                  },
                  transaction: {
                    type: "bytes",
                    id: 8
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 10
                  },
                  showMissing: {
                    type: "bool",
                    id: 12
                  }
                }
              },
              ListDocumentsResponse: {
                fields: {
                  documents: {
                    rule: "repeated",
                    type: "Document",
                    id: 1
                  },
                  nextPageToken: {
                    type: "string",
                    id: 2
                  }
                }
              },
              CreateDocumentRequest: {
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  collectionId: {
                    type: "string",
                    id: 2,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  documentId: {
                    type: "string",
                    id: 3
                  },
                  document: {
                    type: "Document",
                    id: 4,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  mask: {
                    type: "DocumentMask",
                    id: 5
                  }
                }
              },
              UpdateDocumentRequest: {
                fields: {
                  document: {
                    type: "Document",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  updateMask: {
                    type: "DocumentMask",
                    id: 2
                  },
                  mask: {
                    type: "DocumentMask",
                    id: 3
                  },
                  currentDocument: {
                    type: "Precondition",
                    id: 4
                  }
                }
              },
              DeleteDocumentRequest: {
                fields: {
                  name: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  currentDocument: {
                    type: "Precondition",
                    id: 2
                  }
                }
              },
              BatchGetDocumentsRequest: {
                oneofs: {
                  consistencySelector: {
                    oneof: [
                      "transaction",
                      "newTransaction",
                      "readTime"
                    ]
                  }
                },
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  documents: {
                    rule: "repeated",
                    type: "string",
                    id: 2
                  },
                  mask: {
                    type: "DocumentMask",
                    id: 3
                  },
                  transaction: {
                    type: "bytes",
                    id: 4
                  },
                  newTransaction: {
                    type: "TransactionOptions",
                    id: 5
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 7
                  }
                }
              },
              BatchGetDocumentsResponse: {
                oneofs: {
                  result: {
                    oneof: [
                      "found",
                      "missing"
                    ]
                  }
                },
                fields: {
                  found: {
                    type: "Document",
                    id: 1
                  },
                  missing: {
                    type: "string",
                    id: 2
                  },
                  transaction: {
                    type: "bytes",
                    id: 3
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  }
                }
              },
              BeginTransactionRequest: {
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  options: {
                    type: "TransactionOptions",
                    id: 2
                  }
                }
              },
              BeginTransactionResponse: {
                fields: {
                  transaction: {
                    type: "bytes",
                    id: 1
                  }
                }
              },
              CommitRequest: {
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  writes: {
                    rule: "repeated",
                    type: "Write",
                    id: 2
                  },
                  transaction: {
                    type: "bytes",
                    id: 3
                  }
                }
              },
              CommitResponse: {
                fields: {
                  writeResults: {
                    rule: "repeated",
                    type: "WriteResult",
                    id: 1
                  },
                  commitTime: {
                    type: "google.protobuf.Timestamp",
                    id: 2
                  }
                }
              },
              RollbackRequest: {
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  transaction: {
                    type: "bytes",
                    id: 2,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  }
                }
              },
              RunQueryRequest: {
                oneofs: {
                  queryType: {
                    oneof: [
                      "structuredQuery"
                    ]
                  },
                  consistencySelector: {
                    oneof: [
                      "transaction",
                      "newTransaction",
                      "readTime"
                    ]
                  }
                },
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  structuredQuery: {
                    type: "StructuredQuery",
                    id: 2
                  },
                  transaction: {
                    type: "bytes",
                    id: 5
                  },
                  newTransaction: {
                    type: "TransactionOptions",
                    id: 6
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 7
                  }
                }
              },
              RunQueryResponse: {
                fields: {
                  transaction: {
                    type: "bytes",
                    id: 2
                  },
                  document: {
                    type: "Document",
                    id: 1
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 3
                  },
                  skippedResults: {
                    type: "int32",
                    id: 4
                  }
                }
              },
              RunAggregationQueryRequest: {
                oneofs: {
                  queryType: {
                    oneof: [
                      "structuredAggregationQuery"
                    ]
                  },
                  consistencySelector: {
                    oneof: [
                      "transaction",
                      "newTransaction",
                      "readTime"
                    ]
                  }
                },
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  structuredAggregationQuery: {
                    type: "StructuredAggregationQuery",
                    id: 2
                  },
                  transaction: {
                    type: "bytes",
                    id: 4
                  },
                  newTransaction: {
                    type: "TransactionOptions",
                    id: 5
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 6
                  }
                }
              },
              RunAggregationQueryResponse: {
                fields: {
                  result: {
                    type: "AggregationResult",
                    id: 1
                  },
                  transaction: {
                    type: "bytes",
                    id: 2
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 3
                  }
                }
              },
              PartitionQueryRequest: {
                oneofs: {
                  queryType: {
                    oneof: [
                      "structuredQuery"
                    ]
                  }
                },
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  structuredQuery: {
                    type: "StructuredQuery",
                    id: 2
                  },
                  partitionCount: {
                    type: "int64",
                    id: 3
                  },
                  pageToken: {
                    type: "string",
                    id: 4
                  },
                  pageSize: {
                    type: "int32",
                    id: 5
                  }
                }
              },
              PartitionQueryResponse: {
                fields: {
                  partitions: {
                    rule: "repeated",
                    type: "Cursor",
                    id: 1
                  },
                  nextPageToken: {
                    type: "string",
                    id: 2
                  }
                }
              },
              WriteRequest: {
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  streamId: {
                    type: "string",
                    id: 2
                  },
                  writes: {
                    rule: "repeated",
                    type: "Write",
                    id: 3
                  },
                  streamToken: {
                    type: "bytes",
                    id: 4
                  },
                  labels: {
                    keyType: "string",
                    type: "string",
                    id: 5
                  }
                }
              },
              WriteResponse: {
                fields: {
                  streamId: {
                    type: "string",
                    id: 1
                  },
                  streamToken: {
                    type: "bytes",
                    id: 2
                  },
                  writeResults: {
                    rule: "repeated",
                    type: "WriteResult",
                    id: 3
                  },
                  commitTime: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  }
                }
              },
              ListenRequest: {
                oneofs: {
                  targetChange: {
                    oneof: [
                      "addTarget",
                      "removeTarget"
                    ]
                  }
                },
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  addTarget: {
                    type: "Target",
                    id: 2
                  },
                  removeTarget: {
                    type: "int32",
                    id: 3
                  },
                  labels: {
                    keyType: "string",
                    type: "string",
                    id: 4
                  }
                }
              },
              ListenResponse: {
                oneofs: {
                  responseType: {
                    oneof: [
                      "targetChange",
                      "documentChange",
                      "documentDelete",
                      "documentRemove",
                      "filter"
                    ]
                  }
                },
                fields: {
                  targetChange: {
                    type: "TargetChange",
                    id: 2
                  },
                  documentChange: {
                    type: "DocumentChange",
                    id: 3
                  },
                  documentDelete: {
                    type: "DocumentDelete",
                    id: 4
                  },
                  documentRemove: {
                    type: "DocumentRemove",
                    id: 6
                  },
                  filter: {
                    type: "ExistenceFilter",
                    id: 5
                  }
                }
              },
              Target: {
                oneofs: {
                  targetType: {
                    oneof: [
                      "query",
                      "documents"
                    ]
                  },
                  resumeType: {
                    oneof: [
                      "resumeToken",
                      "readTime"
                    ]
                  }
                },
                fields: {
                  query: {
                    type: "QueryTarget",
                    id: 2
                  },
                  documents: {
                    type: "DocumentsTarget",
                    id: 3
                  },
                  resumeToken: {
                    type: "bytes",
                    id: 4
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 11
                  },
                  targetId: {
                    type: "int32",
                    id: 5
                  },
                  once: {
                    type: "bool",
                    id: 6
                  },
                  expectedCount: {
                    type: "google.protobuf.Int32Value",
                    id: 12
                  }
                },
                nested: {
                  DocumentsTarget: {
                    fields: {
                      documents: {
                        rule: "repeated",
                        type: "string",
                        id: 2
                      }
                    }
                  },
                  QueryTarget: {
                    oneofs: {
                      queryType: {
                        oneof: [
                          "structuredQuery"
                        ]
                      }
                    },
                    fields: {
                      parent: {
                        type: "string",
                        id: 1
                      },
                      structuredQuery: {
                        type: "StructuredQuery",
                        id: 2
                      }
                    }
                  }
                }
              },
              TargetChange: {
                fields: {
                  targetChangeType: {
                    type: "TargetChangeType",
                    id: 1
                  },
                  targetIds: {
                    rule: "repeated",
                    type: "int32",
                    id: 2
                  },
                  cause: {
                    type: "google.rpc.Status",
                    id: 3
                  },
                  resumeToken: {
                    type: "bytes",
                    id: 4
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 6
                  }
                },
                nested: {
                  TargetChangeType: {
                    values: {
                      NO_CHANGE: 0,
                      ADD: 1,
                      REMOVE: 2,
                      CURRENT: 3,
                      RESET: 4
                    }
                  }
                }
              },
              ListCollectionIdsRequest: {
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  pageSize: {
                    type: "int32",
                    id: 2
                  },
                  pageToken: {
                    type: "string",
                    id: 3
                  }
                }
              },
              ListCollectionIdsResponse: {
                fields: {
                  collectionIds: {
                    rule: "repeated",
                    type: "string",
                    id: 1
                  },
                  nextPageToken: {
                    type: "string",
                    id: 2
                  }
                }
              },
              BatchWriteRequest: {
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  writes: {
                    rule: "repeated",
                    type: "Write",
                    id: 2
                  },
                  labels: {
                    keyType: "string",
                    type: "string",
                    id: 3
                  }
                }
              },
              BatchWriteResponse: {
                fields: {
                  writeResults: {
                    rule: "repeated",
                    type: "WriteResult",
                    id: 1
                  },
                  status: {
                    rule: "repeated",
                    type: "google.rpc.Status",
                    id: 2
                  }
                }
              },
              StructuredQuery: {
                fields: {
                  select: {
                    type: "Projection",
                    id: 1
                  },
                  from: {
                    rule: "repeated",
                    type: "CollectionSelector",
                    id: 2
                  },
                  where: {
                    type: "Filter",
                    id: 3
                  },
                  orderBy: {
                    rule: "repeated",
                    type: "Order",
                    id: 4
                  },
                  startAt: {
                    type: "Cursor",
                    id: 7
                  },
                  endAt: {
                    type: "Cursor",
                    id: 8
                  },
                  offset: {
                    type: "int32",
                    id: 6
                  },
                  limit: {
                    type: "google.protobuf.Int32Value",
                    id: 5
                  }
                },
                nested: {
                  CollectionSelector: {
                    fields: {
                      collectionId: {
                        type: "string",
                        id: 2
                      },
                      allDescendants: {
                        type: "bool",
                        id: 3
                      }
                    }
                  },
                  Filter: {
                    oneofs: {
                      filterType: {
                        oneof: [
                          "compositeFilter",
                          "fieldFilter",
                          "unaryFilter"
                        ]
                      }
                    },
                    fields: {
                      compositeFilter: {
                        type: "CompositeFilter",
                        id: 1
                      },
                      fieldFilter: {
                        type: "FieldFilter",
                        id: 2
                      },
                      unaryFilter: {
                        type: "UnaryFilter",
                        id: 3
                      }
                    }
                  },
                  CompositeFilter: {
                    fields: {
                      op: {
                        type: "Operator",
                        id: 1
                      },
                      filters: {
                        rule: "repeated",
                        type: "Filter",
                        id: 2
                      }
                    },
                    nested: {
                      Operator: {
                        values: {
                          OPERATOR_UNSPECIFIED: 0,
                          AND: 1,
                          OR: 2
                        }
                      }
                    }
                  },
                  FieldFilter: {
                    fields: {
                      field: {
                        type: "FieldReference",
                        id: 1
                      },
                      op: {
                        type: "Operator",
                        id: 2
                      },
                      value: {
                        type: "Value",
                        id: 3
                      }
                    },
                    nested: {
                      Operator: {
                        values: {
                          OPERATOR_UNSPECIFIED: 0,
                          LESS_THAN: 1,
                          LESS_THAN_OR_EQUAL: 2,
                          GREATER_THAN: 3,
                          GREATER_THAN_OR_EQUAL: 4,
                          EQUAL: 5,
                          NOT_EQUAL: 6,
                          ARRAY_CONTAINS: 7,
                          IN: 8,
                          ARRAY_CONTAINS_ANY: 9,
                          NOT_IN: 10
                        }
                      }
                    }
                  },
                  UnaryFilter: {
                    oneofs: {
                      operandType: {
                        oneof: [
                          "field"
                        ]
                      }
                    },
                    fields: {
                      op: {
                        type: "Operator",
                        id: 1
                      },
                      field: {
                        type: "FieldReference",
                        id: 2
                      }
                    },
                    nested: {
                      Operator: {
                        values: {
                          OPERATOR_UNSPECIFIED: 0,
                          IS_NAN: 2,
                          IS_NULL: 3,
                          IS_NOT_NAN: 4,
                          IS_NOT_NULL: 5
                        }
                      }
                    }
                  },
                  Order: {
                    fields: {
                      field: {
                        type: "FieldReference",
                        id: 1
                      },
                      direction: {
                        type: "Direction",
                        id: 2
                      }
                    }
                  },
                  FieldReference: {
                    fields: {
                      fieldPath: {
                        type: "string",
                        id: 2
                      }
                    }
                  },
                  Projection: {
                    fields: {
                      fields: {
                        rule: "repeated",
                        type: "FieldReference",
                        id: 2
                      }
                    }
                  },
                  Direction: {
                    values: {
                      DIRECTION_UNSPECIFIED: 0,
                      ASCENDING: 1,
                      DESCENDING: 2
                    }
                  }
                }
              },
              StructuredAggregationQuery: {
                oneofs: {
                  queryType: {
                    oneof: [
                      "structuredQuery"
                    ]
                  }
                },
                fields: {
                  structuredQuery: {
                    type: "StructuredQuery",
                    id: 1
                  },
                  aggregations: {
                    rule: "repeated",
                    type: "Aggregation",
                    id: 3
                  }
                },
                nested: {
                  Aggregation: {
                    oneofs: {
                      operator: {
                        oneof: [
                          "count",
                          "sum",
                          "avg"
                        ]
                      }
                    },
                    fields: {
                      count: {
                        type: "Count",
                        id: 1
                      },
                      sum: {
                        type: "Sum",
                        id: 2
                      },
                      avg: {
                        type: "Avg",
                        id: 3
                      },
                      alias: {
                        type: "string",
                        id: 7
                      }
                    },
                    nested: {
                      Count: {
                        fields: {
                          upTo: {
                            type: "google.protobuf.Int64Value",
                            id: 1
                          }
                        }
                      },
                      Sum: {
                        fields: {
                          field: {
                            type: "FieldReference",
                            id: 1
                          }
                        }
                      },
                      Avg: {
                        fields: {
                          field: {
                            type: "FieldReference",
                            id: 1
                          }
                        }
                      }
                    }
                  }
                }
              },
              Cursor: {
                fields: {
                  values: {
                    rule: "repeated",
                    type: "Value",
                    id: 1
                  },
                  before: {
                    type: "bool",
                    id: 2
                  }
                }
              },
              Write: {
                oneofs: {
                  operation: {
                    oneof: [
                      "update",
                      "delete",
                      "verify",
                      "transform"
                    ]
                  }
                },
                fields: {
                  update: {
                    type: "Document",
                    id: 1
                  },
                  "delete": {
                    type: "string",
                    id: 2
                  },
                  verify: {
                    type: "string",
                    id: 5
                  },
                  transform: {
                    type: "DocumentTransform",
                    id: 6
                  },
                  updateMask: {
                    type: "DocumentMask",
                    id: 3
                  },
                  updateTransforms: {
                    rule: "repeated",
                    type: "DocumentTransform.FieldTransform",
                    id: 7
                  },
                  currentDocument: {
                    type: "Precondition",
                    id: 4
                  }
                }
              },
              DocumentTransform: {
                fields: {
                  document: {
                    type: "string",
                    id: 1
                  },
                  fieldTransforms: {
                    rule: "repeated",
                    type: "FieldTransform",
                    id: 2
                  }
                },
                nested: {
                  FieldTransform: {
                    oneofs: {
                      transformType: {
                        oneof: [
                          "setToServerValue",
                          "increment",
                          "maximum",
                          "minimum",
                          "appendMissingElements",
                          "removeAllFromArray"
                        ]
                      }
                    },
                    fields: {
                      fieldPath: {
                        type: "string",
                        id: 1
                      },
                      setToServerValue: {
                        type: "ServerValue",
                        id: 2
                      },
                      increment: {
                        type: "Value",
                        id: 3
                      },
                      maximum: {
                        type: "Value",
                        id: 4
                      },
                      minimum: {
                        type: "Value",
                        id: 5
                      },
                      appendMissingElements: {
                        type: "ArrayValue",
                        id: 6
                      },
                      removeAllFromArray: {
                        type: "ArrayValue",
                        id: 7
                      }
                    },
                    nested: {
                      ServerValue: {
                        values: {
                          SERVER_VALUE_UNSPECIFIED: 0,
                          REQUEST_TIME: 1
                        }
                      }
                    }
                  }
                }
              },
              WriteResult: {
                fields: {
                  updateTime: {
                    type: "google.protobuf.Timestamp",
                    id: 1
                  },
                  transformResults: {
                    rule: "repeated",
                    type: "Value",
                    id: 2
                  }
                }
              },
              DocumentChange: {
                fields: {
                  document: {
                    type: "Document",
                    id: 1
                  },
                  targetIds: {
                    rule: "repeated",
                    type: "int32",
                    id: 5
                  },
                  removedTargetIds: {
                    rule: "repeated",
                    type: "int32",
                    id: 6
                  }
                }
              },
              DocumentDelete: {
                fields: {
                  document: {
                    type: "string",
                    id: 1
                  },
                  removedTargetIds: {
                    rule: "repeated",
                    type: "int32",
                    id: 6
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  }
                }
              },
              DocumentRemove: {
                fields: {
                  document: {
                    type: "string",
                    id: 1
                  },
                  removedTargetIds: {
                    rule: "repeated",
                    type: "int32",
                    id: 2
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  }
                }
              },
              ExistenceFilter: {
                fields: {
                  targetId: {
                    type: "int32",
                    id: 1
                  },
                  count: {
                    type: "int32",
                    id: 2
                  },
                  unchangedNames: {
                    type: "BloomFilter",
                    id: 3
                  }
                }
              }
            }
          }
        }
      },
      api: {
        options: {
          go_package: "google.golang.org/genproto/googleapis/api/annotations;annotations",
          java_multiple_files: true,
          java_outer_classname: "HttpProto",
          java_package: "com.google.api",
          objc_class_prefix: "GAPI",
          cc_enable_arenas: true
        },
        nested: {
          http: {
            type: "HttpRule",
            id: 72295728,
            extend: "google.protobuf.MethodOptions"
          },
          Http: {
            fields: {
              rules: {
                rule: "repeated",
                type: "HttpRule",
                id: 1
              }
            }
          },
          HttpRule: {
            oneofs: {
              pattern: {
                oneof: [
                  "get",
                  "put",
                  "post",
                  "delete",
                  "patch",
                  "custom"
                ]
              }
            },
            fields: {
              get: {
                type: "string",
                id: 2
              },
              put: {
                type: "string",
                id: 3
              },
              post: {
                type: "string",
                id: 4
              },
              "delete": {
                type: "string",
                id: 5
              },
              patch: {
                type: "string",
                id: 6
              },
              custom: {
                type: "CustomHttpPattern",
                id: 8
              },
              selector: {
                type: "string",
                id: 1
              },
              body: {
                type: "string",
                id: 7
              },
              additionalBindings: {
                rule: "repeated",
                type: "HttpRule",
                id: 11
              }
            }
          },
          CustomHttpPattern: {
            fields: {
              kind: {
                type: "string",
                id: 1
              },
              path: {
                type: "string",
                id: 2
              }
            }
          },
          methodSignature: {
            rule: "repeated",
            type: "string",
            id: 1051,
            extend: "google.protobuf.MethodOptions"
          },
          defaultHost: {
            type: "string",
            id: 1049,
            extend: "google.protobuf.ServiceOptions"
          },
          oauthScopes: {
            type: "string",
            id: 1050,
            extend: "google.protobuf.ServiceOptions"
          },
          fieldBehavior: {
            rule: "repeated",
            type: "google.api.FieldBehavior",
            id: 1052,
            extend: "google.protobuf.FieldOptions"
          },
          FieldBehavior: {
            values: {
              FIELD_BEHAVIOR_UNSPECIFIED: 0,
              OPTIONAL: 1,
              REQUIRED: 2,
              OUTPUT_ONLY: 3,
              INPUT_ONLY: 4,
              IMMUTABLE: 5,
              UNORDERED_LIST: 6,
              NON_EMPTY_DEFAULT: 7
            }
          }
        }
      },
      type: {
        options: {
          cc_enable_arenas: true,
          go_package: "google.golang.org/genproto/googleapis/type/latlng;latlng",
          java_multiple_files: true,
          java_outer_classname: "LatLngProto",
          java_package: "com.google.type",
          objc_class_prefix: "GTP"
        },
        nested: {
          LatLng: {
            fields: {
              latitude: {
                type: "double",
                id: 1
              },
              longitude: {
                type: "double",
                id: 2
              }
            }
          }
        }
      },
      rpc: {
        options: {
          cc_enable_arenas: true,
          go_package: "google.golang.org/genproto/googleapis/rpc/status;status",
          java_multiple_files: true,
          java_outer_classname: "StatusProto",
          java_package: "com.google.rpc",
          objc_class_prefix: "RPC"
        },
        nested: {
          Status: {
            fields: {
              code: {
                type: "int32",
                id: 1
              },
              message: {
                type: "string",
                id: 2
              },
              details: {
                rule: "repeated",
                type: "google.protobuf.Any",
                id: 3
              }
            }
          }
        }
      }
    }
  }
};
var protos = {
  nested
};
var protos$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  nested,
  "default": protos
});
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const protoLoaderOptions = {
  longs: String,
  enums: String,
  defaults: true,
  oneofs: false
};
function loadProtos() {
  const packageDefinition = protoLoader.fromJSON(protos$1, protoLoaderOptions);
  return grpc.loadPackageDefinition(packageDefinition);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function newConnection(databaseInfo) {
  const protos2 = loadProtos();
  return new GrpcConnection(protos2, databaseInfo);
}
function newConnectivityMonitor() {
  return new NoopConnectivityMonitor();
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function newSerializer(databaseId) {
  return new JsonProtoSerializer(
    databaseId,
    /* useProto3Json= */
    false
  );
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_TAG$8 = "ExponentialBackoff";
const DEFAULT_BACKOFF_INITIAL_DELAY_MS = 1e3;
const DEFAULT_BACKOFF_FACTOR = 1.5;
const DEFAULT_BACKOFF_MAX_DELAY_MS = 60 * 1e3;
class ExponentialBackoff {
  constructor(queue, timerId, initialDelayMs = DEFAULT_BACKOFF_INITIAL_DELAY_MS, backoffFactor = DEFAULT_BACKOFF_FACTOR, maxDelayMs = DEFAULT_BACKOFF_MAX_DELAY_MS) {
    this.queue = queue;
    this.timerId = timerId;
    this.initialDelayMs = initialDelayMs;
    this.backoffFactor = backoffFactor;
    this.maxDelayMs = maxDelayMs;
    this.currentBaseMs = 0;
    this.timerPromise = null;
    this.lastAttemptTime = Date.now();
    this.reset();
  }
  /**
   * Resets the backoff delay.
   *
   * The very next backoffAndWait() will have no delay. If it is called again
   * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
   * subsequent ones will increase according to the backoffFactor.
   */
  reset() {
    this.currentBaseMs = 0;
  }
  /**
   * Resets the backoff delay to the maximum delay (e.g. for use after a
   * RESOURCE_EXHAUSTED error).
   */
  resetToMax() {
    this.currentBaseMs = this.maxDelayMs;
  }
  /**
   * Returns a promise that resolves after currentDelayMs, and increases the
   * delay for any subsequent attempts. If there was a pending backoff operation
   * already, it will be canceled.
   */
  backoffAndRun(op) {
    this.cancel();
    const desiredDelayWithJitterMs = Math.floor(this.currentBaseMs + this.jitterDelayMs());
    const delaySoFarMs = Math.max(0, Date.now() - this.lastAttemptTime);
    const remainingDelayMs = Math.max(0, desiredDelayWithJitterMs - delaySoFarMs);
    if (remainingDelayMs > 0) {
      logDebug(LOG_TAG$8, `Backing off for ${remainingDelayMs} ms (base delay: ${this.currentBaseMs} ms, delay with jitter: ${desiredDelayWithJitterMs} ms, last attempt: ${delaySoFarMs} ms ago)`);
    }
    this.timerPromise = this.queue.enqueueAfterDelay(this.timerId, remainingDelayMs, () => {
      this.lastAttemptTime = Date.now();
      return op();
    });
    this.currentBaseMs *= this.backoffFactor;
    if (this.currentBaseMs < this.initialDelayMs) {
      this.currentBaseMs = this.initialDelayMs;
    }
    if (this.currentBaseMs > this.maxDelayMs) {
      this.currentBaseMs = this.maxDelayMs;
    }
  }
  skipBackoff() {
    if (this.timerPromise !== null) {
      this.timerPromise.skipDelay();
      this.timerPromise = null;
    }
  }
  cancel() {
    if (this.timerPromise !== null) {
      this.timerPromise.cancel();
      this.timerPromise = null;
    }
  }
  /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */
  jitterDelayMs() {
    return (Math.random() - 0.5) * this.currentBaseMs;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_TAG$7 = "PersistentStream";
const IDLE_TIMEOUT_MS = 60 * 1e3;
const HEALTHY_TIMEOUT_MS = 10 * 1e3;
class PersistentStream {
  constructor(queue, connectionTimerId, idleTimerId, healthTimerId, connection, authCredentialsProvider, appCheckCredentialsProvider, listener) {
    this.queue = queue;
    this.idleTimerId = idleTimerId;
    this.healthTimerId = healthTimerId;
    this.connection = connection;
    this.authCredentialsProvider = authCredentialsProvider;
    this.appCheckCredentialsProvider = appCheckCredentialsProvider;
    this.listener = listener;
    this.state = 0;
    this.closeCount = 0;
    this.idleTimer = null;
    this.healthCheck = null;
    this.stream = null;
    this.backoff = new ExponentialBackoff(queue, connectionTimerId);
  }
  /**
   * Returns true if start() has been called and no error has occurred. True
   * indicates the stream is open or in the process of opening (which
   * encompasses respecting backoff, getting auth tokens, and starting the
   * actual RPC). Use isOpen() to determine if the stream is open and ready for
   * outbound requests.
   */
  isStarted() {
    return this.state === 1 || this.state === 5 || this.isOpen();
  }
  /**
   * Returns true if the underlying RPC is open (the onOpen() listener has been
   * called) and the stream is ready for outbound requests.
   */
  isOpen() {
    return this.state === 2 || this.state === 3;
  }
  /**
   * Starts the RPC. Only allowed if isStarted() returns false. The stream is
   * not immediately ready for use: onOpen() will be invoked when the RPC is
   * ready for outbound requests, at which point isOpen() will return true.
   *
   * When start returns, isStarted() will return true.
   */
  start() {
    if (this.state === 4) {
      this.performBackoff();
      return;
    }
    this.auth();
  }
  /**
   * Stops the RPC. This call is idempotent and allowed regardless of the
   * current isStarted() state.
   *
   * When stop returns, isStarted() and isOpen() will both return false.
   */
  async stop() {
    if (this.isStarted()) {
      await this.close(
        0
        /* PersistentStreamState.Initial */
      );
    }
  }
  /**
   * After an error the stream will usually back off on the next attempt to
   * start it. If the error warrants an immediate restart of the stream, the
   * sender can use this to indicate that the receiver should not back off.
   *
   * Each error will call the onClose() listener. That function can decide to
   * inhibit backoff if required.
   */
  inhibitBackoff() {
    this.state = 0;
    this.backoff.reset();
  }
  /**
   * Marks this stream as idle. If no further actions are performed on the
   * stream for one minute, the stream will automatically close itself and
   * notify the stream's onClose() handler with Status.OK. The stream will then
   * be in a !isStarted() state, requiring the caller to start the stream again
   * before further use.
   *
   * Only streams that are in state 'Open' can be marked idle, as all other
   * states imply pending network operations.
   */
  markIdle() {
    if (this.isOpen() && this.idleTimer === null) {
      this.idleTimer = this.queue.enqueueAfterDelay(this.idleTimerId, IDLE_TIMEOUT_MS, () => this.handleIdleCloseTimer());
    }
  }
  /** Sends a message to the underlying stream. */
  sendRequest(msg) {
    this.cancelIdleCheck();
    this.stream.send(msg);
  }
  /** Called by the idle timer when the stream should close due to inactivity. */
  async handleIdleCloseTimer() {
    if (this.isOpen()) {
      return this.close(
        0
        /* PersistentStreamState.Initial */
      );
    }
  }
  /** Marks the stream as active again. */
  cancelIdleCheck() {
    if (this.idleTimer) {
      this.idleTimer.cancel();
      this.idleTimer = null;
    }
  }
  /** Cancels the health check delayed operation. */
  cancelHealthCheck() {
    if (this.healthCheck) {
      this.healthCheck.cancel();
      this.healthCheck = null;
    }
  }
  /**
   * Closes the stream and cleans up as necessary:
   *
   * * closes the underlying GRPC stream;
   * * calls the onClose handler with the given 'error';
   * * sets internal stream state to 'finalState';
   * * adjusts the backoff timer based on the error
   *
   * A new stream can be opened by calling start().
   *
   * @param finalState - the intended state of the stream after closing.
   * @param error - the error the connection was closed with.
   */
  async close(finalState, error) {
    this.cancelIdleCheck();
    this.cancelHealthCheck();
    this.backoff.cancel();
    this.closeCount++;
    if (finalState !== 4) {
      this.backoff.reset();
    } else if (error && error.code === Code.RESOURCE_EXHAUSTED) {
      logError(error.toString());
      logError("Using maximum backoff delay to prevent overloading the backend.");
      this.backoff.resetToMax();
    } else if (error && error.code === Code.UNAUTHENTICATED && this.state !== 3) {
      this.authCredentialsProvider.invalidateToken();
      this.appCheckCredentialsProvider.invalidateToken();
    }
    if (this.stream !== null) {
      this.tearDown();
      this.stream.close();
      this.stream = null;
    }
    this.state = finalState;
    await this.listener.onClose(error);
  }
  /**
   * Can be overridden to perform additional cleanup before the stream is closed.
   * Calling super.tearDown() is not required.
   */
  tearDown() {
  }
  auth() {
    this.state = 1;
    const dispatchIfNotClosed = this.getCloseGuardedDispatcher(this.closeCount);
    const closeCount = this.closeCount;
    Promise.all([
      this.authCredentialsProvider.getToken(),
      this.appCheckCredentialsProvider.getToken()
    ]).then(([authToken, appCheckToken]) => {
      if (this.closeCount === closeCount) {
        this.startStream(authToken, appCheckToken);
      }
    }, (error) => {
      dispatchIfNotClosed(() => {
        const rpcError = new FirestoreError(Code.UNKNOWN, "Fetching auth token failed: " + error.message);
        return this.handleStreamClose(rpcError);
      });
    });
  }
  startStream(authToken, appCheckToken) {
    const dispatchIfNotClosed = this.getCloseGuardedDispatcher(this.closeCount);
    this.stream = this.startRpc(authToken, appCheckToken);
    this.stream.onOpen(() => {
      dispatchIfNotClosed(() => {
        this.state = 2;
        this.healthCheck = this.queue.enqueueAfterDelay(this.healthTimerId, HEALTHY_TIMEOUT_MS, () => {
          if (this.isOpen()) {
            this.state = 3;
          }
          return Promise.resolve();
        });
        return this.listener.onOpen();
      });
    });
    this.stream.onClose((error) => {
      dispatchIfNotClosed(() => {
        return this.handleStreamClose(error);
      });
    });
    this.stream.onMessage((msg) => {
      dispatchIfNotClosed(() => {
        return this.onMessage(msg);
      });
    });
  }
  performBackoff() {
    this.state = 5;
    this.backoff.backoffAndRun(async () => {
      this.state = 0;
      this.start();
    });
  }
  // Visible for tests
  handleStreamClose(error) {
    logDebug(LOG_TAG$7, `close with error: ${error}`);
    this.stream = null;
    return this.close(4, error);
  }
  /**
   * Returns a "dispatcher" function that dispatches operations onto the
   * AsyncQueue but only runs them if closeCount remains unchanged. This allows
   * us to turn auth / stream callbacks into no-ops if the stream is closed /
   * re-opened, etc.
   */
  getCloseGuardedDispatcher(startCloseCount) {
    return (fn) => {
      this.queue.enqueueAndForget(() => {
        if (this.closeCount === startCloseCount) {
          return fn();
        } else {
          logDebug(LOG_TAG$7, "stream callback skipped by getCloseGuardedDispatcher.");
          return Promise.resolve();
        }
      });
    };
  }
}
class PersistentListenStream extends PersistentStream {
  constructor(queue, connection, authCredentials, appCheckCredentials, serializer, listener) {
    super(queue, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", connection, authCredentials, appCheckCredentials, listener);
    this.serializer = serializer;
  }
  startRpc(authToken, appCheckToken) {
    return this.connection.openStream("Listen", authToken, appCheckToken);
  }
  onMessage(watchChangeProto) {
    this.backoff.reset();
    const watchChange = fromWatchChange(this.serializer, watchChangeProto);
    const snapshot = versionFromListenResponse(watchChangeProto);
    return this.listener.onWatchChange(watchChange, snapshot);
  }
  /**
   * Registers interest in the results of the given target. If the target
   * includes a resumeToken it will be included in the request. Results that
   * affect the target will be streamed back as WatchChange messages that
   * reference the targetId.
   */
  watch(targetData) {
    const request = {};
    request.database = getEncodedDatabaseId(this.serializer);
    request.addTarget = toTarget(this.serializer, targetData);
    const labels = toListenRequestLabels(this.serializer, targetData);
    if (labels) {
      request.labels = labels;
    }
    this.sendRequest(request);
  }
  /**
   * Unregisters interest in the results of the target associated with the
   * given targetId.
   */
  unwatch(targetId) {
    const request = {};
    request.database = getEncodedDatabaseId(this.serializer);
    request.removeTarget = targetId;
    this.sendRequest(request);
  }
}
class PersistentWriteStream extends PersistentStream {
  constructor(queue, connection, authCredentials, appCheckCredentials, serializer, listener) {
    super(queue, "write_stream_connection_backoff", "write_stream_idle", "health_check_timeout", connection, authCredentials, appCheckCredentials, listener);
    this.serializer = serializer;
    this.handshakeComplete_ = false;
  }
  /**
   * Tracks whether or not a handshake has been successfully exchanged and
   * the stream is ready to accept mutations.
   */
  get handshakeComplete() {
    return this.handshakeComplete_;
  }
  // Override of PersistentStream.start
  start() {
    this.handshakeComplete_ = false;
    this.lastStreamToken = void 0;
    super.start();
  }
  tearDown() {
    if (this.handshakeComplete_) {
      this.writeMutations([]);
    }
  }
  startRpc(authToken, appCheckToken) {
    return this.connection.openStream("Write", authToken, appCheckToken);
  }
  onMessage(responseProto) {
    hardAssert(!!responseProto.streamToken);
    this.lastStreamToken = responseProto.streamToken;
    if (!this.handshakeComplete_) {
      hardAssert(!responseProto.writeResults || responseProto.writeResults.length === 0);
      this.handshakeComplete_ = true;
      return this.listener.onHandshakeComplete();
    } else {
      this.backoff.reset();
      const results = fromWriteResults(responseProto.writeResults, responseProto.commitTime);
      const commitVersion = fromVersion(responseProto.commitTime);
      return this.listener.onMutationResult(commitVersion, results);
    }
  }
  /**
   * Sends an initial streamToken to the server, performing the handshake
   * required to make the StreamingWrite RPC work. Subsequent
   * calls should wait until onHandshakeComplete was called.
   */
  writeHandshake() {
    const request = {};
    request.database = getEncodedDatabaseId(this.serializer);
    this.sendRequest(request);
  }
  /** Sends a group of mutations to the Firestore backend to apply. */
  writeMutations(mutations) {
    const request = {
      streamToken: this.lastStreamToken,
      writes: mutations.map((mutation) => toMutation(this.serializer, mutation))
    };
    this.sendRequest(request);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Datastore {
}
class DatastoreImpl extends Datastore {
  constructor(authCredentials, appCheckCredentials, connection, serializer) {
    super();
    this.authCredentials = authCredentials;
    this.appCheckCredentials = appCheckCredentials;
    this.connection = connection;
    this.serializer = serializer;
    this.terminated = false;
  }
  verifyInitialized() {
    if (this.terminated) {
      throw new FirestoreError(Code.FAILED_PRECONDITION, "The client has already been terminated.");
    }
  }
  /** Invokes the provided RPC with auth and AppCheck tokens. */
  invokeRPC(rpcName, path, request) {
    this.verifyInitialized();
    return Promise.all([
      this.authCredentials.getToken(),
      this.appCheckCredentials.getToken()
    ]).then(([authToken, appCheckToken]) => {
      return this.connection.invokeRPC(rpcName, path, request, authToken, appCheckToken);
    }).catch((error) => {
      if (error.name === "FirebaseError") {
        if (error.code === Code.UNAUTHENTICATED) {
          this.authCredentials.invalidateToken();
          this.appCheckCredentials.invalidateToken();
        }
        throw error;
      } else {
        throw new FirestoreError(Code.UNKNOWN, error.toString());
      }
    });
  }
  /** Invokes the provided RPC with streamed results with auth and AppCheck tokens. */
  invokeStreamingRPC(rpcName, path, request, expectedResponseCount) {
    this.verifyInitialized();
    return Promise.all([
      this.authCredentials.getToken(),
      this.appCheckCredentials.getToken()
    ]).then(([authToken, appCheckToken]) => {
      return this.connection.invokeStreamingRPC(rpcName, path, request, authToken, appCheckToken, expectedResponseCount);
    }).catch((error) => {
      if (error.name === "FirebaseError") {
        if (error.code === Code.UNAUTHENTICATED) {
          this.authCredentials.invalidateToken();
          this.appCheckCredentials.invalidateToken();
        }
        throw error;
      } else {
        throw new FirestoreError(Code.UNKNOWN, error.toString());
      }
    });
  }
  terminate() {
    this.terminated = true;
  }
}
function newDatastore(authCredentials, appCheckCredentials, connection, serializer) {
  return new DatastoreImpl(authCredentials, appCheckCredentials, connection, serializer);
}
function newPersistentWriteStream(datastore, queue, listener) {
  const datastoreImpl = debugCast(datastore);
  datastoreImpl.verifyInitialized();
  return new PersistentWriteStream(queue, datastoreImpl.connection, datastoreImpl.authCredentials, datastoreImpl.appCheckCredentials, datastoreImpl.serializer, listener);
}
function newPersistentWatchStream(datastore, queue, listener) {
  const datastoreImpl = debugCast(datastore);
  datastoreImpl.verifyInitialized();
  return new PersistentListenStream(queue, datastoreImpl.connection, datastoreImpl.authCredentials, datastoreImpl.appCheckCredentials, datastoreImpl.serializer, listener);
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_TAG$6 = "OnlineStateTracker";
const MAX_WATCH_STREAM_FAILURES = 1;
const ONLINE_STATE_TIMEOUT_MS = 10 * 1e3;
class OnlineStateTracker {
  constructor(asyncQueue, onlineStateHandler) {
    this.asyncQueue = asyncQueue;
    this.onlineStateHandler = onlineStateHandler;
    this.state = "Unknown";
    this.watchStreamFailures = 0;
    this.onlineStateTimer = null;
    this.shouldWarnClientIsOffline = true;
  }
  /**
   * Called by RemoteStore when a watch stream is started (including on each
   * backoff attempt).
   *
   * If this is the first attempt, it sets the OnlineState to Unknown and starts
   * the onlineStateTimer.
   */
  handleWatchStreamStart() {
    if (this.watchStreamFailures === 0) {
      this.setAndBroadcast(
        "Unknown"
        /* OnlineState.Unknown */
      );
      this.onlineStateTimer = this.asyncQueue.enqueueAfterDelay("online_state_timeout", ONLINE_STATE_TIMEOUT_MS, () => {
        this.onlineStateTimer = null;
        this.logClientOfflineWarningIfNecessary(`Backend didn't respond within ${ONLINE_STATE_TIMEOUT_MS / 1e3} seconds.`);
        this.setAndBroadcast(
          "Offline"
          /* OnlineState.Offline */
        );
        return Promise.resolve();
      });
    }
  }
  /**
   * Updates our OnlineState as appropriate after the watch stream reports a
   * failure. The first failure moves us to the 'Unknown' state. We then may
   * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
   * actually transition to the 'Offline' state.
   */
  handleWatchStreamFailure(error) {
    if (this.state === "Online") {
      this.setAndBroadcast(
        "Unknown"
        /* OnlineState.Unknown */
      );
    } else {
      this.watchStreamFailures++;
      if (this.watchStreamFailures >= MAX_WATCH_STREAM_FAILURES) {
        this.clearOnlineStateTimer();
        this.logClientOfflineWarningIfNecessary(`Connection failed ${MAX_WATCH_STREAM_FAILURES} times. Most recent error: ${error.toString()}`);
        this.setAndBroadcast(
          "Offline"
          /* OnlineState.Offline */
        );
      }
    }
  }
  /**
   * Explicitly sets the OnlineState to the specified state.
   *
   * Note that this resets our timers / failure counters, etc. used by our
   * Offline heuristics, so must not be used in place of
   * handleWatchStreamStart() and handleWatchStreamFailure().
   */
  set(newState) {
    this.clearOnlineStateTimer();
    this.watchStreamFailures = 0;
    if (newState === "Online") {
      this.shouldWarnClientIsOffline = false;
    }
    this.setAndBroadcast(newState);
  }
  setAndBroadcast(newState) {
    if (newState !== this.state) {
      this.state = newState;
      this.onlineStateHandler(newState);
    }
  }
  logClientOfflineWarningIfNecessary(details) {
    const message = `Could not reach Cloud Firestore backend. ${details}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
    if (this.shouldWarnClientIsOffline) {
      logError(message);
      this.shouldWarnClientIsOffline = false;
    } else {
      logDebug(LOG_TAG$6, message);
    }
  }
  clearOnlineStateTimer() {
    if (this.onlineStateTimer !== null) {
      this.onlineStateTimer.cancel();
      this.onlineStateTimer = null;
    }
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_TAG$5 = "RemoteStore";
const MAX_PENDING_WRITES = 10;
class RemoteStoreImpl {
  constructor(localStore, datastore, asyncQueue, onlineStateHandler, connectivityMonitor) {
    this.localStore = localStore;
    this.datastore = datastore;
    this.asyncQueue = asyncQueue;
    this.remoteSyncer = {};
    this.writePipeline = [];
    this.listenTargets = /* @__PURE__ */ new Map();
    this.offlineCauses = /* @__PURE__ */ new Set();
    this.onNetworkStatusChange = [];
    this.connectivityMonitor = connectivityMonitor;
    this.connectivityMonitor.addCallback((_) => {
      asyncQueue.enqueueAndForget(async () => {
        if (canUseNetwork(this)) {
          logDebug(LOG_TAG$5, "Restarting streams for network reachability change.");
          await restartNetwork(this);
        }
      });
    });
    this.onlineStateTracker = new OnlineStateTracker(asyncQueue, onlineStateHandler);
  }
}
function newRemoteStore(localStore, datastore, asyncQueue, onlineStateHandler, connectivityMonitor) {
  return new RemoteStoreImpl(localStore, datastore, asyncQueue, onlineStateHandler, connectivityMonitor);
}
async function enableNetworkInternal(remoteStoreImpl) {
  if (canUseNetwork(remoteStoreImpl)) {
    for (const networkStatusHandler of remoteStoreImpl.onNetworkStatusChange) {
      await networkStatusHandler(
        /* enabled= */
        true
      );
    }
  }
}
async function disableNetworkInternal(remoteStoreImpl) {
  for (const networkStatusHandler of remoteStoreImpl.onNetworkStatusChange) {
    await networkStatusHandler(
      /* enabled= */
      false
    );
  }
}
async function remoteStoreShutdown(remoteStore) {
  const remoteStoreImpl = debugCast(remoteStore);
  logDebug(LOG_TAG$5, "RemoteStore shutting down.");
  remoteStoreImpl.offlineCauses.add(
    5
    /* OfflineCause.Shutdown */
  );
  await disableNetworkInternal(remoteStoreImpl);
  remoteStoreImpl.connectivityMonitor.shutdown();
  remoteStoreImpl.onlineStateTracker.set(
    "Unknown"
    /* OnlineState.Unknown */
  );
}
function remoteStoreListen(remoteStore, targetData) {
  const remoteStoreImpl = debugCast(remoteStore);
  if (remoteStoreImpl.listenTargets.has(targetData.targetId)) {
    return;
  }
  remoteStoreImpl.listenTargets.set(targetData.targetId, targetData);
  if (shouldStartWatchStream(remoteStoreImpl)) {
    startWatchStream(remoteStoreImpl);
  } else if (ensureWatchStream(remoteStoreImpl).isOpen()) {
    sendWatchRequest(remoteStoreImpl, targetData);
  }
}
function remoteStoreUnlisten(remoteStore, targetId) {
  const remoteStoreImpl = debugCast(remoteStore);
  const watchStream = ensureWatchStream(remoteStoreImpl);
  remoteStoreImpl.listenTargets.delete(targetId);
  if (watchStream.isOpen()) {
    sendUnwatchRequest(remoteStoreImpl, targetId);
  }
  if (remoteStoreImpl.listenTargets.size === 0) {
    if (watchStream.isOpen()) {
      watchStream.markIdle();
    } else if (canUseNetwork(remoteStoreImpl)) {
      remoteStoreImpl.onlineStateTracker.set(
        "Unknown"
        /* OnlineState.Unknown */
      );
    }
  }
}
function sendWatchRequest(remoteStoreImpl, targetData) {
  remoteStoreImpl.watchChangeAggregator.recordPendingTargetRequest(targetData.targetId);
  if (targetData.resumeToken.approximateByteSize() > 0 || targetData.snapshotVersion.compareTo(SnapshotVersion.min()) > 0) {
    const expectedCount = remoteStoreImpl.remoteSyncer.getRemoteKeysForTarget(targetData.targetId).size;
    targetData = targetData.withExpectedCount(expectedCount);
  }
  ensureWatchStream(remoteStoreImpl).watch(targetData);
}
function sendUnwatchRequest(remoteStoreImpl, targetId) {
  remoteStoreImpl.watchChangeAggregator.recordPendingTargetRequest(targetId);
  ensureWatchStream(remoteStoreImpl).unwatch(targetId);
}
function startWatchStream(remoteStoreImpl) {
  remoteStoreImpl.watchChangeAggregator = new WatchChangeAggregator({
    getRemoteKeysForTarget: (targetId) => remoteStoreImpl.remoteSyncer.getRemoteKeysForTarget(targetId),
    getTargetDataForTarget: (targetId) => remoteStoreImpl.listenTargets.get(targetId) || null,
    getDatabaseId: () => remoteStoreImpl.datastore.serializer.databaseId
  });
  ensureWatchStream(remoteStoreImpl).start();
  remoteStoreImpl.onlineStateTracker.handleWatchStreamStart();
}
function shouldStartWatchStream(remoteStoreImpl) {
  return canUseNetwork(remoteStoreImpl) && !ensureWatchStream(remoteStoreImpl).isStarted() && remoteStoreImpl.listenTargets.size > 0;
}
function canUseNetwork(remoteStore) {
  const remoteStoreImpl = debugCast(remoteStore);
  return remoteStoreImpl.offlineCauses.size === 0;
}
function cleanUpWatchStreamState(remoteStoreImpl) {
  remoteStoreImpl.watchChangeAggregator = void 0;
}
async function onWatchStreamOpen(remoteStoreImpl) {
  remoteStoreImpl.listenTargets.forEach((targetData, targetId) => {
    sendWatchRequest(remoteStoreImpl, targetData);
  });
}
async function onWatchStreamClose(remoteStoreImpl, error) {
  cleanUpWatchStreamState(remoteStoreImpl);
  if (shouldStartWatchStream(remoteStoreImpl)) {
    remoteStoreImpl.onlineStateTracker.handleWatchStreamFailure(error);
    startWatchStream(remoteStoreImpl);
  } else {
    remoteStoreImpl.onlineStateTracker.set(
      "Unknown"
      /* OnlineState.Unknown */
    );
  }
}
async function onWatchStreamChange(remoteStoreImpl, watchChange, snapshotVersion) {
  remoteStoreImpl.onlineStateTracker.set(
    "Online"
    /* OnlineState.Online */
  );
  if (watchChange instanceof WatchTargetChange && watchChange.state === 2 && watchChange.cause) {
    try {
      await handleTargetError(remoteStoreImpl, watchChange);
    } catch (e) {
      logDebug(LOG_TAG$5, "Failed to remove targets %s: %s ", watchChange.targetIds.join(","), e);
      await disableNetworkUntilRecovery(remoteStoreImpl, e);
    }
    return;
  }
  if (watchChange instanceof DocumentWatchChange) {
    remoteStoreImpl.watchChangeAggregator.handleDocumentChange(watchChange);
  } else if (watchChange instanceof ExistenceFilterChange) {
    remoteStoreImpl.watchChangeAggregator.handleExistenceFilter(watchChange);
  } else {
    remoteStoreImpl.watchChangeAggregator.handleTargetChange(watchChange);
  }
  if (!snapshotVersion.isEqual(SnapshotVersion.min())) {
    try {
      const lastRemoteSnapshotVersion = await localStoreGetLastRemoteSnapshotVersion(remoteStoreImpl.localStore);
      if (snapshotVersion.compareTo(lastRemoteSnapshotVersion) >= 0) {
        await raiseWatchSnapshot(remoteStoreImpl, snapshotVersion);
      }
    } catch (e) {
      logDebug(LOG_TAG$5, "Failed to raise snapshot:", e);
      await disableNetworkUntilRecovery(remoteStoreImpl, e);
    }
  }
}
async function disableNetworkUntilRecovery(remoteStoreImpl, e, op) {
  if (isIndexedDbTransactionError(e)) {
    remoteStoreImpl.offlineCauses.add(
      1
      /* OfflineCause.IndexedDbFailed */
    );
    await disableNetworkInternal(remoteStoreImpl);
    remoteStoreImpl.onlineStateTracker.set(
      "Offline"
      /* OnlineState.Offline */
    );
    if (!op) {
      op = () => localStoreGetLastRemoteSnapshotVersion(remoteStoreImpl.localStore);
    }
    remoteStoreImpl.asyncQueue.enqueueRetryable(async () => {
      logDebug(LOG_TAG$5, "Retrying IndexedDB access");
      await op();
      remoteStoreImpl.offlineCauses.delete(
        1
        /* OfflineCause.IndexedDbFailed */
      );
      await enableNetworkInternal(remoteStoreImpl);
    });
  } else {
    throw e;
  }
}
function executeWithRecovery(remoteStoreImpl, op) {
  return op().catch((e) => disableNetworkUntilRecovery(remoteStoreImpl, e, op));
}
function raiseWatchSnapshot(remoteStoreImpl, snapshotVersion) {
  const remoteEvent = remoteStoreImpl.watchChangeAggregator.createRemoteEvent(snapshotVersion);
  remoteEvent.targetChanges.forEach((change, targetId) => {
    if (change.resumeToken.approximateByteSize() > 0) {
      const targetData = remoteStoreImpl.listenTargets.get(targetId);
      if (targetData) {
        remoteStoreImpl.listenTargets.set(targetId, targetData.withResumeToken(change.resumeToken, snapshotVersion));
      }
    }
  });
  remoteEvent.targetMismatches.forEach((targetId, targetPurpose) => {
    const targetData = remoteStoreImpl.listenTargets.get(targetId);
    if (!targetData) {
      return;
    }
    remoteStoreImpl.listenTargets.set(targetId, targetData.withResumeToken(ByteString.EMPTY_BYTE_STRING, targetData.snapshotVersion));
    sendUnwatchRequest(remoteStoreImpl, targetId);
    const requestTargetData = new TargetData(targetData.target, targetId, targetPurpose, targetData.sequenceNumber);
    sendWatchRequest(remoteStoreImpl, requestTargetData);
  });
  return remoteStoreImpl.remoteSyncer.applyRemoteEvent(remoteEvent);
}
async function handleTargetError(remoteStoreImpl, watchChange) {
  const error = watchChange.cause;
  for (const targetId of watchChange.targetIds) {
    if (remoteStoreImpl.listenTargets.has(targetId)) {
      await remoteStoreImpl.remoteSyncer.rejectListen(targetId, error);
      remoteStoreImpl.listenTargets.delete(targetId);
      remoteStoreImpl.watchChangeAggregator.removeTarget(targetId);
    }
  }
}
async function fillWritePipeline(remoteStore) {
  const remoteStoreImpl = debugCast(remoteStore);
  const writeStream = ensureWriteStream(remoteStoreImpl);
  let lastBatchIdRetrieved = remoteStoreImpl.writePipeline.length > 0 ? remoteStoreImpl.writePipeline[remoteStoreImpl.writePipeline.length - 1].batchId : BATCHID_UNKNOWN;
  while (canAddToWritePipeline(remoteStoreImpl)) {
    try {
      const batch = await localStoreGetNextMutationBatch(remoteStoreImpl.localStore, lastBatchIdRetrieved);
      if (batch === null) {
        if (remoteStoreImpl.writePipeline.length === 0) {
          writeStream.markIdle();
        }
        break;
      } else {
        lastBatchIdRetrieved = batch.batchId;
        addToWritePipeline(remoteStoreImpl, batch);
      }
    } catch (e) {
      await disableNetworkUntilRecovery(remoteStoreImpl, e);
    }
  }
  if (shouldStartWriteStream(remoteStoreImpl)) {
    startWriteStream(remoteStoreImpl);
  }
}
function canAddToWritePipeline(remoteStoreImpl) {
  return canUseNetwork(remoteStoreImpl) && remoteStoreImpl.writePipeline.length < MAX_PENDING_WRITES;
}
function addToWritePipeline(remoteStoreImpl, batch) {
  remoteStoreImpl.writePipeline.push(batch);
  const writeStream = ensureWriteStream(remoteStoreImpl);
  if (writeStream.isOpen() && writeStream.handshakeComplete) {
    writeStream.writeMutations(batch.mutations);
  }
}
function shouldStartWriteStream(remoteStoreImpl) {
  return canUseNetwork(remoteStoreImpl) && !ensureWriteStream(remoteStoreImpl).isStarted() && remoteStoreImpl.writePipeline.length > 0;
}
function startWriteStream(remoteStoreImpl) {
  ensureWriteStream(remoteStoreImpl).start();
}
async function onWriteStreamOpen(remoteStoreImpl) {
  ensureWriteStream(remoteStoreImpl).writeHandshake();
}
async function onWriteHandshakeComplete(remoteStoreImpl) {
  const writeStream = ensureWriteStream(remoteStoreImpl);
  for (const batch of remoteStoreImpl.writePipeline) {
    writeStream.writeMutations(batch.mutations);
  }
}
async function onMutationResult(remoteStoreImpl, commitVersion, results) {
  const batch = remoteStoreImpl.writePipeline.shift();
  const success = MutationBatchResult.from(batch, commitVersion, results);
  await executeWithRecovery(remoteStoreImpl, () => remoteStoreImpl.remoteSyncer.applySuccessfulWrite(success));
  await fillWritePipeline(remoteStoreImpl);
}
async function onWriteStreamClose(remoteStoreImpl, error) {
  if (error && ensureWriteStream(remoteStoreImpl).handshakeComplete) {
    await handleWriteError(remoteStoreImpl, error);
  }
  if (shouldStartWriteStream(remoteStoreImpl)) {
    startWriteStream(remoteStoreImpl);
  }
}
async function handleWriteError(remoteStoreImpl, error) {
  if (isPermanentWriteError(error.code)) {
    const batch = remoteStoreImpl.writePipeline.shift();
    ensureWriteStream(remoteStoreImpl).inhibitBackoff();
    await executeWithRecovery(remoteStoreImpl, () => remoteStoreImpl.remoteSyncer.rejectFailedWrite(batch.batchId, error));
    await fillWritePipeline(remoteStoreImpl);
  }
}
async function restartNetwork(remoteStore) {
  const remoteStoreImpl = debugCast(remoteStore);
  remoteStoreImpl.offlineCauses.add(
    4
    /* OfflineCause.ConnectivityChange */
  );
  await disableNetworkInternal(remoteStoreImpl);
  remoteStoreImpl.onlineStateTracker.set(
    "Unknown"
    /* OnlineState.Unknown */
  );
  remoteStoreImpl.offlineCauses.delete(
    4
    /* OfflineCause.ConnectivityChange */
  );
  await enableNetworkInternal(remoteStoreImpl);
}
async function remoteStoreHandleCredentialChange(remoteStore, user) {
  const remoteStoreImpl = debugCast(remoteStore);
  remoteStoreImpl.asyncQueue.verifyOperationInProgress();
  logDebug(LOG_TAG$5, "RemoteStore received new credentials");
  const usesNetwork = canUseNetwork(remoteStoreImpl);
  remoteStoreImpl.offlineCauses.add(
    3
    /* OfflineCause.CredentialChange */
  );
  await disableNetworkInternal(remoteStoreImpl);
  if (usesNetwork) {
    remoteStoreImpl.onlineStateTracker.set(
      "Unknown"
      /* OnlineState.Unknown */
    );
  }
  await remoteStoreImpl.remoteSyncer.handleCredentialChange(user);
  remoteStoreImpl.offlineCauses.delete(
    3
    /* OfflineCause.CredentialChange */
  );
  await enableNetworkInternal(remoteStoreImpl);
}
async function remoteStoreApplyPrimaryState(remoteStore, isPrimary) {
  const remoteStoreImpl = debugCast(remoteStore);
  if (isPrimary) {
    remoteStoreImpl.offlineCauses.delete(
      2
      /* OfflineCause.IsSecondary */
    );
    await enableNetworkInternal(remoteStoreImpl);
  } else if (!isPrimary) {
    remoteStoreImpl.offlineCauses.add(
      2
      /* OfflineCause.IsSecondary */
    );
    await disableNetworkInternal(remoteStoreImpl);
    remoteStoreImpl.onlineStateTracker.set(
      "Unknown"
      /* OnlineState.Unknown */
    );
  }
}
function ensureWatchStream(remoteStoreImpl) {
  if (!remoteStoreImpl.watchStream) {
    remoteStoreImpl.watchStream = newPersistentWatchStream(remoteStoreImpl.datastore, remoteStoreImpl.asyncQueue, {
      onOpen: onWatchStreamOpen.bind(null, remoteStoreImpl),
      onClose: onWatchStreamClose.bind(null, remoteStoreImpl),
      onWatchChange: onWatchStreamChange.bind(null, remoteStoreImpl)
    });
    remoteStoreImpl.onNetworkStatusChange.push(async (enabled) => {
      if (enabled) {
        remoteStoreImpl.watchStream.inhibitBackoff();
        if (shouldStartWatchStream(remoteStoreImpl)) {
          startWatchStream(remoteStoreImpl);
        } else {
          remoteStoreImpl.onlineStateTracker.set(
            "Unknown"
            /* OnlineState.Unknown */
          );
        }
      } else {
        await remoteStoreImpl.watchStream.stop();
        cleanUpWatchStreamState(remoteStoreImpl);
      }
    });
  }
  return remoteStoreImpl.watchStream;
}
function ensureWriteStream(remoteStoreImpl) {
  if (!remoteStoreImpl.writeStream) {
    remoteStoreImpl.writeStream = newPersistentWriteStream(remoteStoreImpl.datastore, remoteStoreImpl.asyncQueue, {
      onOpen: onWriteStreamOpen.bind(null, remoteStoreImpl),
      onClose: onWriteStreamClose.bind(null, remoteStoreImpl),
      onHandshakeComplete: onWriteHandshakeComplete.bind(null, remoteStoreImpl),
      onMutationResult: onMutationResult.bind(null, remoteStoreImpl)
    });
    remoteStoreImpl.onNetworkStatusChange.push(async (enabled) => {
      if (enabled) {
        remoteStoreImpl.writeStream.inhibitBackoff();
        await fillWritePipeline(remoteStoreImpl);
      } else {
        await remoteStoreImpl.writeStream.stop();
        if (remoteStoreImpl.writePipeline.length > 0) {
          logDebug(LOG_TAG$5, `Stopping write stream with ${remoteStoreImpl.writePipeline.length} pending writes`);
          remoteStoreImpl.writePipeline = [];
        }
      }
    });
  }
  return remoteStoreImpl.writeStream;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_TAG$4 = "AsyncQueue";
class DelayedOperation {
  constructor(asyncQueue, timerId, targetTimeMs, op, removalCallback) {
    this.asyncQueue = asyncQueue;
    this.timerId = timerId;
    this.targetTimeMs = targetTimeMs;
    this.op = op;
    this.removalCallback = removalCallback;
    this.deferred = new Deferred();
    this.then = this.deferred.promise.then.bind(this.deferred.promise);
    this.deferred.promise.catch((err) => {
    });
  }
  /**
   * Creates and returns a DelayedOperation that has been scheduled to be
   * executed on the provided asyncQueue after the provided delayMs.
   *
   * @param asyncQueue - The queue to schedule the operation on.
   * @param id - A Timer ID identifying the type of operation this is.
   * @param delayMs - The delay (ms) before the operation should be scheduled.
   * @param op - The operation to run.
   * @param removalCallback - A callback to be called synchronously once the
   *   operation is executed or canceled, notifying the AsyncQueue to remove it
   *   from its delayedOperations list.
   *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
   *   the DelayedOperation class public.
   */
  static createAndSchedule(asyncQueue, timerId, delayMs, op, removalCallback) {
    const targetTime = Date.now() + delayMs;
    const delayedOp = new DelayedOperation(asyncQueue, timerId, targetTime, op, removalCallback);
    delayedOp.start(delayMs);
    return delayedOp;
  }
  /**
   * Starts the timer. This is called immediately after construction by
   * createAndSchedule().
   */
  start(delayMs) {
    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), delayMs);
  }
  /**
   * Queues the operation to run immediately (if it hasn't already been run or
   * canceled).
   */
  skipDelay() {
    return this.handleDelayElapsed();
  }
  /**
   * Cancels the operation if it hasn't already been executed or canceled. The
   * promise will be rejected.
   *
   * As long as the operation has not yet been run, calling cancel() provides a
   * guarantee that the operation will not be run.
   */
  cancel(reason) {
    if (this.timerHandle !== null) {
      this.clearTimeout();
      this.deferred.reject(new FirestoreError(Code.CANCELLED, "Operation cancelled" + (reason ? ": " + reason : "")));
    }
  }
  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget(() => {
      if (this.timerHandle !== null) {
        this.clearTimeout();
        return this.op().then((result) => {
          return this.deferred.resolve(result);
        });
      } else {
        return Promise.resolve();
      }
    });
  }
  clearTimeout() {
    if (this.timerHandle !== null) {
      this.removalCallback(this);
      clearTimeout(this.timerHandle);
      this.timerHandle = null;
    }
  }
}
function wrapInUserErrorIfRecoverable(e, msg) {
  logError(LOG_TAG$4, `${msg}: ${e}`);
  if (isIndexedDbTransactionError(e)) {
    return new FirestoreError(Code.UNAVAILABLE, `${msg}: ${e}`);
  } else {
    throw e;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class DocumentSet {
  /** The default ordering is by key if the comparator is omitted */
  constructor(comp) {
    if (comp) {
      this.comparator = (d1, d2) => comp(d1, d2) || DocumentKey.comparator(d1.key, d2.key);
    } else {
      this.comparator = (d1, d2) => DocumentKey.comparator(d1.key, d2.key);
    }
    this.keyedMap = documentMap();
    this.sortedSet = new SortedMap(this.comparator);
  }
  /**
   * Returns an empty copy of the existing DocumentSet, using the same
   * comparator.
   */
  static emptySet(oldSet) {
    return new DocumentSet(oldSet.comparator);
  }
  has(key) {
    return this.keyedMap.get(key) != null;
  }
  get(key) {
    return this.keyedMap.get(key);
  }
  first() {
    return this.sortedSet.minKey();
  }
  last() {
    return this.sortedSet.maxKey();
  }
  isEmpty() {
    return this.sortedSet.isEmpty();
  }
  /**
   * Returns the index of the provided key in the document set, or -1 if the
   * document key is not present in the set;
   */
  indexOf(key) {
    const doc2 = this.keyedMap.get(key);
    return doc2 ? this.sortedSet.indexOf(doc2) : -1;
  }
  get size() {
    return this.sortedSet.size;
  }
  /** Iterates documents in order defined by "comparator" */
  forEach(cb) {
    this.sortedSet.inorderTraversal((k, v) => {
      cb(k);
      return false;
    });
  }
  /** Inserts or updates a document with the same key */
  add(doc2) {
    const set2 = this.delete(doc2.key);
    return set2.copy(set2.keyedMap.insert(doc2.key, doc2), set2.sortedSet.insert(doc2, null));
  }
  /** Deletes a document with a given key */
  delete(key) {
    const doc2 = this.get(key);
    if (!doc2) {
      return this;
    }
    return this.copy(this.keyedMap.remove(key), this.sortedSet.remove(doc2));
  }
  isEqual(other) {
    if (!(other instanceof DocumentSet)) {
      return false;
    }
    if (this.size !== other.size) {
      return false;
    }
    const thisIt = this.sortedSet.getIterator();
    const otherIt = other.sortedSet.getIterator();
    while (thisIt.hasNext()) {
      const thisDoc = thisIt.getNext().key;
      const otherDoc = otherIt.getNext().key;
      if (!thisDoc.isEqual(otherDoc)) {
        return false;
      }
    }
    return true;
  }
  toString() {
    const docStrings = [];
    this.forEach((doc2) => {
      docStrings.push(doc2.toString());
    });
    if (docStrings.length === 0) {
      return "DocumentSet ()";
    } else {
      return "DocumentSet (\n  " + docStrings.join("  \n") + "\n)";
    }
  }
  copy(keyedMap, sortedSet) {
    const newSet = new DocumentSet();
    newSet.comparator = this.comparator;
    newSet.keyedMap = keyedMap;
    newSet.sortedSet = sortedSet;
    return newSet;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class DocumentChangeSet {
  constructor() {
    this.changeMap = new SortedMap(DocumentKey.comparator);
  }
  track(change) {
    const key = change.doc.key;
    const oldChange = this.changeMap.get(key);
    if (!oldChange) {
      this.changeMap = this.changeMap.insert(key, change);
      return;
    }
    if (change.type !== 0 && oldChange.type === 3) {
      this.changeMap = this.changeMap.insert(key, change);
    } else if (change.type === 3 && oldChange.type !== 1) {
      this.changeMap = this.changeMap.insert(key, {
        type: oldChange.type,
        doc: change.doc
      });
    } else if (change.type === 2 && oldChange.type === 2) {
      this.changeMap = this.changeMap.insert(key, {
        type: 2,
        doc: change.doc
      });
    } else if (change.type === 2 && oldChange.type === 0) {
      this.changeMap = this.changeMap.insert(key, {
        type: 0,
        doc: change.doc
      });
    } else if (change.type === 1 && oldChange.type === 0) {
      this.changeMap = this.changeMap.remove(key);
    } else if (change.type === 1 && oldChange.type === 2) {
      this.changeMap = this.changeMap.insert(key, {
        type: 1,
        doc: oldChange.doc
      });
    } else if (change.type === 0 && oldChange.type === 1) {
      this.changeMap = this.changeMap.insert(key, {
        type: 2,
        doc: change.doc
      });
    } else {
      fail();
    }
  }
  getChanges() {
    const changes = [];
    this.changeMap.inorderTraversal((key, change) => {
      changes.push(change);
    });
    return changes;
  }
}
class ViewSnapshot {
  constructor(query, docs, oldDocs, docChanges, mutatedKeys, fromCache, syncStateChanged, excludesMetadataChanges, hasCachedResults) {
    this.query = query;
    this.docs = docs;
    this.oldDocs = oldDocs;
    this.docChanges = docChanges;
    this.mutatedKeys = mutatedKeys;
    this.fromCache = fromCache;
    this.syncStateChanged = syncStateChanged;
    this.excludesMetadataChanges = excludesMetadataChanges;
    this.hasCachedResults = hasCachedResults;
  }
  /** Returns a view snapshot as if all documents in the snapshot were added. */
  static fromInitialDocuments(query, documents, mutatedKeys, fromCache, hasCachedResults) {
    const changes = [];
    documents.forEach((doc2) => {
      changes.push({ type: 0, doc: doc2 });
    });
    return new ViewSnapshot(
      query,
      documents,
      DocumentSet.emptySet(documents),
      changes,
      mutatedKeys,
      fromCache,
      /* syncStateChanged= */
      true,
      /* excludesMetadataChanges= */
      false,
      hasCachedResults
    );
  }
  get hasPendingWrites() {
    return !this.mutatedKeys.isEmpty();
  }
  isEqual(other) {
    if (this.fromCache !== other.fromCache || this.hasCachedResults !== other.hasCachedResults || this.syncStateChanged !== other.syncStateChanged || !this.mutatedKeys.isEqual(other.mutatedKeys) || !queryEquals(this.query, other.query) || !this.docs.isEqual(other.docs) || !this.oldDocs.isEqual(other.oldDocs)) {
      return false;
    }
    const changes = this.docChanges;
    const otherChanges = other.docChanges;
    if (changes.length !== otherChanges.length) {
      return false;
    }
    for (let i = 0; i < changes.length; i++) {
      if (changes[i].type !== otherChanges[i].type || !changes[i].doc.isEqual(otherChanges[i].doc)) {
        return false;
      }
    }
    return true;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class QueryListenersInfo {
  constructor() {
    this.viewSnap = void 0;
    this.listeners = [];
  }
}
function newEventManager() {
  return new EventManagerImpl();
}
class EventManagerImpl {
  constructor() {
    this.queries = new ObjectMap((q) => canonifyQuery(q), queryEquals);
    this.onlineState = "Unknown";
    this.snapshotsInSyncListeners = /* @__PURE__ */ new Set();
  }
}
async function eventManagerListen(eventManager, listener) {
  const eventManagerImpl = debugCast(eventManager);
  const query = listener.query;
  let firstListen = false;
  let queryInfo = eventManagerImpl.queries.get(query);
  if (!queryInfo) {
    firstListen = true;
    queryInfo = new QueryListenersInfo();
  }
  if (firstListen) {
    try {
      queryInfo.viewSnap = await eventManagerImpl.onListen(query);
    } catch (e) {
      const firestoreError = wrapInUserErrorIfRecoverable(e, `Initialization of query '${stringifyQuery(listener.query)}' failed`);
      listener.onError(firestoreError);
      return;
    }
  }
  eventManagerImpl.queries.set(query, queryInfo);
  queryInfo.listeners.push(listener);
  listener.applyOnlineStateChange(eventManagerImpl.onlineState);
  if (queryInfo.viewSnap) {
    const raisedEvent = listener.onViewSnapshot(queryInfo.viewSnap);
    if (raisedEvent) {
      raiseSnapshotsInSyncEvent(eventManagerImpl);
    }
  }
}
async function eventManagerUnlisten(eventManager, listener) {
  const eventManagerImpl = debugCast(eventManager);
  const query = listener.query;
  let lastListen = false;
  const queryInfo = eventManagerImpl.queries.get(query);
  if (queryInfo) {
    const i = queryInfo.listeners.indexOf(listener);
    if (i >= 0) {
      queryInfo.listeners.splice(i, 1);
      lastListen = queryInfo.listeners.length === 0;
    }
  }
  if (lastListen) {
    eventManagerImpl.queries.delete(query);
    return eventManagerImpl.onUnlisten(query);
  }
}
function eventManagerOnWatchChange(eventManager, viewSnaps) {
  const eventManagerImpl = debugCast(eventManager);
  let raisedEvent = false;
  for (const viewSnap of viewSnaps) {
    const query = viewSnap.query;
    const queryInfo = eventManagerImpl.queries.get(query);
    if (queryInfo) {
      for (const listener of queryInfo.listeners) {
        if (listener.onViewSnapshot(viewSnap)) {
          raisedEvent = true;
        }
      }
      queryInfo.viewSnap = viewSnap;
    }
  }
  if (raisedEvent) {
    raiseSnapshotsInSyncEvent(eventManagerImpl);
  }
}
function eventManagerOnWatchError(eventManager, query, error) {
  const eventManagerImpl = debugCast(eventManager);
  const queryInfo = eventManagerImpl.queries.get(query);
  if (queryInfo) {
    for (const listener of queryInfo.listeners) {
      listener.onError(error);
    }
  }
  eventManagerImpl.queries.delete(query);
}
function eventManagerOnOnlineStateChange(eventManager, onlineState) {
  const eventManagerImpl = debugCast(eventManager);
  eventManagerImpl.onlineState = onlineState;
  let raisedEvent = false;
  eventManagerImpl.queries.forEach((_, queryInfo) => {
    for (const listener of queryInfo.listeners) {
      if (listener.applyOnlineStateChange(onlineState)) {
        raisedEvent = true;
      }
    }
  });
  if (raisedEvent) {
    raiseSnapshotsInSyncEvent(eventManagerImpl);
  }
}
function raiseSnapshotsInSyncEvent(eventManagerImpl) {
  eventManagerImpl.snapshotsInSyncListeners.forEach((observer) => {
    observer.next();
  });
}
class QueryListener {
  constructor(query, queryObserver, options) {
    this.query = query;
    this.queryObserver = queryObserver;
    this.raisedInitialEvent = false;
    this.snap = null;
    this.onlineState = "Unknown";
    this.options = options || {};
  }
  /**
   * Applies the new ViewSnapshot to this listener, raising a user-facing event
   * if applicable (depending on what changed, whether the user has opted into
   * metadata-only changes, etc.). Returns true if a user-facing event was
   * indeed raised.
   */
  onViewSnapshot(snap) {
    if (!this.options.includeMetadataChanges) {
      const docChanges = [];
      for (const docChange of snap.docChanges) {
        if (docChange.type !== 3) {
          docChanges.push(docChange);
        }
      }
      snap = new ViewSnapshot(
        snap.query,
        snap.docs,
        snap.oldDocs,
        docChanges,
        snap.mutatedKeys,
        snap.fromCache,
        snap.syncStateChanged,
        /* excludesMetadataChanges= */
        true,
        snap.hasCachedResults
      );
    }
    let raisedEvent = false;
    if (!this.raisedInitialEvent) {
      if (this.shouldRaiseInitialEvent(snap, this.onlineState)) {
        this.raiseInitialEvent(snap);
        raisedEvent = true;
      }
    } else if (this.shouldRaiseEvent(snap)) {
      this.queryObserver.next(snap);
      raisedEvent = true;
    }
    this.snap = snap;
    return raisedEvent;
  }
  onError(error) {
    this.queryObserver.error(error);
  }
  /** Returns whether a snapshot was raised. */
  applyOnlineStateChange(onlineState) {
    this.onlineState = onlineState;
    let raisedEvent = false;
    if (this.snap && !this.raisedInitialEvent && this.shouldRaiseInitialEvent(this.snap, onlineState)) {
      this.raiseInitialEvent(this.snap);
      raisedEvent = true;
    }
    return raisedEvent;
  }
  shouldRaiseInitialEvent(snap, onlineState) {
    if (!snap.fromCache) {
      return true;
    }
    const maybeOnline = onlineState !== "Offline";
    if (this.options.waitForSyncWhenOnline && maybeOnline) {
      return false;
    }
    return !snap.docs.isEmpty() || snap.hasCachedResults || onlineState === "Offline";
  }
  shouldRaiseEvent(snap) {
    if (snap.docChanges.length > 0) {
      return true;
    }
    const hasPendingWritesChanged = this.snap && this.snap.hasPendingWrites !== snap.hasPendingWrites;
    if (snap.syncStateChanged || hasPendingWritesChanged) {
      return this.options.includeMetadataChanges === true;
    }
    return false;
  }
  raiseInitialEvent(snap) {
    snap = ViewSnapshot.fromInitialDocuments(snap.query, snap.docs, snap.mutatedKeys, snap.fromCache, snap.hasCachedResults);
    this.raisedInitialEvent = true;
    this.queryObserver.next(snap);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class LocalViewChanges {
  constructor(targetId, fromCache, addedKeys, removedKeys) {
    this.targetId = targetId;
    this.fromCache = fromCache;
    this.addedKeys = addedKeys;
    this.removedKeys = removedKeys;
  }
  static fromSnapshot(targetId, viewSnapshot) {
    let addedKeys = documentKeySet();
    let removedKeys = documentKeySet();
    for (const docChange of viewSnapshot.docChanges) {
      switch (docChange.type) {
        case 0:
          addedKeys = addedKeys.add(docChange.doc.key);
          break;
        case 1:
          removedKeys = removedKeys.add(docChange.doc.key);
          break;
      }
    }
    return new LocalViewChanges(targetId, viewSnapshot.fromCache, addedKeys, removedKeys);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AddedLimboDocument {
  constructor(key) {
    this.key = key;
  }
}
class RemovedLimboDocument {
  constructor(key) {
    this.key = key;
  }
}
class View {
  constructor(query, _syncedDocuments) {
    this.query = query;
    this._syncedDocuments = _syncedDocuments;
    this.syncState = null;
    this.hasCachedResults = false;
    this.current = false;
    this.limboDocuments = documentKeySet();
    this.mutatedKeys = documentKeySet();
    this.docComparator = newQueryComparator(query);
    this.documentSet = new DocumentSet(this.docComparator);
  }
  /**
   * The set of remote documents that the server has told us belongs to the target associated with
   * this view.
   */
  get syncedDocuments() {
    return this._syncedDocuments;
  }
  /**
   * Iterates over a set of doc changes, applies the query limit, and computes
   * what the new results should be, what the changes were, and whether we may
   * need to go back to the local cache for more results. Does not make any
   * changes to the view.
   * @param docChanges - The doc changes to apply to this view.
   * @param previousChanges - If this is being called with a refill, then start
   *        with this set of docs and changes instead of the current view.
   * @returns a new set of docs, changes, and refill flag.
   */
  computeDocChanges(docChanges, previousChanges) {
    const changeSet = previousChanges ? previousChanges.changeSet : new DocumentChangeSet();
    const oldDocumentSet = previousChanges ? previousChanges.documentSet : this.documentSet;
    let newMutatedKeys = previousChanges ? previousChanges.mutatedKeys : this.mutatedKeys;
    let newDocumentSet = oldDocumentSet;
    let needsRefill = false;
    const lastDocInLimit = this.query.limitType === "F" && oldDocumentSet.size === this.query.limit ? oldDocumentSet.last() : null;
    const firstDocInLimit = this.query.limitType === "L" && oldDocumentSet.size === this.query.limit ? oldDocumentSet.first() : null;
    docChanges.inorderTraversal((key, entry2) => {
      const oldDoc = oldDocumentSet.get(key);
      const newDoc = queryMatches(this.query, entry2) ? entry2 : null;
      const oldDocHadPendingMutations = oldDoc ? this.mutatedKeys.has(oldDoc.key) : false;
      const newDocHasPendingMutations = newDoc ? newDoc.hasLocalMutations || // We only consider committed mutations for documents that were
      // mutated during the lifetime of the view.
      this.mutatedKeys.has(newDoc.key) && newDoc.hasCommittedMutations : false;
      let changeApplied = false;
      if (oldDoc && newDoc) {
        const docsEqual = oldDoc.data.isEqual(newDoc.data);
        if (!docsEqual) {
          if (!this.shouldWaitForSyncedDocument(oldDoc, newDoc)) {
            changeSet.track({
              type: 2,
              doc: newDoc
            });
            changeApplied = true;
            if (lastDocInLimit && this.docComparator(newDoc, lastDocInLimit) > 0 || firstDocInLimit && this.docComparator(newDoc, firstDocInLimit) < 0) {
              needsRefill = true;
            }
          }
        } else if (oldDocHadPendingMutations !== newDocHasPendingMutations) {
          changeSet.track({ type: 3, doc: newDoc });
          changeApplied = true;
        }
      } else if (!oldDoc && newDoc) {
        changeSet.track({ type: 0, doc: newDoc });
        changeApplied = true;
      } else if (oldDoc && !newDoc) {
        changeSet.track({ type: 1, doc: oldDoc });
        changeApplied = true;
        if (lastDocInLimit || firstDocInLimit) {
          needsRefill = true;
        }
      }
      if (changeApplied) {
        if (newDoc) {
          newDocumentSet = newDocumentSet.add(newDoc);
          if (newDocHasPendingMutations) {
            newMutatedKeys = newMutatedKeys.add(key);
          } else {
            newMutatedKeys = newMutatedKeys.delete(key);
          }
        } else {
          newDocumentSet = newDocumentSet.delete(key);
          newMutatedKeys = newMutatedKeys.delete(key);
        }
      }
    });
    if (this.query.limit !== null) {
      while (newDocumentSet.size > this.query.limit) {
        const oldDoc = this.query.limitType === "F" ? newDocumentSet.last() : newDocumentSet.first();
        newDocumentSet = newDocumentSet.delete(oldDoc.key);
        newMutatedKeys = newMutatedKeys.delete(oldDoc.key);
        changeSet.track({ type: 1, doc: oldDoc });
      }
    }
    return {
      documentSet: newDocumentSet,
      changeSet,
      needsRefill,
      mutatedKeys: newMutatedKeys
    };
  }
  shouldWaitForSyncedDocument(oldDoc, newDoc) {
    return oldDoc.hasLocalMutations && newDoc.hasCommittedMutations && !newDoc.hasLocalMutations;
  }
  /**
   * Updates the view with the given ViewDocumentChanges and optionally updates
   * limbo docs and sync state from the provided target change.
   * @param docChanges - The set of changes to make to the view's docs.
   * @param updateLimboDocuments - Whether to update limbo documents based on
   *        this change.
   * @param targetChange - A target change to apply for computing limbo docs and
   *        sync state.
   * @returns A new ViewChange with the given docs, changes, and sync state.
   */
  // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
  applyChanges(docChanges, updateLimboDocuments, targetChange) {
    const oldDocs = this.documentSet;
    this.documentSet = docChanges.documentSet;
    this.mutatedKeys = docChanges.mutatedKeys;
    const changes = docChanges.changeSet.getChanges();
    changes.sort((c1, c2) => {
      return compareChangeType(c1.type, c2.type) || this.docComparator(c1.doc, c2.doc);
    });
    this.applyTargetChange(targetChange);
    const limboChanges = updateLimboDocuments ? this.updateLimboDocuments() : [];
    const synced = this.limboDocuments.size === 0 && this.current;
    const newSyncState = synced ? 1 : 0;
    const syncStateChanged = newSyncState !== this.syncState;
    this.syncState = newSyncState;
    if (changes.length === 0 && !syncStateChanged) {
      return { limboChanges };
    } else {
      const snap = new ViewSnapshot(
        this.query,
        docChanges.documentSet,
        oldDocs,
        changes,
        docChanges.mutatedKeys,
        newSyncState === 0,
        syncStateChanged,
        /* excludesMetadataChanges= */
        false,
        targetChange ? targetChange.resumeToken.approximateByteSize() > 0 : false
      );
      return {
        snapshot: snap,
        limboChanges
      };
    }
  }
  /**
   * Applies an OnlineState change to the view, potentially generating a
   * ViewChange if the view's syncState changes as a result.
   */
  applyOnlineStateChange(onlineState) {
    if (this.current && onlineState === "Offline") {
      this.current = false;
      return this.applyChanges(
        {
          documentSet: this.documentSet,
          changeSet: new DocumentChangeSet(),
          mutatedKeys: this.mutatedKeys,
          needsRefill: false
        },
        /* updateLimboDocuments= */
        false
      );
    } else {
      return { limboChanges: [] };
    }
  }
  /**
   * Returns whether the doc for the given key should be in limbo.
   */
  shouldBeInLimbo(key) {
    if (this._syncedDocuments.has(key)) {
      return false;
    }
    if (!this.documentSet.has(key)) {
      return false;
    }
    if (this.documentSet.get(key).hasLocalMutations) {
      return false;
    }
    return true;
  }
  /**
   * Updates syncedDocuments, current, and limbo docs based on the given change.
   * Returns the list of changes to which docs are in limbo.
   */
  applyTargetChange(targetChange) {
    if (targetChange) {
      targetChange.addedDocuments.forEach((key) => this._syncedDocuments = this._syncedDocuments.add(key));
      targetChange.modifiedDocuments.forEach((key) => {
      });
      targetChange.removedDocuments.forEach((key) => this._syncedDocuments = this._syncedDocuments.delete(key));
      this.current = targetChange.current;
    }
  }
  updateLimboDocuments() {
    if (!this.current) {
      return [];
    }
    const oldLimboDocuments = this.limboDocuments;
    this.limboDocuments = documentKeySet();
    this.documentSet.forEach((doc2) => {
      if (this.shouldBeInLimbo(doc2.key)) {
        this.limboDocuments = this.limboDocuments.add(doc2.key);
      }
    });
    const changes = [];
    oldLimboDocuments.forEach((key) => {
      if (!this.limboDocuments.has(key)) {
        changes.push(new RemovedLimboDocument(key));
      }
    });
    this.limboDocuments.forEach((key) => {
      if (!oldLimboDocuments.has(key)) {
        changes.push(new AddedLimboDocument(key));
      }
    });
    return changes;
  }
  /**
   * Update the in-memory state of the current view with the state read from
   * persistence.
   *
   * We update the query view whenever a client's primary status changes:
   * - When a client transitions from primary to secondary, it can miss
   *   LocalStorage updates and its query views may temporarily not be
   *   synchronized with the state on disk.
   * - For secondary to primary transitions, the client needs to update the list
   *   of `syncedDocuments` since secondary clients update their query views
   *   based purely on synthesized RemoteEvents.
   *
   * @param queryResult.documents - The documents that match the query according
   * to the LocalStore.
   * @param queryResult.remoteKeys - The keys of the documents that match the
   * query according to the backend.
   *
   * @returns The ViewChange that resulted from this synchronization.
   */
  // PORTING NOTE: Multi-tab only.
  synchronizeWithPersistedState(queryResult) {
    this._syncedDocuments = queryResult.remoteKeys;
    this.limboDocuments = documentKeySet();
    const docChanges = this.computeDocChanges(queryResult.documents);
    return this.applyChanges(
      docChanges,
      /*updateLimboDocuments=*/
      true
    );
  }
  /**
   * Returns a view snapshot as if this query was just listened to. Contains
   * a document add for every existing document and the `fromCache` and
   * `hasPendingWrites` status of the already established view.
   */
  // PORTING NOTE: Multi-tab only.
  computeInitialSnapshot() {
    return ViewSnapshot.fromInitialDocuments(this.query, this.documentSet, this.mutatedKeys, this.syncState === 0, this.hasCachedResults);
  }
}
function compareChangeType(c1, c2) {
  const order = (change) => {
    switch (change) {
      case 0:
        return 1;
      case 2:
        return 2;
      case 3:
        return 2;
      case 1:
        return 0;
      default:
        return fail();
    }
  };
  return order(c1) - order(c2);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_TAG$3 = "SyncEngine";
class QueryView {
  constructor(query, targetId, view) {
    this.query = query;
    this.targetId = targetId;
    this.view = view;
  }
}
class LimboResolution {
  constructor(key) {
    this.key = key;
    this.receivedDocument = false;
  }
}
class SyncEngineImpl {
  constructor(localStore, remoteStore, eventManager, sharedClientState, currentUser, maxConcurrentLimboResolutions) {
    this.localStore = localStore;
    this.remoteStore = remoteStore;
    this.eventManager = eventManager;
    this.sharedClientState = sharedClientState;
    this.currentUser = currentUser;
    this.maxConcurrentLimboResolutions = maxConcurrentLimboResolutions;
    this.syncEngineListener = {};
    this.queryViewsByQuery = new ObjectMap((q) => canonifyQuery(q), queryEquals);
    this.queriesByTarget = /* @__PURE__ */ new Map();
    this.enqueuedLimboResolutions = /* @__PURE__ */ new Set();
    this.activeLimboTargetsByKey = new SortedMap(DocumentKey.comparator);
    this.activeLimboResolutionsByTarget = /* @__PURE__ */ new Map();
    this.limboDocumentRefs = new ReferenceSet();
    this.mutationUserCallbacks = {};
    this.pendingWritesCallbacks = /* @__PURE__ */ new Map();
    this.limboTargetIdGenerator = TargetIdGenerator.forSyncEngine();
    this.onlineState = "Unknown";
    this._isPrimaryClient = void 0;
  }
  get isPrimaryClient() {
    return this._isPrimaryClient === true;
  }
}
function newSyncEngine(localStore, remoteStore, eventManager, sharedClientState, currentUser, maxConcurrentLimboResolutions, isPrimary) {
  const syncEngine = new SyncEngineImpl(localStore, remoteStore, eventManager, sharedClientState, currentUser, maxConcurrentLimboResolutions);
  if (isPrimary) {
    syncEngine._isPrimaryClient = true;
  }
  return syncEngine;
}
async function syncEngineListen(syncEngine, query) {
  const syncEngineImpl = ensureWatchCallbacks(syncEngine);
  let targetId;
  let viewSnapshot;
  const queryView = syncEngineImpl.queryViewsByQuery.get(query);
  if (queryView) {
    targetId = queryView.targetId;
    syncEngineImpl.sharedClientState.addLocalQueryTarget(targetId);
    viewSnapshot = queryView.view.computeInitialSnapshot();
  } else {
    const targetData = await localStoreAllocateTarget(syncEngineImpl.localStore, queryToTarget(query));
    const status = syncEngineImpl.sharedClientState.addLocalQueryTarget(targetData.targetId);
    targetId = targetData.targetId;
    viewSnapshot = await initializeViewAndComputeSnapshot(syncEngineImpl, query, targetId, status === "current", targetData.resumeToken);
    if (syncEngineImpl.isPrimaryClient) {
      remoteStoreListen(syncEngineImpl.remoteStore, targetData);
    }
  }
  return viewSnapshot;
}
async function initializeViewAndComputeSnapshot(syncEngineImpl, query, targetId, current, resumeToken) {
  syncEngineImpl.applyDocChanges = (queryView, changes, remoteEvent) => applyDocChanges(syncEngineImpl, queryView, changes, remoteEvent);
  const queryResult = await localStoreExecuteQuery(
    syncEngineImpl.localStore,
    query,
    /* usePreviousResults= */
    true
  );
  const view = new View(query, queryResult.remoteKeys);
  const viewDocChanges = view.computeDocChanges(queryResult.documents);
  const synthesizedTargetChange = TargetChange.createSynthesizedTargetChangeForCurrentChange(targetId, current && syncEngineImpl.onlineState !== "Offline", resumeToken);
  const viewChange = view.applyChanges(
    viewDocChanges,
    /* updateLimboDocuments= */
    syncEngineImpl.isPrimaryClient,
    synthesizedTargetChange
  );
  updateTrackedLimbos(syncEngineImpl, targetId, viewChange.limboChanges);
  const data = new QueryView(query, targetId, view);
  syncEngineImpl.queryViewsByQuery.set(query, data);
  if (syncEngineImpl.queriesByTarget.has(targetId)) {
    syncEngineImpl.queriesByTarget.get(targetId).push(query);
  } else {
    syncEngineImpl.queriesByTarget.set(targetId, [query]);
  }
  return viewChange.snapshot;
}
async function syncEngineUnlisten(syncEngine, query) {
  const syncEngineImpl = debugCast(syncEngine);
  const queryView = syncEngineImpl.queryViewsByQuery.get(query);
  const queries = syncEngineImpl.queriesByTarget.get(queryView.targetId);
  if (queries.length > 1) {
    syncEngineImpl.queriesByTarget.set(queryView.targetId, queries.filter((q) => !queryEquals(q, query)));
    syncEngineImpl.queryViewsByQuery.delete(query);
    return;
  }
  if (syncEngineImpl.isPrimaryClient) {
    syncEngineImpl.sharedClientState.removeLocalQueryTarget(queryView.targetId);
    const targetRemainsActive = syncEngineImpl.sharedClientState.isActiveQueryTarget(queryView.targetId);
    if (!targetRemainsActive) {
      await localStoreReleaseTarget(
        syncEngineImpl.localStore,
        queryView.targetId,
        /*keepPersistedTargetData=*/
        false
      ).then(() => {
        syncEngineImpl.sharedClientState.clearQueryState(queryView.targetId);
        remoteStoreUnlisten(syncEngineImpl.remoteStore, queryView.targetId);
        removeAndCleanupTarget(syncEngineImpl, queryView.targetId);
      }).catch(ignoreIfPrimaryLeaseLoss);
    }
  } else {
    removeAndCleanupTarget(syncEngineImpl, queryView.targetId);
    await localStoreReleaseTarget(
      syncEngineImpl.localStore,
      queryView.targetId,
      /*keepPersistedTargetData=*/
      true
    );
  }
}
async function syncEngineWrite(syncEngine, batch, userCallback) {
  const syncEngineImpl = syncEngineEnsureWriteCallbacks(syncEngine);
  try {
    const result = await localStoreWriteLocally(syncEngineImpl.localStore, batch);
    syncEngineImpl.sharedClientState.addPendingMutation(result.batchId);
    addMutationCallback(syncEngineImpl, result.batchId, userCallback);
    await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, result.changes);
    await fillWritePipeline(syncEngineImpl.remoteStore);
  } catch (e) {
    const error = wrapInUserErrorIfRecoverable(e, `Failed to persist write`);
    userCallback.reject(error);
  }
}
async function syncEngineApplyRemoteEvent(syncEngine, remoteEvent) {
  const syncEngineImpl = debugCast(syncEngine);
  try {
    const changes = await localStoreApplyRemoteEventToLocalCache(syncEngineImpl.localStore, remoteEvent);
    remoteEvent.targetChanges.forEach((targetChange, targetId) => {
      const limboResolution = syncEngineImpl.activeLimboResolutionsByTarget.get(targetId);
      if (limboResolution) {
        hardAssert(targetChange.addedDocuments.size + targetChange.modifiedDocuments.size + targetChange.removedDocuments.size <= 1);
        if (targetChange.addedDocuments.size > 0) {
          limboResolution.receivedDocument = true;
        } else if (targetChange.modifiedDocuments.size > 0) {
          hardAssert(limboResolution.receivedDocument);
        } else if (targetChange.removedDocuments.size > 0) {
          hardAssert(limboResolution.receivedDocument);
          limboResolution.receivedDocument = false;
        } else {
        }
      }
    });
    await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes, remoteEvent);
  } catch (error) {
    await ignoreIfPrimaryLeaseLoss(error);
  }
}
function syncEngineApplyOnlineStateChange(syncEngine, onlineState, source) {
  const syncEngineImpl = debugCast(syncEngine);
  if (syncEngineImpl.isPrimaryClient && source === 0 || !syncEngineImpl.isPrimaryClient && source === 1) {
    const newViewSnapshots = [];
    syncEngineImpl.queryViewsByQuery.forEach((query, queryView) => {
      const viewChange = queryView.view.applyOnlineStateChange(onlineState);
      if (viewChange.snapshot) {
        newViewSnapshots.push(viewChange.snapshot);
      }
    });
    eventManagerOnOnlineStateChange(syncEngineImpl.eventManager, onlineState);
    if (newViewSnapshots.length) {
      syncEngineImpl.syncEngineListener.onWatchChange(newViewSnapshots);
    }
    syncEngineImpl.onlineState = onlineState;
    if (syncEngineImpl.isPrimaryClient) {
      syncEngineImpl.sharedClientState.setOnlineState(onlineState);
    }
  }
}
async function syncEngineRejectListen(syncEngine, targetId, err) {
  const syncEngineImpl = debugCast(syncEngine);
  syncEngineImpl.sharedClientState.updateQueryState(targetId, "rejected", err);
  const limboResolution = syncEngineImpl.activeLimboResolutionsByTarget.get(targetId);
  const limboKey = limboResolution && limboResolution.key;
  if (limboKey) {
    let documentUpdates = new SortedMap(DocumentKey.comparator);
    documentUpdates = documentUpdates.insert(limboKey, MutableDocument.newNoDocument(limboKey, SnapshotVersion.min()));
    const resolvedLimboDocuments = documentKeySet().add(limboKey);
    const event = new RemoteEvent(
      SnapshotVersion.min(),
      /* targetChanges= */
      /* @__PURE__ */ new Map(),
      /* targetMismatches= */
      new SortedMap(primitiveComparator),
      documentUpdates,
      resolvedLimboDocuments
    );
    await syncEngineApplyRemoteEvent(syncEngineImpl, event);
    syncEngineImpl.activeLimboTargetsByKey = syncEngineImpl.activeLimboTargetsByKey.remove(limboKey);
    syncEngineImpl.activeLimboResolutionsByTarget.delete(targetId);
    pumpEnqueuedLimboResolutions(syncEngineImpl);
  } else {
    await localStoreReleaseTarget(
      syncEngineImpl.localStore,
      targetId,
      /* keepPersistedTargetData */
      false
    ).then(() => removeAndCleanupTarget(syncEngineImpl, targetId, err)).catch(ignoreIfPrimaryLeaseLoss);
  }
}
async function syncEngineApplySuccessfulWrite(syncEngine, mutationBatchResult) {
  const syncEngineImpl = debugCast(syncEngine);
  const batchId = mutationBatchResult.batch.batchId;
  try {
    const changes = await localStoreAcknowledgeBatch(syncEngineImpl.localStore, mutationBatchResult);
    processUserCallback(
      syncEngineImpl,
      batchId,
      /*error=*/
      null
    );
    triggerPendingWritesCallbacks(syncEngineImpl, batchId);
    syncEngineImpl.sharedClientState.updateMutationState(batchId, "acknowledged");
    await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes);
  } catch (error) {
    await ignoreIfPrimaryLeaseLoss(error);
  }
}
async function syncEngineRejectFailedWrite(syncEngine, batchId, error) {
  const syncEngineImpl = debugCast(syncEngine);
  try {
    const changes = await localStoreRejectBatch(syncEngineImpl.localStore, batchId);
    processUserCallback(syncEngineImpl, batchId, error);
    triggerPendingWritesCallbacks(syncEngineImpl, batchId);
    syncEngineImpl.sharedClientState.updateMutationState(batchId, "rejected", error);
    await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes);
  } catch (error2) {
    await ignoreIfPrimaryLeaseLoss(error2);
  }
}
function triggerPendingWritesCallbacks(syncEngineImpl, batchId) {
  (syncEngineImpl.pendingWritesCallbacks.get(batchId) || []).forEach((callback) => {
    callback.resolve();
  });
  syncEngineImpl.pendingWritesCallbacks.delete(batchId);
}
function rejectOutstandingPendingWritesCallbacks(syncEngineImpl, errorMessage) {
  syncEngineImpl.pendingWritesCallbacks.forEach((callbacks) => {
    callbacks.forEach((callback) => {
      callback.reject(new FirestoreError(Code.CANCELLED, errorMessage));
    });
  });
  syncEngineImpl.pendingWritesCallbacks.clear();
}
function addMutationCallback(syncEngineImpl, batchId, callback) {
  let newCallbacks = syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()];
  if (!newCallbacks) {
    newCallbacks = new SortedMap(primitiveComparator);
  }
  newCallbacks = newCallbacks.insert(batchId, callback);
  syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()] = newCallbacks;
}
function processUserCallback(syncEngine, batchId, error) {
  const syncEngineImpl = debugCast(syncEngine);
  let newCallbacks = syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()];
  if (newCallbacks) {
    const callback = newCallbacks.get(batchId);
    if (callback) {
      if (error) {
        callback.reject(error);
      } else {
        callback.resolve();
      }
      newCallbacks = newCallbacks.remove(batchId);
    }
    syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()] = newCallbacks;
  }
}
function removeAndCleanupTarget(syncEngineImpl, targetId, error = null) {
  syncEngineImpl.sharedClientState.removeLocalQueryTarget(targetId);
  for (const query of syncEngineImpl.queriesByTarget.get(targetId)) {
    syncEngineImpl.queryViewsByQuery.delete(query);
    if (error) {
      syncEngineImpl.syncEngineListener.onWatchError(query, error);
    }
  }
  syncEngineImpl.queriesByTarget.delete(targetId);
  if (syncEngineImpl.isPrimaryClient) {
    const limboKeys = syncEngineImpl.limboDocumentRefs.removeReferencesForId(targetId);
    limboKeys.forEach((limboKey) => {
      const isReferenced = syncEngineImpl.limboDocumentRefs.containsKey(limboKey);
      if (!isReferenced) {
        removeLimboTarget(syncEngineImpl, limboKey);
      }
    });
  }
}
function removeLimboTarget(syncEngineImpl, key) {
  syncEngineImpl.enqueuedLimboResolutions.delete(key.path.canonicalString());
  const limboTargetId = syncEngineImpl.activeLimboTargetsByKey.get(key);
  if (limboTargetId === null) {
    return;
  }
  remoteStoreUnlisten(syncEngineImpl.remoteStore, limboTargetId);
  syncEngineImpl.activeLimboTargetsByKey = syncEngineImpl.activeLimboTargetsByKey.remove(key);
  syncEngineImpl.activeLimboResolutionsByTarget.delete(limboTargetId);
  pumpEnqueuedLimboResolutions(syncEngineImpl);
}
function updateTrackedLimbos(syncEngineImpl, targetId, limboChanges) {
  for (const limboChange of limboChanges) {
    if (limboChange instanceof AddedLimboDocument) {
      syncEngineImpl.limboDocumentRefs.addReference(limboChange.key, targetId);
      trackLimboChange(syncEngineImpl, limboChange);
    } else if (limboChange instanceof RemovedLimboDocument) {
      logDebug(LOG_TAG$3, "Document no longer in limbo: " + limboChange.key);
      syncEngineImpl.limboDocumentRefs.removeReference(limboChange.key, targetId);
      const isReferenced = syncEngineImpl.limboDocumentRefs.containsKey(limboChange.key);
      if (!isReferenced) {
        removeLimboTarget(syncEngineImpl, limboChange.key);
      }
    } else {
      fail();
    }
  }
}
function trackLimboChange(syncEngineImpl, limboChange) {
  const key = limboChange.key;
  const keyString = key.path.canonicalString();
  if (!syncEngineImpl.activeLimboTargetsByKey.get(key) && !syncEngineImpl.enqueuedLimboResolutions.has(keyString)) {
    logDebug(LOG_TAG$3, "New document in limbo: " + key);
    syncEngineImpl.enqueuedLimboResolutions.add(keyString);
    pumpEnqueuedLimboResolutions(syncEngineImpl);
  }
}
function pumpEnqueuedLimboResolutions(syncEngineImpl) {
  while (syncEngineImpl.enqueuedLimboResolutions.size > 0 && syncEngineImpl.activeLimboTargetsByKey.size < syncEngineImpl.maxConcurrentLimboResolutions) {
    const keyString = syncEngineImpl.enqueuedLimboResolutions.values().next().value;
    syncEngineImpl.enqueuedLimboResolutions.delete(keyString);
    const key = new DocumentKey(ResourcePath.fromString(keyString));
    const limboTargetId = syncEngineImpl.limboTargetIdGenerator.next();
    syncEngineImpl.activeLimboResolutionsByTarget.set(limboTargetId, new LimboResolution(key));
    syncEngineImpl.activeLimboTargetsByKey = syncEngineImpl.activeLimboTargetsByKey.insert(key, limboTargetId);
    remoteStoreListen(syncEngineImpl.remoteStore, new TargetData(queryToTarget(newQueryForPath(key.path)), limboTargetId, "TargetPurposeLimboResolution", ListenSequence.INVALID));
  }
}
async function syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngine, changes, remoteEvent) {
  const syncEngineImpl = debugCast(syncEngine);
  const newSnaps = [];
  const docChangesInAllViews = [];
  const queriesProcessed = [];
  if (syncEngineImpl.queryViewsByQuery.isEmpty()) {
    return;
  }
  syncEngineImpl.queryViewsByQuery.forEach((_, queryView) => {
    queriesProcessed.push(syncEngineImpl.applyDocChanges(queryView, changes, remoteEvent).then((viewSnapshot) => {
      if (viewSnapshot || remoteEvent) {
        if (syncEngineImpl.isPrimaryClient) {
          syncEngineImpl.sharedClientState.updateQueryState(queryView.targetId, (viewSnapshot === null || viewSnapshot === void 0 ? void 0 : viewSnapshot.fromCache) ? "not-current" : "current");
        }
      }
      if (!!viewSnapshot) {
        newSnaps.push(viewSnapshot);
        const docChanges = LocalViewChanges.fromSnapshot(queryView.targetId, viewSnapshot);
        docChangesInAllViews.push(docChanges);
      }
    }));
  });
  await Promise.all(queriesProcessed);
  syncEngineImpl.syncEngineListener.onWatchChange(newSnaps);
  await localStoreNotifyLocalViewChanges(syncEngineImpl.localStore, docChangesInAllViews);
}
async function applyDocChanges(syncEngineImpl, queryView, changes, remoteEvent) {
  let viewDocChanges = queryView.view.computeDocChanges(changes);
  if (viewDocChanges.needsRefill) {
    viewDocChanges = await localStoreExecuteQuery(
      syncEngineImpl.localStore,
      queryView.query,
      /* usePreviousResults= */
      false
    ).then(({ documents }) => {
      return queryView.view.computeDocChanges(documents, viewDocChanges);
    });
  }
  const targetChange = remoteEvent && remoteEvent.targetChanges.get(queryView.targetId);
  const viewChange = queryView.view.applyChanges(
    viewDocChanges,
    /* updateLimboDocuments= */
    syncEngineImpl.isPrimaryClient,
    targetChange
  );
  updateTrackedLimbos(syncEngineImpl, queryView.targetId, viewChange.limboChanges);
  return viewChange.snapshot;
}
async function syncEngineHandleCredentialChange(syncEngine, user) {
  const syncEngineImpl = debugCast(syncEngine);
  const userChanged = !syncEngineImpl.currentUser.isEqual(user);
  if (userChanged) {
    logDebug(LOG_TAG$3, "User change. New user:", user.toKey());
    const result = await localStoreHandleUserChange(syncEngineImpl.localStore, user);
    syncEngineImpl.currentUser = user;
    rejectOutstandingPendingWritesCallbacks(syncEngineImpl, "'waitForPendingWrites' promise is rejected due to a user change.");
    syncEngineImpl.sharedClientState.handleUserChange(user, result.removedBatchIds, result.addedBatchIds);
    await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, result.affectedDocuments);
  }
}
function syncEngineGetRemoteKeysForTarget(syncEngine, targetId) {
  const syncEngineImpl = debugCast(syncEngine);
  const limboResolution = syncEngineImpl.activeLimboResolutionsByTarget.get(targetId);
  if (limboResolution && limboResolution.receivedDocument) {
    return documentKeySet().add(limboResolution.key);
  } else {
    let keySet = documentKeySet();
    const queries = syncEngineImpl.queriesByTarget.get(targetId);
    if (!queries) {
      return keySet;
    }
    for (const query of queries) {
      const queryView = syncEngineImpl.queryViewsByQuery.get(query);
      keySet = keySet.unionWith(queryView.view.syncedDocuments);
    }
    return keySet;
  }
}
function ensureWatchCallbacks(syncEngine) {
  const syncEngineImpl = debugCast(syncEngine);
  syncEngineImpl.remoteStore.remoteSyncer.applyRemoteEvent = syncEngineApplyRemoteEvent.bind(null, syncEngineImpl);
  syncEngineImpl.remoteStore.remoteSyncer.getRemoteKeysForTarget = syncEngineGetRemoteKeysForTarget.bind(null, syncEngineImpl);
  syncEngineImpl.remoteStore.remoteSyncer.rejectListen = syncEngineRejectListen.bind(null, syncEngineImpl);
  syncEngineImpl.syncEngineListener.onWatchChange = eventManagerOnWatchChange.bind(null, syncEngineImpl.eventManager);
  syncEngineImpl.syncEngineListener.onWatchError = eventManagerOnWatchError.bind(null, syncEngineImpl.eventManager);
  return syncEngineImpl;
}
function syncEngineEnsureWriteCallbacks(syncEngine) {
  const syncEngineImpl = debugCast(syncEngine);
  syncEngineImpl.remoteStore.remoteSyncer.applySuccessfulWrite = syncEngineApplySuccessfulWrite.bind(null, syncEngineImpl);
  syncEngineImpl.remoteStore.remoteSyncer.rejectFailedWrite = syncEngineRejectFailedWrite.bind(null, syncEngineImpl);
  return syncEngineImpl;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MemoryOfflineComponentProvider {
  constructor() {
    this.synchronizeTabs = false;
  }
  async initialize(cfg) {
    this.serializer = newSerializer(cfg.databaseInfo.databaseId);
    this.sharedClientState = this.createSharedClientState(cfg);
    this.persistence = this.createPersistence(cfg);
    await this.persistence.start();
    this.localStore = this.createLocalStore(cfg);
    this.gcScheduler = this.createGarbageCollectionScheduler(cfg, this.localStore);
    this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(cfg, this.localStore);
  }
  createGarbageCollectionScheduler(cfg, localStore) {
    return null;
  }
  createIndexBackfillerScheduler(cfg, localStore) {
    return null;
  }
  createLocalStore(cfg) {
    return newLocalStore(this.persistence, new QueryEngine(), cfg.initialUser, this.serializer);
  }
  createPersistence(cfg) {
    return new MemoryPersistence(MemoryEagerDelegate.factory, this.serializer);
  }
  createSharedClientState(cfg) {
    return new MemorySharedClientState();
  }
  async terminate() {
    if (this.gcScheduler) {
      this.gcScheduler.stop();
    }
    await this.sharedClientState.shutdown();
    await this.persistence.shutdown();
  }
}
class OnlineComponentProvider {
  async initialize(offlineComponentProvider, cfg) {
    if (this.localStore) {
      return;
    }
    this.localStore = offlineComponentProvider.localStore;
    this.sharedClientState = offlineComponentProvider.sharedClientState;
    this.datastore = this.createDatastore(cfg);
    this.remoteStore = this.createRemoteStore(cfg);
    this.eventManager = this.createEventManager(cfg);
    this.syncEngine = this.createSyncEngine(
      cfg,
      /* startAsPrimary=*/
      !offlineComponentProvider.synchronizeTabs
    );
    this.sharedClientState.onlineStateHandler = (onlineState) => syncEngineApplyOnlineStateChange(
      this.syncEngine,
      onlineState,
      1
      /* OnlineStateSource.SharedClientState */
    );
    this.remoteStore.remoteSyncer.handleCredentialChange = syncEngineHandleCredentialChange.bind(null, this.syncEngine);
    await remoteStoreApplyPrimaryState(this.remoteStore, this.syncEngine.isPrimaryClient);
  }
  createEventManager(cfg) {
    return newEventManager();
  }
  createDatastore(cfg) {
    const serializer = newSerializer(cfg.databaseInfo.databaseId);
    const connection = newConnection(cfg.databaseInfo);
    return newDatastore(cfg.authCredentials, cfg.appCheckCredentials, connection, serializer);
  }
  createRemoteStore(cfg) {
    return newRemoteStore(this.localStore, this.datastore, cfg.asyncQueue, (onlineState) => syncEngineApplyOnlineStateChange(
      this.syncEngine,
      onlineState,
      0
      /* OnlineStateSource.RemoteStore */
    ), newConnectivityMonitor());
  }
  createSyncEngine(cfg, startAsPrimary) {
    return newSyncEngine(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, cfg.initialUser, cfg.maxConcurrentLimboResolutions, startAsPrimary);
  }
  terminate() {
    return remoteStoreShutdown(this.remoteStore);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function validateNonEmptyArgument(functionName, argumentName, argument) {
  if (!argument) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Function ${functionName}() cannot be called with an empty ${argumentName}.`);
  }
}
function validateIsNotUsedTogether(optionName1, argument1, optionName2, argument2) {
  if (argument1 === true && argument2 === true) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `${optionName1} and ${optionName2} cannot be used together.`);
  }
}
function validateDocumentPath(path) {
  if (!DocumentKey.isDocumentKey(path)) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${path} has ${path.length}.`);
  }
}
function validateCollectionPath(path) {
  if (DocumentKey.isDocumentKey(path)) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${path} has ${path.length}.`);
  }
}
function isPlainObject(input) {
  return typeof input === "object" && input !== null && (Object.getPrototypeOf(input) === Object.prototype || Object.getPrototypeOf(input) === null);
}
function valueDescription(input) {
  if (input === void 0) {
    return "undefined";
  } else if (input === null) {
    return "null";
  } else if (typeof input === "string") {
    if (input.length > 20) {
      input = `${input.substring(0, 20)}...`;
    }
    return JSON.stringify(input);
  } else if (typeof input === "number" || typeof input === "boolean") {
    return "" + input;
  } else if (typeof input === "object") {
    if (input instanceof Array) {
      return "an array";
    } else {
      const customObjectName = tryGetCustomObjectType(input);
      if (customObjectName) {
        return `a custom ${customObjectName} object`;
      } else {
        return "an object";
      }
    }
  } else if (typeof input === "function") {
    return "a function";
  } else {
    return fail();
  }
}
function tryGetCustomObjectType(input) {
  if (input.constructor) {
    return input.constructor.name;
  }
  return null;
}
function cast(obj, constructor) {
  if ("_delegate" in obj) {
    obj = obj._delegate;
  }
  if (!(obj instanceof constructor)) {
    if (constructor.name === obj.constructor.name) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?`);
    } else {
      const description = valueDescription(obj);
      throw new FirestoreError(Code.INVALID_ARGUMENT, `Expected type '${constructor.name}', but it was: ${description}`);
    }
  }
  return obj;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AsyncObserver {
  constructor(observer) {
    this.observer = observer;
    this.muted = false;
  }
  next(value) {
    if (this.observer.next) {
      this.scheduleEvent(this.observer.next, value);
    }
  }
  error(error) {
    if (this.observer.error) {
      this.scheduleEvent(this.observer.error, error);
    } else {
      logError("Uncaught Error in snapshot listener:", error.toString());
    }
  }
  mute() {
    this.muted = true;
  }
  scheduleEvent(eventHandler, event) {
    if (!this.muted) {
      setTimeout(() => {
        if (!this.muted) {
          eventHandler(event);
        }
      }, 0);
    }
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_TAG$2 = "FirestoreClient";
const MAX_CONCURRENT_LIMBO_RESOLUTIONS = 100;
const DOM_EXCEPTION_INVALID_STATE = 11;
const DOM_EXCEPTION_ABORTED = 20;
const DOM_EXCEPTION_QUOTA_EXCEEDED = 22;
class FirestoreClient {
  constructor(authCredentials, appCheckCredentials, asyncQueue, databaseInfo) {
    this.authCredentials = authCredentials;
    this.appCheckCredentials = appCheckCredentials;
    this.asyncQueue = asyncQueue;
    this.databaseInfo = databaseInfo;
    this.user = User.UNAUTHENTICATED;
    this.clientId = AutoId.newId();
    this.authCredentialListener = () => Promise.resolve();
    this.appCheckCredentialListener = () => Promise.resolve();
    this.authCredentials.start(asyncQueue, async (user) => {
      logDebug(LOG_TAG$2, "Received user=", user.uid);
      await this.authCredentialListener(user);
      this.user = user;
    });
    this.appCheckCredentials.start(asyncQueue, (newAppCheckToken) => {
      logDebug(LOG_TAG$2, "Received new app check token=", newAppCheckToken);
      return this.appCheckCredentialListener(newAppCheckToken, this.user);
    });
  }
  async getConfiguration() {
    return {
      asyncQueue: this.asyncQueue,
      databaseInfo: this.databaseInfo,
      clientId: this.clientId,
      authCredentials: this.authCredentials,
      appCheckCredentials: this.appCheckCredentials,
      initialUser: this.user,
      maxConcurrentLimboResolutions: MAX_CONCURRENT_LIMBO_RESOLUTIONS
    };
  }
  setCredentialChangeListener(listener) {
    this.authCredentialListener = listener;
  }
  setAppCheckTokenChangeListener(listener) {
    this.appCheckCredentialListener = listener;
  }
  /**
   * Checks that the client has not been terminated. Ensures that other methods on //
   * this class cannot be called after the client is terminated. //
   */
  verifyNotTerminated() {
    if (this.asyncQueue.isShuttingDown) {
      throw new FirestoreError(Code.FAILED_PRECONDITION, "The client has already been terminated.");
    }
  }
  terminate() {
    this.asyncQueue.enterRestrictedMode();
    const deferred = new Deferred();
    this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
      try {
        if (this._onlineComponents) {
          await this._onlineComponents.terminate();
        }
        if (this._offlineComponents) {
          await this._offlineComponents.terminate();
        }
        this.authCredentials.shutdown();
        this.appCheckCredentials.shutdown();
        deferred.resolve();
      } catch (e) {
        const firestoreError = wrapInUserErrorIfRecoverable(e, `Failed to shutdown persistence`);
        deferred.reject(firestoreError);
      }
    });
    return deferred.promise;
  }
}
async function setOfflineComponentProvider(client, offlineComponentProvider) {
  client.asyncQueue.verifyOperationInProgress();
  logDebug(LOG_TAG$2, "Initializing OfflineComponentProvider");
  const configuration = await client.getConfiguration();
  await offlineComponentProvider.initialize(configuration);
  let currentUser = configuration.initialUser;
  client.setCredentialChangeListener(async (user) => {
    if (!currentUser.isEqual(user)) {
      await localStoreHandleUserChange(offlineComponentProvider.localStore, user);
      currentUser = user;
    }
  });
  offlineComponentProvider.persistence.setDatabaseDeletedListener(() => client.terminate());
  client._offlineComponents = offlineComponentProvider;
}
async function setOnlineComponentProvider(client, onlineComponentProvider) {
  client.asyncQueue.verifyOperationInProgress();
  const offlineComponentProvider = await ensureOfflineComponents(client);
  logDebug(LOG_TAG$2, "Initializing OnlineComponentProvider");
  const configuration = await client.getConfiguration();
  await onlineComponentProvider.initialize(offlineComponentProvider, configuration);
  client.setCredentialChangeListener((user) => remoteStoreHandleCredentialChange(onlineComponentProvider.remoteStore, user));
  client.setAppCheckTokenChangeListener((_, user) => remoteStoreHandleCredentialChange(onlineComponentProvider.remoteStore, user));
  client._onlineComponents = onlineComponentProvider;
}
function canFallbackFromIndexedDbError(error) {
  if (error.name === "FirebaseError") {
    return error.code === Code.FAILED_PRECONDITION || error.code === Code.UNIMPLEMENTED;
  } else if (typeof DOMException !== "undefined" && error instanceof DOMException) {
    return (
      // When the browser is out of quota we could get either quota exceeded
      // or an aborted error depending on whether the error happened during
      // schema migration.
      error.code === DOM_EXCEPTION_QUOTA_EXCEEDED || error.code === DOM_EXCEPTION_ABORTED || // Firefox Private Browsing mode disables IndexedDb and returns
      // INVALID_STATE for any usage.
      error.code === DOM_EXCEPTION_INVALID_STATE
    );
  }
  return true;
}
async function ensureOfflineComponents(client) {
  if (!client._offlineComponents) {
    if (client._uninitializedComponentsProvider) {
      logDebug(LOG_TAG$2, "Using user provided OfflineComponentProvider");
      try {
        await setOfflineComponentProvider(client, client._uninitializedComponentsProvider._offline);
      } catch (e) {
        const error = e;
        if (!canFallbackFromIndexedDbError(error)) {
          throw error;
        }
        logWarn("Error using user provided cache. Falling back to memory cache: " + error);
        await setOfflineComponentProvider(client, new MemoryOfflineComponentProvider());
      }
    } else {
      logDebug(LOG_TAG$2, "Using default OfflineComponentProvider");
      await setOfflineComponentProvider(client, new MemoryOfflineComponentProvider());
    }
  }
  return client._offlineComponents;
}
async function ensureOnlineComponents(client) {
  if (!client._onlineComponents) {
    if (client._uninitializedComponentsProvider) {
      logDebug(LOG_TAG$2, "Using user provided OnlineComponentProvider");
      await setOnlineComponentProvider(client, client._uninitializedComponentsProvider._online);
    } else {
      logDebug(LOG_TAG$2, "Using default OnlineComponentProvider");
      await setOnlineComponentProvider(client, new OnlineComponentProvider());
    }
  }
  return client._onlineComponents;
}
function getSyncEngine(client) {
  return ensureOnlineComponents(client).then((c) => c.syncEngine);
}
async function getEventManager(client) {
  const onlineComponentProvider = await ensureOnlineComponents(client);
  const eventManager = onlineComponentProvider.eventManager;
  eventManager.onListen = syncEngineListen.bind(null, onlineComponentProvider.syncEngine);
  eventManager.onUnlisten = syncEngineUnlisten.bind(null, onlineComponentProvider.syncEngine);
  return eventManager;
}
function firestoreClientListen(client, query, options, observer) {
  const wrappedObserver = new AsyncObserver(observer);
  const listener = new QueryListener(query, wrappedObserver, options);
  client.asyncQueue.enqueueAndForget(async () => {
    const eventManager = await getEventManager(client);
    return eventManagerListen(eventManager, listener);
  });
  return () => {
    wrappedObserver.mute();
    client.asyncQueue.enqueueAndForget(async () => {
      const eventManager = await getEventManager(client);
      return eventManagerUnlisten(eventManager, listener);
    });
  };
}
function firestoreClientGetDocumentViaSnapshotListener(client, key, options = {}) {
  const deferred = new Deferred();
  client.asyncQueue.enqueueAndForget(async () => {
    const eventManager = await getEventManager(client);
    return readDocumentViaSnapshotListener(eventManager, client.asyncQueue, key, options, deferred);
  });
  return deferred.promise;
}
function firestoreClientGetDocumentsViaSnapshotListener(client, query, options = {}) {
  const deferred = new Deferred();
  client.asyncQueue.enqueueAndForget(async () => {
    const eventManager = await getEventManager(client);
    return executeQueryViaSnapshotListener(eventManager, client.asyncQueue, query, options, deferred);
  });
  return deferred.promise;
}
function firestoreClientWrite(client, mutations) {
  const deferred = new Deferred();
  client.asyncQueue.enqueueAndForget(async () => {
    const syncEngine = await getSyncEngine(client);
    return syncEngineWrite(syncEngine, mutations, deferred);
  });
  return deferred.promise;
}
function readDocumentViaSnapshotListener(eventManager, asyncQueue, key, options, result) {
  const wrappedObserver = new AsyncObserver({
    next: (snap) => {
      asyncQueue.enqueueAndForget(() => eventManagerUnlisten(eventManager, listener));
      const exists = snap.docs.has(key);
      if (!exists && snap.fromCache) {
        result.reject(new FirestoreError(Code.UNAVAILABLE, "Failed to get document because the client is offline."));
      } else if (exists && snap.fromCache && options && options.source === "server") {
        result.reject(new FirestoreError(Code.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'));
      } else {
        result.resolve(snap);
      }
    },
    error: (e) => result.reject(e)
  });
  const listener = new QueryListener(newQueryForPath(key.path), wrappedObserver, {
    includeMetadataChanges: true,
    waitForSyncWhenOnline: true
  });
  return eventManagerListen(eventManager, listener);
}
function executeQueryViaSnapshotListener(eventManager, asyncQueue, query, options, result) {
  const wrappedObserver = new AsyncObserver({
    next: (snapshot) => {
      asyncQueue.enqueueAndForget(() => eventManagerUnlisten(eventManager, listener));
      if (snapshot.fromCache && options.source === "server") {
        result.reject(new FirestoreError(Code.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)'));
      } else {
        result.resolve(snapshot);
      }
    },
    error: (e) => result.reject(e)
  });
  const listener = new QueryListener(query, wrappedObserver, {
    includeMetadataChanges: true,
    waitForSyncWhenOnline: true
  });
  return eventManagerListen(eventManager, listener);
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function longPollingOptionsEqual(options1, options2) {
  return options1.timeoutSeconds === options2.timeoutSeconds;
}
function cloneLongPollingOptions(options) {
  const clone = {};
  if (options.timeoutSeconds !== void 0) {
    clone.timeoutSeconds = options.timeoutSeconds;
  }
  return clone;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_TAG$1 = "ComponentProvider";
const datastoreInstances = /* @__PURE__ */ new Map();
function removeComponents(firestore) {
  const datastore = datastoreInstances.get(firestore);
  if (datastore) {
    logDebug(LOG_TAG$1, "Removing Datastore");
    datastoreInstances.delete(firestore);
    datastore.terminate();
  }
}
function makeDatabaseInfo(databaseId, appId, persistenceKey, settings) {
  return new DatabaseInfo(databaseId, appId, persistenceKey, settings.host, settings.ssl, settings.experimentalForceLongPolling, settings.experimentalAutoDetectLongPolling, cloneLongPollingOptions(settings.experimentalLongPollingOptions), settings.useFetchStreams);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_HOST = "firestore.googleapis.com";
const DEFAULT_SSL = true;
const MIN_LONG_POLLING_TIMEOUT_SECONDS = 5;
const MAX_LONG_POLLING_TIMEOUT_SECONDS = 30;
const DEFAULT_AUTO_DETECT_LONG_POLLING = true;
class FirestoreSettingsImpl {
  constructor(settings) {
    var _a, _b;
    if (settings.host === void 0) {
      if (settings.ssl !== void 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
      }
      this.host = DEFAULT_HOST;
      this.ssl = DEFAULT_SSL;
    } else {
      this.host = settings.host;
      this.ssl = (_a = settings.ssl) !== null && _a !== void 0 ? _a : DEFAULT_SSL;
    }
    this.credentials = settings.credentials;
    this.ignoreUndefinedProperties = !!settings.ignoreUndefinedProperties;
    this.cache = settings.localCache;
    if (settings.cacheSizeBytes === void 0) {
      this.cacheSizeBytes = LRU_DEFAULT_CACHE_SIZE_BYTES;
    } else {
      if (settings.cacheSizeBytes !== LRU_COLLECTION_DISABLED && settings.cacheSizeBytes < LRU_MINIMUM_CACHE_SIZE_BYTES) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `cacheSizeBytes must be at least ${LRU_MINIMUM_CACHE_SIZE_BYTES}`);
      } else {
        this.cacheSizeBytes = settings.cacheSizeBytes;
      }
    }
    validateIsNotUsedTogether("experimentalForceLongPolling", settings.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", settings.experimentalAutoDetectLongPolling);
    this.experimentalForceLongPolling = !!settings.experimentalForceLongPolling;
    if (this.experimentalForceLongPolling) {
      this.experimentalAutoDetectLongPolling = false;
    } else if (settings.experimentalAutoDetectLongPolling === void 0) {
      this.experimentalAutoDetectLongPolling = DEFAULT_AUTO_DETECT_LONG_POLLING;
    } else {
      this.experimentalAutoDetectLongPolling = !!settings.experimentalAutoDetectLongPolling;
    }
    this.experimentalLongPollingOptions = cloneLongPollingOptions((_b = settings.experimentalLongPollingOptions) !== null && _b !== void 0 ? _b : {});
    validateLongPollingOptions(this.experimentalLongPollingOptions);
    this.useFetchStreams = !!settings.useFetchStreams;
  }
  isEqual(other) {
    return this.host === other.host && this.ssl === other.ssl && this.credentials === other.credentials && this.cacheSizeBytes === other.cacheSizeBytes && this.experimentalForceLongPolling === other.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === other.experimentalAutoDetectLongPolling && longPollingOptionsEqual(this.experimentalLongPollingOptions, other.experimentalLongPollingOptions) && this.ignoreUndefinedProperties === other.ignoreUndefinedProperties && this.useFetchStreams === other.useFetchStreams;
  }
}
function validateLongPollingOptions(options) {
  if (options.timeoutSeconds !== void 0) {
    if (isNaN(options.timeoutSeconds)) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `invalid long polling timeout: ${options.timeoutSeconds} (must not be NaN)`);
    }
    if (options.timeoutSeconds < MIN_LONG_POLLING_TIMEOUT_SECONDS) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `invalid long polling timeout: ${options.timeoutSeconds} (minimum allowed value is ${MIN_LONG_POLLING_TIMEOUT_SECONDS})`);
    }
    if (options.timeoutSeconds > MAX_LONG_POLLING_TIMEOUT_SECONDS) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `invalid long polling timeout: ${options.timeoutSeconds} (maximum allowed value is ${MAX_LONG_POLLING_TIMEOUT_SECONDS})`);
    }
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Firestore$1 {
  /** @hideconstructor */
  constructor(_authCredentials, _appCheckCredentials, _databaseId, _app) {
    this._authCredentials = _authCredentials;
    this._appCheckCredentials = _appCheckCredentials;
    this._databaseId = _databaseId;
    this._app = _app;
    this.type = "firestore-lite";
    this._persistenceKey = "(lite)";
    this._settings = new FirestoreSettingsImpl({});
    this._settingsFrozen = false;
  }
  /**
   * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
   * instance.
   */
  get app() {
    if (!this._app) {
      throw new FirestoreError(Code.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
    }
    return this._app;
  }
  get _initialized() {
    return this._settingsFrozen;
  }
  get _terminated() {
    return this._terminateTask !== void 0;
  }
  _setSettings(settings) {
    if (this._settingsFrozen) {
      throw new FirestoreError(Code.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
    }
    this._settings = new FirestoreSettingsImpl(settings);
    if (settings.credentials !== void 0) {
      this._authCredentials = makeAuthCredentialsProvider(settings.credentials);
    }
  }
  _getSettings() {
    return this._settings;
  }
  _freezeSettings() {
    this._settingsFrozen = true;
    return this._settings;
  }
  _delete() {
    if (!this._terminateTask) {
      this._terminateTask = this._terminate();
    }
    return this._terminateTask;
  }
  /** Returns a JSON-serializable representation of this `Firestore` instance. */
  toJSON() {
    return {
      app: this._app,
      databaseId: this._databaseId,
      settings: this._settings
    };
  }
  /**
   * Terminates all components used by this client. Subclasses can override
   * this method to clean up their own dependencies, but must also call this
   * method.
   *
   * Only ever called once.
   */
  _terminate() {
    removeComponents(this);
    return Promise.resolve();
  }
}
function connectFirestoreEmulator(firestore, host, port, options = {}) {
  var _a;
  firestore = cast(firestore, Firestore$1);
  const settings = firestore._getSettings();
  const newHostSetting = `${host}:${port}`;
  if (settings.host !== DEFAULT_HOST && settings.host !== newHostSetting) {
    logWarn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");
  }
  firestore._setSettings(Object.assign(Object.assign({}, settings), { host: newHostSetting, ssl: false }));
  if (options.mockUserToken) {
    let token;
    let user;
    if (typeof options.mockUserToken === "string") {
      token = options.mockUserToken;
      user = User.MOCK_USER;
    } else {
      token = createMockUserToken(options.mockUserToken, (_a = firestore._app) === null || _a === void 0 ? void 0 : _a.options.projectId);
      const uid = options.mockUserToken.sub || options.mockUserToken.user_id;
      if (!uid) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
      }
      user = new User(uid);
    }
    firestore._authCredentials = new EmulatorAuthCredentialsProvider(new OAuthToken(token, user));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class DocumentReference {
  /** @hideconstructor */
  constructor(firestore, converter, _key) {
    this.converter = converter;
    this._key = _key;
    this.type = "document";
    this.firestore = firestore;
  }
  get _path() {
    return this._key.path;
  }
  /**
   * The document's identifier within its collection.
   */
  get id() {
    return this._key.path.lastSegment();
  }
  /**
   * A string representing the path of the referenced document (relative
   * to the root of the database).
   */
  get path() {
    return this._key.path.canonicalString();
  }
  /**
   * The collection this `DocumentReference` belongs to.
   */
  get parent() {
    return new CollectionReference(this.firestore, this.converter, this._key.path.popLast());
  }
  withConverter(converter) {
    return new DocumentReference(this.firestore, converter, this._key);
  }
}
class Query {
  // This is the lite version of the Query class in the main SDK.
  /** @hideconstructor protected */
  constructor(firestore, converter, _query) {
    this.converter = converter;
    this._query = _query;
    this.type = "query";
    this.firestore = firestore;
  }
  withConverter(converter) {
    return new Query(this.firestore, converter, this._query);
  }
}
class CollectionReference extends Query {
  /** @hideconstructor */
  constructor(firestore, converter, _path) {
    super(firestore, converter, newQueryForPath(_path));
    this._path = _path;
    this.type = "collection";
  }
  /** The collection's identifier. */
  get id() {
    return this._query.path.lastSegment();
  }
  /**
   * A string representing the path of the referenced collection (relative
   * to the root of the database).
   */
  get path() {
    return this._query.path.canonicalString();
  }
  /**
   * A reference to the containing `DocumentReference` if this is a
   * subcollection. If this isn't a subcollection, the reference is null.
   */
  get parent() {
    const parentPath = this._path.popLast();
    if (parentPath.isEmpty()) {
      return null;
    } else {
      return new DocumentReference(
        this.firestore,
        /* converter= */
        null,
        new DocumentKey(parentPath)
      );
    }
  }
  withConverter(converter) {
    return new CollectionReference(this.firestore, converter, this._path);
  }
}
function collection(parent, path, ...pathSegments) {
  parent = getModularInstance(parent);
  validateNonEmptyArgument("collection", "path", path);
  if (parent instanceof Firestore$1) {
    const absolutePath = ResourcePath.fromString(path, ...pathSegments);
    validateCollectionPath(absolutePath);
    return new CollectionReference(
      parent,
      /* converter= */
      null,
      absolutePath
    );
  } else {
    if (!(parent instanceof DocumentReference) && !(parent instanceof CollectionReference)) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    }
    const absolutePath = parent._path.child(ResourcePath.fromString(path, ...pathSegments));
    validateCollectionPath(absolutePath);
    return new CollectionReference(
      parent.firestore,
      /* converter= */
      null,
      absolutePath
    );
  }
}
function doc(parent, path, ...pathSegments) {
  parent = getModularInstance(parent);
  if (arguments.length === 1) {
    path = AutoId.newId();
  }
  validateNonEmptyArgument("doc", "path", path);
  if (parent instanceof Firestore$1) {
    const absolutePath = ResourcePath.fromString(path, ...pathSegments);
    validateDocumentPath(absolutePath);
    return new DocumentReference(
      parent,
      /* converter= */
      null,
      new DocumentKey(absolutePath)
    );
  } else {
    if (!(parent instanceof DocumentReference) && !(parent instanceof CollectionReference)) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    }
    const absolutePath = parent._path.child(ResourcePath.fromString(path, ...pathSegments));
    validateDocumentPath(absolutePath);
    return new DocumentReference(parent.firestore, parent instanceof CollectionReference ? parent.converter : null, new DocumentKey(absolutePath));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_TAG = "AsyncQueue";
class AsyncQueueImpl {
  constructor() {
    this.tail = Promise.resolve();
    this.retryableOps = [];
    this._isShuttingDown = false;
    this.delayedOperations = [];
    this.failure = null;
    this.operationInProgress = false;
    this.skipNonRestrictedTasks = false;
    this.timerIdsToSkip = [];
    this.backoff = new ExponentialBackoff(
      this,
      "async_queue_retry"
      /* TimerId.AsyncQueueRetry */
    );
    this.visibilityHandler = () => {
      this.backoff.skipBackoff();
    };
  }
  get isShuttingDown() {
    return this._isShuttingDown;
  }
  /**
   * Adds a new operation to the queue without waiting for it to complete (i.e.
   * we ignore the Promise result).
   */
  enqueueAndForget(op) {
    this.enqueue(op);
  }
  enqueueAndForgetEvenWhileRestricted(op) {
    this.verifyNotFailed();
    this.enqueueInternal(op);
  }
  enterRestrictedMode(purgeExistingTasks) {
    if (!this._isShuttingDown) {
      this._isShuttingDown = true;
      this.skipNonRestrictedTasks = purgeExistingTasks || false;
    }
  }
  enqueue(op) {
    this.verifyNotFailed();
    if (this._isShuttingDown) {
      return new Promise(() => {
      });
    }
    const task = new Deferred();
    return this.enqueueInternal(() => {
      if (this._isShuttingDown && this.skipNonRestrictedTasks) {
        return Promise.resolve();
      }
      op().then(task.resolve, task.reject);
      return task.promise;
    }).then(() => task.promise);
  }
  enqueueRetryable(op) {
    this.enqueueAndForget(() => {
      this.retryableOps.push(op);
      return this.retryNextOp();
    });
  }
  /**
   * Runs the next operation from the retryable queue. If the operation fails,
   * reschedules with backoff.
   */
  async retryNextOp() {
    if (this.retryableOps.length === 0) {
      return;
    }
    try {
      await this.retryableOps[0]();
      this.retryableOps.shift();
      this.backoff.reset();
    } catch (e) {
      if (isIndexedDbTransactionError(e)) {
        logDebug(LOG_TAG, "Operation failed with retryable error: " + e);
      } else {
        throw e;
      }
    }
    if (this.retryableOps.length > 0) {
      this.backoff.backoffAndRun(() => this.retryNextOp());
    }
  }
  enqueueInternal(op) {
    const newTail = this.tail.then(() => {
      this.operationInProgress = true;
      return op().catch((error) => {
        this.failure = error;
        this.operationInProgress = false;
        const message = getMessageOrStack(error);
        logError("INTERNAL UNHANDLED ERROR: ", message);
        throw error;
      }).then((result) => {
        this.operationInProgress = false;
        return result;
      });
    });
    this.tail = newTail;
    return newTail;
  }
  enqueueAfterDelay(timerId, delayMs, op) {
    this.verifyNotFailed();
    if (this.timerIdsToSkip.indexOf(timerId) > -1) {
      delayMs = 0;
    }
    const delayedOp = DelayedOperation.createAndSchedule(this, timerId, delayMs, op, (removedOp) => this.removeDelayedOperation(removedOp));
    this.delayedOperations.push(delayedOp);
    return delayedOp;
  }
  verifyNotFailed() {
    if (this.failure) {
      fail();
    }
  }
  verifyOperationInProgress() {
  }
  /**
   * Waits until all currently queued tasks are finished executing. Delayed
   * operations are not run.
   */
  async drain() {
    let currentTail;
    do {
      currentTail = this.tail;
      await currentTail;
    } while (currentTail !== this.tail);
  }
  /**
   * For Tests: Determine if a delayed operation with a particular TimerId
   * exists.
   */
  containsDelayedOperation(timerId) {
    for (const op of this.delayedOperations) {
      if (op.timerId === timerId) {
        return true;
      }
    }
    return false;
  }
  /**
   * For Tests: Runs some or all delayed operations early.
   *
   * @param lastTimerId - Delayed operations up to and including this TimerId
   * will be drained. Pass TimerId.All to run all delayed operations.
   * @returns a Promise that resolves once all operations have been run.
   */
  runAllDelayedOperationsUntil(lastTimerId) {
    return this.drain().then(() => {
      this.delayedOperations.sort((a, b) => a.targetTimeMs - b.targetTimeMs);
      for (const op of this.delayedOperations) {
        op.skipDelay();
        if (lastTimerId !== "all" && op.timerId === lastTimerId) {
          break;
        }
      }
      return this.drain();
    });
  }
  /**
   * For Tests: Skip all subsequent delays for a timer id.
   */
  skipDelaysForTimerId(timerId) {
    this.timerIdsToSkip.push(timerId);
  }
  /** Called once a DelayedOperation is run or canceled. */
  removeDelayedOperation(op) {
    const index = this.delayedOperations.indexOf(op);
    this.delayedOperations.splice(index, 1);
  }
}
function newAsyncQueue() {
  return new AsyncQueueImpl();
}
function getMessageOrStack(error) {
  let message = error.message || "";
  if (error.stack) {
    if (error.stack.includes(error.message)) {
      message = error.stack;
    } else {
      message = error.message + "\n" + error.stack;
    }
  }
  return message;
}
class Firestore extends Firestore$1 {
  /** @hideconstructor */
  constructor(authCredentialsProvider, appCheckCredentialsProvider, databaseId, app) {
    super(authCredentialsProvider, appCheckCredentialsProvider, databaseId, app);
    this.type = "firestore";
    this._queue = newAsyncQueue();
    this._persistenceKey = (app === null || app === void 0 ? void 0 : app.name) || "[DEFAULT]";
  }
  _terminate() {
    if (!this._firestoreClient) {
      configureFirestore(this);
    }
    return this._firestoreClient.terminate();
  }
}
function getFirestore(appOrDatabaseId, optionalDatabaseId) {
  const app = typeof appOrDatabaseId === "object" ? appOrDatabaseId : getApp();
  const databaseId = typeof appOrDatabaseId === "string" ? appOrDatabaseId : optionalDatabaseId || DEFAULT_DATABASE_NAME;
  const db = _getProvider(app, "firestore").getImmediate({
    identifier: databaseId
  });
  if (!db._initialized) {
    const emulator = getDefaultEmulatorHostnameAndPort("firestore");
    if (emulator) {
      connectFirestoreEmulator(db, ...emulator);
    }
  }
  return db;
}
function ensureFirestoreConfigured(firestore) {
  if (!firestore._firestoreClient) {
    configureFirestore(firestore);
  }
  firestore._firestoreClient.verifyNotTerminated();
  return firestore._firestoreClient;
}
function configureFirestore(firestore) {
  var _a, _b, _c;
  const settings = firestore._freezeSettings();
  const databaseInfo = makeDatabaseInfo(firestore._databaseId, ((_a = firestore._app) === null || _a === void 0 ? void 0 : _a.options.appId) || "", firestore._persistenceKey, settings);
  firestore._firestoreClient = new FirestoreClient(firestore._authCredentials, firestore._appCheckCredentials, firestore._queue, databaseInfo);
  if (((_b = settings.cache) === null || _b === void 0 ? void 0 : _b._offlineComponentProvider) && ((_c = settings.cache) === null || _c === void 0 ? void 0 : _c._onlineComponentProvider)) {
    firestore._firestoreClient._uninitializedComponentsProvider = {
      _offlineKind: settings.cache.kind,
      _offline: settings.cache._offlineComponentProvider,
      _online: settings.cache._onlineComponentProvider
    };
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerFirestore(variant, useFetchStreams = true) {
  setSDKVersion(SDK_VERSION$1);
  _registerComponent(new Component("firestore", (container, { instanceIdentifier: databaseId, options: settings }) => {
    const app = container.getProvider("app").getImmediate();
    const firestoreInstance = new Firestore(new FirebaseAuthCredentialsProvider(container.getProvider("auth-internal")), new FirebaseAppCheckTokenProvider(container.getProvider("app-check-internal")), databaseIdFromApp(app, databaseId), app);
    settings = Object.assign({ useFetchStreams }, settings);
    firestoreInstance._setSettings(settings);
    return firestoreInstance;
  }, "PUBLIC").setMultipleInstances(true));
  registerVersion(name, version$1, variant);
  registerVersion(name, version$1, "esm2017");
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Bytes {
  /** @hideconstructor */
  constructor(byteString) {
    this._byteString = byteString;
  }
  /**
   * Creates a new `Bytes` object from the given Base64 string, converting it to
   * bytes.
   *
   * @param base64 - The Base64 string used to create the `Bytes` object.
   */
  static fromBase64String(base64) {
    try {
      return new Bytes(ByteString.fromBase64String(base64));
    } catch (e) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e);
    }
  }
  /**
   * Creates a new `Bytes` object from the given Uint8Array.
   *
   * @param array - The Uint8Array used to create the `Bytes` object.
   */
  static fromUint8Array(array) {
    return new Bytes(ByteString.fromUint8Array(array));
  }
  /**
   * Returns the underlying bytes as a Base64-encoded string.
   *
   * @returns The Base64-encoded string created from the `Bytes` object.
   */
  toBase64() {
    return this._byteString.toBase64();
  }
  /**
   * Returns the underlying bytes in a new `Uint8Array`.
   *
   * @returns The Uint8Array created from the `Bytes` object.
   */
  toUint8Array() {
    return this._byteString.toUint8Array();
  }
  /**
   * Returns a string representation of the `Bytes` object.
   *
   * @returns A string representation of the `Bytes` object.
   */
  toString() {
    return "Bytes(base64: " + this.toBase64() + ")";
  }
  /**
   * Returns true if this `Bytes` object is equal to the provided one.
   *
   * @param other - The `Bytes` object to compare against.
   * @returns true if this `Bytes` object is equal to the provided one.
   */
  isEqual(other) {
    return this._byteString.isEqual(other._byteString);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FieldPath {
  /**
   * Creates a `FieldPath` from the provided field names. If more than one field
   * name is provided, the path will point to a nested field in a document.
   *
   * @param fieldNames - A list of field names.
   */
  constructor(...fieldNames) {
    for (let i = 0; i < fieldNames.length; ++i) {
      if (fieldNames[i].length === 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid field name at argument $(i + 1). Field names must not be empty.`);
      }
    }
    this._internalPath = new FieldPath$1(fieldNames);
  }
  /**
   * Returns true if this `FieldPath` is equal to the provided one.
   *
   * @param other - The `FieldPath` to compare against.
   * @returns true if this `FieldPath` is equal to the provided one.
   */
  isEqual(other) {
    return this._internalPath.isEqual(other._internalPath);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FieldValue {
  /**
   * @param _methodName - The public API endpoint that returns this class.
   * @hideconstructor
   */
  constructor(_methodName) {
    this._methodName = _methodName;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class GeoPoint {
  /**
   * Creates a new immutable `GeoPoint` object with the provided latitude and
   * longitude values.
   * @param latitude - The latitude as number between -90 and 90.
   * @param longitude - The longitude as number between -180 and 180.
   */
  constructor(latitude, longitude) {
    if (!isFinite(latitude) || latitude < -90 || latitude > 90) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + latitude);
    }
    if (!isFinite(longitude) || longitude < -180 || longitude > 180) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + longitude);
    }
    this._lat = latitude;
    this._long = longitude;
  }
  /**
   * The latitude of this `GeoPoint` instance.
   */
  get latitude() {
    return this._lat;
  }
  /**
   * The longitude of this `GeoPoint` instance.
   */
  get longitude() {
    return this._long;
  }
  /**
   * Returns true if this `GeoPoint` is equal to the provided one.
   *
   * @param other - The `GeoPoint` to compare against.
   * @returns true if this `GeoPoint` is equal to the provided one.
   */
  isEqual(other) {
    return this._lat === other._lat && this._long === other._long;
  }
  /** Returns a JSON-serializable representation of this GeoPoint. */
  toJSON() {
    return { latitude: this._lat, longitude: this._long };
  }
  /**
   * Actually private to JS consumers of our API, so this function is prefixed
   * with an underscore.
   */
  _compareTo(other) {
    return primitiveComparator(this._lat, other._lat) || primitiveComparator(this._long, other._long);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const RESERVED_FIELD_REGEX = /^__.*__$/;
class ParsedSetData {
  constructor(data, fieldMask, fieldTransforms) {
    this.data = data;
    this.fieldMask = fieldMask;
    this.fieldTransforms = fieldTransforms;
  }
  toMutation(key, precondition) {
    if (this.fieldMask !== null) {
      return new PatchMutation(key, this.data, this.fieldMask, precondition, this.fieldTransforms);
    } else {
      return new SetMutation(key, this.data, precondition, this.fieldTransforms);
    }
  }
}
class ParsedUpdateData {
  constructor(data, fieldMask, fieldTransforms) {
    this.data = data;
    this.fieldMask = fieldMask;
    this.fieldTransforms = fieldTransforms;
  }
  toMutation(key, precondition) {
    return new PatchMutation(key, this.data, this.fieldMask, precondition, this.fieldTransforms);
  }
}
function isWrite(dataSource) {
  switch (dataSource) {
    case 0:
    case 2:
    case 1:
      return true;
    case 3:
    case 4:
      return false;
    default:
      throw fail();
  }
}
class ParseContextImpl {
  /**
   * Initializes a ParseContext with the given source and path.
   *
   * @param settings - The settings for the parser.
   * @param databaseId - The database ID of the Firestore instance.
   * @param serializer - The serializer to use to generate the Value proto.
   * @param ignoreUndefinedProperties - Whether to ignore undefined properties
   * rather than throw.
   * @param fieldTransforms - A mutable list of field transforms encountered
   * while parsing the data.
   * @param fieldMask - A mutable list of field paths encountered while parsing
   * the data.
   *
   * TODO(b/34871131): We don't support array paths right now, so path can be
   * null to indicate the context represents any location within an array (in
   * which case certain features will not work and errors will be somewhat
   * compromised).
   */
  constructor(settings, databaseId, serializer, ignoreUndefinedProperties, fieldTransforms, fieldMask) {
    this.settings = settings;
    this.databaseId = databaseId;
    this.serializer = serializer;
    this.ignoreUndefinedProperties = ignoreUndefinedProperties;
    if (fieldTransforms === void 0) {
      this.validatePath();
    }
    this.fieldTransforms = fieldTransforms || [];
    this.fieldMask = fieldMask || [];
  }
  get path() {
    return this.settings.path;
  }
  get dataSource() {
    return this.settings.dataSource;
  }
  /** Returns a new context with the specified settings overwritten. */
  contextWith(configuration) {
    return new ParseContextImpl(Object.assign(Object.assign({}, this.settings), configuration), this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
  }
  childContextForField(field) {
    var _a;
    const childPath = (_a = this.path) === null || _a === void 0 ? void 0 : _a.child(field);
    const context = this.contextWith({ path: childPath, arrayElement: false });
    context.validatePathSegment(field);
    return context;
  }
  childContextForFieldPath(field) {
    var _a;
    const childPath = (_a = this.path) === null || _a === void 0 ? void 0 : _a.child(field);
    const context = this.contextWith({ path: childPath, arrayElement: false });
    context.validatePath();
    return context;
  }
  childContextForArray(index) {
    return this.contextWith({ path: void 0, arrayElement: true });
  }
  createError(reason) {
    return createError(reason, this.settings.methodName, this.settings.hasConverter || false, this.path, this.settings.targetDoc);
  }
  /** Returns 'true' if 'fieldPath' was traversed when creating this context. */
  contains(fieldPath) {
    return this.fieldMask.find((field) => fieldPath.isPrefixOf(field)) !== void 0 || this.fieldTransforms.find((transform) => fieldPath.isPrefixOf(transform.field)) !== void 0;
  }
  validatePath() {
    if (!this.path) {
      return;
    }
    for (let i = 0; i < this.path.length; i++) {
      this.validatePathSegment(this.path.get(i));
    }
  }
  validatePathSegment(segment) {
    if (segment.length === 0) {
      throw this.createError("Document fields must not be empty");
    }
    if (isWrite(this.dataSource) && RESERVED_FIELD_REGEX.test(segment)) {
      throw this.createError('Document fields cannot begin and end with "__"');
    }
  }
}
class UserDataReader {
  constructor(databaseId, ignoreUndefinedProperties, serializer) {
    this.databaseId = databaseId;
    this.ignoreUndefinedProperties = ignoreUndefinedProperties;
    this.serializer = serializer || newSerializer(databaseId);
  }
  /** Creates a new top-level parse context. */
  createContext(dataSource, methodName, targetDoc, hasConverter = false) {
    return new ParseContextImpl({
      dataSource,
      methodName,
      targetDoc,
      path: FieldPath$1.emptyPath(),
      arrayElement: false,
      hasConverter
    }, this.databaseId, this.serializer, this.ignoreUndefinedProperties);
  }
}
function newUserDataReader(firestore) {
  const settings = firestore._freezeSettings();
  const serializer = newSerializer(firestore._databaseId);
  return new UserDataReader(firestore._databaseId, !!settings.ignoreUndefinedProperties, serializer);
}
function parseSetData(userDataReader, methodName, targetDoc, input, hasConverter, options = {}) {
  const context = userDataReader.createContext(options.merge || options.mergeFields ? 2 : 0, methodName, targetDoc, hasConverter);
  validatePlainObject("Data must be an object, but it was:", context, input);
  const updateData = parseObject(input, context);
  let fieldMask;
  let fieldTransforms;
  if (options.merge) {
    fieldMask = new FieldMask(context.fieldMask);
    fieldTransforms = context.fieldTransforms;
  } else if (options.mergeFields) {
    const validatedFieldPaths = [];
    for (const stringOrFieldPath of options.mergeFields) {
      const fieldPath = fieldPathFromArgument$1(methodName, stringOrFieldPath, targetDoc);
      if (!context.contains(fieldPath)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Field '${fieldPath}' is specified in your field mask but missing from your input data.`);
      }
      if (!fieldMaskContains(validatedFieldPaths, fieldPath)) {
        validatedFieldPaths.push(fieldPath);
      }
    }
    fieldMask = new FieldMask(validatedFieldPaths);
    fieldTransforms = context.fieldTransforms.filter((transform) => fieldMask.covers(transform.field));
  } else {
    fieldMask = null;
    fieldTransforms = context.fieldTransforms;
  }
  return new ParsedSetData(new ObjectValue(updateData), fieldMask, fieldTransforms);
}
class DeleteFieldValueImpl extends FieldValue {
  _toFieldTransform(context) {
    if (context.dataSource === 2) {
      context.fieldMask.push(context.path);
    } else if (context.dataSource === 1) {
      throw context.createError(`${this._methodName}() can only appear at the top level of your update data`);
    } else {
      throw context.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
    }
    return null;
  }
  isEqual(other) {
    return other instanceof DeleteFieldValueImpl;
  }
}
function parseUpdateData(userDataReader, methodName, targetDoc, input) {
  const context = userDataReader.createContext(1, methodName, targetDoc);
  validatePlainObject("Data must be an object, but it was:", context, input);
  const fieldMaskPaths = [];
  const updateData = ObjectValue.empty();
  forEach(input, (key, value) => {
    const path = fieldPathFromDotSeparatedString(methodName, key, targetDoc);
    value = getModularInstance(value);
    const childContext = context.childContextForFieldPath(path);
    if (value instanceof DeleteFieldValueImpl) {
      fieldMaskPaths.push(path);
    } else {
      const parsedValue = parseData(value, childContext);
      if (parsedValue != null) {
        fieldMaskPaths.push(path);
        updateData.set(path, parsedValue);
      }
    }
  });
  const mask = new FieldMask(fieldMaskPaths);
  return new ParsedUpdateData(updateData, mask, context.fieldTransforms);
}
function parseUpdateVarargs(userDataReader, methodName, targetDoc, field, value, moreFieldsAndValues) {
  const context = userDataReader.createContext(1, methodName, targetDoc);
  const keys = [fieldPathFromArgument$1(methodName, field, targetDoc)];
  const values = [value];
  if (moreFieldsAndValues.length % 2 !== 0) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Function ${methodName}() needs to be called with an even number of arguments that alternate between field names and values.`);
  }
  for (let i = 0; i < moreFieldsAndValues.length; i += 2) {
    keys.push(fieldPathFromArgument$1(methodName, moreFieldsAndValues[i]));
    values.push(moreFieldsAndValues[i + 1]);
  }
  const fieldMaskPaths = [];
  const updateData = ObjectValue.empty();
  for (let i = keys.length - 1; i >= 0; --i) {
    if (!fieldMaskContains(fieldMaskPaths, keys[i])) {
      const path = keys[i];
      let value2 = values[i];
      value2 = getModularInstance(value2);
      const childContext = context.childContextForFieldPath(path);
      if (value2 instanceof DeleteFieldValueImpl) {
        fieldMaskPaths.push(path);
      } else {
        const parsedValue = parseData(value2, childContext);
        if (parsedValue != null) {
          fieldMaskPaths.push(path);
          updateData.set(path, parsedValue);
        }
      }
    }
  }
  const mask = new FieldMask(fieldMaskPaths);
  return new ParsedUpdateData(updateData, mask, context.fieldTransforms);
}
function parseData(input, context) {
  input = getModularInstance(input);
  if (looksLikeJsonObject(input)) {
    validatePlainObject("Unsupported field value:", context, input);
    return parseObject(input, context);
  } else if (input instanceof FieldValue) {
    parseSentinelFieldValue(input, context);
    return null;
  } else if (input === void 0 && context.ignoreUndefinedProperties) {
    return null;
  } else {
    if (context.path) {
      context.fieldMask.push(context.path);
    }
    if (input instanceof Array) {
      if (context.settings.arrayElement && context.dataSource !== 4) {
        throw context.createError("Nested arrays are not supported");
      }
      return parseArray(input, context);
    } else {
      return parseScalarValue(input, context);
    }
  }
}
function parseObject(obj, context) {
  const fields = {};
  if (isEmpty(obj)) {
    if (context.path && context.path.length > 0) {
      context.fieldMask.push(context.path);
    }
  } else {
    forEach(obj, (key, val) => {
      const parsedValue = parseData(val, context.childContextForField(key));
      if (parsedValue != null) {
        fields[key] = parsedValue;
      }
    });
  }
  return { mapValue: { fields } };
}
function parseArray(array, context) {
  const values = [];
  let entryIndex = 0;
  for (const entry2 of array) {
    let parsedEntry = parseData(entry2, context.childContextForArray(entryIndex));
    if (parsedEntry == null) {
      parsedEntry = { nullValue: "NULL_VALUE" };
    }
    values.push(parsedEntry);
    entryIndex++;
  }
  return { arrayValue: { values } };
}
function parseSentinelFieldValue(value, context) {
  if (!isWrite(context.dataSource)) {
    throw context.createError(`${value._methodName}() can only be used with update() and set()`);
  }
  if (!context.path) {
    throw context.createError(`${value._methodName}() is not currently supported inside arrays`);
  }
  const fieldTransform = value._toFieldTransform(context);
  if (fieldTransform) {
    context.fieldTransforms.push(fieldTransform);
  }
}
function parseScalarValue(value, context) {
  value = getModularInstance(value);
  if (value === null) {
    return { nullValue: "NULL_VALUE" };
  } else if (typeof value === "number") {
    return toNumber(context.serializer, value);
  } else if (typeof value === "boolean") {
    return { booleanValue: value };
  } else if (typeof value === "string") {
    return { stringValue: value };
  } else if (value instanceof Date) {
    const timestamp = Timestamp.fromDate(value);
    return {
      timestampValue: toTimestamp(context.serializer, timestamp)
    };
  } else if (value instanceof Timestamp) {
    const timestamp = new Timestamp(value.seconds, Math.floor(value.nanoseconds / 1e3) * 1e3);
    return {
      timestampValue: toTimestamp(context.serializer, timestamp)
    };
  } else if (value instanceof GeoPoint) {
    return {
      geoPointValue: {
        latitude: value.latitude,
        longitude: value.longitude
      }
    };
  } else if (value instanceof Bytes) {
    return { bytesValue: toBytes(context.serializer, value._byteString) };
  } else if (value instanceof DocumentReference) {
    const thisDb = context.databaseId;
    const otherDb = value.firestore._databaseId;
    if (!otherDb.isEqual(thisDb)) {
      throw context.createError(`Document reference is for database ${otherDb.projectId}/${otherDb.database} but should be for database ${thisDb.projectId}/${thisDb.database}`);
    }
    return {
      referenceValue: toResourceName(value.firestore._databaseId || context.databaseId, value._key.path)
    };
  } else {
    throw context.createError(`Unsupported field value: ${valueDescription(value)}`);
  }
}
function looksLikeJsonObject(input) {
  return typeof input === "object" && input !== null && !(input instanceof Array) && !(input instanceof Date) && !(input instanceof Timestamp) && !(input instanceof GeoPoint) && !(input instanceof Bytes) && !(input instanceof DocumentReference) && !(input instanceof FieldValue);
}
function validatePlainObject(message, context, input) {
  if (!looksLikeJsonObject(input) || !isPlainObject(input)) {
    const description = valueDescription(input);
    if (description === "an object") {
      throw context.createError(message + " a custom object");
    } else {
      throw context.createError(message + " " + description);
    }
  }
}
function fieldPathFromArgument$1(methodName, path, targetDoc) {
  path = getModularInstance(path);
  if (path instanceof FieldPath) {
    return path._internalPath;
  } else if (typeof path === "string") {
    return fieldPathFromDotSeparatedString(methodName, path);
  } else {
    const message = "Field path arguments must be of type string or ";
    throw createError(
      message,
      methodName,
      /* hasConverter= */
      false,
      /* path= */
      void 0,
      targetDoc
    );
  }
}
const FIELD_PATH_RESERVED = new RegExp("[~\\*/\\[\\]]");
function fieldPathFromDotSeparatedString(methodName, path, targetDoc) {
  const found = path.search(FIELD_PATH_RESERVED);
  if (found >= 0) {
    throw createError(
      `Invalid field path (${path}). Paths must not contain '~', '*', '/', '[', or ']'`,
      methodName,
      /* hasConverter= */
      false,
      /* path= */
      void 0,
      targetDoc
    );
  }
  try {
    return new FieldPath(...path.split("."))._internalPath;
  } catch (e) {
    throw createError(
      `Invalid field path (${path}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      methodName,
      /* hasConverter= */
      false,
      /* path= */
      void 0,
      targetDoc
    );
  }
}
function createError(reason, methodName, hasConverter, path, targetDoc) {
  const hasPath = path && !path.isEmpty();
  const hasDocument = targetDoc !== void 0;
  let message = `Function ${methodName}() called with invalid data`;
  if (hasConverter) {
    message += " (via `toFirestore()`)";
  }
  message += ". ";
  let description = "";
  if (hasPath || hasDocument) {
    description += " (found";
    if (hasPath) {
      description += ` in field ${path}`;
    }
    if (hasDocument) {
      description += ` in document ${targetDoc}`;
    }
    description += ")";
  }
  return new FirestoreError(Code.INVALID_ARGUMENT, message + reason + description);
}
function fieldMaskContains(haystack, needle) {
  return haystack.some((v) => v.isEqual(needle));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class DocumentSnapshot$1 {
  // Note: This class is stripped down version of the DocumentSnapshot in
  // the legacy SDK. The changes are:
  // - No support for SnapshotMetadata.
  // - No support for SnapshotOptions.
  /** @hideconstructor protected */
  constructor(_firestore, _userDataWriter, _key, _document, _converter) {
    this._firestore = _firestore;
    this._userDataWriter = _userDataWriter;
    this._key = _key;
    this._document = _document;
    this._converter = _converter;
  }
  /** Property of the `DocumentSnapshot` that provides the document's ID. */
  get id() {
    return this._key.path.lastSegment();
  }
  /**
   * The `DocumentReference` for the document included in the `DocumentSnapshot`.
   */
  get ref() {
    return new DocumentReference(this._firestore, this._converter, this._key);
  }
  /**
   * Signals whether or not the document at the snapshot's location exists.
   *
   * @returns true if the document exists.
   */
  exists() {
    return this._document !== null;
  }
  /**
   * Retrieves all fields in the document as an `Object`. Returns `undefined` if
   * the document doesn't exist.
   *
   * @returns An `Object` containing all fields in the document or `undefined`
   * if the document doesn't exist.
   */
  data() {
    if (!this._document) {
      return void 0;
    } else if (this._converter) {
      const snapshot = new QueryDocumentSnapshot$1(
        this._firestore,
        this._userDataWriter,
        this._key,
        this._document,
        /* converter= */
        null
      );
      return this._converter.fromFirestore(snapshot);
    } else {
      return this._userDataWriter.convertValue(this._document.data.value);
    }
  }
  /**
   * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
   * document or field doesn't exist.
   *
   * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
   * field.
   * @returns The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  // We are using `any` here to avoid an explicit cast by our users.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(fieldPath) {
    if (this._document) {
      const value = this._document.data.field(fieldPathFromArgument("DocumentSnapshot.get", fieldPath));
      if (value !== null) {
        return this._userDataWriter.convertValue(value);
      }
    }
    return void 0;
  }
}
class QueryDocumentSnapshot$1 extends DocumentSnapshot$1 {
  /**
   * Retrieves all fields in the document as an `Object`.
   *
   * @override
   * @returns An `Object` containing all fields in the document.
   */
  data() {
    return super.data();
  }
}
function fieldPathFromArgument(methodName, arg) {
  if (typeof arg === "string") {
    return fieldPathFromDotSeparatedString(methodName, arg);
  } else if (arg instanceof FieldPath) {
    return arg._internalPath;
  } else {
    return arg._delegate._internalPath;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function validateHasExplicitOrderByForLimitToLast(query) {
  if (query.limitType === "L" && query.explicitOrderBy.length === 0) {
    throw new FirestoreError(Code.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AbstractUserDataWriter {
  convertValue(value, serverTimestampBehavior = "none") {
    switch (typeOrder(value)) {
      case 0:
        return null;
      case 1:
        return value.booleanValue;
      case 2:
        return normalizeNumber(value.integerValue || value.doubleValue);
      case 3:
        return this.convertTimestamp(value.timestampValue);
      case 4:
        return this.convertServerTimestamp(value, serverTimestampBehavior);
      case 5:
        return value.stringValue;
      case 6:
        return this.convertBytes(normalizeByteString(value.bytesValue));
      case 7:
        return this.convertReference(value.referenceValue);
      case 8:
        return this.convertGeoPoint(value.geoPointValue);
      case 9:
        return this.convertArray(value.arrayValue, serverTimestampBehavior);
      case 10:
        return this.convertObject(value.mapValue, serverTimestampBehavior);
      default:
        throw fail();
    }
  }
  convertObject(mapValue, serverTimestampBehavior) {
    return this.convertObjectMap(mapValue.fields, serverTimestampBehavior);
  }
  /**
   * @internal
   */
  convertObjectMap(fields, serverTimestampBehavior = "none") {
    const result = {};
    forEach(fields, (key, value) => {
      result[key] = this.convertValue(value, serverTimestampBehavior);
    });
    return result;
  }
  convertGeoPoint(value) {
    return new GeoPoint(normalizeNumber(value.latitude), normalizeNumber(value.longitude));
  }
  convertArray(arrayValue, serverTimestampBehavior) {
    return (arrayValue.values || []).map((value) => this.convertValue(value, serverTimestampBehavior));
  }
  convertServerTimestamp(value, serverTimestampBehavior) {
    switch (serverTimestampBehavior) {
      case "previous":
        const previousValue = getPreviousValue(value);
        if (previousValue == null) {
          return null;
        }
        return this.convertValue(previousValue, serverTimestampBehavior);
      case "estimate":
        return this.convertTimestamp(getLocalWriteTime(value));
      default:
        return null;
    }
  }
  convertTimestamp(value) {
    const normalizedValue = normalizeTimestamp(value);
    return new Timestamp(normalizedValue.seconds, normalizedValue.nanos);
  }
  convertDocumentKey(name2, expectedDatabaseId) {
    const resourcePath = ResourcePath.fromString(name2);
    hardAssert(isValidResourceName(resourcePath));
    const databaseId = new DatabaseId(resourcePath.get(1), resourcePath.get(3));
    const key = new DocumentKey(resourcePath.popFirst(5));
    if (!databaseId.isEqual(expectedDatabaseId)) {
      logError(`Document ${key} contains a document reference within a different database (${databaseId.projectId}/${databaseId.database}) which is not supported. It will be treated as a reference in the current database (${expectedDatabaseId.projectId}/${expectedDatabaseId.database}) instead.`);
    }
    return key;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function applyFirestoreDataConverter(converter, value, options) {
  let convertedValue;
  if (converter) {
    if (options && (options.merge || options.mergeFields)) {
      convertedValue = converter.toFirestore(value, options);
    } else {
      convertedValue = converter.toFirestore(value);
    }
  } else {
    convertedValue = value;
  }
  return convertedValue;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function isPartialObserver(obj) {
  return implementsAnyMethods(obj, ["next", "error", "complete"]);
}
function implementsAnyMethods(obj, methods) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const object = obj;
  for (const method of methods) {
    if (method in object && typeof object[method] === "function") {
      return true;
    }
  }
  return false;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class SnapshotMetadata {
  /** @hideconstructor */
  constructor(hasPendingWrites, fromCache) {
    this.hasPendingWrites = hasPendingWrites;
    this.fromCache = fromCache;
  }
  /**
   * Returns true if this `SnapshotMetadata` is equal to the provided one.
   *
   * @param other - The `SnapshotMetadata` to compare against.
   * @returns true if this `SnapshotMetadata` is equal to the provided one.
   */
  isEqual(other) {
    return this.hasPendingWrites === other.hasPendingWrites && this.fromCache === other.fromCache;
  }
}
class DocumentSnapshot extends DocumentSnapshot$1 {
  /** @hideconstructor protected */
  constructor(_firestore, userDataWriter, key, document2, metadata, converter) {
    super(_firestore, userDataWriter, key, document2, converter);
    this._firestore = _firestore;
    this._firestoreImpl = _firestore;
    this.metadata = metadata;
  }
  /**
   * Returns whether or not the data exists. True if the document exists.
   */
  exists() {
    return super.exists();
  }
  /**
   * Retrieves all fields in the document as an `Object`. Returns `undefined` if
   * the document doesn't exist.
   *
   * By default, `serverTimestamp()` values that have not yet been
   * set to their final value will be returned as `null`. You can override
   * this by passing an options object.
   *
   * @param options - An options object to configure how data is retrieved from
   * the snapshot (for example the desired behavior for server timestamps that
   * have not yet been set to their final value).
   * @returns An `Object` containing all fields in the document or `undefined` if
   * the document doesn't exist.
   */
  data(options = {}) {
    if (!this._document) {
      return void 0;
    } else if (this._converter) {
      const snapshot = new QueryDocumentSnapshot(
        this._firestore,
        this._userDataWriter,
        this._key,
        this._document,
        this.metadata,
        /* converter= */
        null
      );
      return this._converter.fromFirestore(snapshot, options);
    } else {
      return this._userDataWriter.convertValue(this._document.data.value, options.serverTimestamps);
    }
  }
  /**
   * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
   * document or field doesn't exist.
   *
   * By default, a `serverTimestamp()` that has not yet been set to
   * its final value will be returned as `null`. You can override this by
   * passing an options object.
   *
   * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
   * field.
   * @param options - An options object to configure how the field is retrieved
   * from the snapshot (for example the desired behavior for server timestamps
   * that have not yet been set to their final value).
   * @returns The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  // We are using `any` here to avoid an explicit cast by our users.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(fieldPath, options = {}) {
    if (this._document) {
      const value = this._document.data.field(fieldPathFromArgument("DocumentSnapshot.get", fieldPath));
      if (value !== null) {
        return this._userDataWriter.convertValue(value, options.serverTimestamps);
      }
    }
    return void 0;
  }
}
class QueryDocumentSnapshot extends DocumentSnapshot {
  /**
   * Retrieves all fields in the document as an `Object`.
   *
   * By default, `serverTimestamp()` values that have not yet been
   * set to their final value will be returned as `null`. You can override
   * this by passing an options object.
   *
   * @override
   * @param options - An options object to configure how data is retrieved from
   * the snapshot (for example the desired behavior for server timestamps that
   * have not yet been set to their final value).
   * @returns An `Object` containing all fields in the document.
   */
  data(options = {}) {
    return super.data(options);
  }
}
class QuerySnapshot {
  /** @hideconstructor */
  constructor(_firestore, _userDataWriter, query, _snapshot) {
    this._firestore = _firestore;
    this._userDataWriter = _userDataWriter;
    this._snapshot = _snapshot;
    this.metadata = new SnapshotMetadata(_snapshot.hasPendingWrites, _snapshot.fromCache);
    this.query = query;
  }
  /** An array of all the documents in the `QuerySnapshot`. */
  get docs() {
    const result = [];
    this.forEach((doc2) => result.push(doc2));
    return result;
  }
  /** The number of documents in the `QuerySnapshot`. */
  get size() {
    return this._snapshot.docs.size;
  }
  /** True if there are no documents in the `QuerySnapshot`. */
  get empty() {
    return this.size === 0;
  }
  /**
   * Enumerates all of the documents in the `QuerySnapshot`.
   *
   * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
   * each document in the snapshot.
   * @param thisArg - The `this` binding for the callback.
   */
  forEach(callback, thisArg) {
    this._snapshot.docs.forEach((doc2) => {
      callback.call(thisArg, new QueryDocumentSnapshot(this._firestore, this._userDataWriter, doc2.key, doc2, new SnapshotMetadata(this._snapshot.mutatedKeys.has(doc2.key), this._snapshot.fromCache), this.query.converter));
    });
  }
  /**
   * Returns an array of the documents changes since the last snapshot. If this
   * is the first snapshot, all documents will be in the list as 'added'
   * changes.
   *
   * @param options - `SnapshotListenOptions` that control whether metadata-only
   * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
   * snapshot events.
   */
  docChanges(options = {}) {
    const includeMetadataChanges = !!options.includeMetadataChanges;
    if (includeMetadataChanges && this._snapshot.excludesMetadataChanges) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
    }
    if (!this._cachedChanges || this._cachedChangesIncludeMetadataChanges !== includeMetadataChanges) {
      this._cachedChanges = changesFromSnapshot(this, includeMetadataChanges);
      this._cachedChangesIncludeMetadataChanges = includeMetadataChanges;
    }
    return this._cachedChanges;
  }
}
function changesFromSnapshot(querySnapshot, includeMetadataChanges) {
  if (querySnapshot._snapshot.oldDocs.isEmpty()) {
    let index = 0;
    return querySnapshot._snapshot.docChanges.map((change) => {
      const doc2 = new QueryDocumentSnapshot(querySnapshot._firestore, querySnapshot._userDataWriter, change.doc.key, change.doc, new SnapshotMetadata(querySnapshot._snapshot.mutatedKeys.has(change.doc.key), querySnapshot._snapshot.fromCache), querySnapshot.query.converter);
      change.doc;
      return {
        type: "added",
        doc: doc2,
        oldIndex: -1,
        newIndex: index++
      };
    });
  } else {
    let indexTracker = querySnapshot._snapshot.oldDocs;
    return querySnapshot._snapshot.docChanges.filter(
      (change) => includeMetadataChanges || change.type !== 3
      /* ChangeType.Metadata */
    ).map((change) => {
      const doc2 = new QueryDocumentSnapshot(querySnapshot._firestore, querySnapshot._userDataWriter, change.doc.key, change.doc, new SnapshotMetadata(querySnapshot._snapshot.mutatedKeys.has(change.doc.key), querySnapshot._snapshot.fromCache), querySnapshot.query.converter);
      let oldIndex = -1;
      let newIndex = -1;
      if (change.type !== 0) {
        oldIndex = indexTracker.indexOf(change.doc.key);
        indexTracker = indexTracker.delete(change.doc.key);
      }
      if (change.type !== 1) {
        indexTracker = indexTracker.add(change.doc);
        newIndex = indexTracker.indexOf(change.doc.key);
      }
      return {
        type: resultChangeType(change.type),
        doc: doc2,
        oldIndex,
        newIndex
      };
    });
  }
}
function resultChangeType(type) {
  switch (type) {
    case 0:
      return "added";
    case 2:
    case 3:
      return "modified";
    case 1:
      return "removed";
    default:
      return fail();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getDoc(reference) {
  reference = cast(reference, DocumentReference);
  const firestore = cast(reference.firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientGetDocumentViaSnapshotListener(client, reference._key).then((snapshot) => convertToDocSnapshot(firestore, reference, snapshot));
}
class ExpUserDataWriter extends AbstractUserDataWriter {
  constructor(firestore) {
    super();
    this.firestore = firestore;
  }
  convertBytes(bytes) {
    return new Bytes(bytes);
  }
  convertReference(name2) {
    const key = this.convertDocumentKey(name2, this.firestore._databaseId);
    return new DocumentReference(
      this.firestore,
      /* converter= */
      null,
      key
    );
  }
}
function getDocs(query) {
  query = cast(query, Query);
  const firestore = cast(query.firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  const userDataWriter = new ExpUserDataWriter(firestore);
  validateHasExplicitOrderByForLimitToLast(query._query);
  return firestoreClientGetDocumentsViaSnapshotListener(client, query._query).then((snapshot) => new QuerySnapshot(firestore, userDataWriter, query, snapshot));
}
function setDoc(reference, data, options) {
  reference = cast(reference, DocumentReference);
  const firestore = cast(reference.firestore, Firestore);
  const convertedValue = applyFirestoreDataConverter(reference.converter, data, options);
  const dataReader = newUserDataReader(firestore);
  const parsed = parseSetData(dataReader, "setDoc", reference._key, convertedValue, reference.converter !== null, options);
  const mutation = parsed.toMutation(reference._key, Precondition.none());
  return executeWrite(firestore, [mutation]);
}
function updateDoc(reference, fieldOrUpdateData, value, ...moreFieldsAndValues) {
  reference = cast(reference, DocumentReference);
  const firestore = cast(reference.firestore, Firestore);
  const dataReader = newUserDataReader(firestore);
  fieldOrUpdateData = getModularInstance(fieldOrUpdateData);
  let parsed;
  if (typeof fieldOrUpdateData === "string" || fieldOrUpdateData instanceof FieldPath) {
    parsed = parseUpdateVarargs(dataReader, "updateDoc", reference._key, fieldOrUpdateData, value, moreFieldsAndValues);
  } else {
    parsed = parseUpdateData(dataReader, "updateDoc", reference._key, fieldOrUpdateData);
  }
  const mutation = parsed.toMutation(reference._key, Precondition.exists(true));
  return executeWrite(firestore, [mutation]);
}
function deleteDoc(reference) {
  const firestore = cast(reference.firestore, Firestore);
  const mutations = [new DeleteMutation(reference._key, Precondition.none())];
  return executeWrite(firestore, mutations);
}
function onSnapshot(reference, ...args) {
  var _a, _b, _c;
  reference = getModularInstance(reference);
  let options = {
    includeMetadataChanges: false
  };
  let currArg = 0;
  if (typeof args[currArg] === "object" && !isPartialObserver(args[currArg])) {
    options = args[currArg];
    currArg++;
  }
  const internalOptions = {
    includeMetadataChanges: options.includeMetadataChanges
  };
  if (isPartialObserver(args[currArg])) {
    const userObserver = args[currArg];
    args[currArg] = (_a = userObserver.next) === null || _a === void 0 ? void 0 : _a.bind(userObserver);
    args[currArg + 1] = (_b = userObserver.error) === null || _b === void 0 ? void 0 : _b.bind(userObserver);
    args[currArg + 2] = (_c = userObserver.complete) === null || _c === void 0 ? void 0 : _c.bind(userObserver);
  }
  let observer;
  let firestore;
  let internalQuery;
  if (reference instanceof DocumentReference) {
    firestore = cast(reference.firestore, Firestore);
    internalQuery = newQueryForPath(reference._key.path);
    observer = {
      next: (snapshot) => {
        if (args[currArg]) {
          args[currArg](convertToDocSnapshot(firestore, reference, snapshot));
        }
      },
      error: args[currArg + 1],
      complete: args[currArg + 2]
    };
  } else {
    const query = cast(reference, Query);
    firestore = cast(query.firestore, Firestore);
    internalQuery = query._query;
    const userDataWriter = new ExpUserDataWriter(firestore);
    observer = {
      next: (snapshot) => {
        if (args[currArg]) {
          args[currArg](new QuerySnapshot(firestore, userDataWriter, query, snapshot));
        }
      },
      error: args[currArg + 1],
      complete: args[currArg + 2]
    };
    validateHasExplicitOrderByForLimitToLast(reference._query);
  }
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientListen(client, internalQuery, internalOptions, observer);
}
function executeWrite(firestore, mutations) {
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientWrite(client, mutations);
}
function convertToDocSnapshot(firestore, ref2, snapshot) {
  const doc2 = snapshot.docs.get(ref2._key);
  const userDataWriter = new ExpUserDataWriter(firestore);
  return new DocumentSnapshot(firestore, userDataWriter, ref2._key, doc2, new SnapshotMetadata(snapshot.hasPendingWrites, snapshot.fromCache), ref2.converter);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
registerFirestore("node");
const _initialStatesMap = /* @__PURE__ */ new WeakMap();
function useSSRInitialState(initialState, firebaseApp) {
  if (!_initialStatesMap.has(firebaseApp)) {
    _initialStatesMap.set(
      firebaseApp,
      initialState || { f: {}, r: {}, s: {}, u: {} }
    );
  }
  return _initialStatesMap.get(firebaseApp);
}
function getInitialValue(dataSource, ssrKey, fallbackValue, firebaseApp) {
  if (!dataSource)
    return fallbackValue;
  const [sourceType, path] = getDataSourceInfo(dataSource);
  if (!sourceType)
    return fallbackValue;
  const initialState = useSSRInitialState(void 0, firebaseApp)[sourceType] || {};
  const key = ssrKey || path;
  return key && key in initialState ? initialState[key] : fallbackValue;
}
function deferInitialValueSetup(dataSource, ssrKey, promise, firebaseApp) {
  if (!dataSource)
    return;
  const [sourceType, path] = getDataSourceInfo(dataSource);
  if (!sourceType)
    return;
  const initialState = useSSRInitialState(
    void 0,
    firebaseApp
  )[sourceType];
  const key = ssrKey || path;
  if (key) {
    promise.then((value) => {
      initialState[key] = value;
    }).catch(noop);
    return key;
  }
}
function getDataSourceInfo(dataSource) {
  return isFirestoreDataReference(dataSource) || isFirestoreQuery(dataSource) ? ["f", dataSource.path] : isDatabaseReference(dataSource) ? ["r", dataSource.toString()] : isStorageReference(dataSource) ? ["s", dataSource.toString()] : [];
}
const appPendingPromises = /* @__PURE__ */ new WeakMap();
function addPendingPromise(promise, dataSource, ssrKey) {
  const app = useFirebaseApp$1();
  if (!appPendingPromises.has(app)) {
    appPendingPromises.set(app, /* @__PURE__ */ new Map());
  }
  const pendingPromises = appPendingPromises.get(app);
  const key = deferInitialValueSetup(dataSource, ssrKey, promise, app);
  if (key) {
    pendingPromises.set(key, promise);
  }
  return key ? () => pendingPromises.delete(key) : noop;
}
const firestoreDefaultConverter = {
  toFirestore(data) {
    return data;
  },
  fromFirestore(snapshot, options) {
    return snapshot.exists() ? Object.defineProperties(snapshot.data(options), {
      id: { value: snapshot.id }
      // TODO: check if worth adding or should be through an option
      // It could also be an example in the docs about converters
      // $meta: {
      //   value: snapshot.metadata,
      // },
      // $ref: { get: () => snapshot.ref },
    }) : null;
  }
};
function extractRefs(doc2, oldDoc, subs, options) {
  if (!isPOJO(doc2))
    return [doc2, {}];
  const dataAndRefs = [
    {},
    {}
  ];
  const subsByPath = Object.keys(subs).reduce((resultSubs, subKey) => {
    const sub = subs[subKey];
    resultSubs[sub.path] = sub.data();
    return resultSubs;
  }, {});
  function recursiveExtract(doc22, oldDoc2, path, result) {
    oldDoc2 = oldDoc2 || {};
    const [data, refs] = result;
    Object.getOwnPropertyNames(doc22).forEach((propertyName) => {
      const descriptor = Object.getOwnPropertyDescriptor(doc22, propertyName);
      if (descriptor && !descriptor.enumerable) {
        Object.defineProperty(data, propertyName, descriptor);
      }
    });
    for (const key in doc22) {
      const ref2 = doc22[key];
      if (
        // primitives
        ref2 == null || // TODO: check and remove
        // Firestore < 4.13
        ref2 instanceof Date || ref2 instanceof Timestamp || ref2 instanceof GeoPoint
      ) {
        data[key] = ref2;
      } else if (isDocumentRef(ref2)) {
        const refSubKey = path + key;
        data[key] = // if the ref was already bound, keep the same object
        // otherwise set the path as a string so it can be bound later
        // https://github.com/vuejs/vuefire/issues/831
        // https://github.com/vuejs/vuefire/pull/1223
        refSubKey in subs ? oldDoc2[key] : ref2.path;
        refs[refSubKey] = ref2.converter ? ref2 : ref2.withConverter(
          options.converter
        );
      } else if (Array.isArray(ref2)) {
        data[key] = Array(ref2.length);
        for (let i = 0; i < ref2.length; i++) {
          const newRef = ref2[i];
          if (newRef && newRef.path in subsByPath)
            data[key][i] = subsByPath[newRef.path];
        }
        recursiveExtract(ref2, oldDoc2[key] || data[key], path + key + ".", [
          data[key],
          refs
        ]);
      } else if (isObject(ref2)) {
        data[key] = {};
        recursiveExtract(ref2, oldDoc2[key], path + key + ".", [data[key], refs]);
      } else {
        data[key] = ref2;
      }
    }
  }
  recursiveExtract(doc2, oldDoc, "", dataAndRefs);
  return dataAndRefs;
}
const DEFAULT_OPTIONS = {
  reset: false,
  wait: true,
  maxRefDepth: 2,
  converter: firestoreDefaultConverter,
  snapshotOptions: { serverTimestamps: "estimate" }
};
function unsubscribeAll(subs) {
  for (const sub in subs) {
    subs[sub].unsub();
  }
}
function updateDataFromDocumentSnapshot(options, target, path, snapshot, subs, ops2, depth, resolve, reject) {
  const [data, refs] = extractRefs(
    // Pass snapshot options
    // @ts-expect-error: FIXME: use better types
    snapshot.data(options.snapshotOptions),
    walkGet(target, path),
    subs,
    options
  );
  ops2.set(target, path, data);
  subscribeToRefs(
    options,
    target,
    path,
    subs,
    refs,
    ops2,
    depth,
    resolve,
    reject
  );
}
function subscribeToDocument({
  ref: ref2,
  target,
  path,
  depth,
  resolve,
  reject,
  ops: ops2
}, options) {
  const subs = /* @__PURE__ */ Object.create(null);
  let unbind = noop;
  if (options.once) {
    getDoc(ref2).then((snapshot) => {
      if (snapshot.exists()) {
        updateDataFromDocumentSnapshot(
          options,
          target,
          path,
          snapshot,
          subs,
          ops2,
          depth,
          resolve,
          reject
        );
      } else {
        ops2.set(target, path, null);
        resolve();
      }
    }).catch(reject);
  } else {
    unbind = onSnapshot(
      ref2,
      (snapshot) => {
        if (snapshot.exists()) {
          updateDataFromDocumentSnapshot(
            options,
            target,
            path,
            snapshot,
            subs,
            ops2,
            depth,
            resolve,
            reject
          );
        } else {
          ops2.set(target, path, null);
          resolve();
        }
      },
      reject
    );
  }
  return () => {
    unbind();
    unsubscribeAll(subs);
  };
}
function subscribeToRefs(options, target, path, subs, refs, ops2, depth, resolve, reject) {
  const refKeys = Object.keys(refs);
  const missingKeys = Object.keys(subs).filter(
    (refKey) => refKeys.indexOf(refKey) < 0
  );
  missingKeys.forEach((refKey) => {
    subs[refKey].unsub();
    delete subs[refKey];
  });
  if (!refKeys.length || ++depth > options.maxRefDepth)
    return resolve(path);
  let resolvedCount = 0;
  const totalToResolve = refKeys.length;
  const validResolves = /* @__PURE__ */ Object.create(null);
  function deepResolve(key) {
    if (key in validResolves) {
      if (++resolvedCount >= totalToResolve)
        resolve(path);
    }
  }
  refKeys.forEach((refKey) => {
    const sub = subs[refKey];
    const ref2 = refs[refKey];
    const docPath = `${path}.${refKey}`;
    validResolves[docPath] = true;
    if (sub) {
      if (sub.path !== ref2.path)
        sub.unsub();
      else
        return;
    }
    subs[refKey] = {
      data: () => walkGet(target, docPath),
      unsub: subscribeToDocument(
        {
          ref: ref2,
          target,
          path: docPath,
          depth,
          ops: ops2,
          resolve: deepResolve.bind(null, docPath),
          reject
        },
        options
      ),
      path: ref2.path
    };
  });
}
function bindCollection(target, collection2, ops2, resolve, reject, extraOptions) {
  const options = Object.assign({}, DEFAULT_OPTIONS, extraOptions);
  const { snapshotListenOptions, snapshotOptions, wait, once } = options;
  const key = "value";
  let arrayRef = ref(wait ? [] : target.value);
  if (!wait)
    ops2.set(target, key, []);
  const originalResolve = resolve;
  let isResolved;
  let stopOnSnapshot = noop;
  const arraySubs = [];
  const change = {
    added: ({ newIndex, doc: doc2 }) => {
      arraySubs.splice(newIndex, 0, /* @__PURE__ */ Object.create(null));
      const subs = arraySubs[newIndex];
      const [data, refs] = extractRefs(
        // @ts-expect-error: FIXME: wrong cast, needs better types
        doc2.data(snapshotOptions),
        void 0,
        subs,
        options
      );
      ops2.add(unref(arrayRef), newIndex, data);
      subscribeToRefs(
        options,
        arrayRef,
        `${key}.${newIndex}`,
        subs,
        refs,
        ops2,
        0,
        resolve.bind(null, doc2),
        reject
      );
    },
    modified: ({ oldIndex, newIndex, doc: doc2 }) => {
      const array = unref(arrayRef);
      const subs = arraySubs[oldIndex];
      const oldData = array[oldIndex];
      const [data, refs] = extractRefs(
        // @ts-expect-error: FIXME: Better types
        doc2.data(snapshotOptions),
        oldData,
        subs,
        options
      );
      arraySubs.splice(newIndex, 0, subs);
      ops2.remove(array, oldIndex);
      ops2.add(array, newIndex, data);
      subscribeToRefs(
        options,
        arrayRef,
        `${key}.${newIndex}`,
        subs,
        refs,
        ops2,
        0,
        resolve,
        reject
      );
    },
    removed: ({ oldIndex }) => {
      const array = unref(arrayRef);
      ops2.remove(array, oldIndex);
      unsubscribeAll(arraySubs.splice(oldIndex, 1)[0]);
    }
  };
  function onSnapshotCallback(snapshot) {
    const docChanges = snapshot.docChanges(snapshotListenOptions);
    if (!isResolved && docChanges.length) {
      isResolved = true;
      let count = 0;
      const expectedItems = docChanges.length;
      const validDocs = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < expectedItems; i++) {
        validDocs[docChanges[i].doc.id] = true;
      }
      resolve = (data) => {
        if (data && data.id in validDocs) {
          if (++count >= expectedItems) {
            if (wait) {
              ops2.set(target, key, unref(arrayRef));
              arrayRef = target;
            }
            originalResolve(unref(arrayRef));
            resolve = noop;
          }
        }
      };
    }
    docChanges.forEach((c) => {
      change[c.type](c);
    });
    if (!docChanges.length) {
      if (wait) {
        ops2.set(target, key, unref(arrayRef));
        arrayRef = target;
      }
      resolve(unref(arrayRef));
    }
  }
  if (once) {
    getDocs(collection2).then(onSnapshotCallback).catch(reject);
  } else {
    stopOnSnapshot = onSnapshot(collection2, onSnapshotCallback, reject);
  }
  return (reset) => {
    stopOnSnapshot();
    if (reset) {
      const value = typeof reset === "function" ? reset() : [];
      ops2.set(target, key, value);
    }
    arraySubs.forEach(unsubscribeAll);
  };
}
function bindDocument(target, document2, ops2, resolve, reject, extraOptions) {
  const options = Object.assign({}, DEFAULT_OPTIONS, extraOptions);
  const key = "value";
  const subs = /* @__PURE__ */ Object.create(null);
  resolve = callOnceWithArg(resolve, () => walkGet(target, key));
  let stopOnSnapshot = noop;
  function onSnapshotCallback(snapshot) {
    if (snapshot.exists()) {
      updateDataFromDocumentSnapshot(
        options,
        target,
        key,
        snapshot,
        subs,
        ops2,
        0,
        resolve,
        reject
      );
    } else {
      ops2.set(target, key, null);
      resolve(null);
    }
  }
  if (options.once) {
    getDoc(document2).then(onSnapshotCallback).catch(reject);
  } else {
    stopOnSnapshot = onSnapshot(document2, onSnapshotCallback, reject);
  }
  return (reset) => {
    stopOnSnapshot();
    if (reset) {
      const value = typeof reset === "function" ? reset() : null;
      ops2.set(target, key, value);
    }
    unsubscribeAll(subs);
  };
}
function _useFirestoreRef(docOrCollectionRef, localOptions) {
  let unbind = noop;
  const options = Object.assign({}, DEFAULT_OPTIONS, localOptions);
  const initialSourceValue = unref(docOrCollectionRef);
  const data = options.target || ref();
  if (isSSR()) {
    options.once = true;
  }
  const initialValue = getInitialValue(
    initialSourceValue,
    options.ssrKey,
    data.value,
    useFirebaseApp$1()
  );
  data.value = initialValue;
  const hasInitialValue = isCollectionRef(initialSourceValue) ? (initialValue || []).length > 0 : initialValue !== void 0;
  let shouldStartAsPending = !hasInitialValue;
  const pending = ref(false);
  const error = ref();
  const promise = shallowRef();
  const hasCurrentScope = getCurrentScope();
  let removePendingPromise = noop;
  function bindFirestoreRef() {
    let docRefValue = unref(docOrCollectionRef);
    const newPromise = new Promise((resolve, reject) => {
      unbind(options.reset);
      if (!docRefValue) {
        unbind = noop;
        return resolve(null);
      }
      pending.value = shouldStartAsPending;
      shouldStartAsPending = true;
      if (!docRefValue.converter) {
        docRefValue = docRefValue.withConverter(
          // @ts-expect-error: seems like a ts error
          options.converter
        );
      }
      unbind = (isDocumentRef(docRefValue) ? bindDocument : bindCollection)(
        // @ts-expect-error: cannot type with the ternary
        data,
        docRefValue,
        ops,
        resolve,
        reject,
        options
      );
    }).catch((reason) => {
      if (promise.value === newPromise) {
        error.value = reason;
      }
      return Promise.reject(reason);
    }).finally(() => {
      if (promise.value === newPromise) {
        pending.value = false;
      }
    });
    promise.value = newPromise;
  }
  let stopWatcher = noop;
  if (isRef(docOrCollectionRef)) {
    stopWatcher = watch(docOrCollectionRef, bindFirestoreRef);
  }
  bindFirestoreRef();
  if (initialSourceValue) {
    removePendingPromise = addPendingPromise(
      promise.value,
      initialSourceValue,
      options.ssrKey
    );
  }
  if (getCurrentInstance()) {
    onServerPrefetch(() => promise.value);
  }
  if (hasCurrentScope) {
    onScopeDispose(stop);
  }
  function stop(reset = options.reset) {
    stopWatcher();
    removePendingPromise();
    unbind(reset);
  }
  return Object.defineProperties(data, {
    error: { get: () => error },
    data: { get: () => data },
    pending: { get: () => pending },
    promise: { get: () => promise },
    stop: { get: () => stop }
  });
}
const ops = {
  set: (target, key, value) => walkSet(target, key, value),
  add: (array, index, data) => array.splice(index, 0, data),
  remove: (array, index) => array.splice(index, 1)
};
function useCollection(collectionRef, options) {
  return _useFirestoreRef(collectionRef, {
    target: ref([]),
    ...options
  });
}
function useFirestore(name2) {
  return getFirestore(useFirebaseApp$1(name2));
}
function VueFire(app, { firebaseApp, modules = [] }) {
  app.provide(_FirebaseAppInjectionKey, firebaseApp);
  for (const firebaseModule of modules) {
    app.use(firebaseModule.bind(null, firebaseApp));
  }
}
const useFirebaseApp = () => useNuxtApp().$firebaseApp;
const getCurrentUser = (name2) => (
  // This makes the `getCurrentUser()` function work by default in more places when using the Nuxt module
  getCurrentUser$1(name2 ?? useFirebaseApp().name)
);
const auth_45global = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  console.log("MIDDLEWARE ACTIVE");
  const user = ([__temp, __restore] = executeAsync(() => getCurrentUser()), __temp = await __temp, __restore(), __temp);
  if (!user)
    signIn();
});
const signIn = async () => {
  const auth = getAuth$1();
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
};
const globalMiddleware = [
  validate,
  auth_45global
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b;
    let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        var _a2;
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
        return (_a2 = routerOptions.scrollBehavior) == null ? void 0 : _a2.call(routerOptions, to, START_LOCATION, startPosition || savedPosition);
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      route[key] = computed(() => _route.value[key]);
    }
    nuxtApp._route = reactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const initialLayout = useState("_layout");
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout.value;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          if (Array.isArray(componentMiddleware)) {
            for (const entry2 of componentMiddleware) {
              middlewareEntries.add(entry2);
            }
          } else {
            middlewareEntries.add(componentMiddleware);
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$2({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(() => {
      delete nuxtApp._processingMiddleware;
    });
    router.afterEach(async (to, _from, failure) => {
      var _a2;
      delete nuxtApp._processingMiddleware;
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0 && !((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        await nuxtApp.runWithContext(() => showError(createError$2({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })));
      } else if (to.redirectedFrom) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #4982
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
}, 1);
function log(...args) {
  const [typeOrLog, ...rest] = args;
  if (isLogType(typeOrLog)) {
    console[typeOrLog]("[nuxt-vuefire]:", ...rest);
  } else {
    console.log("[nuxt-vuefire]:", ...args);
  }
}
function isLogType(logType) {
  return logType === "debug" || logType === "info" || logType === "warn" || logType === "error" || logType === "trace";
}
const plugin_server_VRwXoZVCSq = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  var _a;
  const appConfig2 = useAppConfig();
  const { firebaseAdmin } = appConfig2;
  if (typeof (firebaseAdmin == null ? void 0 : firebaseAdmin.serviceAccount) === "string") {
    (_a = process.env).GOOGLE_APPLICATION_CREDENTIALS || (_a.GOOGLE_APPLICATION_CREDENTIALS = firebaseAdmin.serviceAccount);
  }
  if (!getApps().length) {
    const {
      // these can be set by the user on other platforms
      FIREBASE_PROJECT_ID,
      FIREBASE_CLIENT_EMAIL,
      FIREBASE_PRIVATE_KEY,
      // set on firebase cloud functions
      FIREBASE_CONFIG,
      // in cloud functions, we can auto initialize
      FUNCTION_NAME
    } = process.env;
    if (FIREBASE_CONFIG || FUNCTION_NAME) {
      log("debug", "using FIREBASE_CONFIG env variable");
      initializeApp$1();
    } else {
      let credential;
      if (FIREBASE_PRIVATE_KEY) {
        log("debug", "using FIREBASE_PRIVATE_KEY env variable");
        credential = cert({
          projectId: FIREBASE_PROJECT_ID,
          clientEmail: FIREBASE_CLIENT_EMAIL,
          // replace `\` and `n` character pairs w/ single `\n` character
          privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        });
      } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        log("debug", "using GOOGLE_APPLICATION_CREDENTIALS env variable");
        credential = applicationDefault();
      } else if (typeof (firebaseAdmin == null ? void 0 : firebaseAdmin.serviceAccount) === "object" && firebaseAdmin.serviceAccount != null) {
        credential = cert(firebaseAdmin.serviceAccount);
      } else {
        log(
          "warn",
          `You must provide an "admin.serviceAccount" path to your json so it's picked up during development. See https://firebase.google.com/docs/admin/setup#initialize-sdk for more information. Note that you can also set the GOOGLE_APPLICATION_CREDENTIALS env variable to a full resolved path or a JSON string.
You can also set the FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY and FIREBASE_PROJECT_ID env variables in production if you are deploying to something else than Firebase Cloud Functions.
`
        );
        throw new Error("admin-app/missing-credentials");
      }
      initializeApp$1({
        // TODO: is this really going to be used?
        ...firebaseAdmin == null ? void 0 : firebaseAdmin.options,
        credential
      });
    }
  }
  const firebaseAdminApp = getApp$1();
  return {
    provide: {
      firebaseAdminApp
    }
  };
});
function VueFireAuthServer(firebaseApp, app, userRecord) {
  const user = getGlobalScope(firebaseApp, app).run(
    () => ref(userRecord)
  );
  authUserMap.set(firebaseApp, user);
  _setInitialUser(firebaseApp, user);
}
function createServerUser(userRecord) {
  if (!userRecord)
    return null;
  const user = userRecord.toJSON();
  return {
    ...user,
    // these seem to be type mismatches within firebase source code
    tenantId: user.tenantId || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    email: user.email || null,
    phoneNumber: user.phoneNumber || null,
    delete: InvalidServerFunction("delete"),
    getIdToken: InvalidServerFunction("getIdToken"),
    getIdTokenResult: InvalidServerFunction("getIdTokenResult"),
    reload: InvalidServerFunction("reload"),
    toJSON: InvalidServerFunction("toJSON"),
    get isAnonymous() {
      return warnInvalidServerGetter("isAnonymous", false);
    },
    get refreshToken() {
      return warnInvalidServerGetter("refreshToken", "");
    },
    get providerId() {
      return warnInvalidServerGetter("providerId", "");
    }
  };
}
function InvalidServerFunction(name2) {
  return () => {
    throw new Error(
      `The function User.${name2}() is not available on the server.`
    );
  };
}
function warnInvalidServerGetter(name2, value) {
  console.warn(
    `The getter User.${name2} is not available on the server. It will return ${String(
      value
    )}.`
  );
  return value;
}
const UserSymbol = Symbol("user");
const plugin_auth_user_server_cH1eeY3RPG = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  let __temp, __restore;
  const event = useRequestEvent();
  const token = getCookie(event, AUTH_COOKIE_NAME);
  let user;
  if (token) {
    const adminApp = nuxtApp.$firebaseAdminApp;
    const adminAuth = getAuth(adminApp);
    try {
      const decodedToken = ([__temp, __restore] = executeAsync(() => adminAuth.verifyIdToken(token)), __temp = await __temp, __restore(), __temp);
      user = ([__temp, __restore] = executeAsync(() => adminAuth.getUser(decodedToken.uid)), __temp = await __temp, __restore(), __temp);
    } catch (err) {
      if (isFirebaseError(err) && err.code === "auth/id-token-expired") {
        log("info", "Token expired -", err);
      } else {
        log("error", "Unknown Error -", err);
      }
    }
  }
  nuxtApp.payload.vuefireUser = user == null ? void 0 : user.toJSON();
  nuxtApp[
    // we cannot use symbol to index
    UserSymbol
  ] = createServerUser(user);
}, 1);
function isFirebaseError(err) {
  return err != null && "code" in err;
}
const AUTH_COOKIE_NAME = "__session";
const LRU_MAX_INSTANCES = 100;
const LRU_TTL = 1e3 * 60 * 5;
const appCache = new LRU({
  max: LRU_MAX_INSTANCES,
  ttl: LRU_TTL,
  allowStale: true,
  updateAgeOnGet: true,
  dispose: (value) => {
    deleteApp(value);
  }
});
const plugin_server_8qtf9Tc4Ip = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const appConfig2 = useAppConfig();
  const user = nuxtApp[
    // we cannot use a symbol to index
    UserSymbol
  ];
  const uid = user == null ? void 0 : user.uid;
  let firebaseApp;
  if (uid) {
    if (!appCache.has(uid)) {
      const randomId = Math.random().toString(36).slice(2);
      const appName = `auth:${user.uid}:${randomId}`;
      appCache.set(uid, initializeApp(appConfig2.firebaseConfig, appName));
    }
    firebaseApp = appCache.get(uid);
  } else {
    firebaseApp = initializeApp(appConfig2.firebaseConfig);
  }
  return {
    provide: {
      firebaseApp
    }
  };
});
const templates_plugin_579e6099_fyrFlmwZJT = defineNuxtPlugin((nuxtApp) => {
  useAppConfig();
  const firebaseApp = nuxtApp.$firebaseApp;
  nuxtApp.vueApp.use(VueFire, { firebaseApp });
  {
    nuxtApp.payload.vuefire = useSSRInitialState(void 0, firebaseApp);
  }
});
const plugin_server_nmC6mBHyV3 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const firebaseApp = nuxtApp.$firebaseApp;
  const user = nuxtApp[
    // we cannot use symbol to index
    UserSymbol
  ];
  VueFireAuthServer(firebaseApp, nuxtApp.vueApp, user);
});
const firebaseConfig = {
  apiKey: "AIzaSyCv2SZo5e62v566bJOgLRPe5erL7VCUGok",
  authDomain: "cygnicompetencehub.firebaseapp.com",
  projectId: "cygnicompetencehub",
  storageBucket: "cygnicompetencehub.appspot.com",
  messagingSenderId: "225273337132",
  appId: "1:225273337132:web:161ab4d7909b78531e0889",
  measurementId: "G-JY96C7V423"
};
initializeApp(firebaseConfig);
const firebase_Tc1lVUbp7M = /* @__PURE__ */ defineNuxtPlugin(() => {
});
const _plugins = [
  plugin$1,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  unhead_KgADcZ0jPj,
  plugin,
  plugin_server_VRwXoZVCSq,
  plugin_auth_user_server_cH1eeY3RPG,
  plugin_server_8qtf9Tc4Ip,
  templates_plugin_579e6099_fyrFlmwZJT,
  plugin_server_nmC6mBHyV3,
  firebase_Tc1lVUbp7M
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
const layouts = {
  default: () => import('./_nuxt/default-8375f67a.mjs').then((m) => m.default || m)
};
const LayoutLoader = /* @__PURE__ */ defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    ...{}
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => {
      return h(LayoutComponent, context.attrs, context.slots);
    };
  }
});
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject("_route");
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => unref(props.name) ?? route.meta.layout ?? "default");
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && {
          key: layout.value,
          name: layout.value,
          ...{},
          ...context.attrs
        }, context.slots).default()
      }).default();
    };
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const __nuxt_component_1 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(RouteProvider, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  // TODO: Type props
  // eslint-disable-next-line vue/require-prop-types
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div id="Main"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { id: "Main" }, [
            createVNode(_component_NuxtPage)
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-component-d8d97e70.mjs').then((r) => r.default || r));
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-46a80d2e.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, collection as a, useFirestore as b, createError$1 as c, defineStore as d, entry$1 as default, setDoc as e, doc as f, updateDoc as g, deleteDoc as h, useRouter as i, navigateTo as n, storeToRefs as s, useCollection as u };
//# sourceMappingURL=server.mjs.map
