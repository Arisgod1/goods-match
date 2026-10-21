import { _decorator, Component, Node, Label, CCInteger } from "cc"
const { ccclass, property, requireComponent } = _decorator

@ccclass("UIExtend/LabelTick")
@requireComponent(Label)
export class LabelTick extends Component {
    @property
    private prefix: string = ''
    @property
    private suffix: string = ''
    //保留小数点后几位
    @property(CCInteger)
    private decimalPlaces: number = 0

    private label: Label = null

    private curNumber: number = 0
    private intervalPerUpdate: number = 0
    private finalNumber: number = 0

    protected onLoad(): void {
        this.label = this.getComponent(Label)
    }

    protected onEnable(): void {

    }

    protected onDisable(): void {
        this.unscheduleAllCallbacks()
    }

    public init(n: number): void {
        this.curNumber = n
        this.label.string = `${this.prefix}${this.curNumber.toFixed(this.decimalPlaces)}${this.suffix}`
    }

    public tickLabel(finalNumber: number, duration: number = 0.5) {
        if (this.curNumber === finalNumber) {
            this.curNumber = finalNumber
            this.finalNumber = finalNumber
            this.label.string = `${this.prefix}${this.finalNumber.toFixed(this.decimalPlaces)}${this.suffix}`
        }
        else {
            this.finalNumber = finalNumber
            this.intervalPerUpdate = (finalNumber - this.curNumber) / (duration * 33)
            this.unschedule(this.updateForNumber)
            this.schedule(this.updateForNumber, 0.03)
            this.label.string = `${this.prefix}${this.curNumber.toFixed(this.decimalPlaces)}${this.suffix}`
        }
    }

    private updateForNumber(dt) {
        this.curNumber += this.intervalPerUpdate
        if ((this.intervalPerUpdate > 0 && this.curNumber > this.finalNumber)
            || (this.intervalPerUpdate < 0 && this.curNumber < this.finalNumber)
        ) {
            this.curNumber = this.finalNumber
            this.unschedule(this.updateForNumber)
        }
        this.label.string = `${this.prefix}${this.curNumber.toFixed(this.decimalPlaces)}${this.suffix}`
    }

    public stop() {
        this.unschedule(this.updateForNumber)
        this.curNumber = null
        this.finalNumber = null
    }

}
