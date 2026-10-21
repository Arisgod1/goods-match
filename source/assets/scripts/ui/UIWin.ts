import { Widget, _decorator, Node, tween, v3, Label, math, Tween, Button } from 'cc';
import { GameMgr } from '../manager/GameMgr';
import { AudioMgr } from '../manager/AudioMgr';
import { CoinMgr } from '../manager/CoinMgr';
import { UI } from '../enum/UI';
import { UIBase } from '../scriptBase/UIBase';
import { CoinItem } from '../uiItem/CoinItem';
import { TransMgr } from '../manager/TransMgr';
import { WinReward } from '../manager/RewardMgr';
const { ccclass, requireComponent } = _decorator;

@ccclass('UI/UIWin')
@requireComponent(Widget)
export class UIWin extends UIBase {
    private ready: boolean = false
    private processing: boolean = false
    private tw: Tween<Node> = null

    public onOpen(reward: WinReward): void {
        if (!reward) {
            this.scheduleOnce(() => this.close())
            return
        }
        AudioMgr.stopBgm()
        AudioMgr.playSfx('通关成功')
        GameMgr.Pause = true
        this.setButtons(false)
        this.findComp('CoinItem', CoinItem).init(CoinMgr.CurCoin)
        this.findComp('LbCoin', Label).string = `x${reward.amount}`
        const pointer = this.findNode('Pointer')
        const ranges = [[-120, -74], [-72, -18], [-17, 29], [32, 86], [90, 120]]
        const range = ranges[reward.slotIndex]
        const x = math.randomRangeInt(range[0], range[1])
        this.tw = tween(pointer)
            .to(0.5, { position: v3(120, -25) })
            .to(0.5, { position: v3(-120, -25) })
            .to(0.35, { position: v3(x, -25) }, { easing: 'sineOut' })
            .call(() => {
                this.ready = true
                this.setButtons(true)
            }).start()
    }

    private setButtons(enabled: boolean): void {
        this.findComp('BtnNext', Button).interactable = enabled
        this.findComp('BtnClose', Button).interactable = enabled
    }

    public onClose(): void {
        if (this.tw) this.tw.stop()
        GameMgr.Pause = false
    }

    protected async onBtnNextClick() {
        if (!this.ready || this.processing) return
        this.processing = true
        this.setButtons(false)
        await TransMgr.Inst.fadeIn()
        GameMgr.startGame()
        this.close()
        TransMgr.Inst.fadeOut()
    }

    protected async onBtnCloseClick() {
        if (!this.ready || this.processing) return
        this.processing = true
        this.setButtons(false)
        await TransMgr.Inst.fadeIn()
        this.close()
        GameMgr.quitGame()
        this.open(UI.Main)
        TransMgr.Inst.fadeOut()
    }
}
