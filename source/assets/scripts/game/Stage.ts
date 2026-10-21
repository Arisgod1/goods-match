import { _decorator, Component, Input, input, instantiate, KeyCode, macro, math, Node, Prefab, Sprite, UITransform, v3, Vec3, Widget, view, ResolutionPolicy } from 'cc';
import { GameMgr } from '../manager/GameMgr';
import { ArrayUtil } from '../util/ArrayUtil';
import { ShelveType } from '../enum/ShelveType';
import { ShelveLocker } from './ShelveLocker';
import { ShelveBase } from '../scriptBase/ShelveBase';
import { CommonShelve } from './CommonShelve';
import { SmallShelve } from './SmallShelve';
import { UIMgr } from '../manager/UIMgr';
import { UI } from '../enum/UI';
import { PREVIEW } from 'cc/env';
import { Mode, ModeName } from '../enum/Mode';
import { cfg_level_gs, cfg_level_ls, cfg_level_tp } from '../config/cfg_level';
import { DtoLevelCfg } from '../dto/DtoLevelCfg';
import { DtoLevelData } from '../dto/DtoLevelData';
import { cfg_icon_gs, cfg_icon_ls, cfg_icon_tp } from '../config/cfg_icon';
import { DtoIconCfg } from '../dto/DtoIconCfg';
import { ResMgr } from '../manager/ResMgr';
import { Bundle } from '../enum/Bundle';
import { Global } from '../Global';
import { EventMgr } from '../manager/EventMgr';
import { EventType } from '../enum/EventType';
import { ComboBox } from './ComboBox';
import { Goods } from './Goods';
import { AudioMgr } from '../manager/AudioMgr';
import { SkillType } from '../enum/SkillType';
import { ActionResult, success, failure } from '../manager/GameSave';
import { ItemMgr } from '../manager/ItemMgr';
import { distributeGoods, GoodsData } from './GoodsLayout';
import { boundsInSpace, fitBoard, BoardArea, needsPortraitFrame } from './BoardLayout';
const { ccclass, property } = _decorator;

@ccclass('Game/Stage')
export class Stage extends Component {

    @property(Sprite)
    private bg: Sprite = null
    @property(Node)
    private shelveBox: Node = null
    @property(Node)
    public effectsLayer: Node = null
    @property(Node)
    private skillBox: Node = null
    @property(ComboBox)
    private comboBox: ComboBox = null
    @property(Node)
    private tip: Node = null
    @property(Prefab)
    private shelveLockerPre: Prefab = null
    @property(Prefab)
    private shelvePreArr: Prefab[] = []

    private levelCfg: DtoLevelCfg = null
    private levelData: DtoLevelData = null
    private iconCfg: DtoIconCfg = null

    private shelveArr: ShelveBase[] = []

    private doubleCoinLeft: number = 0
    private roundId: number = 0
    private disposed: boolean = false
    private winRecovery: boolean = false
    private layoutQueued: boolean = false
    private boardReady: boolean = false
    private originalPolicy: ResolutionPolicy = null
    private letterboxed: boolean = false

    public isBusy: boolean = false

    protected onLoad(): void {
        this.originalPolicy = view.getResolutionPolicy()
        this.roundId = GameMgr.roundId
        GameMgr.registerStage(this)
        this.node.on(Node.EventType.SIZE_CHANGED, this.queueBoardLayout, this)
        view.on('canvas-resize', this.queueBoardLayout, this)
        const bgName: string = 'bg_' + ModeName[GameMgr.mode]
        this.bg.spriteFrame = ResMgr.getSpriteFrame(Bundle.Game, bgName, 'image/')

        EventMgr.on(EventType.MergeGoods, this.onMergeGoods, this)
        EventMgr.on(EventType.TimeOut, this.onTimeOut, this)
        EventMgr.on(EventType.TimeOutAlert, this.onTimeOutAlert, this)
        EventMgr.on(EventType.UseSkillFreezeTime, this.onUseSkillFreezeTime, this)
        EventMgr.on(EventType.UseSkillDoubleCoin, this.onUseDoubleCoin, this)
        EventMgr.on(EventType.UseSkillRefreshPosition, this.onUseRefreshPos, this)
        EventMgr.on(EventType.UseSkillEraseGroup, this.onUseEraseGroup, this)

        if (PREVIEW) input.on(Input.EventType.KEY_DOWN, this.onPreviewKey, this)
    }

