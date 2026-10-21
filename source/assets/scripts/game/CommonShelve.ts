import { _decorator, instantiate, macro, Node, Prefab, v3, Vec3 } from 'cc';
import { GameMgr } from '../manager/GameMgr';
import { ResMgr } from '../manager/ResMgr';
import { Bundle } from '../enum/Bundle';
import { Goods } from './Goods';
import { EventMgr } from '../manager/EventMgr';
import { EventType } from '../enum/EventType';
import { ArrayUtil } from '../util/ArrayUtil';
import { ShelveBase } from '../scriptBase/ShelveBase';
import { Global } from '../Global';
const { ccclass, property } = _decorator;

@ccclass('Game/CommonShelve')
export class CommonShelve extends ShelveBase {

    @property([Node])
    private layers: Node[] = []

    public get isEmpty(): boolean {
        // Removal animations keep nodes alive after the goods have left the board.
        return this.GoodsIdArr.length === 0
    }

    //slotId goodsId
    private layer0GoodsMap: Map<number, number> = new Map<number, number>()

    protected onLoad(): void {
        super.onLoad()
        GameMgr.shelveArr.push(this)
    }

    protected start() {
        super.start()
        this.init()
        this.schedule(this.onTrySupplyGoods, 0.25, macro.REPEAT_FOREVER)
        this.schedule(this.onCheckMerge, 0.15, macro.REPEAT_FOREVER)
    }

    public init(bounceDelay: number = 0): void {
        this.createLayerGoods(0, bounceDelay)
        this.createLayerGoods(1, bounceDelay)
    }

    public createLayerGoods(layer: number, bounceDelay: number = 0): void {
        const shelveData = GameMgr.goodsData[this.id] ?? {}
        for (const slot in shelveData) {
            if (Object.prototype.hasOwnProperty.call(shelveData, slot)) {
                const goodsArr: number[] = shelveData[slot]
                if (goodsArr.length <= 0) continue
                const goodsId: number = goodsArr.shift()
                if (!Goods.isValidId(goodsId)) continue
                const goods: Goods = this.createGoods(goodsId, Number(slot), layer)
                goods?.bounce(bounceDelay)
            }
        }
    }

    //如果第一层为空，则尝试补充新物品
    protected onTrySupplyGoods(): void {
        if (GameMgr.Pause || GameMgr.IsRefreshing) return
        const layer0: Node = this.layers[0]
        const layer1: Node = this.layers[1]
        if (layer0.children.length <= 0) {
            //将第二层的物品前移至第一层
            const layer1: Node = this.layers[1]
            const layer1GoodsArr: Goods[] = layer1.getComponentsInChildren(Goods)
            for (let i = 0; i < layer1GoodsArr.length; i++) {
                const goods: Goods = layer1GoodsArr[i]
                const pos: Vec3 = goods.node.getPosition()
                goods.Layer = 0
                goods.node.setParent(layer0)
                pos.y -= Global.Goods_Offset
                goods.node.setPosition(pos)
                this.layer0GoodsMap.set(goods.Slot, goods.Id)
                goods?.bounce()
            }

            // //补充第二层的物品
            // this.createLayerGoods(1)
        }
        if (layer1.children.length <= 0) {
            this.createLayerGoods(1, 0)
        }

    }

    public getSlot(goodsPos: Vec3): number {
        const disArr: any[] = []

        const offsetX: number = 0.5 * this.uiTrans.width / 3

        const posArr: Vec3[] = [
            v3(-offsetX, 0, 0),
            v3(0, 0, 0),
            v3(offsetX, 0, 0),
        ]

        for (let i = 0; i < posArr.length; i++) {
            const pos: Vec3 = posArr[i];
            const dis: number = Vec3.distance(goodsPos, pos)
            disArr.push({
                slotId: i,
                dis: dis
            })
        }

        disArr.sort((a, b) => {
            return a.dis - b.dis
        })

        for (let i = 0; i < disArr.length; i++) {
            const data = disArr[i];
            const slotId: number = data.slotId
            if (!this.isSlotOccupied(slotId)) return slotId
        }
        return -1
    }

