import { Widget, _decorator, Node, tween, math, Toggle, Button, Tween } from 'cc';
import { UIBase } from '../scriptBase/UIBase';
import { CoinItem } from '../uiItem/CoinItem';
import { CoinMgr } from '../manager/CoinMgr';
import { UI } from '../enum/UI';
import { AudioMgr } from '../manager/AudioMgr';
import { RewardMgr } from '../manager/RewardMgr';
import { RecoveryMgr } from '../manager/RecoveryMgr';
import { failure } from '../manager/GameSave';
const { ccclass, requireComponent } = _decorator;

@ccclass('UI/UILuckySpin')
@requireComponent(Widget)
export class UILuckySpin extends UIBase {
    private spinning: boolean = false
    private tw: Tween<Node> = null

    public onOpen(): void {
        this.findComp('CoinItem', CoinItem).init(CoinMgr.CurCoin)
    }

    protected onBtnSpinClick(): void {
        if (this.spinning) return
        this.spinning = true
        const wheel = this.findNode('ZhuanPan')
        const targetAngle = wheel.angle - (720 + 60 * math.randomRangeInt(0, 6))
        const index = Math.round((6 + (targetAngle % 360) / 60) % 6)
        const grant = () => this.isValid ? RewardMgr.claimSpinReward(index) : failure<any>('unavailable')
        const done = rewards => this.playSpin(targetAngle, rewards)
        const result = grant()
        if (result.ok) done(result.value)
        else {
            this.spinning = false
            if (result.reason === 'storage_error') RecoveryMgr.retry(grant, done)
            else this.open(UI.Toast, RecoveryMgr.message(result.reason))
        }
    }

    private playSpin(targetAngle: number, rewards): void {
        this.spinning = true
        const wheel = this.findNode('ZhuanPan')
        this.findComp('CoinItem', CoinItem).updateCoin(CoinMgr.CurCoin, false)
        this.findComp('BtnSpin', Button).interactable = false
        this.findComp('BtnClose', Button).interactable = false
        AudioMgr.playSfx('抽奖转盘')
        const lights = this.findComp('Lights', Toggle)
        this.schedule(() => { lights.isChecked = !lights.isChecked }, 0.25, 10)
        this.tw = tween(wheel).to(3, { angle: targetAngle }, { easing: 'sineInOut' })
            .call(() => {
                this.findComp('BtnSpin', Button).interactable = true
                this.findComp('BtnClose', Button).interactable = true
                this.open(UI.GetReward, rewards)
                this.scheduleOnce(() => { this.spinning = false })
            }).start()
    }

    protected onBtnCloseClick(): void {
        if (!this.spinning) this.close()
    }

    public onClose(): void {
        if (this.tw) this.tw.stop()
        this.unscheduleAllCallbacks()
    }
}
