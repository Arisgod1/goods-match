import { _decorator, Component, EventTouch, instantiate, isValid, Node, Prefab, Sprite, UITransform, v3, Vec2, Vec3 } from 'cc'
import { ResMgr } from './ResMgr'
import { Bundle } from '../enum/Bundle'
import { Goods } from '../game/Goods'
import { EventMgr } from './EventMgr'
import { EventType } from '../enum/EventType'
import { ShelveLocker } from '../game/ShelveLocker'
import { ShelveBase } from '../scriptBase/ShelveBase'
import { Mode, ModeName } from '../enum/Mode'
import { AudioMgr } from './AudioMgr'
import { PREVIEW } from 'cc/env'
import { SkillType } from '../enum/SkillType'
import { SkillMgr } from './SkillMgr'
import { ItemMgr } from './ItemMgr'
import { RewardMgr, WinReward } from './RewardMgr'
import { GameSave, ActionResult, success, failure } from './GameSave'
import { RecoveryMgr } from './RecoveryMgr'
import { UIMgr } from './UIMgr'
import { UI } from '../enum/UI'
const { ccclass, property } = _decorator

const PickOffset: number = 80

@ccclass('Manager/GameMgr')
export class GameMgr extends Component {

    private static _inst: GameMgr = null
    private static _node: Node = null

    public static get Stage(): Node {
        return this._node.children[0]
    }

    public static get CurLevel(): number { return GameSave.Data?.levels[this.mode] ?? 0 }
    public static get CurPassedLevel(): number { return GameSave.Data?.levels.reduce((a, b) => a + b, 0) ?? 0 }

    public static get isHardLevel(): boolean {
        return (this.CurLevel + 1) % 5 === 0
    }

    public static mode: Mode = Mode.tp

    private static _pickedGoods: Goods = null
    private static _holdGoods: Node = null

    public static shelveArr: ShelveBase[] = []
    public static shelveLockerArr: ShelveLocker[] = []
    public static goodsArr: number[] = []
    public static goodsData = {}

    public static roundId: number = 0
    public static leavingHome: boolean = false
    private static claimedSkills: Set<SkillType> = new Set()
    private static reviveUsed: boolean = false
    private static roundActive: boolean = false
    private static roundResult: WinReward = null
    private static pendingWin: WinReward = null
    private static activeStage: { isBusy: boolean, effectsLayer?: Node, DoubleCoinActive?: boolean, prepareSkill: (skill: SkillType) => ActionResult<any> } = null