    private onPreviewKey(e: { keyCode: number }): void {
        if (e.keyCode === KeyCode.KEY_Q && !GameMgr.Pause && !this.disposed
            && GameMgr.isCurrentRound(this.roundId)) this.showWin()
    }

    protected onDestroy(): void {
        this.disposed = true
        this.node.off(Node.EventType.SIZE_CHANGED, this.queueBoardLayout, this)
        view.off('canvas-resize', this.queueBoardLayout, this)
        if (this.letterboxed) {
            this.letterboxed = false
            view.setResolutionPolicy(this.originalPolicy)
        }
        this.isBusy = false
        this.doubleCoinLeft = 0
        GameMgr.unregisterStage(this)
        if (PREVIEW) input.off(Input.EventType.KEY_DOWN, this.onPreviewKey, this)
        UIMgr.close(UI.Game)
        this.unscheduleAllCallbacks()
        EventMgr.off(EventType.MergeGoods, this.onMergeGoods, this)
        EventMgr.off(EventType.TimeOut, this.onTimeOut, this)
        EventMgr.off(EventType.TimeOutAlert, this.onTimeOutAlert, this)
        EventMgr.off(EventType.UseSkillFreezeTime, this.onUseSkillFreezeTime, this)
        EventMgr.off(EventType.UseSkillDoubleCoin, this.onUseDoubleCoin, this)
        EventMgr.off(EventType.UseSkillRefreshPosition, this.onUseRefreshPos, this)
        EventMgr.off(EventType.UseSkillEraseGroup, this.onUseEraseGroup, this)
    }

    protected update(dt: number): void {
        if (!GameMgr.Pause && GameMgr.isCurrentRound(this.roundId))
            this.doubleCoinLeft = Math.max(0, this.doubleCoinLeft - dt)
    }

    public prepareSkill(skill: SkillType): ActionResult<GoodsData> {
        if (this.disposed || this.isBusy || !GameMgr.isCurrentRound(this.roundId)) return failure('unavailable')
        if (skill === SkillType.DoubleCoin && this.doubleCoinLeft > 0) return failure('unavailable')
        if (skill !== SkillType.RefreshPosition) return success()
        const ids: number[] = [...GameMgr.goodsArr]
        for (const shelf of Object.values(GameMgr.goodsData)) {
            for (const queue of Object.values(shelf)) ids.push(...queue as number[])
        }
        for (const shelf of this.shelveArr) ids.push(...shelf.GoodsIdArr)
        const candidate = distributeGoods(this.layoutShelves(), ids, this.iconCfg.length)
        return candidate ? success(candidate) : failure('invalid_config')
    }

    public get DoubleCoinActive(): boolean { return this.doubleCoinLeft > 0 }

    private layoutShelves() {
        return this.shelveArr.filter(s => s instanceof CommonShelve || s instanceof SmallShelve)
            .map(s => ({ id: s.Id, small: s instanceof SmallShelve }))
    }

