import { CfgItem } from '../config/CfgItem'
import { DtoReward } from '../dto/DtoReward'
import { ItemType } from '../enum/ItemType'
import { GameSave, SaveData, ActionResult, success, failure } from './GameSave'

export class ItemMgr {
    public static getCnt(id: number): number { return GameSave.Data?.items[id] ?? 0 }
    public static getType(id: number): ItemType { return CfgItem[id]?.type }

    /** Only mutate a transaction draft; the caller commits inventory and source markers together. */
    public static applyTo(next: SaveData, rewards: ReadonlyArray<DtoReward>, coinCost: number = 0): ActionResult {
        if (!Number.isSafeInteger(coinCost) || coinCost < 0 || !rewards.length
            || rewards.some(r => !Number.isInteger(r.itemId) || !CfgItem[r.itemId]
                || !Number.isSafeInteger(r.cnt) || r.cnt <= 0)) return failure('invalid_config')
        if (next.items[0] < coinCost) return failure('insufficient_coins')
        next.items[0] -= coinCost
        for (const reward of rewards) next.items[reward.itemId] += reward.cnt
        next.items[0] = Math.min(9999999, next.items[0])
        return success()
    }

    public static tryApplyRewards(rewards: ReadonlyArray<DtoReward>, coinCost: number = 0): ActionResult {
        return GameSave.transact(next => this.applyTo(next, rewards, coinCost))
    }
}
