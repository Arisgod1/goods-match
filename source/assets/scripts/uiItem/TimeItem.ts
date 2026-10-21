import { _decorator, Color, Component, Label, Node, Tween, tween, v3 } from 'cc';
import { TimeUtil } from '../util/TimeUtil';
import { EventMgr } from '../manager/EventMgr';
import { EventType } from '../enum/EventType';
import { GameMgr } from '../manager/GameMgr';
import { Debug } from '../util/Debug';
import { Global } from '../Global';
const { ccclass, property } = _decorator;

const Tag: string = 'TimeItem'

@ccclass('UIItem/TimeItem')
export class TimeItem extends Component {

    @property(Node)
    private nz: Node = null

    private _label: Label = null

    private leftTime: number = 0
    public get LeftTime(): number {
        return this.leftTime
    }
    public set LeftTime(v: number) {
        this.leftTime = Math.max(v, 0)
        EventMgr.emit(EventType.TimeTick, this.leftTime)
        this._label.string = TimeUtil.formatTime_HHMMSS(Math.round(this.leftTime) * 1000)
        this._label.color = this.leftTime <= 5 ? Color.RED : Color.WHITE
    }

    private _freezeTime: number = 0
    private _freeze: boolean = false
    private _pause: boolean = false

    private _tw: Tween<Node> = null

    protected onLoad() {
        this._label = this.getComponentInChildren(Label)
        globalThis.TimeItem = this
        EventMgr.on(EventType.Revive, this.onRevive, this)
        EventMgr.on(EventType.UseSkillFreezeTime, this.onUseSkillFreeze, this)
        EventMgr.on(EventType.TimeReset, this.onTimeReset, this)
    }

    protected onDestroy(): void {
        EventMgr.off(EventType.Revive, this.onRevive, this)
        EventMgr.off(EventType.UseSkillFreezeTime, this.onUseSkillFreeze, this)
        EventMgr.off(EventType.TimeReset, this.onTimeReset, this)
    }

    protected update(dt: number): void {
        if (this._pause) return
        if (GameMgr.Pause) return
        if (Global.Level_Time === -1) return
        if (this._freeze) {
            this._freezeTime -= dt
            if (this._freezeTime <= 0) {
                this._freeze = false
                Debug.Log(Tag, '结束冰冻')
            }
        } else {
            const preTime: number = this.leftTime
            this.LeftTime -= dt
            if (preTime > Global.Time_Out_Alert_Time && this.leftTime <= Global.Time_Out_Alert_Time) {
                EventMgr.emit(EventType.TimeOutAlert)
                if (this._tw) this._tw.stop()
                this._tw = tween(this.nz).sequence(
                    tween(this.nz).to(0.5, { scale: v3(1.2, 1.2, 1) }),
                    tween(this.nz).to(0.5, { scale: v3(1, 1, 1) }),
                ).repeatForever().start()
            }
            if (this.leftTime <= 0) {
                this._pause = true
                EventMgr.emit(EventType.TimeOut)
            }
        }
    }

    protected onTimeReset(): void {
        this._pause = false
        this.LeftTime = Global.Level_Time
        this.nz.scale = v3(1, 1, 1)
        if (this._tw) {
            this._tw.stop()
            this._tw = null
        }
    }

    protected onRevive(): void {
        this._pause = false
        this.LeftTime = Global.Revive_Add_Time
        this.nz.scale = v3(1, 1, 1)
        if (this._tw) {
            this._tw.stop()
            this._tw = null
        }
    }

    protected onUseSkillFreeze(): void {
        this._freeze = true
        this._freezeTime = Global.Freeze_Time
        Debug.Log(Tag, '开始冰冻')
    }

}