    protected start() {
        UIMgr.open(UI.Game)
        this.tip.active = GameMgr.mode === Mode.tp && GameMgr.CurLevel === 0
        this.scheduleOnce(() => {
            if (GameMgr.isHardLevel) UIMgr.open(UI.StageTip, '难度飙升')
        }, 1)

        switch (GameMgr.mode) {
            case Mode.tp:
                this.levelCfg = cfg_level_tp
                this.iconCfg = cfg_icon_tp
                break;
            case Mode.gs:
                this.levelCfg = cfg_level_gs
                this.iconCfg = cfg_icon_gs
                break
            case Mode.ls:
                this.levelCfg = cfg_level_ls
                this.iconCfg = cfg_icon_ls
                break
        }

        if (GameMgr.CurLevel >= this.levelCfg.length) {
            this.levelData = ArrayUtil.pickItem(this.levelCfg)
        } else {
            this.levelData = this.levelCfg[GameMgr.CurLevel]
        }


        const shelveMap: number[][] = this.levelData.shelveMap
        const group: number = this.levelData.group
        const lockCnt: number = this.levelData.lockCnt
        const goodsTypeCnt: number = this.levelData.GoodsTypeCnt

        Global.Level_Time = this.levelData.time
        // Global.Level_Time = 10

        EventMgr.emit(EventType.TimeReset)

        this.createShelves(shelveMap)
        this.createShelveLockers(lockCnt)
        this.createGoodsArr(group, goodsTypeCnt)
        if (!this.createGoodsData()) {
            GameMgr.recover(() => failure('invalid_config'), () => {}, '关卡货架配置异常，可重新挑战或返回首页。')
            return
        }

        this.boardReady = true
        this.queueBoardLayout()
        this.schedule(this.onCheckWin, 0.5, macro.REPEAT_FOREVER)

    }

    private queueBoardLayout(): void {
        if (this.disposed || !this.boardReady || this.layoutQueued) return
        this.layoutQueued = true
        GameMgr.cancelPick()
        this.scheduleOnce(this.applyBoardLayout)
    }

    private updateViewportPolicy(): void {
        const frame = view.getFrameSize()
        const letterbox = needsPortraitFrame(frame.width, frame.height)
        if (letterbox === this.letterboxed) return
        if (!this.originalPolicy) this.originalPolicy = view.getResolutionPolicy()
        this.letterboxed = letterbox
        view.setResolutionPolicy(letterbox ? ResolutionPolicy.SHOW_ALL : this.originalPolicy)
    }

    private applyBoardLayout(): void {
        if (this.disposed || !GameMgr.isCurrentRound(this.roundId)) {
            this.layoutQueued = false
            return
        }
        this.updateViewportPolicy()
        const gameUI = UIMgr.get(UI.Game)?.node
        const stageTransform = this.node.getComponent(UITransform)
        // Resolve anchored HUD positions before measuring, regardless of frame ordering.
        const align = (node: Node) => {
            const widget = node.getComponent(Widget)
            if (widget?.enabled) widget.updateAlignment()
            for (const child of node.children) align(child)
        }
        align(this.node)
        if (gameUI) align(gameUI)
        const peaks = new Map<Node, number>()
        for (const button of this.skillBox.children) peaks.set(button, 1.2)
        let top = stageTransform.height * (1 - stageTransform.anchorY)
        if (gameUI) {
            for (const name of ['SettingItem', 'TimeItem', 'CoinItem']) {
                const item = gameUI.getChildByName(name)
                if (!item) continue
                const clock = item.getChildByName('nz')
                if (clock) peaks.set(clock, 1.2)
                top = Math.min(top, boundsInSpace(item, stageTransform, peaks).bottom)
            }
        }
        const bottom = Math.max(boundsInSpace(this.skillBox, stageTransform, peaks).top,
            boundsInSpace(this.comboBox.node, stageTransform).top)
        const area: BoardArea = { left: -stageTransform.width * stageTransform.anchorX + 24,
            right: stageTransform.width * (1 - stageTransform.anchorX) - 24, bottom: bottom + 24, top: top - 24 }
        const board = this.shelveBox.getComponent(UITransform)
        const fit = fitBoard(board.width, board.height, area)
        this.shelveBox.setScale(fit.scale, fit.scale, 1)
        this.shelveBox.setPosition(fit.x, fit.y, 0)
        this.layoutQueued = false
    }

