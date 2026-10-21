import { _decorator, Component, Label, macro, Node, Sprite, SpriteFrame, tween, v3, Vec3 } from 'cc';
import { SkillMgr } from '../manager/SkillMgr';
import { SkillType } from '../enum/SkillType';
import { UIMgr } from '../manager/UIMgr';
import { UI } from '../enum/UI';
import { EventMgr } from '../manager/EventMgr';
import { EventType } from '../enum/EventType';
import { ResMgr } from '../manager/ResMgr';
import { Bundle } from '../enum/Bundle';
import { CfgSkillInfo } from '../config/CfgSkillInfo';
import { GameMgr } from '../manager/GameMgr';
import { Shake } from '../misc/Shake';
import { Breath } from '../misc/Breath';
import { RecoveryMgr } from '../manager/RecoveryMgr';
const { ccclass, property } = _decorator;

@ccclass('Game/SkillBox')
export class SkillBox extends Component {

    @property([Label])
    private skillCntTips: Label[] = []
    @property(Breath)
    private tipBreath: Breath = null
    @property(Shake)
    private iconShake: Shake = null

    protected onLoad(): void {
        EventMgr.on(EventType.UpdateSkillCnt, this.onUpdateSkillCnt, this)
        EventMgr.on(EventType.AddSkill, this.onAddSkill, this)
    }

    protected start(): void {
        for (let i = 0; i < this.skillCntTips.length; i++) {
            const skillCntTip: Label = this.skillCntTips[i]
            const cnt: number = SkillMgr.skillCnt(i)
            skillCntTip.string = `${cnt}`
            skillCntTip.node.parent.active = cnt > 0
        }
        this.schedule(this.onCheckStuck, 1, macro.REPEAT_FOREVER)
    }

    protected onDestroy(): void {
        EventMgr.off(EventType.UpdateSkillCnt, this.onUpdateSkillCnt, this)
        EventMgr.off(EventType.AddSkill, this.onAddSkill, this)
    }

    protected onCheckStuck(): void {
        const isStucked: boolean = GameMgr.isStucked
        this.tipBreath.node.active = isStucked
        this.tipBreath.enabled = isStucked
        this.iconShake.enabled = isStucked
    }

    protected onUpdateSkillCnt(skill: SkillType, cnt: number): void {
        const skillCntTip: Label = this.skillCntTips[skill]
        skillCntTip.string = `${cnt}`
        skillCntTip.node.parent.active = cnt > 0
    }

    protected onAddSkill(skill: SkillType): void {
        const flySkillNode: Node = new Node()
        const sp: Sprite = flySkillNode.addComponent(Sprite)
        sp.spriteFrame = ResMgr.getSpriteFrame(Bundle.Icon, CfgSkillInfo[skill].icon)
        GameMgr.EffectsLayer.addChild(flySkillNode)
        const btnSkillNode: Node = this.node.children[skill]
        const tw = tween(flySkillNode)
        tw.set({ scale: v3(0, 0, 0) })
        tw.to(0.2, { scale: v3(1, 1, 1) }, { easing: 'backOut' })
        tw.delay(0.1)
        tw.parallel(
            tween(flySkillNode).to(0.5, { worldPosition: btnSkillNode.worldPosition }),
            tween(flySkillNode).to(0.5, { scale: v3(0.5, 0.5, 0.5) }),
        )
        tw.call(() => {
            flySkillNode.destroy()
            tween(btnSkillNode).to(0.2, { scale: v3(1.2, 1.2, 1) }).to(0.2, { scale: v3(1, 1, 1) }).start()
        })
        tw.start()
    }

    private handleSkill(skill: SkillType): void {
        if (GameMgr.Pause || GameMgr.IsRefreshing || GameMgr.isPicking) return
        if (skill === SkillType.DoubleCoin && GameMgr.IsDoubleCoinActive) {
            UIMgr.open(UI.Toast, '效果生效中')
            return
        }
        if (!SkillMgr.hasSkill(skill)) {
            if (GameMgr.canClaimSkill(skill)) UIMgr.open(UI.GetSkill, skill)
            else UIMgr.open(UI.Toast, '本局补领已用完')
            return
        }
        const result = GameMgr.useSkill(skill)
        if (result.ok) return
        if (result.reason === 'storage_error') GameMgr.recover(() => GameMgr.useSkill(skill, true), () => {})
        else UIMgr.open(UI.Toast, skill === SkillType.RefreshPosition
            ? '暂时无法刷新，请稍后重试' : RecoveryMgr.message(result.reason))
    }
    protected onBtnFreezeTimeClick(): void { this.handleSkill(SkillType.FreezeTime) }
    protected onBtnEraseOneGroupClick(): void { this.handleSkill(SkillType.EraseGroup) }
    protected onBtnRefreshPositionClick(): void { this.handleSkill(SkillType.RefreshPosition) }
    protected onBtnDoubleCoinClick(): void { this.handleSkill(SkillType.DoubleCoin) }
}
