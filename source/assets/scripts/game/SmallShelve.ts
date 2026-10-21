import { _decorator, Component, instantiate, Label, macro, Node, Prefab, ProgressBar, v3, Vec3 } from 'cc';
import { Bundle } from '../enum/Bundle';
import { ResMgr } from '../manager/ResMgr';
import { Goods } from './Goods';
import { GameMgr } from '../manager/GameMgr';
import { ShelveBase } from '../scriptBase/ShelveBase';
import { Global } from '../Global';
const { ccclass, property } = _decorator;

@ccclass('Game/SmallShelve')
export class SmallShelve extends ShelveBase {

    @property(ProgressBar)
    private progressBar: ProgressBar = null
    @property([Node])
    private layers: Node[] = []

    public get isEmpty(): boolean {
        // Removal animations keep nodes alive after the goods have left the board.
        return this.GoodsIdArr.length === 0
    }

    //layer goodsId
    private layerGoodsMap: Map<number, number> = new Map<number, number>()

    protected onLoad(): void {
        super.onLoad()
        GameMgr.shelveArr.push(this)
        globalThis.smallShelve = this
    }

    protected start(): void {
        super.start()
        this.init()
        this.schedule(this.onTrySupplyGoods, 0.25, macro.REPEAT_FOREVER)
    }

    public init(bounceDelay: number = 0): void {
        this.createLayerGoods(0, bounceDelay)
        this.createLayerGoods(1, bounceDelay)
        this.createLayerGoods(2, bounceDelay)
    }

    protected onTrySupplyGoods(): void {
        if (GameMgr.Pause || GameMgr.IsRefreshing) return
        for (let i = 0; i < 3; i++) {
            const layerGoods: Goods = this.layers[i].getComponentInChildren(Goods)
            if (layerGoods) continue
            if (i === 2) continue
            const nextLayer: number = i + 1
            const nextLayerGoods: Goods = this.layers[nextLayer].getComponentInChildren(Goods)
            if (!nextLayerGoods) continue
            const nextLayerGoodsPos: Vec3 = nextLayerGoods.node.getPosition()
            nextLayerGoods.Layer = i
            nextLayerGoods.node.setParent(this.layers[i])
            nextLayerGoodsPos.y -= Global.Goods_Offset
            nextLayerGoods.node.setPosition(nextLayerGoodsPos)
            this.layerGoodsMap.delete(nextLayer)
            this.layerGoodsMap.set(i, nextLayerGoods.Id)
            nextLayerGoods.bounce()
        }
        this.progressBar.progress = this.layerGoodsMap.size / 3
    }

    public createGoods(goodsId: number, slotId: number, layer: number): Goods {
        if (!Goods.isValidId(goodsId)) return null
        const goodsPre: Prefab = ResMgr.getRes(Bundle.Game, 'Goods')
        const goodsNode: Node = instantiate(goodsPre)
        const goods: Goods = goodsNode.getComponent(Goods)
        const layerNode: Node = this.layers[layer]
        const pos: Vec3 = v3()
        pos.y = layer * Global.Goods_Offset
        layerNode.addChild(goodsNode)
        goodsNode.setPosition(pos)
        goods.Id = goodsId
        goods.Layer = layer
        goods.Slot = slotId
        this.layerGoodsMap.set(layer, goodsId)
        return goods
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

    public placeGoods(goodsId: number, slotId: number): void {
        this.layerGoodsMap.clear()

        const layerGoodsArr: Goods[] = []

        for (let i = 0; i < 2; i++) {
            const layer: Node = this.layers[i]
            const layerGoods: Goods = layer.getComponentInChildren(Goods)
            if (!layerGoods) break
            layerGoodsArr.push(layerGoods)
        }

        for (let i = 0; i < layerGoodsArr.length; i++) {
            const layerGoods: Goods = layerGoodsArr[i]
            const layerGoodsPos: Vec3 = layerGoods.node.getPosition()
            const nextlayer: number = i + 1
            layerGoods.Layer = nextlayer
            layerGoods.node.setParent(this.layers[nextlayer])
            layerGoodsPos.y += Global.Goods_Offset
            layerGoods.node.setPosition(layerGoodsPos)
            this.layerGoodsMap.set(nextlayer, layerGoods.Id)
        }
        const goods: Goods = this.createGoods(goodsId, 0, 0)
        goods?.bounce()
    }

    protected onPlaceGoods(): void {
        const layer0: Node = this.layers[0]
        const layer0Goods: Goods = layer0.getComponentInChildren(Goods)
        if (!layer0Goods || layer0Goods.Visible) return
        layer0Goods.node.destroy()
        this.layerGoodsMap.delete(0)
    }

    public isSlotOccupied(slot?: number): boolean {
        const layer0Goods: Goods = this.layers[0].getComponentInChildren(Goods)
        if (layer0Goods && layer0Goods.Visible === false) return true
        return this.layerGoodsMap.size >= 3
    }

    public isAllSlotOccupied(): boolean {
        return this.layerGoodsMap.size === 3
    }

    public getSlot(pos: Vec3): number {
        return 0
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
        this.layerGoodsMap.clear()
        for (let i = 0; i < this.layers.length; i++) {
            const layer: Node = this.layers[i];
            layer.destroyAllChildren()
        }
    }

    public removeGoods(goods: Goods): void {
        this.layerGoodsMap.delete(goods.Layer)
        goods.remove()
    }
}


