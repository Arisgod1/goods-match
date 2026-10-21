import { CfgLoginReward } from '../config/CfgLoginReward'
import { CfgLuckySpin } from '../config/CfgLuckySpin'
import { CfgPassReward } from '../config/cfg_passReward'
import { DtoReward } from '../dto/DtoReward'
import { Global } from '../Global'
import { MathUtil } from '../util/MathUtil'
import { GameSave, ActionResult, failure, success } from './GameSave'
import { ItemMgr } from './ItemMgr'

export type WinReward = { slotIndex: number, multiplier: number, amount: number }
export class RewardMgr {
    private static day(now: number): string {
        const date = new Date(now)
        return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    }
    public static canClaimDaily(now: number = Date.now()): boolean {
        return !!GameSave.Data && GameSave.Data.dailyClaimDate !== this.day(now)
    }
    public static claimDaily(now: number = Date.now()): ActionResult<DtoReward[]> {
        const day = this.day(now)
        const rewards = CfgLoginReward.map(({ itemId, cnt }) => ({ itemId, cnt }))
        return GameSave.transact(next => {
            if (next.dailyClaimDate === day) return failure('unavailable')
            const applied = ItemMgr.applyTo(next, rewards)
            if (!applied.ok) return failure(applied.reason)
            next.dailyClaimDate = day
            return success(rewards)
        })
    }
    public static get NextPassTarget(): number { return (GameSave.Data?.lastPassReward ?? 0) + 5 }
    public static claimPassReward(): ActionResult<DtoReward[]> {
        const idx = MathUtil.randWeight(CfgPassReward.map(r => r.weight))
        const reward = CfgPassReward[idx]
        if (!reward) return failure('invalid_config')
        const rewards = [{ itemId: reward.itemId, cnt: reward.cnt }]
        return GameSave.transact(next => {
            const target = next.lastPassReward + 5
            if (next.levels.reduce((a, b) => a + b, 0) < target) return failure('unavailable')
            const applied = ItemMgr.applyTo(next, rewards)
            if (!applied.ok) return failure(applied.reason)
            next.lastPassReward = target
            return success(rewards)
        })
    }
    public static claimSpinReward(index: number): ActionResult<DtoReward[]> {
        const reward = CfgLuckySpin[index]
        if (!Number.isInteger(index) || !reward) return failure('invalid_config')
        const rewards = [{ itemId: reward.itemId, cnt: reward.cnt }]
        const result = ItemMgr.tryApplyRewards(rewards, Global.Lucky_Spin_Coin_Cost)
        return result.ok ? success(rewards) : failure(result.reason)
    }
    public static rollWinReward(levelIndex: number): WinReward {
        const slotIndex = MathUtil.randWeight([5, 1, 1, 1, 1])
        if (slotIndex < 0) return null
        const multiplier = [2, 3, 5, 3, 4][slotIndex]
        const base = Global.Normal_Level_Coin_Default_Cnt + levelIndex * Global.Normal_Level_Coin_Add_Cnt
        return { slotIndex, multiplier, amount: base * multiplier }
    }
}
