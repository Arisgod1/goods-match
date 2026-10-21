import { GameSave, ActionResult, success } from './manager/GameSave'
export class Setting {
    public static get VibrateEnabled(): boolean { return GameSave.Data?.settings.vibrateEnabled ?? true }
    public static get SfxEnabled(): boolean { return GameSave.Data?.settings.sfxEnabled ?? true }
    public static get BgmEnabled(): boolean { return GameSave.Data?.settings.bgmEnabled ?? true }
    public static set(key: 'sfxEnabled' | 'bgmEnabled' | 'vibrateEnabled', value: boolean): ActionResult {
        return GameSave.transact(next => { next.settings[key] = value; return success() })
    }
}
