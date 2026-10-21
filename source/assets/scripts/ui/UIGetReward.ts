import { Widget, _decorator, Sprite, Label, Tween, Node, tween, v3 } from 'cc';
import { DtoReward } from '../dto/DtoReward';
import { CoinMgr } from '../manager/CoinMgr';
import { ResMgr } from '../manager/ResMgr';
import { UIBase } from '../scriptBase/UIBase';
import { CoinItem } from '../uiItem/CoinItem';
import { CfgItem } from '../config/CfgItem';
const { ccclass, requireComponent } = _decorator;

@ccclass('UI/UIGetReward')
@requireComponent(Widget)
export class UIGetReward extends UIBase {
    private rewards: DtoReward[] = []
    private index: number = 0
    private processing: boolean = false
    private tw: Tween<Node> = null

    public onOpen(data: ReadonlyArray<DtoReward>): void {
        this.rewards = (data ?? []).map(reward => ({ ...reward }))
        this.findComp('CoinItem', CoinItem).init(CoinMgr.CurCoin)
        if (!this.rewards.length) {
            this.processing = true
            this.scheduleOnce(() => this.close())
            return
        }
        this.showReward()
    }

    private showReward(): void {
        const reward = this.rewards[this.index]
        const item = CfgItem[reward.itemId]
        const icon = this.findComp('Icon', Sprite)
        icon.spriteFrame = ResMgr.getSpriteFrame(item.bundle, item.icon)
        this.findComp('LbCnt', Label).string = `x${reward.cnt}（已到账）`
        if (this.tw) this.tw.stop()
        this.tw = tween(icon.node).set({ scale: v3() })
            .to(0.3, { scale: v3(1, 1, 1) }, { easing: 'backOut' }).start()
    }

    protected onBtnNormalGetClick(): void {
        if (this.processing) return
        this.processing = true
        this.index++
        if (this.index >= this.rewards.length) {
            this.close()
            return
        }
        this.showReward()
        this.scheduleOnce(() => { this.processing = false }, 0.3)
    }

    public onClose(): void {
        if (this.tw) this.tw.stop()
        this.unscheduleAllCallbacks()
    }
}
