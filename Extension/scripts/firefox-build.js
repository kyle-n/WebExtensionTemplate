const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const zipper = require('zip-local');

main();

async function main() {
  await exec('npm run build:chrome');

  // Removes non-source files
  if (fs.existsSync('../tmp')) {
    await fs.rm('../tmp', { recursive: true });
  }
  await fs.mkdir('../tmp');
  await fs.move('node_modules', '../tmp/node_modules');
  await fs.move('packaged-extension.zip', '../tmp/packaged-extension.zip');

  zipper.sync.zip('.').compress().save('extension-source.zip');

  // Move project files back
  await fs.move('../tmp/node_modules', 'node_modules');
  await fs.move('../tmp/packaged-extension.zip', 'packaged-extension.zip');

  console.log('Built for Firefox');
}
