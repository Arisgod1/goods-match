const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {sourceFiles,processProject,buildProblems,refs}=require('./cocos-project.cjs');
assert.ok(sourceFiles(path.resolve(__dirname,'..')).includes('tools/test-pipeline.cjs'),'The source package must preserve its own regression tests');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'cocos-pipeline-'));
try {
    for(const f of ['assets/a.ts','assets/a.ts.meta','tools/package-private-keys/a.key','assets/secret.pem','assets/id_rsa','assets/symlink-target','profiles/v2/local.json','build/a.js','assets/node_modules/a.js','docs/readme.md','tools/private.js','assets/.env.local','excel2ts/.npmrc','assets/SecretRoom.ts','assets/SecretRoom.ts.meta','settings/v2/packages/information.json']){
        fs.mkdirSync(path.dirname(path.join(root,f)),{recursive:true});fs.writeFileSync(path.join(root,f),f==='tools/private.js'?('-----BEGIN '+'PRIVATE KEY-----'):'fixture');
    }
    fs.symlinkSync('/etc/passwd',path.join(root,'assets/link'));
    assert.deepEqual(sourceFiles(root),['assets/SecretRoom.ts','assets/SecretRoom.ts.meta','assets/a.ts','assets/a.ts.meta','assets/symlink-target','docs/readme.md']);
    fs.writeFileSync(path.join(root,'package.json'),JSON.stringify({creator:{version:'3.8.3'}}));
    fs.mkdirSync(path.join(root,'config'));fs.writeFileSync(path.join(root,'config/web-build.json'),JSON.stringify({entryScene:'assets/main.scene',options:{}}));
    const fakeWeb=path.join(root,'fake-web');fs.mkdirSync(fakeWeb);fs.writeFileSync(path.join(fakeWeb,'index.html'),'html');
    assert.ok(buildProblems(36,'error: Script "x" is missing or invalid.',fakeWeb,'Scene/Main').includes('Missing serialized component script'));
    assert.ok(buildProblems(36,'',fakeWeb,'Scene/Main').includes('Missing entry component Scene/Main'));
    fs.mkdirSync(path.join(fakeWeb,'assets'));fs.writeFileSync(path.join(fakeWeb,'assets/main.js'),'Scene/Main');
    assert.deepEqual(buildProblems(36,'',fakeWeb,'Scene/Main'),[]);
    const out=root+'-output';
    const dry=processProject(root,out,'package',true,'web-mobile');assert.equal(fs.existsSync(out),false);assert.ok(dry.files.length);
    assert.throws(()=>processProject(root,path.join(root,'build'),'package',false),/outside/);
    const packed=processProject(root,out,'package',false);assert.equal(packed.success,true);assert.ok(fs.existsSync(path.join(out,'source.tar.gz')));
    assert.throws(()=>processProject(root,out,'package',false),/already exists/);
    fs.rmSync(out,{recursive:true,force:true});
    const expanded=processProject(root,out,'package',false,'web-mobile',{archive:false});
    assert.equal(expanded.success,true);assert.equal(fs.existsSync(path.join(out,'source.tar.gz')),false);assert.ok(fs.existsSync(path.join(out,'source/assets/SecretRoom.ts')));
    fs.rmSync(out,{recursive:true,force:true});
    const readable=processProject(root,out,'build',true,'web-mobile',{readable:true,archive:false});
    assert.equal(readable.plan.buildOptions.debug,true);assert.equal(readable.plan.buildOptions.sourceMaps,true);assert.equal(readable.archive,false);
    fs.writeFileSync(path.join(root,'tsconfig.json'),JSON.stringify({extends:'./temp/tsconfig.cocos.json'}));
    const types=processProject(root,out,'typecheck',false,'web-mobile');assert.equal(types.success,false);assert.ok(types.typecheck.added.some(s=>s.includes('TS5083')));
    fs.rmSync(out,{recursive:true,force:true});
    const refsRoot=path.join(root,'refs-fixture');fs.mkdirSync(path.join(refsRoot,'assets'),{recursive:true});
    const uuid='11111111-1111-4111-8111-111111111111';
    fs.writeFileSync(path.join(refsRoot,'assets/art.png.meta'),JSON.stringify({uuid,subMetas:{frame:{uuid:uuid+'@real'}}}));
    fs.writeFileSync(path.join(refsRoot,'assets/main.scene'),JSON.stringify([{real:{__uuid__:uuid+'@real'},missing:{__uuid__:uuid+'@absent'}}]));
    assert.deepEqual(refs(refsRoot).externalReferences,[{file:'assets/main.scene',uuid:uuid+'@absent'}]);

    const batchFile=path.join(root,'batch.json'),batchOut=root+'-batch';
    fs.writeFileSync(batchFile,JSON.stringify({projects:[path.join(root,'missing'),root]}));
    const batch=require('node:child_process').spawnSync(process.execPath,[path.join(__dirname,'cocos-project.cjs'),'package','--batch',batchFile,'--out',batchOut],{encoding:'utf8'});
    assert.equal(batch.status,1);const results=JSON.parse(fs.readFileSync(path.join(batchOut,'batch-report.json'),'utf8'));
    assert.equal(results[0].success,false);assert.equal(results[1].success,true);
    const before=fs.readFileSync(path.join(batchOut,'batch-report.json'),'utf8');
    const repeat=require('node:child_process').spawnSync(process.execPath,[path.join(__dirname,'cocos-project.cjs'),'package','--batch',batchFile,'--out',batchOut],{encoding:'utf8'});
    assert.equal(repeat.status,1);assert.equal(fs.readFileSync(path.join(batchOut,'batch-report.json'),'utf8'),before);
    fs.rmSync(batchOut,{recursive:true,force:true});
    console.log('PASS pipeline: allowlist, credentials, symlinks, dry-run, archive, overwrite guards');
} finally {fs.rmSync(root,{recursive:true,force:true});}
