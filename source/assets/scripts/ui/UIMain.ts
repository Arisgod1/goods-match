import { Widget, _decorator, Node, PageView, tween, v3 } from 'cc';
import { UIBase } from '../scriptBase/UIBase';
import { UI } from '../enum/UI';
import { GameMgr } from '../manager/GameMgr';
import { CoinItem } from '../uiItem/CoinItem';
import { CoinMgr } from '../manager/CoinMgr';
import { AudioMgr } from '../manager/AudioMgr';
import { RewardMgr } from '../manager/RewardMgr';
import { UIMgr } from '../manager/UIMgr';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('UI/UIMain')
@requireComponent(Widget)
export class UIMain extends UIBase {

    private pageView: PageView = null
    private coinItem: CoinItem = null
    private hand: Node = null

    protected onLoad(): void {
        this.pageView = this.findComp('PageView', PageView)
        this.coinItem = this.findComp('CoinItem', CoinItem)
        this.hand = this.findNode('Tip/Hand')
    }

    protected start(): void {
        tween(this.hand).to(1, { position: v3(200, 0, 0) }).to(1, { position: v3(-200, 0, 0) }).union().repeatForever().start()
    }

    public onOpen(data?: any): void {
        GameMgr.leavingHome = false
        this.pageView.scrollToPage(GameMgr.mode, 0)
        this.coinItem.init(CoinMgr.CurCoin)
        AudioMgr.playBgm('主界面音乐')
        this.scheduleOnce(() => {
            if (!GameMgr.leavingHome && UIMgr.get(UI.Main) === this && RewardMgr.canClaimDaily()) {
                this.open(UI.LoginReward)
            }
        })
    }

    public onClose(data?: any): void {
        this.unscheduleAllCallbacks()
    }

    protected onBtnSettingClick(): void {
        this.open(UI.Setting)
    }

    protected onBtnLuckySpinClick(): void {
        this.open(UI.LuckySpin)
    }

    protected onBtnPassRewardClick(): void {
        this.open(UI.PassReward)
    }

}


