import { Widget, _decorator, Node, Label, Vec3, tween, isValid, math } from 'cc';
import { UIBase } from '../scriptBase/UIBase';
import { UI } from '../enum/UI';
import { GameMgr } from '../manager/GameMgr';
import { CoinItem } from '../uiItem/CoinItem';
import { CoinMgr } from '../manager/CoinMgr';
import { EventType } from '../enum/EventType';
import { EventMgr } from '../manager/EventMgr';
import { AudioMgr } from '../manager/AudioMgr';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('UI/UIGame')
@requireComponent(Widget)
export class UIGame extends UIBase {

    private lbLevel: Label = null
    private coinItem: CoinItem = null

    protected onLoad(): void {
        this.lbLevel = this.findComp('SettingItem/LbLevel', Label)
        this.coinItem = this.findComp('CoinItem', CoinItem)
    }

    protected onEnable(): void {
        EventMgr.on(EventType.MergeGoods, this.onMergeGoods, this)
    }

    protected onDisable(): void {
        EventMgr.off(EventType.MergeGoods, this.onMergeGoods, this)
    }

    public onOpen(data?: any): void {
        this.lbLevel.string = `第${GameMgr.CurLevel + 1}关`
        this.coinItem.init(CoinMgr.CurCoin)
        AudioMgr.playBgm(`游戏内音乐${math.randomRangeInt(0, 3)}`)
    }

    public onClose(data?: any): void {
    }

    protected onBtnSettingClick(): void {
        this.open(UI.Pause)
    }

    private onMergeGoods(worldPos: Vec3): void {
        this.coinItem.updateCoin(CoinMgr.CurCoin, false)
        const flyCoin: Node = this.coinItem.createFlyCoin()
        flyCoin.setWorldPosition(worldPos)
        const tw = tween(flyCoin)
        tw.to(0.5, { worldPosition: this.coinItem.node.worldPosition }, { easing: 'sineOut' })
        tw.call(() => {
            if (isValid(flyCoin)) {
                flyCoin.destroy()
            }
        })
        tw.start()
    }

}


