const {readdirSync, renameSync} = require('fs');
const {resolve, parse} = require('path');
const {randomUUID} = require('crypto');

// const {ImagePool} = require('@squoosh/lib');
// const {cpus} = require('os');
// const imagePool = new ImagePool(cpus().length);

// async function optimize(path) {
//   const file = readFileSync(path);
//   const image = imagePool.ingestImage(file);
//   await image.preprocess({});
//   const result = await image.encode({
//     webp: 'auto',
//   });
//   return result;
// }

const files = [
  resolve(__dirname, './assets/images/feiyunxi'),
  resolve(__dirname, './assets/images/feiyunxi/love'),
  resolve(__dirname, './assets/images/xiao'),
  resolve(__dirname, './assets/images/xiao/love'),
]
  .flatMap(d => readdirSync(d, {withFileTypes: true}).filter(p => p.isFile()).map(f => resolve(d, f.name)),
  );

(async () => {
  for (let file of files) {

    const {name, ext, dir} = parse(file);

    const normalizedName = /^[A-Z0-9-_.]+$/.test(name.toUpperCase()) ? name : randomUUID().toUpperCase();
    const normalizedExt = ext === '.jfif' ? '.jpg' : ext;

    if (normalizedName !== name || normalizedExt !== ext) {
      renameSync(file, dir + '/' + normalizedName + normalizedExt);
    }
  }
})();
