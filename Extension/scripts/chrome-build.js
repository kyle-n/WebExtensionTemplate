const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const zipper = require('zip-local');

main();

async function main() {
  await exec('npm run build:prod');
  const chromeDir = 'chrome-extension';
  if (fs.existsSync(chromeDir)) {
    await fs.rm(chromeDir, { recursive: true });
  }
  await fs.mkdir(chromeDir);
  const zipContents = ['_locales', 'dist', 'images', 'public', 'manifest.json'];
  for await (const filename of zipContents) {
    await fs.copy(filename, `${chromeDir}/${filename}`);
  }

  zipper.sync
    .zip(chromeDir)
    .compress()
    .save(chromeDir + '.zip');

  await fs.rm(chromeDir, { recursive: true });
  console.log('Built for Chrome');
}
