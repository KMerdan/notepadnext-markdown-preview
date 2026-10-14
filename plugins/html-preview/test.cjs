// SPDX-License-Identifier: GPL-3.0-or-later
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path'),{pathToFileURL}=require('node:url');
const {activate}=require('./dist/index.js'),metadata=require('./notepadnext-plugin.json');
test('manual source preview serves only source HTML, switches source, bounds local assets and cleans up',async t=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'nnp-html-preview-'));await fs.writeFile(path.join(dir,'style.css'),'body{color:red}');await fs.symlink(path.dirname(dir),path.join(dir,'outside'));
 const subscriptions=[],commands=new Map(),restorers=new Map(),events=new Set();let endpoint,created=0,source={languageId:'html',documentId:'a'},reloads=[];
 const disposable={dispose(){}},panel={async reveal(){},async reloadSource(target){reloads.push(target);},onEvent(fn){events.add(fn);return disposable;},dispose(){}};
 const ctx={sessionId:'html-plugin-test',capabilities:metadata.capabilities.required,subscriptions,
  previews:{async getSource(){return source;}},documents:{async getSnapshot(id){return {documentId:id,uri:pathToFileURL(path.join(dir,'index.html')).href,languageId:'html',text:'<h1>'+id+' unsaved 😀中</h1>',version:7};},async watch(){return disposable;}},
  commands:{async register(id,fn){commands.set(id,fn);return disposable;}},webviews:{registerRestorer(type,fn){restorers.set(type,fn);return disposable;},async createService(options){++created;endpoint=options.endpoint;return panel;}}};
 t.after(async()=>{for(const item of subscriptions.toReversed())await item?.dispose();await fs.rm(dir,{recursive:true,force:true});});
 await activate(ctx);assert.equal(created,0);await commands.get(metadata.id+'.open')();assert.equal(created,1);
 const html=await(await fetch(endpoint)).text();assert.match(html,/<h1>a unsaved/);assert.doesNotMatch(html,/textarea|Node PID|Counter:|Run preview|Load active/);
 const base=endpoint.slice(0,-10);assert.match(await(await fetch(base+'style.css')).text(),/color:red/);
 assert.equal((await fetch(base+'outside/anything.css')).status,404);assert.equal((await fetch(new URL('/outside/index.html',endpoint))).status,404);
 source={languageId:'html',documentId:'b'};for(const fn of events)fn({type:'sourceChanged',payload:{document:source}});await new Promise(r=>setTimeout(r,30));assert.equal((await(await fetch(base+'api/document')).json()).documentId,'b');assert.deepEqual(reloads.at(-1),{documentId:'b',version:7});
 await commands.get(metadata.id+'.open')();assert.equal(created,1);assert.equal((await fetch(endpoint,{method:'POST'})).status,405);
 for(const item of subscriptions.toReversed())await item?.dispose();await assert.rejects(fetch(endpoint));
});
