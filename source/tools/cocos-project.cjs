#!/usr/bin/env node
// Small synchronous pipeline: separate project results survive failures in batch mode.
const fs = require('node:fs'), path = require('node:path'), cp = require('node:child_process'), crypto = require('node:crypto');
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
function walk(dir, prefix = '') {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, {withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(e => {
        const rel = path.posix.join(prefix,e.name);
        if (e.isSymbolicLink() || /^(node_modules|library|temp|build|profiles|\.git|\.DS_Store|package-private-keys|\.ssh|\.aws)$/.test(e.name)) return [];
        return e.isDirectory() ? walk(path.join(dir,e.name),rel) : [rel];
    });
}
function sourceFiles(root) {
    // Positive roots plus secret filtering, never archive the whole working tree.
    const roots = ['assets','settings','build-templates','preview-template','sheet','excel2ts','tools','docs','config','.creator'];
    const files = roots.flatMap(r=>walk(path.join(root,r),r)).concat(['package.json','package-lock.json','tsconfig.json','cc.d.ts','README.md','AGENTS.md','.gitignore'].filter(f=>fs.existsSync(path.join(root,f))));
    // Creator account entitlement state is local metadata, not part of an editable game.
    return files.filter(f=>f!=='settings/v2/packages/information.json').filter(f=>!/(^|\/)(\.env(?:\..*)?|.*\.(?:key|pem|p12|pfx|keystore)|\.npmrc|\.pypirc|\.netrc|\.git-credentials|credentials(?:\.json)?|service-account(?:[-_].*)?\.json|id_rsa|id_ed25519)$/i.test(f)).filter(f=> {
        const p = path.join(root,f);
        return !/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(fs.readFileSync(p,'utf8'));
    }).sort();
}
function manifest(root, files) {return files.map(file=>({file,bytes:fs.statSync(path.join(root,file)).size,sha256:hash(fs.readFileSync(path.join(root,file)))}));}
function engine() {
    if(process.env.COCOS_CREATOR) return path.resolve(process.env.COCOS_CREATOR);
    const p='/Applications/Cocos/Creator/3.8.3/CocosCreator.app/Contents/MacOS/CocosCreator';
    return fs.existsSync(p)?p:null;
}
function compiler() {
    if(process.env.COCOS_TYPESCRIPT) return require.resolve(process.env.COCOS_TYPESCRIPT);
    const exe=engine(); if(!exe) throw Error('Set COCOS_CREATOR and/or COCOS_TYPESCRIPT');
    return require.resolve(path.resolve(path.dirname(exe),'../Resources/resources/3d/engine/node_modules/typescript'));
}
function refs(root) {
    const files=walk(path.join(root,'assets'),'assets'), uuids=new Set(), scriptIds=new Set(), errors=[], external=[];
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const compress=id=>{const [base,suffix]=id.split('@'),h=base.replaceAll('-','');return h.slice(0,5)+Array.from({length:9},(_,i)=>{const n=parseInt(h.slice(5+i*3,8+i*3),16);return chars[n>>6]+chars[n&63]}).join('')+(suffix?'@'+suffix:'');};
    for(const f of files.filter(f=>f.endsWith('.meta'))) {
        const visit=o=>{if(!o||typeof o!=='object')return;if(o.uuid){if(uuids.has(o.uuid))errors.push(`${f}: duplicate UUID ${o.uuid}`);uuids.add(o.uuid);uuids.add(compress(o.uuid));}Object.values(o).forEach(visit);};
        visit(read(path.join(root,f)));if(f.endsWith('.ts.meta'))scriptIds.add(compress(read(path.join(root,f)).uuid));
    }
    const builtin=new Set();
    const executable=engine();
    if(executable){const base=path.resolve(path.dirname(executable),'../Resources/resources/3d/engine/editor/assets');
        const visit=o=>{if(!o||typeof o!=='object')return;if(o.uuid){builtin.add(o.uuid);builtin.add(compress(o.uuid));}Object.values(o).forEach(visit);};
        for(const file of walk(base).filter(f=>f.endsWith('.meta')))try{visit(read(path.join(base,file)));}catch{}
    }
    const scenes=files.filter(f=>/\.(scene|prefab)$/.test(f));
    for(const f of scenes) {
        const a=read(path.join(root,f));
        const visit=o=>{if(!o||typeof o!=='object')return;
            if('__id__'in o&&(!Number.isInteger(o.__id__)||o.__id__<0||o.__id__>=a.length))errors.push(`${f}: invalid __id__ ${o.__id__}`);
            if(o.__uuid__&&!uuids.has(o.__uuid__))external.push({file:f,uuid:o.__uuid__});
            if(o.__type__&&!o.__type__.startsWith('cc.')&&/^[A-Za-z0-9+/]{23}$/.test(o.__type__)&&!scriptIds.has(o.__type__))errors.push(`${f}: missing script ${o.__type__}`);
            Object.values(o).forEach(visit);};visit(a);
    }
    // Builtin assets must be resolved by Creator. Report separately, never silently drop them.
    const builtinReferences=external.filter(r=>builtin.has(r.uuid));
    const externalReferences=external.filter(r=>!builtin.has(r.uuid));
    return {serializedFiles:scenes.length,errors,builtinReferences,externalReferences};
}
function scan(root) {
    const rules=[['platform-sdk',/\b(?:wx|tt|qg|swan|my)\s*\.|\b(?:FBInstant|SDK|openpaas)\b/],['platform-config',/\"platform\"\s*:\s*\"(?:android|ios|wechatgame|bytedance-mini-game|openpaas)\"/],['native',/\b(?:jsb|native)\b|reflection\.callStaticMethod/],['business-review',/广告|支付|商城|localStorage|hgxcds_/],['machine-path',/[A-Z]:[\\/]|\/Users\/|\/home\//]];
    const hits=[];
    for(const file of sourceFiles(root).concat(walk(path.join(root,'profiles'),'profiles')).filter(f=>/\.(ts|js|cjs|json|ejs|bat)$/.test(f)&&!f.startsWith('tools/')&&f!=='cc.d.ts')) {
        fs.readFileSync(path.join(root,file),'utf8').split(/\r?\n/).forEach((line,i)=>rules.forEach(([category,re])=>{if(re.test(line))hits.push({file,line:i+1,category,scope:file.startsWith('profiles/')?'local-configuration':'source',excerpt:line.trim().slice(0,180)});}));
    }
    return hits;
}
function run(command,args,cwd) { const r=cp.spawnSync(command,args,{cwd,encoding:'utf8',maxBuffer:64*1024*1024});return {command,args,status:r.status,error:r.error?.message,output:(r.stdout||'')+(r.stderr||'')}; }
function buildProblems(status,log,webRoot,entryClass) {
    const problems=[];
    if(![0,36].includes(status))problems.push('Creator exit '+status);
    if(/error: Script [^\n]+missing or invalid/.test(log))problems.push('Missing serialized component script');
    if(!fs.existsSync(path.join(webRoot,'index.html')))problems.push('Missing index.html');
    if(entryClass&&!walk(path.join(webRoot,'assets')).filter(f=>f.endsWith('.js')).some(f=>fs.readFileSync(path.join(webRoot,'assets',f),'utf8').includes(entryClass)))problems.push('Missing entry component '+entryClass);
    return problems;
}
function canonicalPath(value) {
    const full=path.resolve(value);
    return fs.existsSync(full)?fs.realpathSync(full):path.join(canonicalPath(path.dirname(full)),path.basename(full));
}
function processProject(root,out,action,dry,target,delivery={}) {
    // Creator keys script UUIDs by file URL; symlink aliases (/tmp vs /private/tmp) break that lookup.
    root=fs.realpathSync(root);
    out=canonicalPath(out);
    if(out===root||out.startsWith(root+path.sep)) throw Error('Output must be outside the project (preserves build baseline)');
    const pkg=read(path.join(root,'package.json')), cfg=read(path.join(root,'config/web-build.json'));
    const files=sourceFiles(root), entries=manifest(root,files), sourceId=hash(JSON.stringify(entries));
    const report={project:root,action,dryRun:dry,readable:!!delivery.readable,archive:delivery.archive!==false,creatorVersion:pkg.creator?.version,sourceId,files:entries,engine:engine(),node:process.version};
    const revision=run('git',['rev-parse','HEAD'],root),status=run('git',['status','--short'],root);
    report.sourceRevision={git:revision.status===0?revision.output.trim():null,workingTree:status.status===0?status.output:null,contentId:sourceId};
    report.tools={tar:run('tar',['--version'],root).status===0,compilerAvailable:false};
    try{compiler();report.tools.compilerAvailable=true;}catch{}
    if(report.engine){const plist=path.resolve(path.dirname(report.engine),'../Info.plist');if(fs.existsSync(plist)){const m=fs.readFileSync(plist,'utf8').match(/<key>CFBundleShortVersionString<\/key>\s*<string>([^<]+)/);report.installedCreatorVersion=m?.[1];}}

    if(dry) {report.plan={output:out,target,creatorCommand:[engine(),'--project',root,'--build',`configPath=${path.join(out,'creator-build.json')}`],buildOptions:{...cfg.options,...(delivery.readable?{debug:true,sourceMaps:true}:{}),platform:target,entryScene:cfg.entryScene},steps:action==='release'?['check','scan','test','typecheck','source archive','Creator Web build','Web archive']: [action]};return report;}
    if(fs.existsSync(out))throw Error('Output already exists; choose a new output directory');
    fs.mkdirSync(out,{recursive:true});
    const save=()=>fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
    try {
        const check=()=>{if(!report.engine||(delivery.archive!==false&&!report.tools.tar)||!report.tools.compilerAvailable)throw Error('Missing local tools: see engine/tools in report');if(report.installedCreatorVersion&&report.installedCreatorVersion!==pkg.creator.version)throw Error('Installed Creator version mismatch');report.required=['assets/scenes/main.scene','assets/scripts/Main.ts','tsconfig.json','settings/v2/packages/project.json'].concat(cfg.tests||[]).map(file=>({file,exists:fs.existsSync(path.join(root,file))}));report.references=refs(root);if(pkg.creator?.version!=='3.8.3'||report.required.some(f=>!f.exists)||(report.references.errors.length||report.references.externalReferences.length))throw Error('Project preflight failed (see report)');};
        if(['check','release'].includes(action)) check();
        if(['scan','release'].includes(action))report.scan=scan(root);
        if(['test','release'].includes(action)) {
            report.tests=[];
            for(const f of cfg.tests||['tools/test-rewards.cjs']) {if(!fs.existsSync(path.join(root,f)))throw Error('Registered regression missing: '+f);const r=run(process.execPath,[f],root);report.tests.push(r);if(r.status!==0)throw Error('Regression failed: '+f);}
            if(!report.tests.length)throw Error('No registered tests found');
        }
        if(['typecheck','release'].includes(action)) {
            const r=run(process.execPath,[path.join(path.dirname(compiler()),'tsc.js'),'--noEmit','--pretty','false'],root);
            fs.writeFileSync(path.join(out,'typescript.txt'),r.output);report.typecheck={status:r.status,diagnosticLines:r.output.split('\n').filter(Boolean).length};
            if(r.error||r.status===null)throw Error('TypeScript could not execute');
            const signatures=r.output.split('\n').flatMap(line=>{const m=line.match(/^(?:(.+?)\(\d+,\d+\): )?(error TS\d+:.*)/);return m?[(m[1]?path.basename(m[1]):'<global>')+': '+m[2]]:[];}).sort();
            if(r.status!==0&&!signatures.length)throw Error('TypeScript failed without parseable diagnostics');
            const baselinePath=path.join(root,'config/typescript-baseline.json');
            const baseline=fs.existsSync(baselinePath)?read(baselinePath):[];
            const remaining=[...baseline],added=[];
            for(const sig of signatures){const i=remaining.indexOf(sig);if(i<0)added.push(sig);else remaining.splice(i,1);}
            report.typecheck.added=added;report.typecheck.resolved=remaining;report.typecheck.errors=signatures.length;
            if(added.length)throw Error('New TypeScript diagnostics (see report)');
            // Existing errors are recorded, never treated as a clean typecheck.
            if(action==='typecheck'&&r.status!==0)report.warning='TypeScript diagnostics remain; compare with baseline';
        }
        if(['package','release'].includes(action)) {
            fs.writeFileSync(path.join(out,'source-manifest.json'),JSON.stringify({sourceId,files:entries},null,2));
            const staging=path.join(out,'source');fs.mkdirSync(staging);
            for(const f of files){const dest=path.join(staging,f);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(root,f),dest);}
            if(delivery.archive!==false){const r=run('tar',['-czf',path.join(out,'source.tar.gz'),'-C',staging,'.'],root);if(r.status!==0)throw Error(r.output);}
        }
        if(['build','release'].includes(action)) {
            if(!['web-mobile','web-desktop'].includes(target))throw Error('Only web-mobile/web-desktop supported');
            if(!engine())throw Error('Set COCOS_CREATOR to Creator executable');
            if(report.installedCreatorVersion&&report.installedCreatorVersion!==pkg.creator.version)throw Error('Installed Creator version mismatch');
            const scene=read(path.join(root,cfg.entryScene+'.meta')).uuid;
            const options={...cfg.options,...(delivery.readable?{debug:true,sourceMaps:true}:{}),platform:target,outputName:target,buildPath:path.join(out,'web'),startScene:scene,scenes:[{url:'db://'+cfg.entryScene,uuid:scene}]};
            const configPath=path.join(out,'creator-build.json');fs.writeFileSync(configPath,JSON.stringify(options,null,2));
            report.build={config:options,attempts:[]};
            const entry=fs.readFileSync(path.join(root,'assets/scripts/Main.ts'),'utf8').match(/@ccclass\(['"]([^'"]+)['"]\)/)?.[1];
            for(let attempt=1;attempt<=2;attempt++) {
                const r=run(engine(),['--project',root,'--build',`configPath=${configPath}`],root);
                fs.writeFileSync(path.join(out,attempt===1?'creator.log':'creator-retry.log'),r.output);
                const problems=buildProblems(r.status,r.output,path.join(out,'web',target),entry);
                report.build.status=r.status;report.build.attempts.push({attempt,status:r.status,problems});
                if(!problems.length)break;
                if(attempt===2)throw Error('Invalid Creator build: '+problems.join('; '));
                // A cold import may finish before script registration. Keep rejected output, retry once after process completion.
                const generated=path.join(out,'web');if(fs.existsSync(generated))fs.renameSync(generated,path.join(out,'rejected-web-attempt-1'));
            }
            const webRoot=path.join(out,'web',target);fs.writeFileSync(path.join(out,'web-manifest.json'),JSON.stringify({sourceId,config:options,files:manifest(webRoot,walk(webRoot))},null,2));
            if(delivery.archive!==false){const packed=run('tar',['-czf',path.join(out,'web.tar.gz'),'-C',webRoot,'.'],root);if(packed.status!==0)throw Error(packed.output);}
        }
        if(hash(JSON.stringify(manifest(root,sourceFiles(root))))!==sourceId)throw Error('Source files changed during pipeline; rerun into a new directory');
        report.success=true;
    } catch(e) {report.success=false;report.failure=e.message;} finally {save();}
    return report;
}
function main() {
    const args=process.argv.slice(2),action=args.shift()||'check',options={};
    if(!['check','scan','test','typecheck','build','package','release'].includes(action))throw Error('Commands: check scan test typecheck build package release');
    while(args.length){const key=args.shift();if(key==='--dry-run')options.dry=true;else if(key==='--readable')options.readable=true;else if(key==='--no-archive')options.archive=false;else if(['--project','--out','--batch','--target'].includes(key)&&args.length)options[key.slice(2)]=args.shift();else throw Error('Unknown/missing option '+key);}
    if(!options.out)throw Error('--out is required (new external directory)');
    const out=path.resolve(options.out),projects=options.batch?read(path.resolve(options.batch)).projects:[options.project||process.cwd()];
    if(options.batch&&!options.dry){
        if(fs.existsSync(out))throw Error('Batch output already exists; choose a new output directory');
        const destination=canonicalPath(out);
        for(const project of projects.filter(p=>fs.existsSync(p))){const root=fs.realpathSync(project);if(destination===root||destination.startsWith(root+path.sep))throw Error('Batch output must be outside every project');}
    }
    const results=projects.map((p,i)=>{try{return processProject(path.resolve(p),options.batch?path.join(out,String(i+1)):out,action,!!options.dry,options.target||'web-mobile',{readable:options.readable,archive:options.archive});}catch(e){return {project:p,success:false,failure:e.message};}});
    if(options.batch&&!options.dry){fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'batch-report.json'),JSON.stringify(results,null,2));}
    console.log(JSON.stringify(results,null,2));if(results.some(r=>r.success===false))process.exitCode=1;
}
module.exports={sourceFiles,manifest,refs,scan,processProject,buildProblems};
if(require.main===module)try{main();}catch(e){console.error(e.message);process.exitCode=1;}
