import { Widget, _decorator, Sprite, Label, Button } from 'cc';
import { SkillType } from '../enum/SkillType';
import { GameMgr } from '../manager/GameMgr';
import { UIBase } from '../scriptBase/UIBase';
import { CfgSkillInfo } from '../config/CfgSkillInfo';
import { ResMgr } from '../manager/ResMgr';
import { Bundle } from '../enum/Bundle';
const { ccclass, requireComponent } = _decorator;

@ccclass('UI/UIGetSkill')
@requireComponent(Widget)
export class UIGetSkill extends UIBase {
    private skill: SkillType = null
    private processing: boolean = false

    public onOpen(data: SkillType): void {
        GameMgr.Pause = true
        this.skill = data
        const info = CfgSkillInfo[this.skill]
        this.findComp('LbTitle', Label).string = info.name
        this.findComp('Icon', Sprite).spriteFrame = ResMgr.getSpriteFrame(Bundle.Icon, info.icon)
        this.updateState()
    }

    private updateState(): void {
        const available = GameMgr.canClaimSkill(this.skill)
        this.findComp('BtnGet', Button).interactable = available
        const status = available ? '每局可免费补领1个' : '本局补领已用完'
        this.findComp('LbDesc', Label).string = `${CfgSkillInfo[this.skill].desc}\n${status}`
    }

    public onClose(): void {
        GameMgr.Pause = false
    }

    protected onBtnGetClick(): void {
        if (this.processing) return
        this.processing = true
        const result = GameMgr.claimSkill(this.skill)
        if (result.ok) this.close()
        else {
            this.processing = false
            this.updateState()
            if (result.reason === 'storage_error') GameMgr.recover(() => GameMgr.claimSkill(this.skill), () => this.close())
        }
    }
}
