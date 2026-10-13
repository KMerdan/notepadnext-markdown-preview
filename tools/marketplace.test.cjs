// SPDX-License-Identifier: GPL-3.0-or-later
const {test}=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const {catalog,selection}=require('./marketplace.cjs');
test('catalog is metadata-only and contains two production previews',()=>{const c=catalog();assert.ok(Array.isArray(c.list));assert.equal(c.list.length,2);assert.equal(new Set(c.list.map(p=>p.id)).size,2);for(const p of c.list)assert.equal(selection(p.id+'/v'+p.version),path.resolve(__dirname,'../plugins',p.id.split('.')[1]));});
test('release selection rejects cross-plugin versions, unstable tags and path traversal',()=>{for(const tag of ['v0.1.5','kmerdan.html-preview/v0.1.5','kmerdan.unknown/v0.1.0','kmerdan.html-preview/v0.1.0-beta.1','../../html-preview/v0.1.0','kmerdan.html-preview/v00.1.0'])assert.throws(()=>selection(tag));});

test('plugins consume the same immutable SDK tarball, not copied SDK source',()=>{
 const fs=require('node:fs');const urls=[];
 for(const directory of ['markdown-preview','html-preview']){
  const p=path.resolve(__dirname,'../plugins',directory);const pkg=JSON.parse(fs.readFileSync(path.join(p,'package.json'))),lock=JSON.parse(fs.readFileSync(path.join(p,'package-lock.json')));
  const url=pkg.devDependencies['@notepadnext/plugin-sdk'];assert.equal(url,'https://github.com/KMerdan/notepadnext-plugin-sdk/releases/download/v0.3.2/notepadnext-plugin-sdk-0.3.2.tgz');
  assert.equal(lock.packages['node_modules/@notepadnext/plugin-sdk'].resolved,url);assert.match(lock.packages['node_modules/@notepadnext/plugin-sdk'].integrity,/^sha512-/);urls.push(url);
 }assert.equal(urls[0],urls[1]);assert.equal(fs.existsSync(path.resolve(__dirname,'plugin-sdk')),false);
});

test('native enhancement plugins pin the released API 0.3 SDK tarball',()=>{
 const fs=require('node:fs');
 for(const name of ['text-inspector','todo-navigator']){const folder=path.resolve(__dirname,'../examples',name);const pkg=JSON.parse(fs.readFileSync(path.join(folder,'package.json'))),lock=JSON.parse(fs.readFileSync(path.join(folder,'package-lock.json'))),manifest=JSON.parse(fs.readFileSync(path.join(folder,'notepadnext-plugin.json')));assert.equal(manifest.engines.api,'^0.3.0');const url=pkg.devDependencies['@notepadnext/plugin-sdk'];assert.equal(url,'https://github.com/KMerdan/notepadnext-plugin-sdk/releases/download/v0.3.2/notepadnext-plugin-sdk-0.3.2.tgz');assert.equal(lock.packages['node_modules/@notepadnext/plugin-sdk'].resolved,url);assert.match(lock.packages['node_modules/@notepadnext/plugin-sdk'].integrity,/^sha512-/);}
});

test('SDK examples are excluded from the product catalog and explicitly labelled',()=>{
 const fs=require('node:fs');for(const name of ['text-inspector','todo-navigator']){
  const d=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../examples',name,'notepadnext-plugin.json')));
  assert.match(d.name,/^SDK Example:/);assert.equal(d.category,'editor-tool');assert.ok(!catalog().list.some(x=>x.id===d.id));
 }
});
