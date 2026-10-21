import { _decorator, Component, isValid, Node } from 'cc';
import { Global } from '../Global';
import { EventType } from '../enum/EventType';
import { EventMgr } from '../manager/EventMgr';
import { AudioMgr } from '../manager/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('Game/EffectFreeze')
export class EffectFreeze extends Component {
    
    protected onLoad(): void {
        EventMgr.on(EventType.UseSkillFreezeTime, this.onRemove, this)
    }

    protected onDestroy(): void {
        EventMgr.off(EventType.UseSkillFreezeTime, this.onRemove, this)
        this.unscheduleAllCallbacks()
    }

    protected start() {
        this.scheduleOnce(this.onRemove, Global.Freeze_Time)
        AudioMgr.playSfx('冰冻道具')
    }

    protected onRemove(): void {
        if (isValid(this.node)) this.node.destroy()
    }

}


