import { _decorator, Button, Component, EventHandler, Node } from 'cc';
import { AudioMgr } from '../manager/AudioMgr';
import { EventType } from '../enum/EventType';
import { UIMgr } from '../manager/UIMgr';
const { ccclass, property, disallowMultiple, requireComponent } = _decorator;

@ccclass('UIExtend/BtnExtend')
@disallowMultiple(true)
@requireComponent(Button)
export class BtnExtend extends Component {
    @property({ range: [0, 1, 0.1], slide: true })
    private safeTime: number = 0.5
    @property
    private zoomScale:number = 1.1
    @property
    private clickSfx: string = 'btnClick'
    @property
    private openUI: string = ''
    @property
    private closeUI: string = ''

    private btn: Button = null

    private clickEvents: EventHandler[]

    private isSafe: boolean = true

    protected onLoad() {
        this.btn = this.getComponent(Button)
        this.btn.zoomScale = this.zoomScale
        this.btn.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.btn.node.on(EventType.Click, this.onClick, this)
    }

    protected onTouchStart(): void {
        this.handleClickSfx()
    }

    protected onClick(): void {
        this.handleSafe()
        if (this.openUI) UIMgr.open(this.openUI)
        if (this.closeUI) UIMgr.close(this.closeUI)
    }

    private handleSafe(): void {
        if (!this.isSafe) return
        this.isSafe = false
        this.clickEvents = this.btn.clickEvents
        this.btn.clickEvents = []
        this.scheduleOnce(() => {
            this.isSafe = true
            this.btn.clickEvents = this.clickEvents
        }, this.safeTime)
    }

    private handleClickSfx(): void {
        this.clickSfx && AudioMgr.playSfx(this.clickSfx)
    }
}


