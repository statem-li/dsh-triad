/**
 * dsh-triad — browser half smoke test.
 *
 * Executes `lib/client.js` under a stubbed DSH client environment and asserts:
 *   1. it registers exactly one `__ModuleLoader__` entry with the right id
 *   2. the factory exports `apply` (function) and `inject` (array)
 *   3. `apply(ctx)` runs all three modules without throwing
 *
 * Usage: node scripts/smoke-client.mjs
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const CLIENT = resolve(ROOT, 'lib/client.js')

/** Stand-in for any React component export. */
function stubComponent(name) {
  const Comp = () => ({ __stub: name })
  Object.defineProperty(Comp, 'name', { value: name })
  return Comp
}

/**
 * Minimal DOM node. The nav-row mounting code walks the real sidebar with
 * `compareDocumentPosition`, so the stub has to answer it or the memory
 * module bails out before reaching the interesting code paths.
 */
function stubNode(tag = 'div') {
  const node = {
    tagName: String(tag).toUpperCase(),
    children: [],
    style: {},
    dataset: {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
    attrs: {},
    appendChild(child) { node.children.push(child); return child },
    insertBefore(child) { node.children.unshift(child); return child },
    removeChild(child) {
      const i = node.children.indexOf(child)
      if (i >= 0) node.children.splice(i, 1)
      return child
    },
    remove() {},
    setAttribute(k, v) { node.attrs[k] = v },
    getAttribute(k) { return node.attrs[k] ?? null },
    removeAttribute(k) { delete node.attrs[k] },
    addEventListener() {},
    removeEventListener() {},
    querySelector: () => null,
    querySelectorAll: () => [],
    getBoundingClientRect: () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 }),
    contains: () => false,
    compareDocumentPosition: () => 0,
    getRootNode: () => sandbox.document,
    focus: () => {},
    click: () => {},
  }
  return node
}

/** Everything the bundle may ask the platform for. */
const MODULES = {
  'react': Object.assign(
    // Any unknown export resolves to a stub component (covers icon sets etc).
    new Proxy({}, {
      get: (_t, prop) => (typeof prop === 'string' ? stubComponent(String(prop)) : undefined),
      has: () => true,
    }),
    {
      createElement: (type, props, ...children) => ({ type, props, children }),
      cloneElement: (el) => el,
      isValidElement: () => false,
      Children: { map: () => [], forEach: () => {}, count: () => 0, toArray: () => [] },
      Fragment: Symbol('Fragment'),
      StrictMode: stubComponent('StrictMode'),
      Suspense: stubComponent('Suspense'),
      memo: (comp) => comp,
      forwardRef: (render) => render,
      lazy: () => stubComponent('Lazy'),
      startTransition: (fn) => fn?.(),
      createRef: () => ({ current: null }),
      createContext: () => ({ Provider: stubComponent('Provider'), Consumer: stubComponent('Consumer') }),
      useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
      useReducer: (reducer, init) => [init, () => {}],
      useEffect: () => {},
      useLayoutEffect: () => {},
      useInsertionEffect: () => {},
      useMemo: (fn) => fn(),
      useCallback: (fn) => fn,
      useRef: (init) => ({ current: init }),
      useImperativeHandle: () => {},
      useContext: () => ({}),
      useId: () => 'stub-id',
      useDebugValue: () => {},
      useSyncExternalStore: (_sub, get) => get(),
      useTransition: () => [false, (fn) => fn?.()],
      useDeferredValue: (v) => v,
    },
  ),
  'react/jsx-runtime': {
    jsx: (type, props) => ({ type, props }),
    jsxs: (type, props) => ({ type, props }),
    Fragment: Symbol('Fragment'),
  },
  'react-dom': { createPortal: (node) => node },
  'react-dom/client': { createRoot: () => ({ render: () => {}, unmount: () => {} }) },
  '@deepseek-ai/dsh-client-ui-primitives': new Proxy({}, {
    get: (_t, prop) => (typeof prop === 'string' ? stubComponent(prop) : undefined),
    has: () => true,
  }),
}

