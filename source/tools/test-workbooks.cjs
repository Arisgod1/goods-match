// Exercise the real exporter on a disposable copy; never regenerate project assets in tests.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),tmp=fs.mkdtempSync(path.join(os.tmpdir(),'cocos-workbooks-'));
try {
    fs.cpSync(path.join(root,'excel2ts'),path.join(tmp,'excel2ts'),{recursive:true});
    fs.cpSync(path.join(root,'sheet'),path.join(tmp,'sheet'),{recursive:true});
    fs.mkdirSync(path.join(tmp,'assets/scripts/config'),{recursive:true});
    const r=cp.spawnSync(process.execPath,[path.join(tmp,'excel2ts/scripts/exportToTs.js')],{cwd:os.tmpdir(),env:{...process.env,NODE_PATH:path.join(root,'node_modules')},encoding:'utf8'});
    assert.equal(r.status,0,r.stdout+r.stderr);
    const ts=require(process.env.COCOS_TYPESCRIPT||'/Applications/Cocos/Creator/3.8.3/CocosCreator.app/Contents/Resources/resources/3d/engine/node_modules/typescript');
    const values=p=>{const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports});return JSON.parse(JSON.stringify(exports));};
    for(const file of ['cfg_icon.ts','cfg_level.ts'])assert.deepEqual(values(path.join(tmp,'assets/scripts/config',file)),values(path.join(root,'assets/scripts/config',file)),file);
    console.log('PASS workbook export: cwd-independent paths and unchanged level/icon data');
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
