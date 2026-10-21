import { Widget, _decorator, Node, Label, tween, v3, Tween, UIOpacity } from 'cc';
import { UIBase } from '../scriptBase/UIBase';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('UI/UIStageTip')
@requireComponent(Widget)
export class UIStageTip extends UIBase {

    private lbTip: Label = null
    private arrow: Node = null
    private uiOpacity: UIOpacity = null

    protected onLoad(): void {
        this.lbTip = this.findComp('LbTip', Label)
        this.arrow = this.findNode('Arrow')
        this.uiOpacity = this.getComponent(UIOpacity)
    }

    public onOpen(data?: any): void {
        this.lbTip.string = data
        tween(this.lbTip.node).to(0.5, { position: v3(0, 0, 0) }, { easing: 'sineOut' }).start()
        tween(this.arrow).to(10, { position: v3(850, 0) }).start()
        tween(this.uiOpacity).delay(2).to(1, { opacity: 0 }).call(() => {
            this.node.destroy()
        }).start()
    }

    public onClose(data?: any): void {

    }

}


