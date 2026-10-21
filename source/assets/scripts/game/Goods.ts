import { _decorator, color, Color, Component, EventTouch, Node, Prefab, Sprite, Tween, tween, UIOpacity, v3, Vec2, Vec3 } from 'cc';
import { GameMgr } from '../manager/GameMgr';
import { ResMgr } from '../manager/ResMgr';
import { Bundle } from '../enum/Bundle';
import { EffectMgr } from '../manager/EffectMgr';
import { Mode } from '../enum/Mode';
import { cfg_icon_tp, cfg_icon_gs, cfg_icon_ls } from '../config/cfg_icon';
const { ccclass, property } = _decorator;

@ccclass('Game/Goods')
export class Goods extends Component {

    private uiOpacity: UIOpacity = null
    private sp: Sprite = null
    public get Sp(): Sprite {
        return this.sp
    }

    @property(Prefab)
    private parMergePre: Prefab = null

    public isRemoving: boolean = false
    public static isValidId(id: number): boolean {
        const config = [cfg_icon_tp, cfg_icon_gs, cfg_icon_ls][GameMgr.mode]
        return Number.isInteger(id) && id > 0 && !!config?.some(item => item.id === id)
    }

    private visible: boolean = true
    public get Visible(): boolean {
        return this.visible
    }
    public set Visible(v: boolean) {
        this.visible = v
        this.uiOpacity = this.getComponent(UIOpacity)
        this.uiOpacity.opacity = this.visible ? 255 : 0
    }

    private id: number = 0
    public get Id(): number {
        return this.id
    }
    public set Id(v: number) {
        if (!Goods.isValidId(v)) { this.node.destroy(); return }
        this.id = v
        switch (GameMgr.mode) {
            case Mode.tp:
                this.sp.spriteFrame = ResMgr.getSpriteFrame(Bundle.Icon, `tp${v}`, 'tp/')
                break;
            case Mode.gs:
                this.sp.spriteFrame = ResMgr.getSpriteFrame(Bundle.Icon, `gs${v}`, 'gs/')
                break;
            case Mode.ls:
                this.sp.spriteFrame = ResMgr.getSpriteFrame(Bundle.Icon, `ls${v}`, 'ls/')
                break;
        }
    }

    private layer: number = 0
    public get Layer(): number {
        return this.layer
    }
    public set Layer(v: number) {
        this.layer = v
        const isFront: boolean = this.layer === 0
        this.sp.color = isFront ? Color.WHITE : color(100, 100, 100, 255)
    }

    private slot: number = 0
    public get Slot(): number {
        return this.slot
    }
    public set Slot(v: number) {
        this.slot = v
    }

    protected onLoad(): void {
        this.uiOpacity = this.getComponent(UIOpacity)
        this.sp = this.getComponentInChildren(Sprite)
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this)
    }

    private onTouchStart(e: EventTouch): void {
        if (this.layer !== 0 || this.isRemoving) return
        if (GameMgr.isPicking) return
        const uiPos: Vec2 = e.getUILocation()
        if (!GameMgr.pick(this, uiPos)) return
        this.Visible = false
    }

    public remove(): void {
        if (this.isRemoving) return
        this.isRemoving = true
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this)
        const tw = tween(this.sp.node)
        tw.to(0.15, { scale: v3(1.1, 0.9, 1) })
        tw.to(0.15, { scale: v3(0.9, 1.1, 1) })
        tw.call(() => {
            if (this.layer === 0) {
                const worldPos: Vec3 = this.node.getWorldPosition()
                worldPos.y -= 30
                EffectMgr.create(this.parMergePre, GameMgr.EffectsLayer, worldPos)
            }
            this.node.destroy()
        })
        tw.start()
    }

    public bounce(delay: number = 0): void {
        tween(this.sp.node).delay(delay).to(0.1, { scale: v3(0.9, 1.1, 1) }).to(0.1, { scale: v3(1.1, 0.9, 1) }).to(0.1, { scale: v3(1, 1, 1) }).start()
    }


}