    public createGoods(goodsId: number, slotId: number, layer: number): Goods {
        if (!Goods.isValidId(goodsId)) return null
        const goodsPre: Prefab = ResMgr.getRes(Bundle.Game, 'Goods')
        const goodsNode: Node = instantiate(goodsPre)
        const goods: Goods = goodsNode.getComponent(Goods)
        const layerNode: Node = this.layers[layer]
        const pos: Vec3 = v3()
        pos.x = (slotId - 1) * (this.uiTrans.width - 10) / 3
        pos.y = layer * Global.Goods_Offset
        layerNode.addChild(goodsNode)
        goodsNode.setPosition(pos)
        goods.Id = goodsId
        goods.Layer = layer
        goods.Slot = slotId
        if (layer === 0) this.layer0GoodsMap.set(slotId, goodsId)
        return goods
    }

    public isSlotOccupied(slotId: number): boolean {
        return this.layer0GoodsMap.has(slotId)
    }

    public isAllSlotOccupied(): boolean {
        return this.layer0GoodsMap.size === 3
    }

    public placeGoods(goodsId: number, slotId: number): void {
        const goods: Goods = this.createGoods(goodsId, slotId, 0)
        goods?.bounce()
    }

    protected onPlaceGoods(): void {
        const layer0: Node = this.layers[0]
        const layer0GoodsArr: Goods[] = layer0.getComponentsInChildren(Goods)
        for (let i = 0; i < layer0GoodsArr.length; i++) {
            const goods: Goods = layer0GoodsArr[i]
            if (goods.Visible) continue
            goods.node.destroy()
            this.layer0GoodsMap.delete(goods.Slot)
        }
    }

    protected onCheckMerge(): void {
        if (GameMgr.Pause || GameMgr.IsRefreshing) return
        const goodsCnt: number = this.layer0GoodsMap.size
        if (goodsCnt < 3) return

        const layer0: Node = this.layers[0]
        const layer0GoodsArr: Goods[] = layer0.getComponentsInChildren(Goods)

        // A drag retains its source node until a successful drop. Never consume that source.
        if (layer0GoodsArr.length !== 3 || layer0GoodsArr.some(goods => !goods.Visible || goods.isRemoving)) return
        const isAllSame: boolean = ArrayUtil.isAllSame(layer0GoodsArr, 'Id')
        if (!isAllSame) return

        //合并第一层的物品
        for (let i = 0; i < layer0GoodsArr.length; i++) {
            const goods: Goods = layer0GoodsArr[i];
            goods.remove()
        }

        this.layer0GoodsMap.clear()

        EventMgr.emit(EventType.MergeGoods, this.node.getWorldPosition())
    }

    public get GoodsIdArr(): number[] {
        const goodsIdArr: number[] = []
        for (let i = 0; i < this.layers.length; i++) {
            const layer: Node = this.layers[i];
            const layerGoodsArr: Goods[] = layer.getComponentsInChildren(Goods)
            for (let j = 0; j < layerGoodsArr.length; j++) {
                const goods: Goods = layerGoodsArr[j];
                if (!goods.isRemoving) goodsIdArr.push(goods.Id)
            }
        }
        return goodsIdArr
    }

    public get GoodsInfo(): Object {
        const info = {}
        for (let i = 0; i < this.layers.length; i++) {
            const layer: Node = this.layers[i];
            if (!info.hasOwnProperty(i)) {
                info[i] = {}
            }
            const layerGoodsArr: Goods[] = layer.getComponentsInChildren(Goods)
            for (let j = 0; j < layerGoodsArr.length; j++) {
                const goods: Goods = layerGoodsArr[j];
                if (goods.isRemoving) continue
                const { Slot, Id } = goods
                info[i][Slot] = goods
            }
        }
        return info
    }

    public clear(): void {
        this.layer0GoodsMap.clear()
        for (let i = 0; i < this.layers.length; i++) {
            const layer: Node = this.layers[i];
            layer.destroyAllChildren()
        }
    }

    public removeGoods(goods: Goods): void {
        const { Layer, Slot } = goods
        if (Layer === 0) {
            this.layer0GoodsMap.delete(Slot)
        }
        goods.remove()
    }

}


