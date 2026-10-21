import { _decorator, Component, EventHandler, Toggle } from 'cc';
import { AudioMgr } from '../manager/AudioMgr';
const { ccclass, property, disallowMultiple, requireComponent } = _decorator;

@ccclass('UIExtend/ToggleExtend')
@disallowMultiple(true)
@requireComponent(Toggle)
export class ToggleExtend extends Component {

    @property({ range: [0, 1, 0.1], slide: true })
    private safeTime: number = 0.5
    @property
    private clickSfx: string = 'btnClick'

    private toggle: Toggle = null

    private checkEvents: EventHandler[]

    private isSafe: boolean = true

    onLoad() {
        this.toggle = this.getComponent(Toggle)
    }

    protected start(): void {
        this.toggle.node.on(Toggle.EventType.TOGGLE, this.onToggle, this)
    }

    protected onToggle() {
        this.handleSafe()
        this.handleClickSfx()
    }

    private handleSafe(): void {
        if (!this.isSafe) return
        this.isSafe = false
        this.scheduleOnce(() => {
            this.checkEvents = this.toggle.checkEvents
            this.toggle.checkEvents = []
            this.scheduleOnce(this.recover, this.safeTime)
        })
    }

    private handleClickSfx(): void {
        if (!this.clickSfx) return
        AudioMgr.playSfx(this.clickSfx)
    }

    private recover(): void {
        this.isSafe = true
        this.toggle.checkEvents = this.checkEvents
    }

}


