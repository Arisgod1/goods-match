import { Widget, _decorator, Button } from 'cc'
import { UIBase } from '../scriptBase/UIBase'
import { UI } from '../enum/UI'
import { RewardMgr } from '../manager/RewardMgr'
import { RecoveryMgr } from '../manager/RecoveryMgr'
import { failure } from '../manager/GameSave'
const { ccclass, requireComponent } = _decorator
@ccclass('UI/UILoginReward')
@requireComponent(Widget)
export class UILoginReward extends UIBase {
    private processing: boolean = false
    public onOpen(): void { this.findComp('BtnGetAll', Button).interactable = RewardMgr.canClaimDaily() }
    protected onBtnCloseClick(): void { if (!this.processing) this.close() }
    protected onBtnGetAllClick(): void {
        if (this.processing) return
        this.processing = true
        const grant = () => this.isValid ? RewardMgr.claimDaily() : failure<any>('unavailable')
        const done = rewards => { this.close(); this.open(UI.GetReward, rewards) }
        const result = grant()
        if (result.ok) { done(result.value); return }
        this.processing = false
        if (result.reason === 'storage_error') RecoveryMgr.retry(grant, done)
        else { this.close(); this.open(UI.Toast, RecoveryMgr.message(result.reason)) }
    }
}
