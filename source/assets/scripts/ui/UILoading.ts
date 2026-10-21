import { Widget, _decorator, ProgressBar, math, macro, Node, Button, Label, UITransform, Color } from 'cc';
import { UIBase } from '../scriptBase/UIBase';
import { Bundle } from '../enum/Bundle';
import { ResMgr } from '../manager/ResMgr';
import { UI } from '../enum/UI';
import { GameSave, success } from '../manager/GameSave';
import { RecoveryMgr } from '../manager/RecoveryMgr';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('UI/UILoading')
@requireComponent(Widget)
export class UILoading extends UIBase {

    private progressBar: ProgressBar = null

    private loaded: boolean = false
    private loading: boolean = false
    private retryNode: Node = null

    protected async onLoad() {
        this.progressBar = this.getComponentInChildren(ProgressBar)
    }

    protected async start() {
        await this.loadResources()
    }

    private async loadResources(): Promise<void> {
        if (this.loading || this.loaded || !this.isValid) return
        this.loading = true
        if (this.retryNode) this.retryNode.active = false
        this.progressBar.progress = 0
        this.schedule(this.updateProgress, 0.25, macro.REPEAT_FOREVER)
        try {
            await this.loadBundle()
            await this.loadRes()
            if (this.isValid) this.loaded = true
        } catch {
            if (this.isValid) {
                this.unschedule(this.updateProgress)
                this.showLoadFailure()
            }
        } finally {
            this.loading = false
        }
    }

    private showLoadFailure(): void {
        // The UI bundle may itself have failed. This retry control only needs builtin components.
        if (!this.retryNode) {
            const node = this.retryNode = new Node('LoadingRetry')
            node.layer = this.node.layer
            this.node.addChild(node)
            node.addComponent(UITransform).setContentSize(640, 110)
            const label = node.addComponent(Label)
            label.string = '资源加载失败，请检查网络\n【点击重试】'
            label.fontSize = 28
            label.lineHeight = 42
            label.color = new Color(40, 40, 80, 255)
            const widget = node.addComponent(Widget)
            widget.isAlignBottom = true
            widget.bottom = 230
            widget.isAlignHorizontalCenter = true
            widget.alignMode = Widget.AlignMode.ALWAYS
            widget.updateAlignment()
            node.addComponent(Button)
            node.on(Button.EventType.CLICK, this.loadResources, this)
        }
        this.retryNode.active = true
    }

    public onOpen(data?: any): void {
    }


    public onClose(data?: any): void {
        this.unscheduleAllCallbacks()
    }

    private loadBundle() {
        return Promise.all([
            ResMgr.loadBundle(Bundle.Icon),
            ResMgr.loadBundle(Bundle.Audio),
            ResMgr.loadBundle(Bundle.Game),
            ResMgr.loadBundle(Bundle.UI),
        ])
    }

    private loadRes() {
        return Promise.all([
            ResMgr.loadDir(Bundle.Icon),
            ResMgr.loadDir(Bundle.Audio),
            ResMgr.loadDir(Bundle.Game),
            ResMgr.loadDir(Bundle.UI),
        ])
    }

    protected updateProgress(): void {
        let progressAdd: number = math.randomRange(0.1, 0.3)
        this.progressBar.progress = Math.min(this.progressBar.progress + progressAdd, 0.9)

        if (this.loaded) {
            this.progressBar.progress = 1.0
            this.unschedule(this.updateProgress)
            this.onLoadCompleted()
        }
    }

    private onLoadCompleted(): void {
        const ready = () => {
            this.scheduleOnce(() => { this.close(); this.open(UI.Main) })
        }
        const result = GameSave.init()
        if (result.ok) { ready(); return }
        RecoveryMgr.show({ title: '无法加载进度', message: RecoveryMgr.message(result.reason), actions: [
            { label: '重试读取', run: () => GameSave.init(), onSuccess: ready },
            { label: '新建存档', run: () => {
                // Require a separate, explicit confirmation before replacing a damaged new-format save.
                return success()
            }, onSuccess: () => RecoveryMgr.show({ title: '新建存档', message: '将重置新版游戏进度、金币和道具，确定继续吗？', actions: [
                { label: '确定新建', run: () => GameSave.createNew(), onSuccess: ready },
                { label: '返回', run: () => success(), onSuccess: () => this.onLoadCompleted() }
            ] }) }
        ] })
    }
}
