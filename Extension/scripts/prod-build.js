import fs from 'fs/promises';
const util = require('util');
const exec = util.promisify(require('child_process').exec);

build();

async function build() {
  await fs.rmdir('./dist');
  await fs.mkdir('./dist');
  await exec('npm run build -- --prod');
  console.log('Done');
}
