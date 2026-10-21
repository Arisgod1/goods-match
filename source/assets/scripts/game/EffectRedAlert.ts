import { _decorator, Component, isValid, Node, tween, UIOpacity } from 'cc';
import { EventMgr } from '../manager/EventMgr';
import { EventType } from '../enum/EventType';
import { Global } from '../Global';
import { AudioMgr } from '../manager/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('Game/EffectRedAlert')
export class EffectRedAlert extends Component {

    private uiOpacity: UIOpacity = null

    protected onLoad() {
        this.uiOpacity = this.getComponent(UIOpacity)
        EventMgr.on(EventType.TimeOutAlert, this.onTimeOutAlert, this)
    }

    protected onDestroy(): void {
        EventMgr.off(EventType.TimeOutAlert, this.onTimeOutAlert, this)
    }

    protected start(): void {
        const tw = tween(this.uiOpacity)
        tw.sequence(
            tween(this.uiOpacity).to(0.5, { opacity: 0 }),
            tween(this.uiOpacity).to(0.5, { opacity: 255 }),
        )
        tw.repeatForever()
        tw.start()
        this.scheduleOnce(this.onTimeOutAlert, Global.Time_Out_Alert_Time)
        AudioMgr.playSfx('倒计时')
    }

    protected onTimeOutAlert(): void {
        this.unscheduleAllCallbacks()
        if (isValid(this.node)) this.node.destroy()
    }

}


