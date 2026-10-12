// SPDX-License-Identifier: GPL-3.0-or-later
const {test}=require('node:test'),assert=require('node:assert/strict');
const {activate}=require('./dist/index.js'),metadata=require('./notepadnext-plugin.json');
test('owned Node service serves unsaved HTML, stays lazy, reuses panels and disposes',async t=>{
  const subscriptions=[],commands=new Map(),restorers=new Map();let endpoint,created=0;
  const disposable={dispose(){}};
  const panel={async reveal(){},onEvent(){},dispose(){}};
  const context={sessionId:'html-plugin-test',capabilities:metadata.capabilities.required,subscriptions,
    documents:{async getActive(){return {languageId:'html',documentId:'document-1'};},async getSnapshot(){return {text:'<h1>Unsaved 😀中</h1>',version:7};},async watch(){return disposable;}},
    commands:{async register(id,fn){commands.set(id,fn);return disposable;}},
    webviews:{registerRestorer(type,fn){restorers.set(type,fn);return disposable;},async createService(options){++created;endpoint=options.endpoint;assert.equal(options.viewType,'html-preview');return panel;}}
  };
  t.after(async()=>{for(const item of subscriptions.toReversed())await item.dispose();});
  await activate(context);assert.equal(created,0);assert.equal(restorers.size,1);
  await commands.get(metadata.id+'.open')();assert.equal(created,1);
  assert.match(await(await fetch(endpoint)).text(),/<title>HTML Preview<\/title>/);
  const base=endpoint.slice(0,-10);
  assert.deepEqual(await(await fetch(base+'api/document')).json(),{text:'<h1>Unsaved 😀中</h1>',version:7,pid:process.pid});
  assert.deepEqual(await(await fetch(base+'api/service')).json(),{pluginVersion:metadata.version,pid:process.pid});
  const script=await fetch(base+'app.js');assert.match(script.headers.get('content-type'),/javascript/);assert.match(await script.text(),/serviceInfo/);
  assert.equal((await fetch(base+'unknown')).status,404);assert.equal((await fetch(endpoint,{method:'POST'})).status,405);
  assert.equal((await fetch(new URL('/outside/index.html',endpoint))).status,404);
  await commands.get(metadata.id+'.open')();await restorers.get('html-preview')();assert.equal(created,1);
  for(const item of subscriptions.toReversed())await item.dispose();await assert.rejects(fetch(endpoint));
});