    public static registerStage(stage: typeof GameMgr.activeStage): void { this.activeStage = stage }
    public static unregisterStage(stage: typeof GameMgr.activeStage): void {
        if (this.activeStage === stage) this.activeStage = null
    }
    public static isCurrentRound(id: number): boolean { return this.roundActive && id === this.roundId }
    public static canClaimSkill(skill: SkillType): boolean {
        return this.roundActive && Number.isInteger(skill) && skill >= 0 && skill < 4
            && !this.claimedSkills.has(skill) && !SkillMgr.hasSkill(skill) && !this.IsRefreshing && !this.isPicking
            && !(skill === SkillType.DoubleCoin && this.IsDoubleCoinActive)
    }
    public static claimSkill(skill: SkillType): ActionResult {
        if (!this.canClaimSkill(skill)) return failure('unavailable')
        const result = ItemMgr.tryApplyRewards([{ itemId: SkillMgr.getSkillId(skill), cnt: 1 }])
        if (!result.ok) return result
        this.claimedSkills.add(skill)
        SkillMgr.animateAdded(skill)
        return success()
    }
    public static useSkill(skill: SkillType, recovering: boolean = false): ActionResult {
        if (!Number.isInteger(skill) || skill < 0 || skill > 3
            || !this.roundActive || this.Pause && !recovering || this.isPicking || !this.activeStage)
            return failure('unavailable')
        const prepared = this.activeStage.prepareSkill(skill)
        if (!prepared.ok) return failure(prepared.reason)
        const id = SkillMgr.getSkillId(skill)
        if (id < 0 || ItemMgr.getCnt(id) <= 0) return failure('unavailable')
        const saved = GameSave.transact(next => {
            if (next.items[id] <= 0) return failure('unavailable')
            next.items[id]--
            return success()
        })
        if (!saved.ok) return saved
        const events = [EventType.UseSkillFreezeTime, EventType.UseSkillEraseGroup,
            EventType.UseSkillRefreshPosition, EventType.UseSkillDoubleCoin]
        EventMgr.emit(events[skill], prepared.value)
        return success()
    }
    public static get EffectsLayer(): Node { return this.activeStage?.effectsLayer ?? this.Stage }
    public static get IsDoubleCoinActive(): boolean { return this.activeStage?.DoubleCoinActive ?? false }
    public static get IsRefreshing(): boolean { return this.activeStage?.isBusy ?? false }
    public static get CanRevive(): boolean { return this.roundActive && !this.reviveUsed }
    public static tryRevive(): boolean {
        if (!this.CanRevive) return false
        this.reviveUsed = true
        return true
    }
    public static settleRound(): ActionResult<WinReward> {
        if (!this.roundActive) return failure('unavailable')
        if (!this.pendingWin) this.pendingWin = RewardMgr.rollWinReward(this.CurLevel)
        const reward = this.pendingWin
        if (!reward) return failure('invalid_config')
        const result = GameSave.transact(next => {
            const applied = ItemMgr.applyTo(next, [{ itemId: 0, cnt: reward.amount }])
            if (!applied.ok) return failure<WinReward>(applied.reason)
            next.levels[this.mode]++
            if (this.mode === Mode.tp && next.levels[0] >= 15 && !next.unlockedModes.includes(Mode.gs))
                next.unlockedModes.push(Mode.gs)
            if (this.mode === Mode.gs && next.levels[1] >= 10 && !next.unlockedModes.includes(Mode.ls))
                next.unlockedModes.push(Mode.ls)
            return success(reward)
        })
        if (!result.ok) return result
        this.roundResult = reward
        this.pendingWin = null
        this.roundActive = false
        this.Pause = true
        return result
    }
    public static recover<T>(retry: () => ActionResult<T>, done: (value: T) => void, message?: string): void {
        const id = this.roundId
        RecoveryMgr.show({ title: '保存未完成', message: message ?? '本次操作未保存，请重试或离开本局。', actions: [
            { label: '重试保存', run: () => this.isCurrentRound(id) ? retry() : failure('unavailable'), onSuccess: done },
            { label: '重新挑战', run: () => success(), onSuccess: () => { this.closeRoundPopups(); this.startGame() } },
            { label: '返回首页', run: () => success(), onSuccess: () => { this.closeRoundPopups(); this.quitGame(); UIMgr.open(UI.Main) } }
        ] })
    }
    private static closeRoundPopups(): void {
        for (const ui of [UI.GetSkill, UI.TimeOut, UI.Pause, UI.Win]) UIMgr.close(ui)
    }

    private static pause: boolean = false
    public static get Pause(): boolean {
        return this.pause
    }
    public static set Pause(v: boolean) {
        this.pause = v;
        EventMgr.emit(EventType.Pause, v)
    }

