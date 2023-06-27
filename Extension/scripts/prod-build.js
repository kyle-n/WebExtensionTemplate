const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function build() {
  await exec('rm -rf ./dist');
  await exec('mkdir ./dist');
  await exec('npm run build -- --prod');
  console.log('Done');
}

build();
