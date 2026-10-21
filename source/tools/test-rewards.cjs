// Run with: node tools/test-rewards.cjs
// Uses the TypeScript compiler bundled with Cocos Creator; never builds the game.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const candidates = [process.env.COCOS_TYPESCRIPT, '/Applications/Cocos/Creator/3.8.3/CocosCreator.app/Contents/Resources/resources/3d/engine/node_modules/typescript'];
let ts;
for (const candidate of candidates.filter(Boolean)) {
    try { ts = require(candidate); break; } catch {}
}
if (!ts) throw new Error('Set COCOS_TYPESCRIPT to your Cocos Creator TypeScript package path.');
const plain = value => JSON.parse(JSON.stringify(value));
function runtime(saved = new Map(), options = {}) {
    const modules = new Map(), tweens = [], opens = [], events = [], listeners = new Map();
    let random = 0.1, writes = 0, failWrite = !!options.failWrite, failRead = !!options.failRead;
    const reads = [], keyListeners = [];
    const EventMgr = {
        emit(type, ...args) { events.push([type, ...args]); for (const entry of listeners.get(type) ?? []) entry.fn.apply(entry.target, args); },
        on(type, fn, target) { listeners.set(type, [...listeners.get(type) ?? [], { fn, target }]); },
        off(type, fn, target) { listeners.set(type, (listeners.get(type) ?? []).filter(e => e.fn !== fn || e.target !== target)); }
    };
    class Component {
        constructor() { this.isValid = true; this.callbacks = []; this.parts = {}; this.node = { name: this.constructor.name, active: true, on() {}, off() {} }; }
        scheduleOnce(fn) { this.callbacks.push(fn); }
        schedule() {}
        unschedule(fn) { this.callbacks = this.callbacks.filter(entry => entry !== fn); }
        unscheduleAllCallbacks() { this.callbacks = []; }
        findNode(name) { return this.parts[name] ??= { active: true, angle: 0, position: { x: 0, y: -25 }, worldPosition: {}, setPosition() {} }; }
        findComp(name) { return this.parts[name] ??= { interactable: true, string: '', node: {}, init() {}, updateCoin() {} }; }
        flush() { const callbacks = this.callbacks.splice(0); callbacks.forEach(fn => fn.call(this)); }
    }
    class UIBase extends Component {
        open(name, data) { opens.push({ name, data }); }
        close() { this.closed = true; this.isValid = false; if (this.onClose) this.onClose(); }
    }
    const UIMgr = { views: {}, get(name) { return this.views[name]; }, open(name, data) { opens.push({ name, data }); }, close(name) { this.views[name]?.close(); delete this.views[name]; } };
    EventMgr.on('OpenUI', (name, data) => opens.push({ name, data }));
    const decorator = () => target => target;
    const cc = {
        Component, Node: class { static EventType = { TOUCH_START: 'touchstart', TOUCH_MOVE: 'touchmove', TOUCH_END: 'touchend', TOUCH_CANCEL: 'touchcancel', SIZE_CHANGED: 'size-changed' }; },
        macro: { REPEAT_FOREVER: Infinity }, ResolutionPolicy: { SHOW_ALL: 2 }, view: { on() {}, off() {}, getFrameSize: () => ({width:720,height:1600}), getResolutionPolicy: () => 4, setResolutionPolicy() {} },
        Input: { EventType: { KEY_DOWN: 'keydown' } }, KeyCode: { KEY_Q: 81 },
        input: { on(type, fn, target) { keyListeners.push({ type, fn, target }); }, off(type, fn, target) { const index = keyListeners.findIndex(e => e.type === type && e.fn === fn && e.target === target); if (index >= 0) keyListeners.splice(index, 1); } }, _decorator: { ccclass: decorator, executeInEditMode: decorator, requireComponent: decorator, disallowMultiple: decorator, property: (...args) => args.length >= 2 ? undefined : () => {} },
        math: { clamp: (n, min, max) => Math.max(min, Math.min(n, max)), randomRange: (min, max) => min + random * (max - min), randomRangeInt: (min, max) => Math.floor(min + random * (max - min)) },
        sys: { localStorage: { getItem: key => { reads.push(key); if (failRead) throw Error('read failure'); return saved.get(key) ?? null; }, setItem: (key, value) => { if (failWrite) throw Error('write failure'); saved.set(key, value); writes++; }, removeItem: key => saved.delete(key) } },
        Color: { RED: {}, WHITE: {} },
        v3: (x = 0, y = 0, z = 0) => ({ x, y, z }), v2: (x, y) => ({ x, y }), Enum: value => value,
        tween(node) {
            const callbacks = [];
            const chain = { delay() { return chain; }, by() { return chain; }, sequence() { return chain; }, repeatForever() { return chain; }, union() { return chain; }, parallel() { return chain; }, set() { return chain; }, to() { return chain; }, call(fn) { callbacks.push(fn); return chain; }, start() { tweens.push(() => callbacks.forEach(fn => fn())); return chain; }, stop() {} };
            return chain;
        }
    };
    const mocks = { EventMgr, UIBase, UIMgr, ResMgr: { getSpriteFrame: () => ({}) }, AudioMgr: { playSfx() {}, playBgm() {}, stopBgm() {} }, Debug: { Log() {} }, ShelveLocker: class {}, TransMgr: { Inst: { async fadeIn() {}, fadeOut() {} } } };
    if (options.realAudio) delete mocks.AudioMgr;
    function load(relative) {
        const filename = path.resolve(root, 'assets/scripts', relative.endsWith('.ts') ? relative : relative + '.ts');
        if (modules.has(filename)) return modules.get(filename).exports;
        const module = { exports: {} }; modules.set(filename, module);
        const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { fileName: filename, reportDiagnostics: true, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, experimentalDecorators: true } });
        assert.equal(result.diagnostics.filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, filename);
        vm.runInNewContext(result.outputText, { exports: module.exports, module, Date, console, require(id) {
            if (id === 'cc') return cc;
            if (id === 'cc/env') return { PREVIEW: !!options.preview, EDITOR: false };
            const name = id.split('/').pop();
            if (mocks[name]) return { [name]: mocks[name] };
            return load(path.relative(path.join(root, 'assets/scripts'), path.resolve(path.dirname(filename), id)));
        } }, { filename });
        return module.exports;
    }
    const { GameSave, success, failure } = load('manager/GameSave'); const initResult = GameSave.init();
    const { ItemMgr } = load('manager/ItemMgr');
    const { RewardMgr } = load('manager/RewardMgr');
    const { GameMgr } = load('manager/GameMgr');
    const { SkillMgr } = load('manager/SkillMgr');
    GameMgr._node = { destroyAllChildren() {} }; GameMgr._inst = { scheduleOnce() {} };
    function patch(fn) { const result = GameSave.transact(next => { fn(next); return success(); }); assert.equal(result.ok, true); }
    let fixtureStage;
    function stage() {
        if (fixtureStage) fixtureStage.onDestroy();
        const Stage = load('game/Stage').Stage; const instance = new Stage(); instance.roundId = GameMgr.roundId;
        instance.iconCfg = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 })); instance.shelveArr = []; instance.bg = {}; GameMgr.registerStage(instance);
        EventMgr.on('UseSkillRefreshPosition', instance.onUseRefreshPos, instance); EventMgr.on('UseSkillDoubleCoin', instance.onUseDoubleCoin, instance);
        fixtureStage = instance; return instance;
    }
    return { cc, mocks, load, ItemMgr, RewardMgr, GameMgr, SkillMgr, GameSave, initResult, success, failure, patch, stage, reads, keyListeners, failWrites(value) { failWrite = value; }, failReads(value) { failRead = value; }, saved, tweens, opens, events, UIMgr, setRandom(n) { random = n; }, get writes() { return writes; } };
}
// Minimal affine scene graph: exercises actual gameplay methods at non-unit scale.
function geometry(r) {
    class Transform {
        constructor(node, width = 0, height = 0) { Object.assign(this, { node, width, height, anchorX: .5, anchorY: .5 }); }
        setContentSize(width,height) {this.width=width;this.height=height;}
        convertToWorldSpaceAR(p) { const n=this.node,w=n.worldPosition,s=n.worldScale;return {x:w.x+p.x*s.x,y:w.y+p.y*s.y,z:0}; }
        convertToNodeSpaceAR(p) { const n=this.node,w=n.worldPosition,s=n.worldScale;return {x:(p.x-w.x)/s.x,y:(p.y-w.y)/s.y,z:0}; }
    }
    class SceneNode {
        static EventType = { TOUCH_START:'touchstart', TOUCH_MOVE:'touchmove', TOUCH_END:'touchend', TOUCH_CANCEL:'touchcancel', SIZE_CHANGED:'size-changed' };
        constructor(name='Node',width=0,height=0) { Object.assign(this,{name,children:[],active:true,isValid:true,position:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},listeners:new Map(),components:new Map()});this.transform=new Transform(this,width,height); }
        addChild(n) { if(n.parent)n.parent.children=n.parent.children.filter(c=>c!==n);n.parent=this;this.children.push(n); }
        getComponent(type) { return type===Transform?this.transform:this.components.get(type); }
        getComponentsInChildren(type) {return [...(this.components.has(type)?[this.components.get(type)]:[]),...this.children.flatMap(n=>n.getComponentsInChildren(type))];}
        getComponentInChildren(type) { return this.components.get(type)??this.children.map(n=>n.getComponentInChildren(type)).find(Boolean); }
        addComponent(type) { const c=new type();c.node=this;this.components.set(type,c);return c; }
        getChildByName(name) { return this.children.find(n=>n.name===name); }
        get worldPosition() { if(!this.parent)return {...this.position};return this.parent.transform.convertToWorldSpaceAR(this.position); }
        get worldScale() { const p=this.parent?.worldScale??{x:1,y:1,z:1};return {x:p.x*this.scale.x,y:p.y*this.scale.y,z:1}; }
        getWorldPosition() { return this.worldPosition; }
        setWorldPosition(p) { this.position=this.parent?this.parent.transform.convertToNodeSpaceAR(p):{...p}; }
        setWorldScale(p) { const s=this.parent?.worldScale??{x:1,y:1,z:1};this.scale={x:p.x/s.x,y:p.y/s.y,z:1}; }
        setPosition(x,y,z=0) { this.position=typeof x==='object'?{...x}:{x,y,z}; }
        setScale(x,y,z=1) { this.scale=typeof x==='object'?{...x}:{x,y,z}; }
        on(type,fn,target) { this.listeners.set(type,[...this.listeners.get(type)??[],{fn,target}]); }
        off(type,fn,target) { this.listeners.set(type,(this.listeners.get(type)??[]).filter(e=>e.fn!==fn||e.target!==target)); }
        emit(type,...args) { for(const e of this.listeners.get(type)??[])e.fn.apply(e.target,args); }
        destroy() { this.isValid=false;if(this.parent)this.parent.children=this.parent.children.filter(c=>c!==this); }
    }
    class Sprite {}
    class Widget { static AlignMode={ALWAYS:0}; updateAlignment(){} }
    class UIOpacity { constructor(){this.opacity=255;} }
    r.cc.Component.prototype.getComponent=function(type){return this.node.getComponent(type);};
    r.cc.Component.prototype.getComponentInChildren=function(type){return this.node.getComponentInChildren(type);};
    Object.assign(r.cc,{Vec3:{distance:(a,b)=>Math.hypot(a.x-b.x,a.y-b.y)},Node:SceneNode,UITransform:Transform,Sprite,Widget,UIOpacity,isValid:v=>!!v&&v.isValid!==false,instantiate:()=>new SceneNode()});
    const add=(parent,name,w,h,x=0,y=0)=>{const n=new SceneNode(name,w,h);n.setPosition(x,y);parent?.addChild(n);return n;};
    return {Node:SceneNode,Transform,Widget,add};
}
let checks = 0;
function check(name, fn) { return Promise.resolve().then(fn).then(() => { checks++; console.log('PASS', name); }); }
(async () => {
    await check('fresh save: independent key, no legacy import/delete; persisted reload', () => {
        const saved = new Map([['hgxcds_itemDic', '{"0":9999}'], ['hgxcds_curLevel', '{"0":50}']]);
        const r = runtime(saved); assert.equal(r.initResult.ok, true);
        assert.deepEqual(plain(r.GameSave.Data.items), { 0: 0, 1: 3, 2: 3, 3: 3, 4: 3 });
        assert.deepEqual(plain(r.GameSave.Data.levels), [0, 0, 0]);
        assert.ok(r.reads.every(key => key === 'hgxcds_game_v1'));
        assert.equal(saved.get('hgxcds_itemDic'), '{"0":9999}');
        r.patch(next => { next.items[0] = 500; next.levels[0] = 12; });
        assert.equal(runtime(saved).GameMgr.CurLevel, 12); assert.equal(runtime(saved).ItemMgr.getCnt(0), 500);
        const snapshot = r.GameSave.Data; snapshot.items[0] = 0; assert.equal(r.ItemMgr.getCnt(0), 500);
    });
    await check('save: malformed JSON, schema errors and read/write failures are recoverable', () => {
        for (const raw of ['{bad', '{}', 'null', '{"version":2}']) {
            const saved = new Map([['hgxcds_game_v1', raw]]), r = runtime(saved);
            assert.equal(r.initResult.reason, 'corrupt_save'); assert.equal(saved.get('hgxcds_game_v1'), raw);
            r.failWrites(true); assert.equal(r.GameSave.createNew().reason, 'storage_error');
            assert.equal(saved.get('hgxcds_game_v1'), raw);
            r.failWrites(false); assert.equal(r.GameSave.createNew().ok, true);
        }
        const r = runtime(new Map(), { failRead: true }); assert.equal(r.initResult.reason, 'storage_error');
        r.failReads(false); assert.equal(r.GameSave.init().ok, true);
        const w = runtime(new Map(), { failWrite: true }); assert.equal(w.initResult.reason, 'storage_error');
        w.failWrites(false); assert.equal(w.GameSave.init().ok, true);
    });
    await check('save: reject malformed nested fields without overwriting the stored payload', () => {
        const source = runtime().GameSave.Data;
        for (const mutate of [n => { n.items[1] = -1; }, n => { n.dailyClaimDate = '2026-02-31'; },
            n => { n.settings.sfxEnabled = 'yes'; }, n => { n.lastPassReward = 5; }, n => { n.unlockedModes = [0, 0]; }]) {
            const next = plain(source); mutate(next); const raw = JSON.stringify(next), saved = new Map([['hgxcds_game_v1', raw]]), r = runtime(saved);
            assert.equal(r.initResult.reason, 'corrupt_save'); assert.equal(saved.get('hgxcds_game_v1'), raw);
        }
    });
    await check('transaction: failed save leaves memory/disk/events unchanged; valid batch writes once', () => {
        const r = runtime(); r.patch(next => { next.items[0] = 400; });
        const before = plain(r.GameSave.Data), disk = r.saved.get('hgxcds_game_v1'), events = r.events.length;
        r.failWrites(true); assert.equal(r.ItemMgr.tryApplyRewards([{ itemId: 1, cnt: 1 }], 400).reason, 'storage_error');
        assert.deepEqual(plain(r.GameSave.Data), before); assert.equal(r.saved.get('hgxcds_game_v1'), disk); assert.equal(r.events.length, events);
        r.failWrites(false); const writes = r.writes;
        assert.equal(r.ItemMgr.tryApplyRewards([{ itemId: 1, cnt: 1 }], 400).ok, true);
        assert.equal(r.writes, writes + 1); assert.equal(r.ItemMgr.getCnt(0), 0); assert.equal(r.ItemMgr.getCnt(1), 4);
        assert.ok(r.events.some(e => e[0] === 'UpdateSkillCnt' && e[1] === 0 && e[2] === 4));
        for (const rewards of [[], [{ itemId: 99, cnt: 1 }], [{ itemId: 1, cnt: -1 }], [{ itemId: 1, cnt: 0.5 }]])
            assert.equal(r.ItemMgr.tryApplyRewards(rewards).reason, 'invalid_config');
        assert.equal(r.ItemMgr.tryApplyRewards([{ itemId: 1, cnt: 1 }], 400).reason, 'insufficient_coins');
    });
    await check('daily: marker and full inventory commit together, immutable config, no double claim', () => {
        const r = runtime(); const today = new Date(2026, 9, 20, 12).getTime(), tomorrow = new Date(2026, 9, 21).getTime();
        const cfg = r.load('config/CfgLoginReward').CfgLoginReward, original = plain(cfg);
        const before = plain(r.GameSave.Data); r.failWrites(true);
        assert.equal(r.RewardMgr.claimDaily(today).reason, 'storage_error'); assert.deepEqual(plain(r.GameSave.Data), before);
        r.failWrites(false); const writes = r.writes; const result = r.RewardMgr.claimDaily(today);
        assert.equal(result.ok, true); assert.equal(result.value.length, 5); assert.equal(r.writes, writes + 1);
        assert.equal(r.ItemMgr.getCnt(0), 100); for (let i = 1; i <= 4; i++) assert.equal(r.ItemMgr.getCnt(i), 4);
        result.value.shift(); assert.deepEqual(plain(cfg), original); assert.equal(r.RewardMgr.claimDaily(today).reason, 'unavailable');
        const reload = runtime(r.saved); assert.equal(reload.RewardMgr.canClaimDaily(today), false); assert.equal(reload.RewardMgr.claimDaily(tomorrow).ok, true);
    });
    await check('milestones: failure cannot grant or advance marker; twelve levels claims five then ten', () => {
        const r = runtime(); assert.equal(r.RewardMgr.claimPassReward().reason, 'unavailable');
        r.patch(next => { next.levels[0] = 12; }); const before = plain(r.GameSave.Data);
        r.failWrites(true); assert.equal(r.RewardMgr.claimPassReward().reason, 'storage_error'); assert.deepEqual(plain(r.GameSave.Data), before);
        r.failWrites(false); assert.equal(r.RewardMgr.claimPassReward().ok, true); assert.equal(r.RewardMgr.NextPassTarget, 10);
        assert.equal(r.RewardMgr.claimPassReward().ok, true); assert.equal(r.RewardMgr.NextPassTarget, 15);
        assert.equal(r.RewardMgr.claimPassReward().reason, 'unavailable');
    });
    await check('spin: all six outcomes atomic, insufficient coins/config/save errors distinguished', () => {
        for (let i = 0; i < 6; i++) {
            const r = runtime(); r.patch(next => { next.items[0] = 399; }); assert.equal(r.RewardMgr.claimSpinReward(i).reason, 'insufficient_coins');
            r.patch(next => { next.items[0] = 400; }); const before = plain(r.GameSave.Data);
            r.failWrites(true); assert.equal(r.RewardMgr.claimSpinReward(i).reason, 'storage_error'); assert.deepEqual(plain(r.GameSave.Data), before);
            r.failWrites(false); const result = r.RewardMgr.claimSpinReward(i); assert.equal(result.ok, true);
            const { itemId, cnt } = result.value[0]; assert.equal(r.ItemMgr.getCnt(0), itemId === 0 ? cnt : 0);
            if (itemId !== 0) assert.equal(r.ItemMgr.getCnt(itemId), before.items[itemId] + cnt);
            assert.deepEqual(plain(runtime(r.saved).GameSave.Data), plain(r.GameSave.Data));
            assert.equal(r.RewardMgr.claimSpinReward(99).reason, 'invalid_config');
        }
    });
    await check('win: failure preserves full state and first multiplier; all five slots reachable', () => {
        for (let slot = 0; slot < 5; slot++) {
            const r = runtime(); r.GameMgr.startGame(); r.setRandom([2.5, 5.5, 6.5, 7.5, 8.5][slot] / 9);
            const before = plain(r.GameSave.Data); r.failWrites(true);
            assert.equal(r.GameMgr.settleRound().reason, 'storage_error'); assert.deepEqual(plain(r.GameSave.Data), before);
            r.setRandom(0.99); r.failWrites(false); const writes = r.writes, result = r.GameMgr.settleRound();
            assert.equal(result.ok, true); assert.equal(result.value.slotIndex, slot); assert.equal(result.value.amount, [200, 300, 500, 300, 400][slot]);
            assert.equal(r.writes, writes + 1); assert.equal(r.GameMgr.CurLevel, 1); assert.equal(r.GameMgr.settleRound().reason, 'unavailable');
            assert.equal(runtime(r.saved).ItemMgr.getCnt(0), result.value.amount);
            r.GameMgr.quitGame(); assert.equal(r.GameMgr.roundResult, null); assert.equal(r.GameMgr.pendingWin, null);
        }
        const r = runtime(); r.patch(next => { next.levels[0] = 14; }); r.GameMgr.startGame();
        const result = r.GameMgr.settleRound(); assert.equal(result.value.amount, 480); assert.equal(r.GameMgr.isModeUnlocked(1), true);
    });
    await check('round: four refills persist before allowance, use failures retain inventory, restart resets', () => {
        const r = runtime(); r.GameMgr.startGame(); const stage = r.stage();
        for (let skill = 0; skill < 4; skill++) {
            assert.equal(r.GameMgr.claimSkill(skill).reason, 'unavailable'); r.patch(next => { next.items[skill + 1] = 0; });
            r.failWrites(true); assert.equal(r.GameMgr.claimSkill(skill).reason, 'storage_error'); assert.equal(r.GameMgr.canClaimSkill(skill), true);
            r.failWrites(false); assert.equal(r.GameMgr.claimSkill(skill).ok, true);
            r.failWrites(true); assert.equal(r.GameMgr.useSkill(skill).reason, 'storage_error'); assert.equal(r.ItemMgr.getCnt(skill + 1), 1);
            r.failWrites(false); assert.equal(r.GameMgr.useSkill(skill).ok, true); stage.flush(); stage.flush(); assert.equal(r.ItemMgr.getCnt(skill + 1), 0);
            assert.equal(r.GameMgr.claimSkill(skill).reason, 'unavailable');
        }
        assert.equal(r.GameMgr.useSkill(-1).reason, 'unavailable');
        assert.equal(r.GameMgr.tryRevive(), true); assert.equal(r.GameMgr.tryRevive(), false);
        r.GameMgr.startGame(); r.stage(); assert.equal(r.GameMgr.CanRevive, true);
        for (let skill = 0; skill < 4; skill++) assert.equal(r.GameMgr.canClaimSkill(skill), true);
        r.GameMgr.quitGame(); assert.equal(r.GameMgr.tryRevive(), false);
    });
    await check('layout: empty/one/two/150 goods conserve every ID and never emit undefined', () => {
        const r = runtime(), { distributeGoods, goodsCounts } = r.load('game/GoodsLayout');
        const shelves = [{ id: 0, small: true }, ...Array.from({ length: 9 }, (_, i) => ({ id: i + 1, small: false }))];
        for (const length of [0, 1, 2, 3, 54, 150]) {
            let ids = Array.from({ length }, (_, i) => i % 12 + 1);
            for (let pass = 0; pass < 5; pass++) {
                const result = distributeGoods(shelves, [...ids, -1, undefined, NaN, 999], 20); assert.ok(result);
                const allocated = Object.values(result).flatMap(s => Object.values(s).flat());
                assert.ok(allocated.every(id => id === -1 || Number.isInteger(id) && id > 0));
                assert.equal(goodsCounts(ids, 20), goodsCounts(allocated, 20)); ids = allocated.filter(id => id > 0);
            }
        }
        assert.equal(distributeGoods([], [1], 20), null);
        assert.equal(distributeGoods([{ id: 0, small: true }], [1, 1, 1, 2], 20), null);
    });
    await check('Stage: collect visible and queued goods, validate before charge, lock through reinit', () => {
        const r = runtime(); r.GameMgr.startGame(); const stage = r.stage();
        const Common = r.load('game/CommonShelve').CommonShelve, Small = r.load('game/SmallShelve').SmallShelve;
        function shelf(K, id, ids) { const s = new K(); s.id = id; Object.defineProperty(s, 'GoodsIdArr', { get: () => ids }); s.clear = () => { ids = []; }; s.init = () => {}; return s; }
        stage.shelveArr = [shelf(Common, 0, [1, 2, 3]), shelf(Small, 1, [1])];
        r.GameMgr.goodsData = { 0: { 0: [2, 2, -1], 1: [3, 3], 2: [1] }, 1: { 0: [] } }; r.GameMgr.goodsArr = [1];
        const prepared = stage.prepareSkill(2); assert.equal(prepared.ok, true);
        const { goodsCounts } = r.load('game/GoodsLayout'); assert.equal(goodsCounts(Object.values(prepared.value).flatMap(s => Object.values(s).flat()), 20), goodsCounts([1,2,3,1,2,2,3,3,1,1],20));
        r.failWrites(true); assert.equal(r.GameMgr.useSkill(2).reason, 'storage_error'); assert.equal(stage.isBusy, false); assert.equal(r.ItemMgr.getCnt(3), 3);
        r.failWrites(false); assert.equal(r.GameMgr.useSkill(2).ok, true); assert.equal(stage.isBusy, true); assert.equal(r.ItemMgr.getCnt(3), 2);
        assert.equal(r.GameMgr.useSkill(2).reason, 'unavailable'); assert.equal(r.GameMgr.useSkill(0).reason, 'unavailable');
        stage.flush(); assert.equal(stage.isBusy, true); stage.flush(); assert.equal(stage.isBusy, false);
        r.GameMgr._pickedGoods = {}; assert.equal(r.GameMgr.useSkill(0).reason, 'unavailable'); r.GameMgr._pickedGoods = null;
        r.GameMgr.Pause = true; assert.equal(r.GameMgr.useSkill(0).reason, 'unavailable');
    });
    await check('Stage: stale refresh init is cancelled after quit; no-common layout fails without charging', () => {
        const r = runtime(); r.GameMgr.startGame(); const stage = r.stage(), Small = r.load('game/SmallShelve').SmallShelve;
        const shelf = new Small(); shelf.id = 0; let initialized = 0; shelf.clear = () => {}; shelf.init = () => initialized++;
        Object.defineProperty(shelf, 'GoodsIdArr', { get: () => [1, 1], configurable: true }); stage.shelveArr = [shelf];
        assert.equal(r.GameMgr.useSkill(2).ok, true); r.GameMgr.quitGame(); stage.flush(); assert.equal(initialized, 0);
        r.GameMgr.startGame(); const other = r.stage(); Object.defineProperty(shelf, 'GoodsIdArr', { get: () => [1,1,1,1], configurable: true }); other.shelveArr = [shelf]; const stock = r.ItemMgr.getCnt(3); assert.equal(r.GameMgr.useSkill(2).reason, 'invalid_config'); assert.equal(r.ItemMgr.getCnt(3), stock);
    });
    await check('Stage: pending queues prevent premature win even when every visible shelf is empty', () => {
        const r = runtime(); r.GameMgr.startGame(); const stage = r.stage();
        r.GameMgr.goodsData = { 0: { 0: [-1, 1] } }; assert.equal(stage.checkWin(), false);
        r.GameMgr.goodsData = { 0: { 0: [-1] } }; assert.equal(stage.checkWin(), true);
    });
    await check('double coins: active use rejected without cost; pause stops countdown; expires after thirty', () => {
        const r = runtime(); r.GameMgr.startGame(); const stage = r.stage();
        r.GameMgr.useSkill(3); assert.equal(stage.DoubleCoinActive, true); assert.equal(r.ItemMgr.getCnt(4), 2);
        assert.equal(r.GameMgr.useSkill(3).reason, 'unavailable'); assert.equal(r.ItemMgr.getCnt(4), 2);
        r.GameMgr.Pause = true; stage.update(50); assert.equal(stage.doubleCoinLeft, 30);
        r.patch(next => { next.items[4] = 0; });
        r.GameMgr.Pause = false;
        const Box = r.load('game/SkillBox').SkillBox, box = new Box(); box.onBtnDoubleCoinClick();
        assert.equal(r.opens.at(-1).name, 'UIToast'); assert.equal(r.opens.at(-1).data, '效果生效中'); assert.equal(r.ItemMgr.getCnt(4), 0);
        r.patch(next => { next.items[4] = 2; });
        stage.update(29); assert.equal(stage.DoubleCoinActive, true); stage.update(1); assert.equal(stage.DoubleCoinActive, false);
        assert.equal(r.GameMgr.useSkill(3).ok, true); assert.equal(r.ItemMgr.getCnt(4), 1);
    });
    await check('shelf scheduler: no automatic merging while paused or during redistribution', () => {
        const r = runtime(); r.GameMgr.startGame(); const stage = r.stage(), Shelf = r.load('game/CommonShelve').CommonShelve;
        const shelf = new Shelf(); shelf.layer0GoodsMap = new Map([[0, 1], [1, 1], [2, 1]]);
        // Accessing absent layer nodes would throw if either guard failed.
        r.GameMgr.Pause = true; shelf.onCheckMerge(); r.GameMgr.Pause = false; stage.isBusy = true; shelf.onCheckMerge();
    });
    await check('goods: removing flagged immediately, excluded from shelf recovery and invalid creation', () => {
        const r = runtime(), Goods = r.load('game/Goods').Goods, Common = r.load('game/CommonShelve').CommonShelve, Small = r.load('game/SmallShelve').SmallShelve;
        const goods = new Goods(); goods.node.off = () => {}; goods.sp = { node: {} }; goods.remove(); assert.equal(goods.isRemoving, true);
        for (const K of [Common, Small]) {
            const shelf = new K(); shelf.id = 0; shelf.layers = [{ getComponentsInChildren: () => [{ Id: 1, isRemoving: false }, { Id: 2, isRemoving: true }] }];
            assert.deepEqual(plain(shelf.GoodsIdArr), [1]); let created = 0; shelf.createGoods = () => { created++; return { bounce() {} }; };
            r.GameMgr.goodsData = { 0: { 0: [undefined, -1, 0, 999, 1] } };
            for (let i = 0; i < 5; i++) shelf.createLayerGoods(0); assert.equal(created, 1);
        }
    });
    await check('drag and merge: preserve picked goods; reject removed source; logical emptiness ignores animation', () => {
        const r=runtime(),g=geometry(r);r.GameMgr.startGame();const stage=r.stage();
        const root=g.add(null,'Stage',720,1600);stage.effectsLayer=g.add(root,'EffectsLayer',720,1600);
        const Common=r.load('game/CommonShelve').CommonShelve,Goods=r.load('game/Goods').Goods;
        const shelf=new Common();shelf.node=g.add(root,'Shelf',230,145);shelf.uiTrans=shelf.node.transform;
        shelf.layers=[g.add(shelf.node,'Front',230,145),g.add(shelf.node,'Back',230,145)];
        const goods=[];
        for(let slot=0;slot<3;slot++){
            const item=new Goods(),node=g.add(shelf.layers[0],'Goods'+slot,80,100);item.node=node;item.id=1;item.slot=slot;
            item.sp={node:g.add(node,'Sprite',80,100),spriteFrame:{}};node.components.set(Goods,item);node.components.set(r.cc.UIOpacity,new r.cc.UIOpacity());
            shelf.layer0GoodsMap.set(slot,1);goods.push(item);
        }
        r.GameMgr.shelveArr=[shelf];r.GameMgr.pick(goods[0],{x:0,y:-80});goods[0].Visible=false;shelf.onCheckMerge();
        assert.equal(goods.filter(x=>x.isRemoving).length,0);assert.equal(shelf.GoodsIdArr.length,3);
        r.GameMgr.cancelPick();shelf.onCheckMerge();assert.ok(goods.every(x=>x.isRemoving));assert.equal(shelf.isEmpty,true);
        assert.equal(shelf.layers[0].children.length,3);assert.equal(r.events.filter(e=>e[0]==='MergeGoods').length,1);
        // A source can become invalid through another board operation between pick and drop.
        goods[0].isRemoving=false;r.GameMgr.pick(goods[0],{x:0,y:-80});goods[0].isRemoving=true;
        const preview=r.GameMgr._holdGoods;let placed=0;shelf.placeGoods=()=>placed++;r.GameMgr.release();
        assert.equal(placed,0);assert.equal(preview.isValid,false);assert.equal(r.GameMgr.isPicking,false);
        const Small=r.load('game/SmallShelve').SmallShelve,small=new Small();small.layers=shelf.layers;
        assert.equal(small.isEmpty,true);goods[1].isRemoving=false;assert.equal(small.isEmpty,false);
    });
    await check('last merge at timeout: settle once despite live animation nodes; remaining goods still time out', () => {
        for(const remaining of [false,true]){
            const r=runtime(),g=geometry(r);r.GameMgr.startGame();const stage=r.stage();
            const Common=r.load('game/CommonShelve').CommonShelve,Goods=r.load('game/Goods').Goods;
            const shelf=new Common(),front=g.add(null,'Front',230,145);shelf.layers=[front];
            const item=new Goods();item.id=1;item.isRemoving=!remaining;item.node=g.add(front,'Goods',80,100);item.node.components.set(Goods,item);stage.shelveArr=[shelf];
            const Time=r.load('uiItem/TimeItem').TimeItem,timer=new Time();timer._label={};timer.nz={};timer.leftTime=.1;r.load('Global').Global.Level_Time=1;
            r.mocks.EventMgr.on('TimeOut',stage.onTimeOut,stage);timer.update(.2);stage.onCheckWin();stage.onCheckWin();
            assert.equal(r.opens.filter(e=>e.name==='UITimeOut').length,remaining?1:0);
            assert.equal(r.opens.filter(e=>e.name==='UIWin').length,remaining?0:1);assert.equal(r.GameMgr.CurLevel,remaining?0:1);
        }
    });
    await check('startup portrait frame: fit the complete home UI before any resource loading', async () => {
        const r=runtime(),calls=[];r.cc.view.setResolutionPolicy=policy=>calls.push(['policy',policy]);
        r.mocks.ResMgr.loadDir=async bundle=>calls.push(['load',bundle]);
        const Main=r.load('Main').Main;await new Main().start();
        assert.deepEqual(calls,[['policy',2],['load','resources']]);assert.equal(r.opens.at(-1).name,'UILoading');
    });
    await check('loading failure: builtin retry survives missing UI bundle, repeated failures and duplicate clicks', async () => {
        const r=runtime(),g=geometry(r);r.cc.Label=class {};r.cc.Button=class {static EventType={CLICK:'click'}};r.cc.Color=class {};
        const Loading=r.load('ui/UILoading').UILoading,ui=new Loading();ui.node=g.add(null,'UILoading',720,1600);
        ui.progressBar={progress:0,node:g.add(ui.node,'ProgressBar',490,32,0,-371)};
        let bundleFail=true,resFail=false,bundleCalls=0,resCalls=0,scheduled=[];
        ui.schedule=fn=>scheduled.push(fn);ui.unschedule=fn=>{scheduled=scheduled.filter(x=>x!==fn)};
        ui.loadBundle=async()=>{bundleCalls++;if(bundleFail)throw Error('network')};ui.loadRes=async()=>{resCalls++;if(resFail)throw Error('assets')};
        await ui.start();assert.equal(ui.loaded,false);assert.equal(ui.retryNode.active,true);assert.equal(scheduled.length,0);assert.equal(resCalls,0);
        const retryNode=ui.retryNode;assert.ok(retryNode.listeners.has('click'));bundleFail=false;resFail=true;
        await ui.loadResources();assert.equal(ui.retryNode,retryNode);assert.equal(retryNode.active,true);assert.equal(scheduled.length,0);
        resFail=false;let resolve;ui.loadBundle=()=>{bundleCalls++;return new Promise(done=>resolve=done)};
        const pending=ui.loadResources();await ui.loadResources();assert.equal(bundleCalls,3);assert.equal(retryNode.active,false);
        resolve();await pending;assert.equal(ui.loaded,true);ui.updateProgress();assert.equal(ui.progressBar.progress,1);assert.equal(scheduled.length,0);
        ui.flush();assert.equal(ui.closed,true);assert.equal(r.opens.at(-1).name,'UIMain');
        const gone=new Loading();gone.progressBar={progress:0};gone.loadBundle=()=>Promise.reject(Error('offline'));gone.showLoadFailure=()=>{throw Error('must not render destroyed UI')};
        gone.schedule=()=>{};const closing=gone.loadResources();gone.isValid=false;await closing;assert.equal(gone.loading,false);
    });
    await check('weighted draws: half-open boundary, zero bucket and invalid weights', () => {
        const r = runtime(), math = r.load('util/MathUtil').MathUtil; r.setRandom(5/6); assert.equal(math.randWeight([5,1]), 1);
        r.setRandom(0); assert.equal(math.randWeight([0,5,0,1]), 1);
        for (const weights of [[], [0,0], [-1,2], [Infinity,1], [NaN]]) assert.equal(math.randWeight(weights), -1);
        const cfg = r.load('config/cfg_passReward').CfgPassReward; assert.equal(new Set(cfg.map(v => v.id)).size, cfg.length);
    });
    await check('preview lifecycle: named key listener unbound, quit cannot open cached win', () => {
        const r = runtime(new Map(), { preview: true }); r.GameMgr.startGame(); const stage = r.stage(); stage.onLoad(); assert.equal(r.keyListeners.length, 1);
        stage.onDestroy(); assert.equal(r.keyListeners.length, 0); assert.equal(stage.doubleCoinLeft, 0);
        r.GameMgr.quitGame(); const before = r.opens.length; stage.onPreviewKey({ keyCode: 81 }); assert.equal(r.opens.length, before); assert.equal(r.GameMgr.settleRound().reason, 'unavailable');
    });
    await check('skill UI: actual BtnExtend close resumes; exhausted allowance only produces Toast', () => {
        const r = runtime(); r.GameMgr.startGame(); r.stage(); r.patch(next => { next.items[1] = 0; }); r.GameMgr.claimSkill(0); r.GameMgr.useSkill(0);
        const Popup = r.load('ui/UIGetSkill').UIGetSkill, ui = new Popup(); ui.onOpen(0); assert.equal(ui.parts.BtnGet.interactable, false); assert.equal(r.GameMgr.Pause, true);
        const prefab = JSON.parse(fs.readFileSync(path.join(root, 'assets/bundles/ui/UIGetSkill.prefab'))), close = prefab.find(o => o.__type__ === 'cc.Node' && o._name === 'BtnClose');
        const config = close._components.map(c => prefab[c.__id__]).find(o => o.closeUI);
        const Ext = r.load('uiExtend/BtnExtend').BtnExtend, extension = new Ext(); extension.btn = { clickEvents: [] }; extension.closeUI = config.closeUI; r.UIMgr.views.UIGetSkill = ui; extension.onClick(); assert.equal(r.GameMgr.Pause, false);
        const Box = r.load('game/SkillBox').SkillBox, box = new Box(); box.onBtnFreezeTimeClick(); assert.equal(r.opens.at(-1).name, 'UIToast'); assert.match(r.opens.at(-1).data, /补领已用完/);
    });
    await check('recovery UI: failed retry re-enables actions, successful retry grants once, stale retry rejected', () => {
        const r = runtime(); r.GameMgr.startGame(); r.stage(); r.failWrites(true); const stage = r.stage(); stage.showWin();
        assert.equal(stage.winRecovery, true); assert.equal(r.opens.at(-1).name, 'UIRecovery');
        const Recovery = r.load('ui/UIRecovery').UIRecovery, ui = new Recovery(); ui.onOpen(r.opens.at(-1).data); ui.onBtnPrimaryClick();
        assert.equal(ui.processing, false); assert.equal(ui.parts.BtnAction0.interactable, true); assert.equal(r.GameMgr.CurLevel, 0);
        r.failWrites(false); ui.onBtnPrimaryClick(); assert.equal(ui.closed, true); assert.equal(r.GameMgr.CurLevel, 1); assert.equal(r.opens.at(-1).name, 'UIWin');
        r.GameMgr.startGame(); const next = r.stage(); r.failWrites(true); next.showWin(); const stale = r.opens.at(-1).data.actions[0]; r.GameMgr.quitGame(); r.failWrites(false);
        const before = plain(r.GameSave.Data); assert.equal(stale.run().reason, 'unavailable'); assert.deepEqual(plain(r.GameSave.Data), before);
    });
    await check('recovery exits: restart and home remain available without saving', () => {
        for (const index of [1,2]) {
            const r = runtime(); r.GameMgr.startGame(); const stage = r.stage(); r.failWrites(true); stage.showWin();
            const Recovery = r.load('ui/UIRecovery').UIRecovery, ui = new Recovery(); ui.onOpen(r.opens.at(-1).data); ui.execute(index);
            assert.equal(ui.closed, true); if (index === 1) assert.equal(r.GameMgr.CanRevive, true); else assert.equal(r.opens.at(-1).name, 'UIMain');
        }
    });
    await check('loading: corrupted save requires explicit new-save confirmation and preserves unrelated keys', () => {
        const saved = new Map([['hgxcds_game_v1', '{bad'], ['untouched','keep']]), r = runtime(saved), Loading = r.load('ui/UILoading').UILoading;
        const loader = new Loading(); loader.onLoadCompleted(); const first = r.opens.at(-1).data; first.actions[1].onSuccess();
        assert.equal(saved.get('hgxcds_game_v1'), '{bad'); const confirm = r.opens.at(-1).data; assert.equal(confirm.actions[0].label, '确定新建');
        assert.equal(confirm.actions[0].run().ok, true); assert.equal(saved.get('untouched'), 'keep'); assert.equal(r.GameSave.Data.levels[0], 0);
    });
    await check('save reset: defaults commit atomically, preserve unrelated storage and reload', () => {
        const saved=new Map([['untouched','keep'],['legacy_progress','keep']]),r=runtime(saved);
        const defaults=plain(r.GameSave.Data);
        r.patch(n=>{n.items[0]=2500;n.items[1]=9;n.levels=[15,10,3];n.unlockedModes=[0,1,2];n.dailyClaimDate='2026-10-21';n.lastPassReward=5;n.settings.bgmEnabled=false;});
        const before=plain(r.GameSave.Data),disk=saved.get('hgxcds_game_v1'),events=r.events.length,writes=r.writes;
        r.failWrites(true);assert.equal(r.GameSave.reset().reason,'storage_error');
        assert.deepEqual(plain(r.GameSave.Data),before);assert.equal(saved.get('hgxcds_game_v1'),disk);assert.equal(r.events.length,events);
        r.failWrites(false);assert.equal(r.GameSave.reset().ok,true);assert.equal(r.writes,writes+1);
        assert.deepEqual(plain(r.GameSave.Data),defaults);assert.deepEqual(plain(runtime(saved).GameSave.Data),defaults);
        assert.equal(saved.get('untouched'),'keep');assert.equal(saved.get('legacy_progress'),'keep');
    });
    await check('home reset: explicit confirmation, cancel does not write, success refreshes home, stale action rejected', () => {
        const r=runtime(),Main=r.load('ui/UIMain').UIMain,ui=new Main();r.UIMgr.views.UIMain=ui;
        r.patch(n=>{n.items[0]=1234;n.levels[0]=8;});const before=plain(r.GameSave.Data),writes=r.writes;
        ui.onBtnClearSaveClick();const options=r.opens.at(-1).data;
        assert.equal(r.opens.at(-1).name,'UIRecovery');assert.equal(options.actions[0].label,'取消');assert.equal(options.actions[1].label,'确定清除');
        assert.ok(options.message.includes('无法撤销'));assert.deepEqual(plain(r.GameSave.Data),before);assert.equal(r.writes,writes);
        options.actions[0].run();assert.equal(r.writes,writes);
        const Recovery=r.load('ui/UIRecovery').UIRecovery,confirm=new Recovery();confirm.onOpen(options);r.GameMgr.mode=2;
        confirm.onBtnSecondaryClick();assert.equal(confirm.closed,true);assert.equal(r.GameSave.Data.items[0],0);assert.equal(r.GameSave.Data.levels[0],0);assert.equal(r.GameMgr.mode,0);
        assert.equal(r.opens.at(-2).name,'UIMain');assert.equal(r.opens.at(-1).data,'存档已清除');
        assert.equal(options.actions[1].run().reason,'unavailable');
        const prefab=JSON.parse(fs.readFileSync(path.join(root,'assets/bundles/ui/UIMain.prefab')));
        const node=prefab.find(n=>n._name==='BtnClearSave'),parts=node._components.map(c=>prefab[c.__id__]);
        assert.equal(parts.find(c=>c.__type__==='cc.UITransform')._contentSize.height,88);
        const button=parts.find(c=>c.__type__==='cc.Button'),handler=prefab[button.clickEvents[0].__id__];
        assert.equal(handler.handler,'onBtnClearSaveClick');assert.equal(handler.target.__id__,1);
    });
    await check('home reset: storage failure keeps confirmation retryable; leaving home cancels destructive action', () => {
        const r=runtime(),Main=r.load('ui/UIMain').UIMain,ui=new Main();r.UIMgr.views.UIMain=ui;r.patch(n=>{n.items[0]=987;});
        ui.onBtnClearSaveClick();const options=r.opens.at(-1).data,Recovery=r.load('ui/UIRecovery').UIRecovery,confirm=new Recovery();confirm.onOpen(options);
        r.failWrites(true);confirm.onBtnSecondaryClick();assert.ok(!confirm.closed);assert.equal(confirm.processing,false);assert.equal(r.GameSave.Data.items[0],987);
        assert.equal(confirm.findComp('BtnAction1').interactable,true);assert.ok(confirm.findComp('LbDesc').string.includes('重试'));
        r.failWrites(false);confirm.onBtnSecondaryClick();assert.equal(confirm.closed,true);assert.equal(r.GameSave.Data.items[0],0);
        const other=new Main();r.UIMgr.views.UIMain=other;other.onBtnClearSaveClick();const stale=r.opens.at(-1).data;r.GameMgr.leavingHome=true;
        const writes=r.writes;assert.equal(stale.actions[1].run().reason,'unavailable');assert.equal(r.writes,writes);
    });
    await check('home transition: next-frame daily popup suppressed as soon as start begins', async () => {
        const r = runtime(), Main = r.load('ui/UIMain').UIMain, Item = r.load('uiItem/MainItem').MainItem;
        const ui = new Main(); ui.parts.PageView = { scrollToPage() {} }; ui.onLoad(); r.UIMgr.views.UIMain = ui;
        ui.onOpen(); const item = new Item(); item.mode = 0; const transition = item.onBtnStartClick(); assert.equal(r.GameMgr.leavingHome, true);
        ui.flush(); assert.ok(!r.opens.some(o => o.name === 'UILoginReward')); await transition;
    });
    await check('reward presentation: immutable payload, single acknowledgments and no writes', () => {
        const r = runtime(), Display = r.load('ui/UIGetReward').UIGetReward; const rewards = [{ itemId:0,cnt:100 },{ itemId:1,cnt:1 }], before = plain(rewards), writes = r.writes;
        const ui = new Display(); ui.onOpen(rewards); ui.onBtnNormalGetClick(); ui.onBtnNormalGetClick(); assert.equal(ui.index,1); ui.flush(); ui.onBtnNormalGetClick(); assert.equal(ui.closed,true);
        assert.deepEqual(rewards,before); assert.equal(r.writes,writes); const empty=new Display();empty.onOpen([]);empty.flush();assert.equal(empty.closed,true);
    });
    await check('daily and milestone UI: failed save unlocks controls; successful retry shows prepaid rewards', () => {
        for (const name of ['UILoginReward','UIPassReward']) {
            const r=runtime();r.patch(n=>{n.levels[0]=12});const UI=r.load('ui/'+name)[name],ui=new UI();ui.onOpen();r.failWrites(true);
            (name==='UILoginReward'?ui.onBtnGetAllClick:ui.onBtnGetClick).call(ui);assert.equal(ui.processing,false);assert.equal(r.opens.at(-1).name,'UIRecovery');
            const options=r.opens.at(-1).data;r.failWrites(false);const result=options.actions[0].run();assert.equal(result.ok,true);options.actions[0].onSuccess(result.value);assert.equal(r.opens.at(-1).name,'UIGetReward');
        }
    });
    await check('spin UI: error feedback, no double deduction during animation, prepaid rewards survive reload', () => {
        const r=runtime(),Spin=r.load('ui/UILuckySpin').UILuckySpin,ui=new Spin();ui.onOpen();ui.onBtnSpinClick();assert.match(r.opens.at(-1).data,/星星币不足/);
        r.patch(n=>{n.items[0]=1000});r.failWrites(true);ui.onBtnSpinClick();assert.equal(ui.spinning,false);const options=r.opens.at(-1).data;r.failWrites(false);
        const result=options.actions[0].run();options.actions[0].onSuccess(result.value);const balance=r.ItemMgr.getCnt(0);ui.onBtnSpinClick();ui.onBtnCloseClick();assert.equal(r.ItemMgr.getCnt(0),balance);assert.equal(ui.closed,undefined);
        r.tweens.pop()();assert.equal(r.opens.at(-1).name,'UIGetReward');assert.equal(runtime(r.saved).ItemMgr.getCnt(0),balance);ui.flush();ui.onBtnCloseClick();assert.equal(ui.closed,true);
    });
    await check('win UI and timeout: display-only settlement; animation locks exit; second timeout restarts', async () => {
        const r=runtime();r.GameMgr.startGame();const reward=r.GameMgr.settleRound().value,Win=r.load('ui/UIWin').UIWin,ui=new Win(),before=r.writes;ui.onOpen(reward);
        assert.equal(ui.parts.BtnNext.interactable,false);await ui.onBtnNextClick();assert.equal(ui.processing,false);r.tweens.pop()();await ui.onBtnNextClick();await ui.onBtnNextClick();assert.equal(ui.closed,true);assert.equal(r.writes,before);
        const Timeout=r.load('ui/UITimeOut').UITimeOut,first=new Timeout();first.onOpen();await first.onBtnYesClick();await first.onBtnYesClick();assert.equal(r.events.filter(e=>e[0]==='Revive').length,1);
        const second=new Timeout();second.onOpen();assert.equal(second.parts['BtnYes/ActionLabel'].string,'重新挑战');await second.onBtnYesClick();assert.equal(r.GameMgr.CanRevive,true);
        const Time=r.load('uiItem/TimeItem').TimeItem,timer=new Time();timer._label={};timer.nz={};timer.onRevive();assert.equal(timer.LeftTime,60);
    });
    await check('coin and settings: visible values use durable snapshot; failed audio change remains unchanged', () => {
        const r=runtime(),Coin=r.load('uiItem/CoinItem').CoinItem,item=new Coin();r.patch(n=>{n.items[0]=500});item.labelTick={init(n){assert.equal(n,500)}};item.onHide({coin:5});assert.equal(item.Coin,500);
        const Setting=r.load('Setting').Setting;r.failWrites(true);assert.equal(Setting.set('bgmEnabled',false).reason,'storage_error');assert.equal(Setting.BgmEnabled,true);
        r.failWrites(false);assert.equal(Setting.set('bgmEnabled',false).ok,true);assert.equal(runtime(r.saved).load('Setting').Setting.BgmEnabled,false);
    });
    await check('prefabs: references, component UUIDs, direct handlers AND configured close/open actions', () => {
        const r=runtime();const folder=path.join(root,'assets/bundles/ui');
        function walk(value,visit){if(!value||typeof value!=='object')return;visit(value);Object.values(value).forEach(v=>walk(v,visit));}
        for(const file of fs.readdirSync(folder).filter(p=>p.endsWith('.prefab'))){const a=JSON.parse(fs.readFileSync(path.join(folder,file)));walk(a,v=>{if('__id__'in v)assert.ok(v.__id__>=0&&v.__id__<a.length,file)});}
        for(const name of ['UIGetSkill','UITimeOut','UIWin','UILoginReward','UIGetReward','UILuckySpin','UIPassReward','UIRecovery']){
            const a=JSON.parse(fs.readFileSync(path.join(folder,name+'.prefab'))),UI=r.load('ui/'+name)[name];
            const meta=JSON.parse(fs.readFileSync(path.join(root,'assets/scripts/ui',name+'.ts.meta')));
            const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',hex=meta.uuid.replaceAll('-','');
            const type=hex.slice(0,5)+Array.from({length:9},(_,i)=>{const n=parseInt(hex.slice(5+i*3,8+i*3),16);return chars[n>>6]+chars[n&63]}).join('');
            assert.ok(a[1]._components.some(c=>a[c.__id__].__type__===type),name+': script UUID');
            for(const configured of a.filter(o=>o.closeUI||o.openUI))for(const route of [configured.closeUI,configured.openUI].filter(Boolean))
                assert.ok(fs.existsSync(path.join(folder,route+'.prefab')),name+': '+route);
            for(const e of a.filter(o=>o.__type__==='cc.ClickEvent'))assert.equal(typeof UI.prototype[e.handler],'function',name+':'+e.handler);
            for(const b of a.filter(o=>o.__type__==='cc.Button')){
                const n=a[b.node.__id__],components=n._components.map(c=>a[c.__id__]);
                assert.ok(b.clickEvents.length||components.some(c=>c.closeUI||c.openUI),name+': inert button '+n._name);
            }
        }
        const recovery=JSON.parse(fs.readFileSync(path.join(folder,'UIRecovery.prefab')));
        for(const n of recovery.filter(o=>o.__type__==='cc.Node'&&o._name?.startsWith('BtnAction'))){const t=recovery[n._components.find(c=>recovery[c.__id__].__type__==='cc.UITransform').__id__];assert.ok(t._contentSize.height>=44);assert.ok(n._lpos.y-t._contentSize.height/2>=-270);}
        const source=fs.readdirSync(path.join(root,'assets/scripts/util'));assert.ok(!source.includes('StorageUtil.ts'));
    });
    await check('audio switches: real click ordering, both screens and settings, persistence/failure/retry', () => {
        for(const screen of ['UISetting','UIPause'])for(const key of ['bgmEnabled','sfxEnabled'])for(const enabled of [true,false])for(const fail of [true,false]) {
            const r=runtime(new Map(),{realAudio:true}),g=geometry(r),calls=[];
            const Audio=r.load('manager/AudioMgr').AudioMgr;
            const source={clip:null,stop(){calls.push('stop')},play(){calls.push('play')},playOneShot(){calls.push('sfx')}};
            Audio.audio=source;Audio.curBgm='主界面音乐';r.mocks.ResMgr.getRes=()=>({});
            r.patch(d=>{d.settings[key]=enabled;});
            const Switch=r.load('uiExtend/Switcher').Switcher,View=r.load('ui/'+screen)[screen],ui=new View();
            ui.swBgm=new Switch();ui.swSfx=new Switch();
            for(const sw of [ui.swBgm,ui.swSfx]){sw.node=new g.Node();sw.on={};sw.off={};sw.onLoad?.();}
            ui.onOpen();calls.length=0;r.failWrites(fail);
            ui[key==='bgmEnabled'?'onSwBgmClick':'onSwSfxClick']();
            const sw=key==='bgmEnabled'?ui.swBgm:ui.swSfx;
            sw.node.emit('click'); // Serialized cc.Button clickEvents execute BEFORE node CLICK.
            assert.equal(sw.IsOn,fail?enabled:!enabled);assert.equal(sw.on.active,sw.IsOn);assert.equal(sw.off.active,!sw.IsOn);
            assert.equal(r.GameSave.Data.settings[key],sw.IsOn);
            if(fail){assert.deepEqual(calls,[]);r.failWrites(false);const options=r.opens.at(-1).data;const result=options.actions[0].run();assert.equal(result.ok,true);options.actions[0].onSuccess(result.value);assert.equal(sw.IsOn,!enabled);}
            if(key==='sfxEnabled')assert.deepEqual(calls,[]);
            else assert.deepEqual(calls,enabled?['stop']:['stop','play']);
            assert.equal(runtime(r.saved).GameSave.Data.settings[key],!enabled);
        }
    });
    await check('audio playback: independent gates, disabled BGM remembers track, background resume obeys settings', () => {
        const r=runtime(new Map(),{realAudio:true}),Audio=r.load('manager/AudioMgr').AudioMgr,calls=[];
        r.cc.Game={EVENT_HIDE:'hide',EVENT_SHOW:'show'};r.cc.game=r.mocks.EventMgr;r.mocks.ResMgr.getRes=(bundle,name)=>name?{name}:null;
        const source={clip:null,stop(){calls.push('stop')},pause(){calls.push('pause')},play(){calls.push('play')},playOneShot(){calls.push('sfx')}};
        const instance=new Audio();instance.getComponent=()=>source;instance.onLoad();
        r.patch(d=>{d.settings.bgmEnabled=false;});Audio.playBgm('游戏内音乐1');Audio.playSfx('按钮');assert.deepEqual(calls,['sfx']);assert.equal(Audio.CurBgm,'游戏内音乐1');
        calls.length=0;r.patch(d=>{d.settings.bgmEnabled=true;d.settings.sfxEnabled=false;});Audio.playBgm();Audio.playSfx('按钮');assert.deepEqual(calls,['stop','play']);
        calls.length=0;r.mocks.EventMgr.emit('hide');r.mocks.EventMgr.emit('show');assert.deepEqual(calls,['pause','play']);
        calls.length=0;r.patch(d=>{d.settings.bgmEnabled=false;});r.mocks.EventMgr.emit('show');assert.deepEqual(calls,[]);
    });
    await check('board geometry: supported portrait viewports, 3-6 rows, all modes, animated/inactive HUD bounds', () => {
        for(const [width,height] of [[720,1600],[720,1280],[390,844]])for(let rows=3;rows<=6;rows++)for(let mode=0;mode<3;mode++) {
            const r=runtime(),g=geometry(r),layout=r.load('game/BoardLayout'),h=height/width*720;
            const root=g.add(null,'Stage',720,h),header=g.add(root,'TimeItem',160,62,0,h/2-155),clock=g.add(header,'nz',72,77,-70,0);
            const skills=g.add(root,'SkillBox',652,130,0,-h/2+355),combo=g.add(root,'ComboBox',720,100,0,-h/2+490);combo.active=false;
            const peaks=new Map([[clock,1.2]]);
            for(let i=0;i<4;i++){const button=g.add(skills,'Button',133,129,(i-1.5)*173,0);g.add(button,'Count',47,50,50,50);peaks.set(button,1.2);}
            const bottom=Math.max(layout.boundsInSpace(skills,root.transform,peaks).top,layout.boundsInSpace(combo,root.transform).top)+24;
            const top=layout.boundsInSpace(header,root.transform,peaks).bottom-24,area={left:-336,right:336,bottom,top};
            const fit=layout.fitBoard(690,rows*145,area);assert.ok(fit.scale>0&&fit.scale<=1);assert.ok(fit.y-rows*145*fit.scale/2>=bottom-1e-8);assert.ok(fit.y+rows*145*fit.scale/2<=top+1e-8);assert.ok(690*fit.scale<=672+1e-8);
            const before=layout.boundsInSpace(header,root.transform,peaks);clock.setScale(1.2,1.2);assert.deepEqual(layout.boundsInSpace(header,root.transform,peaks),before);
        }
        const r=runtime(),f=r.load('game/BoardLayout').fitBoard;assert.equal(f(100,100,{left:-200,right:200,bottom:-200,top:200}).scale,1);
    });
    await check('Stage layout: fixed HUD, coalesced resize, invisible combo reservation, lifecycle cancellation', () => {
        const r=runtime(),g=geometry(r);r.GameMgr.startGame();const stage=r.stage();
        stage.node=g.add(null,'Stage',720,1280);stage.shelveBox=g.add(stage.node,'ShelveBox',690,870);
        stage.skillBox=g.add(stage.node,'SkillBox',652,130,0,-285);stage.comboBox={node:g.add(stage.node,'ComboBox',720,100,0,-150)};stage.comboBox.node.active=false;
        const header=g.add(null,'UIGame',720,1280);g.add(header,'TimeItem',160,62,0,485);r.UIMgr.views.UIGame={node:header,close(){}};
        stage.effectsLayer=g.add(stage.node,'EffectsLayer',720,1280);
        const original=g.add(stage.shelveBox,'Goods',100,100),goods={node:original,Sp:{node:original,spriteFrame:{}},Visible:true};
        r.GameMgr.pick(goods,{x:0,y:0});goods.Visible=false;const preview=r.GameMgr._holdGoods;
        stage.boardReady=true;stage.queueBoardLayout();stage.queueBoardLayout();assert.equal(goods.Visible,true);assert.equal(preview.isValid,false);assert.equal(stage.callbacks.length,1);stage.flush();
        assert.ok(stage.shelveBox.scale.x<1);assert.equal(stage.skillBox.scale.x,1);assert.equal(header.scale.x,1);
        const scale=stage.shelveBox.scale.x;stage.comboBox.node.active=true;stage.queueBoardLayout();stage.flush();assert.equal(stage.shelveBox.scale.x,scale);
        stage.queueBoardLayout();r.GameMgr.quitGame();stage.flush();assert.equal(stage.shelveBox.scale.x,scale);
        stage.onDestroy();assert.equal(stage.callbacks.length,0);stage.queueBoardLayout();assert.equal(stage.callbacks.length,0);
    });
    await check('short viewport: portrait letterbox below 960 design units, restore on resize/exit', () => {
        const r=runtime(),needs=r.load('game/BoardLayout').needsPortraitFrame;
        assert.equal(needs(1280,720),true);assert.equal(needs(720,959),true);assert.equal(needs(720,960),false);assert.equal(needs(390,844),false);assert.equal(needs(0,0),false);
        r.GameMgr.startGame();const stage=r.stage(),changes=[];let frame={width:1280,height:720};r.cc.view.getFrameSize=()=>frame;r.cc.view.setResolutionPolicy=p=>changes.push(p);
        stage.updateViewportPolicy();stage.updateViewportPolicy();assert.deepEqual(changes,[2]);
        frame={width:390,height:844};stage.updateViewportPolicy();assert.deepEqual(changes,[2,4]);
        frame={width:1280,height:720};stage.updateViewportPolicy();stage.onDestroy();assert.deepEqual(changes,[2,4,2,4]);
        const layout=r.load('game/BoardLayout'),fit=layout.fitBoard(690,870,{left:-336,right:336,bottom:-236,top:574.8});assert.ok(fit.scale>0);assert.ok(fit.y-870*fit.scale/2>=-236-1e-8);assert.ok(fit.y+870*fit.scale/2<=574.8+1e-8);
    });
    await check('drag: scaled preview and local hit testing for every slot, locked shelf and outside rejection', () => {
        for(const scale of [1,.7,.3])for(const kind of ['CommonShelve','SmallShelve'])for(let slot=0;slot<(kind==='SmallShelve'?1:3);slot++) {
            const r=runtime(),g=geometry(r);r.GameMgr.startGame();const stage=r.stage();
            const root=g.add(null,'GameMgr',720,1600),node=g.add(root,'Stage',720,1600),effects=g.add(node,'EffectsLayer',720,1600),board=g.add(node,'ShelveBox',690,870);board.setScale(scale,scale);stage.effectsLayer=effects;
            const shelfNode=g.add(board,'Shelf',230,145,80,100),shelf=new (r.load('game/'+kind)[kind])();shelf.node=shelfNode;
            shelf.uiTrans=shelfNode.transform;const placed=[];shelf.placeGoods=(id,s)=>placed.push([id,s]);shelf.isSlotOccupied=()=>false;
            if(kind==='SmallShelve')shelf.layers=[];
            const goodsNode=g.add(shelfNode,'Goods',100,100),spriteNode=g.add(goodsNode,'Sprite',100,100),goods={node:goodsNode,Sp:{node:spriteNode,spriteFrame:{}},Id:1,Visible:true};
            r.GameMgr.shelveArr=[shelf];
            const target=shelfNode.transform.convertToWorldSpaceAR({x:(slot-1)*220/3,y:0});
            assert.equal(r.GameMgr.pick(goods,{x:target.x,y:target.y-80}),true);goods.Visible=false;
            assert.equal(r.GameMgr._holdGoods.parent,effects);assert.equal(r.GameMgr._holdGoods.worldScale.x,scale);
            r.GameMgr.release();assert.deepEqual(placed,[[1,slot]]);
            const outside=shelfNode.transform.convertToWorldSpaceAR({x:116,y:0});r.GameMgr.pick(goods,{x:outside.x,y:outside.y-80});goods.Visible=false;r.GameMgr.release();assert.equal(goods.Visible,true);assert.equal(placed.length,1);
            shelfNode.components.set(r.mocks.ShelveLocker,{});r.GameMgr.pick(goods,{x:target.x,y:target.y-80});goods.Visible=false;r.GameMgr.release();assert.equal(placed.length,1);assert.equal(goods.Visible,true);
            r.GameMgr.pick(goods,{x:target.x,y:target.y-80});goods.Visible=false;r.GameMgr.cancelPick();assert.equal(goods.Visible,true);assert.equal(r.GameMgr.isPicking,false);
        }
    });
    await check('effects and prefab: layer order, preserved references, lower single-line hint and no center Widget', () => {
        const a=JSON.parse(fs.readFileSync(path.join(root,'assets/bundles/game/Stage.prefab'))),children=a[1]._children.map(r=>a[r.__id__]);
        const index=name=>children.findIndex(n=>n._name===name);assert.ok(index('EffectsLayer')>index('ShelveBox'));assert.ok(index('EffectsLayer')<index('SkillBox'));assert.ok(index('EffectsLayer')<index('ComboBox'));
        const hint=children.find(n=>n._name==='StuckTip'),label=hint._components.map(r=>a[r.__id__]).find(c=>c.__type__==='cc.Label');assert.equal(label._string,'试试灯泡道具');assert.equal(label._enableWrapText,false);
        const board=a.find(n=>n.__type__==='cc.Node'&&n._name==='ShelveBox'),widget=board._components.map(r=>a[r.__id__]).find(c=>c.__type__==='cc.Widget');assert.equal(widget._enabled,false);
        function walk(v){if(!v||typeof v!=='object')return;if('__id__'in v)assert.ok(v.__id__>=0&&v.__id__<a.length);Object.values(v).forEach(walk);}walk(a);
        const r=runtime(),g=geometry(r);r.GameMgr.startGame();const stage=r.stage();stage.node=g.add(null,'Stage',720,1600);stage.effectsLayer=g.add(stage.node,'EffectsLayer',720,1600);r.mocks.ResMgr.getRes=()=>({});
        stage.onUseSkillFreezeTime();stage.onTimeOutAlert();assert.equal(stage.effectsLayer.children.length,2);assert.equal(stage.node.children.length,1);
        for(const file of ['Stage','ComboBox','SkillBox']){const source=fs.readFileSync(path.join(root,'assets/scripts/game',file+'.ts'),'utf8');assert.ok(!source.includes('this.node.parent.addChild('));assert.ok(!source.includes('this.node.addChild(effect'));}
    });
    console.log(`\n${checks} scenario groups passed.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
