// SPDX-License-Identifier: GPL-3.0-or-later
const {test}=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const {catalog,selection}=require('./marketplace.cjs');
test('catalog is metadata-only and contains both independently versioned plugins',()=>{const c=catalog();assert.ok(Array.isArray(c.list));assert.equal(c.list.length,2);assert.equal(new Set(c.list.map(p=>p.id)).size,2);for(const p of c.list)assert.equal(selection(p.id+'/v'+p.version),path.resolve(__dirname,'../plugins',p.id.split('.')[1]));});
test('release selection rejects cross-plugin versions, unstable tags and path traversal',()=>{for(const tag of ['v0.1.5','kmerdan.html-preview/v0.1.5','kmerdan.unknown/v0.1.0','kmerdan.html-preview/v0.1.0-beta.1','../../html-preview/v0.1.0','kmerdan.html-preview/v00.1.0'])assert.throws(()=>selection(tag));});
