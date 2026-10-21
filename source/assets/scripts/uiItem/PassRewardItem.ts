import { _decorator, Component, Label, Node, ProgressBar } from 'cc';
import { GameMgr } from '../manager/GameMgr';
import { RewardMgr } from '../manager/RewardMgr';
import { EventMgr } from '../manager/EventMgr';
import { EventType } from '../enum/EventType';
const { ccclass, property } = _decorator;

@ccclass('UIItem/PassRewardItem')
export class PassRewardItem extends Component {

    @property(ProgressBar)
    private progressBar: ProgressBar = null

    @property(Label)
    private lbProgress: Label = null

    protected onLoad(): void {
        EventMgr.on(EventType.GetPassReward, this.onUpdateState, this)
    }

    protected onDestroy(): void {
        EventMgr.off(EventType.GetPassReward, this.onUpdateState, this)
    }

    protected start(): void {
        this.onUpdateState()
    }

    private onUpdateState(): void {
        const target = RewardMgr.NextPassTarget
        const progress = Math.min(GameMgr.CurPassedLevel, target)
        this.progressBar.progress = progress / target
        this.lbProgress.string = `${progress}/${target}`

    }

}


