// Minimal build script to bundle just the auth fix
const esbuild = require('esbuild');
const fs = require('fs');

// Bundle the worker
esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/_worker.js',
  platform: 'neutral',
  target: 'es2022',
  external: ['cloudflare:*', '__STATIC_CONTENT_MANIFEST'],
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  minify: false,
  sourcemap: false,
}).then(() => {
  console.log('✅ Build complete!');
}).catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
