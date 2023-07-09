const { build } = require('esbuild');

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
    drop: isProdBuild ? ['console'] : undefined,
    jsx: 'transform'
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

  const popupJob = build({
    ...commonConfig,
    entryPoints: ['./src/popup/popup.tsx'],
    outbase: './src/popup',
    outdir: './dist',
    mainFields: ['module', 'main', 'browser']
  });

  const settingsJob = build({
    ...commonConfig,
    entryPoints: ['./src/settings/settings.tsx'],
    outbase: './src/settings',
    outdir: './dist',
    mainFields: ['module', 'main', 'browser']
  });

  return Promise.all([contentJob, backgroundJob, popupJob, settingsJob]).then(
    () => console.log('⚡ Compiled')
  );
}
