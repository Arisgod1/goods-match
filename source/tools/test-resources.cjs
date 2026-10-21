const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const ts = require(process.env.COCOS_TYPESCRIPT || '/Applications/Cocos/Creator/3.8.3/CocosCreator.app/Contents/Resources/resources/3d/engine/node_modules/typescript');
const code = ts.transpileModule(fs.readFileSync(path.join(__dirname,'../assets/scripts/manager/ResMgr.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2017}}).outputText;
(async()=>{
    let error=null;
    const module={exports:{}};
    const bundle={preloadDir(p,cb){cb(error,[])},loadDir(p,cb){cb(error,[])},load(p,cb){cb(error,{name:p})}};
    let missing=false;
    vm.runInNewContext(code,{module,exports:module.exports,Date,console,globalThis:{},require(id){
        if(id==='cc')return {assetManager:{getBundle:()=>missing?null:bundle,loadBundle:(name,cb)=>cb(Error('bundle unavailable'))}};
        if(id==='cc/env')return {PREVIEW:false};
        if(id.endsWith('Debug'))return {Debug:{Log(){},Warn(){},Error(){}}};
        return {ArrayUtil:{has:(a,v)=>a.includes(v)}};
    }});
    const mgr=module.exports.ResMgr;
    const methods=[()=>mgr.preloadDir('game'),()=>mgr.loadDir('game'),()=>mgr.loadRes('game','Stage')];
    for(const method of methods){await method();error=Error('asset unavailable');await assert.rejects(method,/asset unavailable/);error=null;}
    missing=true;
    for(const method of methods){
        let timeout;
        try { await assert.rejects(Promise.race([method(),new Promise((_,reject)=>{timeout=setTimeout(()=>reject(Error('hung promise')),250)})]),/bundle unavailable/); }
        finally {clearTimeout(timeout);}
    }
    console.log('PASS resource loading: success, asset failure, bundle rejection without hanging (3 methods)');
})().catch(e=>{console.error(e);process.exitCode=1});
