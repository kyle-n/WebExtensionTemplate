const fs = require('fs/promises');
const JSZip = require('jszip');
const { saveAs } = require('file-saver');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

build();

async function build() {
  await exec('npm run build:prod');
  const chromeDir = 'chrome-extension';
  await fs.rmdir(chromeDir);
  await fs.mkdir(chromeDir);
  await fs.cp('_locales', chromeDir + '/');
  await fs.cp('dist', chromeDir + '/');
  await fs.cp('images', chromeDir + '/');
  await fs.cp('public', chromeDir + '/');
  await fs.cp('manifest.json', chromeDir + '/');

  const zip = new JSZip();
  zip.folder(chromeDir);
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, chromeDir + '.zip');

  await fs.rmdir(chromeDir);
  console.log('Built for Chrome');
}
