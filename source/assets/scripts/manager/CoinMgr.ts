import { ItemMgr } from './ItemMgr'
export class CoinMgr {
    public static get CurCoin(): number { return ItemMgr.getCnt(0) }
}
