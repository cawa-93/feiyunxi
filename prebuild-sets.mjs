import fs from 'node:fs';


function getImages(path) {
  return fs.readdirSync(`./public/${path}`).map(name => `/${path}/${name}`);
}


function getContent({set, loveSet}) {
  return `
  export const set: string[] = JSON.parse('${JSON.stringify(set)}')
  export const loveSet: string[] = JSON.parse('${JSON.stringify(loveSet)}')
  `;
}


fs.writeFileSync('feiyunxi.ts', getContent({
  set: getImages('images/feiyunxi'),
  loveSet: getImages('images/love/feiyunxi'),
}), 'utf8');

fs.writeFileSync('xiao.ts', getContent({
  set: getImages('images/xiao'),
  loveSet: getImages('images/love/xiao'),
}), 'utf8');
