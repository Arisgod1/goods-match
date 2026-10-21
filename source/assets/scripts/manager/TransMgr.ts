import { _decorator, Component, Node, tween, UIOpacity, UITransform, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Manager/TransMgr')
export class TransMgr extends Component {

    private static inst: TransMgr = null
    public static get Inst(): TransMgr {
        return this.inst
    }

    @property(UITransform)
    private gc1UiTrans: UITransform = null
    @property(UITransform)
    private gc2UiTrans: UITransform = null
    @property(Node)
    private logo: Node = null

    private gc1OrgHeight: number = 0
    private gc2OrgHeight: number = 0

    protected onLoad(): void {
        TransMgr.inst = this
        this.gc1OrgHeight = this.gc1UiTrans.height
        this.gc2OrgHeight = this.gc2UiTrans.height
        this.node.active = false
    }

    public fadeIn() {
        return new Promise<void>((resolve, reject) => {
            this.node.active = true
            this.logo.setScale(v3(0, 0, 1))
            tween(this.logo).delay(0.2).to(0.5, { scale: v3(1, 1, 1) }, { easing: 'backOut' }).start()
            tween(this.gc1UiTrans).set({ height: 0 }).to(0.2, { height: this.gc1OrgHeight }).start()
            const tw = tween(this.gc2UiTrans)
            tw.set({ height: 0 })
            tw.to(1, { height: this.gc2OrgHeight }, { easing: 'cubicOut' })
            tw.call(() => {
                resolve()
            })
            tw.start()
        })
    }

    public fadeOut() {
        return new Promise<void>((resolve, reject) => {
            tween(this.logo).to(0.5, { scale: v3() }, { easing: 'backIn' }).start()
            tween(this.gc1UiTrans).delay(0.8).to(0.2, { height: 0 }).start()
            const tw = tween(this.gc2UiTrans)
            tw.to(1, { height: 0 }, { easing: 'cubicIn' })
            tw.call(() => {
                this.node.active = false
                resolve()
            })
            tw.start()
        })
    }


}


