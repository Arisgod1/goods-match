import { Widget, _decorator } from 'cc';
import { UIBase } from '../scriptBase/UIBase';
import { GameMgr } from '../manager/GameMgr';
import { CoinItem } from '../uiItem/CoinItem';
import { CoinMgr } from '../manager/CoinMgr';
import { EventMgr } from '../manager/EventMgr';
import { EventType } from '../enum/EventType';
import { RewardMgr } from '../manager/RewardMgr';
import { RecoveryMgr } from '../manager/RecoveryMgr';
import { failure } from '../manager/GameSave';
import { UI } from '../enum/UI';
const { ccclass, requireComponent } = _decorator;

@ccclass('UI/UIPassReward')
@requireComponent(Widget)
export class UIPassReward extends UIBase {
    private processing: boolean = false

    public onOpen(): void {
        this.updateState()
    }

    private updateState(): void {
        this.findComp('CoinItem', CoinItem).init(CoinMgr.CurCoin)
        const canGet = GameMgr.CurPassedLevel >= RewardMgr.NextPassTarget
        this.findNode('BtnGet').active = canGet
        this.findNode('BtnContinue').active = !canGet
    }

    protected onBtnCloseClick(): void {
        if (!this.processing) this.close()
    }

    protected onBtnGetClick(): void {
        if (this.processing) return
        this.processing = true
        const grant = () => this.isValid ? RewardMgr.claimPassReward() : failure<any>('unavailable')
        const done = rewards => {
            this.updateState()
            EventMgr.emit(EventType.GetPassReward)
            this.open(UI.GetReward, rewards)
            this.scheduleOnce(() => { this.processing = false }, 0.3)
        }
        const result = grant()
        if (result.ok) done(result.value)
        else {
            this.processing = false
            if (result.reason === 'storage_error') RecoveryMgr.retry(grant, done)
            else this.open(UI.Toast, RecoveryMgr.message(result.reason))
        }
    }
}
