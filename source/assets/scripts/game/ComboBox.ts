import { _decorator, Component, Label, math, Node, ProgressBar, Sprite, tween, UIOpacity, v3, Vec3 } from 'cc';
import { Global } from '../Global';
import { CfgCombo } from '../config/CfgCombo';
import { GameMgr } from '../manager/GameMgr';
import { ResMgr } from '../manager/ResMgr';
import { Bundle } from '../enum/Bundle';
const { ccclass, property } = _decorator;

@ccclass('Game/ComboBox')
export class ComboBox extends Component {

    @property(ProgressBar)
    private progressBar: ProgressBar = null

    @property(Label)
    private lbCombo: Label = null

    private curCombo: number = 0
    public get CurCombo(): number {
        return this.curCombo
    }
    public set CurCombo(v: number) {
        this.curCombo = math.clamp(v, 0, Global.Max_Combo)

        this.node.active = this.curCombo > 0

        if (this.curCombo <= 0) return

        this.lbCombo.string = `x${this.curCombo}`

        const comboData = CfgCombo[this.curCombo]
        const { durarion } = comboData
        this.speed = 1 / durarion
        this.progressBar.progress = 1
    }

    private speed: number = 0

    protected start(): void {
        this.CurCombo = 0
    }

    protected update(dt: number): void {
        if (GameMgr.Pause) return
        if (this.curCombo <= 0) return
        this.progressBar.progress = math.clamp(this.progressBar.progress - this.speed * dt, 0, 1)
        if (this.progressBar.progress <= 0) {
            this.CurCombo = 0
        }
    }

    public createFloatText(shelveWorldPos: Vec3): void {
        const floatText: Node = new Node()
        const sp: Sprite = floatText.addComponent(Sprite)
        const uiOpacity: UIOpacity = floatText.addComponent(UIOpacity)

        const comboData = CfgCombo[this.curCombo]
        const { icon } = comboData
        if(!icon) return
        sp.spriteFrame = ResMgr.getSpriteFrame(Bundle.Game, icon)

        GameMgr.EffectsLayer.addChild(floatText)
        floatText.setWorldPosition(shelveWorldPos)

        const tw = tween(floatText)
        tw.set({ scale: v3(0.5, 0.5, 1) })
        tw.to(0.5, { scale: v3(1, 1, 1) }, { easing: 'backOut' })
        tw.by(0.5, { position: v3(0, 50, 0) }, { easing: 'sineOut' })
        tw.call(() => {
            floatText.destroy()
        })
        tw.start()

        tween(uiOpacity).delay(0.5).to(0.5, { opacity: 0 }, { easing: 'sineOut' }).start()
    }


}


