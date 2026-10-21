import { _decorator, Component, instantiate, isValid, Node, Prefab } from 'cc'
import { Debug } from '../util/Debug'
import { UIType } from '../enum/UIType'
import { EventMgr } from './EventMgr'
import { EventType } from '../enum/EventType'
import { ResMgr } from './ResMgr'
import { UIBase } from '../scriptBase/UIBase'
import { Bundle } from '../enum/Bundle'
import { DtoUI } from '../dto/DtoUI'
const { ccclass, property } = _decorator

const Tag: string = 'UIMgr'

@ccclass('Manager/UIMgr')
export class UIMgr extends Component {

    private static _inst: UIMgr = null
    private static _node: Node = null

    @property(Node)
    private popUpMask: Node = null

    private static _openedUI: Object = {}
    private static _popUpStack: string[] = []
    private static _toast: Node = null

    protected onLoad(): void {
        globalThis.UIMgr = UIMgr
        UIMgr._inst = this
        UIMgr._node = this.node
        UIMgr.init()
    }

    private static init(): void {
        EventMgr.on(EventType.OpenUI, this.open, this)
        EventMgr.on(EventType.CloseUI, this.close, this)
    }

    public static async open(uiName: string, data?: unknown, dtoUI?: DtoUI) {
        if (this.isOpened(uiName)) {
            Debug.Warn(Tag, `${uiName}已经打开`)
            return
        }
        let uiBundle: Bundle = dtoUI?.uiBundle ?? Bundle.UI
        let isUILoaded: boolean = ResMgr.isLoaded(uiBundle, uiName)
        if (!isUILoaded) {
            await ResMgr.loadRes(uiBundle, uiName)
        }
        let uiPrefab: Prefab = ResMgr.getRes(uiBundle, uiName)
        if (!uiPrefab) {
            Debug.Error(Tag, `${uiName}不存在`)
            return
        }

        let uiNode: Node = instantiate(uiPrefab)
        let ui: UIBase = uiNode.getComponent(UIBase)
        Debug.Log(Tag, `打开${uiName}`)

        let uiType: UIType = dtoUI?.uiType ?? ui.uiType
        let uiParent: Node = this._node.children[uiType]
        uiParent.addChild(uiNode)
        ui.onOpen(data)

        if (uiType === UIType.PopUp) {
            let idx: number = uiNode.getSiblingIndex()
            this._inst.popUpMask.active = true
            this._inst.popUpMask.setSiblingIndex(idx - 1)
            this._popUpStack.push(uiName)
        }
        if (uiType === UIType.Toast) {
            isValid(this._toast) && this._toast.destroy()
            this._toast = uiNode
        } else {
            this._openedUI[uiName] = ui
        }
    }

    public static close(uiName: string, data?: unknown): void {
        if (!this.isOpened(uiName)) return
        let ui: UIBase = this._openedUI[uiName]
        Debug.Log(Tag, `关闭${uiName}`)
        let uiType: UIType = ui.uiType
        if (uiType === UIType.PopUp) {
            let idx: number = this._popUpStack.indexOf(uiName)
            this._popUpStack.splice(idx, 1)
            if (this._popUpStack.length <= 0) {
                this._inst.popUpMask.active = false
            } else {
                let topWindowName: string = this._popUpStack[this._popUpStack.length - 1]
                let topWindow: UIBase = this._openedUI[topWindowName]
                let topWindowIdx: number = topWindow.node.getSiblingIndex()
                this._inst.popUpMask.setSiblingIndex(Math.max(0, topWindowIdx))
            }
        }
        ui.onClose(data)
        delete this._openedUI[uiName]
        ui.node.destroy()
    }

    public static get(uiName: string): UIBase {
        return this._openedUI[uiName]
    }

    public static isOpened(uiName: string): boolean {
        return this._openedUI.hasOwnProperty(uiName)
    }

}