    private createShelves(shelveMap: number[][]): void {
        const row: number = shelveMap.length
        const col: number = shelveMap[0].length
        const uiTrans: UITransform = this.shelveBox.getComponent(UITransform)
        const spaceX: number = 0
        const spaceY: number = 0
        uiTrans.width = col * 230 + spaceX * (col - 1)
        uiTrans.height = row * 145 + spaceY * (row - 1)

        for (let i = 0; i < shelveMap.length; i++) {
            for (let j = 0; j < shelveMap[i].length; j++) {
                const type: ShelveType = shelveMap[i][j]
                const shelvePre: Prefab = this.shelvePreArr[type]
                const shelveNode: Node = instantiate(shelvePre)
                this.shelveBox.addChild(shelveNode)
            }
        }

        this.shelveArr = this.shelveBox.getComponentsInChildren(ShelveBase)
    }

    private createShelveLockers(lockCnt: number): void {
        if (lockCnt <= 0) return
        const shelves: ShelveBase[] = ArrayUtil.pickItems(this.shelveArr, lockCnt, true)
        for (let i = 0; i < shelves.length; i++) {
            const shelve: ShelveBase = shelves[i];
            const shelveLockerNode: Node = instantiate(this.shelveLockerPre)
            shelve.node.addChild(shelveLockerNode)
            const shelveLocker: ShelveLocker = shelveLockerNode.getComponent(ShelveLocker)
            shelveLocker.UnlockCnt = math.randomRangeInt(3, 6)
        }
    }

    private createGoodsArr(group: number, goodsTypeCnt: number): void {
        const idxArr: number[] = ArrayUtil.pickIndexs(this.iconCfg, goodsTypeCnt, true)
        GameMgr.goodsArr = []

        for (let i = 0; i < group; i++) {
            const goodsId: number = ArrayUtil.pickItem(idxArr) + 1
            GameMgr.goodsArr.push(goodsId, goodsId, goodsId)
        }

        ArrayUtil.shuffle(GameMgr.goodsArr)
    }

    private createGoodsData(): boolean {
        const data = distributeGoods(this.layoutShelves(), GameMgr.goodsArr, this.iconCfg.length)
        if (!data) return false
        GameMgr.goodsData = data
        GameMgr.goodsArr = []
        return true
    }

    private showWin(): void {
        if (this.winRecovery || this.disposed || !GameMgr.isCurrentRound(this.roundId)) return
        const done = (reward) => {
            this.winRecovery = false
            this.unschedule(this.onCheckWin)
            UIMgr.open(UI.Win, reward)
        }
        const result = GameMgr.settleRound()
        if (result.ok) done(result.value)
        else {
            this.winRecovery = true
            GameMgr.recover(() => GameMgr.settleRound(), done,
                '通关结果尚未保存。重试将保留本次倍率，或选择重新挑战、返回首页。')
        }
    }

    private onCheckWin(): void {
        if (GameMgr.Pause) return
        const isWin: boolean = this.checkWin()
        if (!isWin) return
        if (this.isBusy) return
        this.showWin()
    }

    private checkWin(): boolean {
        if (GameMgr.goodsArr.some(id => Goods.isValidId(id))) return false
        for (const shelf of Object.values(GameMgr.goodsData)) {
            if (Object.values(shelf).some(queue => (queue as number[]).some(id => Goods.isValidId(id)))) return false
        }
        for (let i = 0; i < this.shelveArr.length; i++) {
            const shelve: ShelveBase = this.shelveArr[i];
            if (!shelve.isEmpty) return false
        }
        return true
    }

    private onTimeOut(): void {
        const isWin: boolean = this.checkWin()
        if (isWin) return
        UIMgr.open(UI.TimeOut)
    }

    private onTimeOutAlert(): void {
        const effectRedAlertPre: Prefab = ResMgr.getRes(Bundle.Game, 'EffectRedAlert')
        const effectRedAlertNode: Node = instantiate(effectRedAlertPre)
        this.effectsLayer.addChild(effectRedAlertNode)
    }

    private onUseSkillFreezeTime(): void {
        const effectFreezePre: Prefab = ResMgr.getRes(Bundle.Game, 'EffectFreeze')
        const effectFreezeNode: Node = instantiate(effectFreezePre)
        this.effectsLayer.addChild(effectFreezeNode)
    }

