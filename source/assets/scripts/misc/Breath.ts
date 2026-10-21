import { _decorator, Component, Node, tween, Tween, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Misc/Breath')
export class Breath extends Component {

    private tw: Tween<Node> = null

    protected onEnable(): void {
        this.tw = tween(this.node)
        this.tw.to(0.75, { scale: v3(1.1, 1.1, 1) }).to(0.75, { scale: v3(1, 1, 1) }).union().repeatForever().start()
    }

    protected onDisable(): void {
        this.node.scale = v3(1, 1, 1)
        this.tw.stop()
        this.tw = null
    }

}