// ── capture the loader registration ──────────────────────────────────────
const registrations = []
const sandbox = {
  __ModuleLoader__: { load: (entry) => { registrations.push(entry) } },
  document: {
    head: stubNode('head'),
    body: stubNode('body'),
    documentElement: stubNode('html'),
    createElement: (tag) => stubNode(tag),
    createTextNode: (text) => ({ nodeType: 3, textContent: text }),
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    getElementsByTagName: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
  },
  console,
  // Timers are recorded but never scheduled: the nav-mount poller would
  // otherwise keep the event loop alive and hang the smoke run.
  setTimeout: (() => { let id = 0; return (fn, ms) => { void fn; void ms; return ++id } })(),
  clearTimeout: () => {},
  setInterval: (() => { let id = 0; return (fn, ms) => { void fn; void ms; return ++id } })(),
  clearInterval: () => {},
  queueMicrotask: (fn) => fn(),
  fetch: async () => ({ ok: false, status: 599, json: async () => ({}) }),
  AbortController,
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
  requestAnimationFrame: (fn) => setTimeout(() => fn(Date.now()), 0),
  cancelAnimationFrame: (id) => clearTimeout(id),
  getComputedStyle: () => ({ getPropertyValue: () => '' }),
  MutationObserver: class { observe() {} disconnect() {} },
  ResizeObserver: class { observe() {} unobserve() {} disconnect() {} },
  CSS: { supports: () => false },
}
// Browsers alias `window` to the global object; the bundle uses `window.setInterval`.
sandbox.window = sandbox
sandbox.globalThis = sandbox
sandbox.self = sandbox
sandbox.top = sandbox
sandbox.parent = sandbox
sandbox.location = { href: 'http://127.0.0.1:0/', origin: 'http://127.0.0.1:0', protocol: 'http:', host: '127.0.0.1:0' }
sandbox.navigator = { userAgent: 'dsh-triad-smoke', language: 'zh-CN', maxTouchPoints: 0 }
sandbox.innerWidth = 1440
sandbox.innerHeight = 900
sandbox.devicePixelRatio = 1
sandbox.addEventListener = () => {}
sandbox.removeEventListener = () => {}
sandbox.dispatchEvent = () => true
sandbox.getComputedStyle = () => ({ getPropertyValue: () => '' })
sandbox.scrollTo = () => {}

const context = vm.createContext(sandbox)
const code = readFileSync(CLIENT, 'utf8')
new vm.Script(code, { filename: CLIENT }).runInContext(context)

// ── assertions ───────────────────────────────────────────────────────────
const fail = (msg) => { console.error(`FAIL  ${msg}`); process.exitCode = 1 }
const pass = (msg) => console.log(`ok    ${msg}`)

if (registrations.length !== 1) fail(`expected 1 loader registration, got ${registrations.length}`)
else pass('registered exactly one __ModuleLoader__ entry')

const entry = registrations[0]
if (entry?.id !== 'dsh-triad') fail(`expected id "dsh-triad", got ${JSON.stringify(entry?.id)}`)
else pass('loader id is "dsh-triad"')

const require = (id) => {
  if (id in MODULES) return MODULES[id]
  throw new Error(`[smoke] unexpected require(${id}) — add it to the stub table`)
}

const mod = entry.factory(require)
if (typeof mod.apply !== 'function') fail('factory did not export apply()')
else pass('factory exports apply()')
if (!Array.isArray(mod.inject)) fail('factory did not export inject[]')
else pass(`factory exports inject[] = [${mod.inject.join(', ')}]`)

// ── run apply() against a stub client context ────────────────────────────
const registered = []
const ctx = {
  effect: (fn) => { registered.push(typeof fn === 'function' ? fn() : undefined); return () => {} },
  locale: { register: () => () => {} },
  slots: {
    register: (_spec, comp) => { if (comp === undefined) throw new Error('slots.register called without component'); return () => {} },
    inject: (_slot, factory) => { factory?.(); return () => {} },
  },
  get: (name) => (name === 'sessions' ? { list: { getSnapshot: () => ({ byId: {} }) } } : undefined),
}

try {
  mod.apply(ctx)
  pass('apply(ctx) ran all three modules without throwing')
} catch (error) {
  fail(`apply(ctx) threw: ${error?.stack ?? error}`)
}

console.log(`\n${process.exitCode ? 'SMOKE FAILED' : 'SMOKE PASSED'} — ${CLIENT}`)
// Explicit exit: stubbed modules may hold listeners/timers that keep node alive.
process.exit(process.exitCode ?? 0)