    private onMergeGoods(shelveWorldPos: Vec3): void {
        this.comboBox.CurCombo++
        AudioMgr.playSfx(`bomb_${this.comboBox.CurCombo}`)
        const amount = this.doubleCoinLeft > 0 ? this.comboBox.CurCombo * 2 : this.comboBox.CurCombo
        const grant = () => ItemMgr.tryApplyRewards([{ itemId: 0, cnt: amount }])
        const result = grant()
        if (!result.ok) GameMgr.recover(grant, () => {})
        this.comboBox.createFloatText(shelveWorldPos)
    }

    private onUseDoubleCoin(): void {
        if (this.doubleCoinLeft > 0) return
        AudioMgr.playSfx('星星道具')
        this.doubleCoinLeft = Global.Double_Coin_Duration
    }

    private onUseRefreshPos(data: GoodsData): void {
        if (!data || this.isBusy || this.disposed || !GameMgr.isCurrentRound(this.roundId)) return
        this.isBusy = true
        AudioMgr.playSfx('转换道具')
        for (const shelf of this.shelveArr) shelf.clear()
        GameMgr.goodsData = data
        GameMgr.goodsArr = []
        const id = this.roundId
        this.scheduleOnce(() => {
            if (this.disposed || !GameMgr.isCurrentRound(id)) return
            for (const shelf of this.shelveArr) shelf.init()
            this.scheduleOnce(() => {
                if (!this.disposed && GameMgr.isCurrentRound(id)) this.isBusy = false
            }, 0.5)
        })
    }

    private onUseEraseGroup(): void {

        AudioMgr.playSfx('灯泡道具')

        //先统计场上的物品
        const goodsMap = {}
        for (let i = 0; i < this.shelveArr.length; i++) {
            const shelve: ShelveBase = this.shelveArr[i];
            const info: Object = shelve.GoodsInfo
            for (const layer in info) {
                if (Object.prototype.hasOwnProperty.call(info, layer)) {
                    for (const slot in info[layer]) {
                        if (Object.prototype.hasOwnProperty.call(info[layer], slot)) {
                            const goods: Goods = info[layer][slot];
                            const goodsId: number = goods.Id
                            if (!goodsMap.hasOwnProperty(goodsId)) {
                                goodsMap[goodsId] = []
                            }
                            goodsMap[goodsId].push(goods)
                        }
                    }
                }
            }

            for (const goodsId in goodsMap) {
                if (Object.prototype.hasOwnProperty.call(goodsMap, goodsId)) {
                    ArrayUtil.shuffle(goodsMap[goodsId])
                }
            }

        }

        //筛选出超过三个的物品
        const map2 = {}

        for (const goodsId in goodsMap) {
            if (Object.prototype.hasOwnProperty.call(goodsMap, goodsId)) {
                if (goodsMap[goodsId].length >= 3) {
                    map2[goodsId] = goodsMap[goodsId]
                }
            }
        }

        //从中挑选三组
        const map3 = {}
        let cnt: number = 0
        for (const goodsId in map2) {
            if (Object.prototype.hasOwnProperty.call(map2, goodsId)) {
                map3[goodsId] = map2[goodsId]
                cnt++
                if (cnt >= 3) break
            }
        }

        //将这三组中随机三个物品消除
        for (const goodsId in map3) {
            if (Object.prototype.hasOwnProperty.call(map3, goodsId)) {
                const goodsArr: Goods[] = map3[goodsId];
                const pickedGoodsArr: Goods[] = ArrayUtil.pickItems(goodsArr, 3, true)
                for (let i = 0; i < pickedGoodsArr.length; i++) {
                    const goods: Goods = pickedGoodsArr[i];
                    const shelve: ShelveBase = goods.node.parent.parent.getComponent(ShelveBase)
                    if (!shelve) {
                        continue
                    }
                    shelve.removeGoods(goods)
                }
            }
        }

    }

}


