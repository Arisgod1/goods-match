import { _decorator, Widget, Label, Button } from 'cc'
import { UIBase } from '../scriptBase/UIBase'
import { GameMgr } from '../manager/GameMgr'
import { RecoveryMgr, RecoveryOptions } from '../manager/RecoveryMgr'
const { ccclass, requireComponent } = _decorator

@ccclass('UI/UIRecovery')
@requireComponent(Widget)
export class UIRecovery extends UIBase {
    private options: RecoveryOptions = null
    private processing: boolean = false
    private previousPause: boolean = false
    private roundId: number = 0
    public onOpen(options: RecoveryOptions): void {
        this.options = options
        this.previousPause = GameMgr.Pause
        this.roundId = GameMgr.roundId
        GameMgr.Pause = true
        this.findComp('LbTitle', Label).string = options.title
        this.findComp('LbDesc', Label).string = options.message
        for (let i = 0; i < 3; i++) {
            const button = this.findNode(`BtnAction${i}`)
            button.active = i < options.actions.length
            if (button.active) this.findComp(`BtnAction${i}/ActionLabel`, Label).string = options.actions[i].label
        }
    }
    private execute(index: number): void {
        if (this.processing || !this.options.actions[index]) return
        this.processing = true
        for (let i = 0; i < this.options.actions.length; i++) this.findComp(`BtnAction${i}`, Button).interactable = false
        const action = this.options.actions[index]
        let result
        try { result = action.run() } catch { result = { ok: false, reason: 'storage_error' } }
        if (result.ok) {
            this.close()
            action.onSuccess?.(result.value)
        } else {
            this.processing = false
            this.findComp('LbDesc', Label).string = RecoveryMgr.message(result.reason)
            for (let i = 0; i < this.options.actions.length; i++) this.findComp(`BtnAction${i}`, Button).interactable = true
        }
    }
    protected onBtnPrimaryClick(): void { this.execute(0) }
    protected onBtnSecondaryClick(): void { this.execute(1) }
    protected onBtnTertiaryClick(): void { this.execute(2) }
    public onClose(): void {
        if (GameMgr.roundId === this.roundId) GameMgr.Pause = this.previousPause
    }
}
