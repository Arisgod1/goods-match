import { sys } from 'cc'
import { Global } from '../Global'
import { EventMgr } from './EventMgr'
import { EventType } from '../enum/EventType'

export type FailureReason = 'unavailable' | 'insufficient_coins' | 'invalid_config' | 'storage_error' | 'corrupt_save'
export type ActionResult<T = void> = { ok: boolean, value?: T, reason?: FailureReason }
export function success<T = void>(value?: T): ActionResult<T> { return { ok: true, value } }
export function failure<T = void>(reason: FailureReason): ActionResult<T> { return { ok: false, reason } }
export type SaveData = {
    version: 1,
    items: { [id: number]: number },
    levels: number[],
    unlockedModes: number[],
    dailyClaimDate: string | null,
    lastPassReward: number,
    settings: { sfxEnabled: boolean, bgmEnabled: boolean, vibrateEnabled: boolean }
}

export class GameSave {
    public static readonly Key = 'hgxcds_game_v1'
    private static state: SaveData = null

    public static get Data(): SaveData {
        return this.state ? JSON.parse(JSON.stringify(this.state)) : null
    }

    private static defaults(): SaveData {
        return { version: 1, items: { ...Global.Default_Item }, levels: [0, 0, 0], unlockedModes: [0],
            dailyClaimDate: null, lastPassReward: 0,
            settings: { sfxEnabled: true, bgmEnabled: true, vibrateEnabled: true } }
    }

    private static valid(data: SaveData): boolean {
        const count = (n: number) => Number.isSafeInteger(n) && n >= 0
        const day = data?.dailyClaimDate
        const validDay = day === null || typeof day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day)
            && Number.isFinite(Date.parse(day + 'T00:00:00Z'))
            && new Date(day + 'T00:00:00Z').toISOString().slice(0, 10) === day
        return !!data && data.version === 1 && !!data.items
            && [0, 1, 2, 3, 4].every(id => count(data.items[id])) && data.items[0] <= 9999999
            && Array.isArray(data.levels) && data.levels.length === 3 && data.levels.every(count)
            && Array.isArray(data.unlockedModes) && data.unlockedModes.includes(0)
            && data.unlockedModes.every(n => Number.isInteger(n) && n >= 0 && n < 3)
            && new Set(data.unlockedModes).size === data.unlockedModes.length
            && validDay
            && count(data.lastPassReward) && data.lastPassReward % 5 === 0
            && data.lastPassReward <= data.levels.reduce((sum, level) => sum + level, 0)
            && !!data.settings && ['sfxEnabled', 'bgmEnabled', 'vibrateEnabled']
                .every(key => typeof data.settings[key] === 'boolean')
    }

    public static init(): ActionResult {
        if (this.state) return success()
        let raw: string
        try { raw = sys.localStorage.getItem(this.Key) } catch { return failure('storage_error') }
        if (raw === null) return this.createNew()
        let data: SaveData
        try { data = JSON.parse(raw) } catch { return failure('corrupt_save') }
        if (!this.valid(data)) return failure('corrupt_save')
        this.state = data
        return success()
    }

    public static createNew(): ActionResult {
        const next = this.defaults()
        try { sys.localStorage.setItem(this.Key, JSON.stringify(next)) } catch { return failure('storage_error') }
        this.state = next
        return success()
    }

    public static reset(): ActionResult {
        // Keep reset atomic: a failed write must preserve both the current save and UI state.
        return this.transact(next => {
            Object.assign(next, this.defaults())
            return success()
        })
    }

    public static transact<T>(change: (next: SaveData) => ActionResult<T>): ActionResult<T> {
        const next = this.Data
        if (!next) return failure('storage_error')
        const result = change(next)
        if (!result.ok) return result
        if (!this.valid(next)) return failure('invalid_config')
        try { sys.localStorage.setItem(this.Key, JSON.stringify(next)) } catch { return failure('storage_error') }
        const previous = this.state
        this.state = next
        if (next.items[0] !== previous.items[0]) EventMgr.emit(EventType.UpdateCoin, next.items[0], false)
        for (let id = 1; id <= 4; id++) {
            if (next.items[id] !== previous.items[id]) EventMgr.emit(EventType.UpdateSkillCnt, id - 1, next.items[id])
        }
        if (JSON.stringify(next.unlockedModes) !== JSON.stringify(previous.unlockedModes))
            EventMgr.emit(EventType.ModeUnlocked)
        return result
    }
}
