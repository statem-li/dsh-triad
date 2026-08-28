/**
 * dsh-triad — build script.
 *
 * Two bundles from one esbuild run:
 *
 *   lib/index.js   host half    ESM,  node platform,  @deepseek-ai/* external
 *   lib/client.js  browser half CJS,  browser platform, wrapped in the
 *                  `window.__ModuleLoader__.load` factory contract
 *
 * Usage: node build.mjs
 */

import { createRequire } from 'node:module'
import { existsSync, readdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const DSH_CHECKOUT = process.env.DSH_CHECKOUT ?? 'D:/AI/deepseek-harness'
const PLUGIN_ID = 'dsh-triad'

/**
 * Resolve esbuild.
 *
 * Three tiers, in order — the first two keep this plugin buildable both for
 * a fresh clone (`pnpm install` puts esbuild in node_modules) and for a
 * contributor hacking inside a DSH checkout:
 *
 *  1. the plugin's own `node_modules` (normal install path; esbuild is a
 *     devDependency so `pnpm install` provides it),
 *  2. a local DSH checkout's pnpm store (contributor convenience — pnpm's
 *     strict layout keeps esbuild out of the root node_modules, so scan
 *     `node_modules/.pnpm/esbuild@*` and take the highest version),
 *  3. a clear, actionable error.
 *
 * Tier 3 matters: a bare `require('esbuild')` failure message does not tell
 * the user to run `pnpm install`.
 */
function loadEsbuild() {
  const localRequire = createRequire(resolve(HERE, 'package.json'))
  try {
    return localRequire('esbuild')
  } catch {
    // Not installed locally; fall through to the checkout scan.
  }

  const store = join(DSH_CHECKOUT, 'node_modules', '.pnpm')
  const candidates = []
  if (existsSync(store)) {
    for (const entry of readdirSync(store)) {
      if (!entry.startsWith('esbuild@')) continue
      candidates.push(join(store, entry, 'node_modules', 'esbuild'))
    }
  }
  if (candidates.length > 0) {
    const pick = candidates.sort().at(-1)
    return createRequire(resolve(pick, 'package.json'))(pick)
  }

  throw new Error(
    'dsh-triad: cannot find esbuild.\n'
    + '  Run `pnpm install` in this directory (esbuild is a devDependency).\n'
    + `  Or set DSH_CHECKOUT to a DSH checkout to borrow its copy (currently: ${DSH_CHECKOUT}).`,
  )
}

const esbuild = loadEsbuild()

/** Platform packages + react come from the DSH module table at runtime. */
const CLIENT_EXTERNAL = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
]

/** Browser half: one CJS factory registered with the host module loader. */
const clientBundle = {
  entryPoints: [resolve(HERE, 'src/client/index.ts')],
  outfile: resolve(HERE, 'lib/client.js'),
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  sourcemap: true,
  logLevel: 'info',
  external: CLIENT_EXTERNAL,
  // Everything under @deepseek-ai/ stays a runtime require.
  plugins: [{
    name: 'triad-external-platform',
    setup(build) {
      build.onResolve({ filter: /^@deepseek-ai\// }, args => ({ path: args.path, external: true }))
    },
  }],
  banner: {
    js: [
      `window.__ModuleLoader__.load({ id: ${JSON.stringify(PLUGIN_ID)}, factory: (require) => {`,
      'var module = { exports: {} };',
      'var exports = module.exports;',
      'Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });',
    ].join('\n'),
  },
  footer: {
    js: 'return module.exports; } });',
  },
}

/** Host half: ESM, self-contained except node builtins and DSH platform packages. */
const hostBundle = {
  entryPoints: [resolve(HERE, 'src/host.ts')],
  outfile: resolve(HERE, 'lib/index.js'),
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node22',
  sourcemap: true,
  logLevel: 'info',
  // node:* builtins stay external. yauzl is bundled in on purpose: the
  // plugin's node_modules is a junction into the DSH profile (so @deepseek-ai/*
  // resolves to the very same module instances the host uses), and a junction
  // cannot also hold a private yauzl copy.
  external: [],
  // yauzl is inlined (see above) and is CJS: it calls bare `require('fs')`.
  // In an ESM bundle that throws "Dynamic require ... is not supported", so
  // hand the bundle a real CommonJS require bound to its own URL.
  banner: {
    js: [
      "import { createRequire as __triadCreateRequire } from 'node:module';",
      'const require = __triadCreateRequire(import.meta.url);',
    ].join('\n'),
  },
  plugins: [{
    name: 'triad-external-platform',
    setup(build) {
      build.onResolve({ filter: /^(@deepseek-ai\/|node:)/ }, args => ({ path: args.path, external: true }))
    },
  }],
}

await Promise.all([esbuild.build(clientBundle), esbuild.build(hostBundle)])
console.log('[dsh-triad] built lib/index.js + lib/client.js')
