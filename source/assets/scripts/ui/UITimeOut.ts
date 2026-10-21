import { Widget, _decorator, Label } from 'cc';
import { UIBase } from '../scriptBase/UIBase';
import { EventMgr } from '../manager/EventMgr';
import { EventType } from '../enum/EventType';
import { TransMgr } from '../manager/TransMgr';
import { GameMgr } from '../manager/GameMgr';
import { UI } from '../enum/UI';
import { AudioMgr } from '../manager/AudioMgr';
const { ccclass, requireComponent } = _decorator;

@ccclass('UI/UITimeOut')
@requireComponent(Widget)
export class UITimeOut extends UIBase {
    private processing: boolean = false

    public onOpen(): void {
        GameMgr.Pause = true
        AudioMgr.playSfx('通关失败')
        this.findComp('Label', Label).string = GameMgr.CanRevive
            ? '本局可免费续玩一次，增加60秒' : '本局续玩已用完，可免费重新挑战'
        this.findComp('BtnYes/ActionLabel', Label).string = GameMgr.CanRevive ? '免费续玩' : '重新挑战'
    }

    public onClose(): void {
        GameMgr.Pause = false
    }

    protected async onBtnCloseClick() {
        if (this.processing) return
        this.processing = true
        await TransMgr.Inst.fadeIn()
        this.close()
        GameMgr.quitGame()
        this.open(UI.Main)
        TransMgr.Inst.fadeOut()
    }

    protected async onBtnYesClick() {
        if (this.processing) return
        this.processing = true
        if (GameMgr.tryRevive()) {
            this.close()
            EventMgr.emit(EventType.Revive)
        } else {
            await TransMgr.Inst.fadeIn()
            GameMgr.startGame()
            this.close()
            TransMgr.Inst.fadeOut()
        }
    }
}
