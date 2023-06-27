const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const zipper = require('zip-local');

main();

async function main() {
  await exec('npm run build:prod');
  const ffDir = 'firefox-extension';

  if (fs.existsSync(ffDir)) {
    await fs.rm(ffDir, { recursive: true });
  }
  await fs.mkdir(ffDir);
  const zipContents = ['_locales', 'dist', 'images', 'public', 'manifest.json'];
  for await (const filename of zipContents) {
    await fs.copy(filename, `${ffDir}/${filename}`);
  }

  zipper.sync
    .zip(ffDir)
    .compress()
    .save(ffDir + '.zip');

  await fs.rm(ffDir, { recursive: true });

  await fs.mkdir('../tmp');
  await fs.move('node_modules', '../tmp/node_modules');
  zipper.sync.zip('.').compress().save('extension-source.zip');
  await fs.move('../tmp/node_modules', 'node_modules');

  console.log('Built for Firefox');
}
