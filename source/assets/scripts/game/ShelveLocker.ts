import { _decorator, Button, Component, Label, Node, Sprite, tween, UIOpacity, v3 } from 'cc';
import { GameMgr } from '../manager/GameMgr';
import { EventMgr } from '../manager/EventMgr';
import { EventType } from '../enum/EventType';
import { ArrayUtil } from '../util/ArrayUtil';
import { UIMgr } from '../manager/UIMgr';
import { UI } from '../enum/UI';
import { ResMgr } from '../manager/ResMgr';
import { Bundle } from '../enum/Bundle';
const { ccclass, property } = _decorator;

@ccclass('Game/ShelveLocker')
export class ShelveLocker extends Component {
    @property(Node)
    private lbBg: Node = null
    @property(Label)
    private lbCnt: Label = null
    @property(Sprite)
    private glass: Sprite = null
    // @property(Button)
    // private btnUnlock: Button = null
    @property(Node)
    private chain: Node = null

    private unlockCnt: number = 0
    public get UnlockCnt(): number {
        return this.unlockCnt
    }
    public set UnlockCnt(v: number) {
        this.unlockCnt = Math.max(0, v)
        this.lbCnt.string = `${v}`

        const spfName: string = this.unlockCnt === 1 ? 'bl2' : 'bl1'
        this.glass.spriteFrame = ResMgr.getSpriteFrame(Bundle.Game, spfName, 'image/')
        if (this.unlockCnt > 0) return
        // this.btnUnlock.interactable = false
        this.lbBg.active = false
        this.lbCnt.node.active = false
        this.glass.node.active = false
        // tween(this.btnUnlock.node).by(0.5, { position: v3(0, 50, 0) }).start()
        // const btnOpacity: UIOpacity = this.btnUnlock.addComponent(UIOpacity)
        // tween(btnOpacity).to(0.5, { opacity: 0 }).start()

        tween(this.chain).by(0.5, { position: v3(0, -50, 0) }).start()
        const chainOpacity: UIOpacity = this.chain.addComponent(UIOpacity)
        tween(chainOpacity).to(0.5, { opacity: 0 }).start()

        this.scheduleOnce(() => {
            this.node.destroy()
        }, 0.5)

    }

    protected onLoad(): void {
        this.lbCnt = this.getComponentInChildren(Label)
        this.glass = this.node.getChildByName('Glass').getComponent(Sprite)

        GameMgr.shelveLockerArr.push(this)
        EventMgr.on(EventType.MergeGoods, this.onMergeGoods, this)
    }

    protected onDestroy(): void {
        ArrayUtil.remove(GameMgr.shelveLockerArr, this)
        EventMgr.off(EventType.MergeGoods, this.onMergeGoods, this)
    }

    protected onMergeGoods(): void {
        if (this !== GameMgr.shelveLockerArr[0]) return
        this.UnlockCnt--
    }

    protected onBtnUnlockClick(): void {
        // this.UnlockCnt = 0
    }

}


