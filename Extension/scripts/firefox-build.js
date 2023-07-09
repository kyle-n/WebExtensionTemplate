const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const zipper = require('zip-local');

main();

async function main() {
  await exec('npm run build:chrome');

  await fs.mkdir('../tmp');
  await fs.move('node_modules', '../tmp/node_modules');
  zipper.sync.zip('.').compress().save('extension-source.zip');
  await fs.move('../tmp/node_modules', 'node_modules');

  console.log('Built for Firefox');
}
