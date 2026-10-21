import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
import { EventType } from '../enum/EventType';
import { EventMgr } from '../manager/EventMgr';
import { Goods } from '../game/Goods';
const { ccclass, property } = _decorator;

@ccclass('ScriptBase/ShelveBase')
export class ShelveBase extends Component {

    protected id: number = 0
    public get Id(): number {
        return this.id
    }

    protected onLoad(): void {
        this.id = this.node.getSiblingIndex()
        EventMgr.on(EventType.PlaceGoods, this.onPlaceGoods, this)
    }

    protected start(): void {

    }

    protected onDestroy(): void {
        this.unscheduleAllCallbacks()
        EventMgr.off(EventType.PlaceGoods, this.onPlaceGoods, this)
    }

    public init(bounceDelay: number = 0): void {

    }

    public getSlot(pos: Vec3): number {
        return 0
    }

    protected onPlaceGoods(): void {
    }

    public isSlotOccupied(slotId: number): boolean {
        return false
    }

    public isAllSlotOccupied(): boolean {
        return false
    }

    public get isEmpty(): boolean {
        return false
    }

    public createGoods(goodsId: number, slotId: number, layer: number): void {

    }

    public placeGoods(goodsId: number, slotId: number): void {

    }

    public createLayerGoods(layer: number, bounceDelay: number = 0): void {
    }

    public removeGoods(goods: Goods): void {

    }

    public clear(): void {

    }

    public get GoodsIdArr(): number[] {
        return []
    }


    public get GoodsInfo(): Object {
        return null
    }


}


