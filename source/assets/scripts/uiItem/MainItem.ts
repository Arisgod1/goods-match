import { _decorator, Component, Enum, Node } from 'cc';
import { Mode, ModeName } from '../enum/Mode';
import { GameMgr } from '../manager/GameMgr';
import { TransMgr } from '../manager/TransMgr';
import { UIMgr } from '../manager/UIMgr';
import { UI } from '../enum/UI';
import { RecoveryMgr } from '../manager/RecoveryMgr';
const { ccclass, property } = _decorator;

@ccclass('UIItem/MainItem')
export class MainItem extends Component {

    @property(Node)
    private tip: Node = null

    @property({ type: Enum(Mode) })
    public mode: Mode = Mode.tp

    private btnStart: Node = null
    private btnUnlock: Node = null

    protected onLoad(): void {
        this.btnStart = this.node.getChildByName('BtnStart')
        this.btnUnlock = this.node.getChildByName('BtnUnlock')
    }

    protected start(): void {
        this.updateState()
    }

    private updateState(): void {
        this.tip.active = false
        this.btnUnlock.active = false
    }

    protected async onBtnStartClick() {
        if (GameMgr.leavingHome) return
        GameMgr.leavingHome = true
        await TransMgr.Inst.fadeIn()
        TransMgr.Inst.fadeOut()
        UIMgr.close(UI.Main)
        GameMgr.mode = this.mode
        GameMgr.startGame()
    }

    protected onBtnUnlockClick(): void {
        const commit = () => GameMgr.unlockMode(this.mode)
        const result = commit()
        if (result.ok) this.updateState()
        else RecoveryMgr.retry(commit, () => this.updateState())
    }

}


