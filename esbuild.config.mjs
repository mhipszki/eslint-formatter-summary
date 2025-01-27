import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['./lib/*.ts'],
  bundle: true,
  platform: 'node',
  packages: 'external',
  target: 'node20',
  outdir: 'dist',
  sourcemap: 'linked',
});