    protected onLoad(): void {
        globalThis.GameMgr = GameMgr
        GameMgr._inst = this
        GameMgr._node = this.node

        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.on(Node.EventType.TOUCH_END, this.onTouchFinish, this)
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchFinish, this)

    }

    public static unlockMode(mode: Mode): ActionResult {
        return GameSave.transact(next => {
            if (!next.unlockedModes.includes(mode)) next.unlockedModes.push(mode)
            return success()
        })
    }

    private static createStage(): void {
        const stagePre: Prefab = ResMgr.getRes(Bundle.Game, 'Stage')
        const stageNode: Node = instantiate(stagePre)
        this._node.addChild(stageNode)
    }

    public static startGame(): void {
        this.reset()
        const id = ++this.roundId
        this.leavingHome = false
        this.activeStage = null
        this.pendingWin = null
        this.claimedSkills.clear()
        this.reviveUsed = false
        this.roundResult = null
        this.roundActive = true
        this.Pause = false
        this._node.destroyAllChildren()
        this._inst.scheduleOnce(() => {
            if (this.isCurrentRound(id)) this.createStage()
        })
    }

    public static quitGame(): void {
        this.roundId++
        this.roundActive = false
        this.roundResult = null
        this.pendingWin = null
        this.activeStage = null
        this.claimedSkills.clear()
        this.reviveUsed = false
        this.Pause = false
        this._node.destroyAllChildren()
        this.reset()
    }

    public static pick(goods: Goods, uiPos: Vec2): boolean {
        if (!this.roundActive || this.Pause || this.isPicking || this.activeStage?.isBusy) return false
        this._pickedGoods = goods
        this._holdGoods = new Node()
        const sp: Sprite = this._holdGoods.addComponent(Sprite)
        sp.spriteFrame = goods.Sp.spriteFrame
        this.EffectsLayer.addChild(this._holdGoods)
        this._holdGoods.setWorldScale(goods.Sp.node.worldScale)
        uiPos.y += PickOffset
        const localPos: Vec3 = this._holdGoods.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(uiPos.x, uiPos.y, 0))
        this._holdGoods.setPosition(localPos)
        AudioMgr.playSfx('点击消除物')
        return true
    }

    public static release(): void {
        if (!isValid(this._holdGoods) || !this._pickedGoods) return
        if (!isValid(this._pickedGoods.node) || this._pickedGoods.isRemoving) {
            this.cancelPick()
            return
        }
        let isSuccess: boolean = false
        const holdGoodsWorldPos: Vec3 = this._holdGoods.getWorldPosition()
        for (let i = 0; i < this.shelveArr.length; i++) {
            const shelve: ShelveBase = this.shelveArr[i]
            if (shelve.getComponentInChildren(ShelveLocker)) continue
            const uiTrans: UITransform = shelve.getComponent(UITransform)
            const goodsLocalPos: Vec3 = uiTrans.convertToNodeSpaceAR(holdGoodsWorldPos)
            if (goodsLocalPos.x >= -uiTrans.width * uiTrans.anchorX
                && goodsLocalPos.x < uiTrans.width * (1 - uiTrans.anchorX)
                && goodsLocalPos.y >= -uiTrans.height * uiTrans.anchorY
                && goodsLocalPos.y < uiTrans.height * (1 - uiTrans.anchorY)) {
                const slotId: number = shelve.getSlot(goodsLocalPos)
                if (slotId < 0 || shelve.isSlotOccupied(slotId)) break
                const goodsId: number = this._pickedGoods.Id
                shelve.placeGoods(goodsId, slotId)
                isSuccess = true
                break
            }
        }
        if (isSuccess) {
            EventMgr.emit(EventType.PlaceGoods)
        } else {
            this._pickedGoods.Visible = true
        }
        this._pickedGoods = null
        this._holdGoods.destroy()
        this._holdGoods = null
        AudioMgr.playSfx('放下消除物')
    }

    public static get isPicking(): boolean {
        return !!this._pickedGoods
    }

    public static cancelPick(): void {
        if (isValid(this._pickedGoods?.node)) this._pickedGoods.Visible = true
        if (isValid(this._holdGoods)) this._holdGoods.destroy()
        this._pickedGoods = null
        this._holdGoods = null
    }

    private onTouchMove(e: EventTouch): void {
        const holdGoods: Node = GameMgr._holdGoods
        if (!isValid(holdGoods)) return
        const uiPos: Vec2 = e.getUILocation()
        uiPos.y += PickOffset
        const localPos: Vec3 = holdGoods.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(uiPos.x, uiPos.y, 0))
        holdGoods.setPosition(localPos)

    }

    private onTouchFinish(e: EventTouch): void {
        if (!isValid(GameMgr._holdGoods)) return
        GameMgr.release()
    }

    private static reset(): void {
        this._pickedGoods = null
        this._holdGoods = null
        this.shelveArr = []
        this.shelveLockerArr = []
        this.goodsArr = []
        this.goodsData = {}
    }

    public static isModeUnlocked(mode: Mode): boolean {
        return GameSave.Data?.unlockedModes.includes(mode) ?? false
    }

    public static get isModeAllUnlocked(): boolean {
        return (GameSave.Data?.unlockedModes.length ?? 0) >= ModeName.length
    }

    public static get isStucked(): boolean {
        for (let i = 0; i < this.shelveArr.length; i++) {
            const shelve: ShelveBase = this.shelveArr[i];
            if (!shelve.isAllSlotOccupied()) return false
        }
        return true
    }
}

if (PREVIEW) {
    globalThis.GameMgr = GameMgr
}

