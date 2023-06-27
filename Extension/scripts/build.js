const { build } = require('esbuild');
const sveltePlugin = require('esbuild-svelte');
const sveltePreprocess = require('svelte-preprocess');

const isProdBuild = process.argv.includes('--prod');

main();

async function main() {
  const commonConfig = {
    outbase: './src',
    platform: 'browser',
    external: [],
    bundle: true,
    sourcemap: !isProdBuild,
    minify: isProdBuild,
    tsconfig: './tsconfig.json',
    drop: isProdBuild ? ['console'] : undefined
  };
  const contentJob = build({
    ...commonConfig,
    entryPoints: ['./src/content.ts'],
    outfile: './dist/content.js'
  });

  const backgroundJob = build({
    ...commonConfig,
    entryPoints: ['./src/background.ts'],
    outfile: './dist/background.js'
  });

  const settingsJob = build({
    ...commonConfig,
    entryPoints: ['./src/settings/settings.ts'],
    outdir: './dist',
    mainFields: ['svelte', 'module', 'main', 'browser'],
    plugins: [
      sveltePlugin({
        preprocess: sveltePreprocess()
      })
    ]
  });

  return Promise.all([contentJob, backgroundJob, settingsJob]).then(() =>
    console.log('⚡ Compiled')
  );
}
