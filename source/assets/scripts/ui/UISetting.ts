import { Widget, _decorator, Node, Label } from 'cc';
import { UIBase } from '../scriptBase/UIBase';
import { Switcher } from '../uiExtend/Switcher';
import { Setting } from '../Setting';
import { RecoveryMgr } from '../manager/RecoveryMgr';
import { failure } from '../manager/GameSave';
import { AudioMgr } from '../manager/AudioMgr';
import { UI } from '../enum/UI';
import { Bundle } from '../enum/Bundle';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('UI/UISetting')
@requireComponent(Widget)
export class UISetting extends UIBase {

    private swBgm: Switcher = null
    private swSfx: Switcher = null

    protected onLoad(): void {
        this.swBgm = this.findComp('SwBgm', Switcher)
        this.swSfx = this.findComp('SwSfx', Switcher)
    }

    public onOpen(data?: any): void {
        this.swBgm.IsOn = Setting.BgmEnabled
        this.swSfx.IsOn = Setting.SfxEnabled
    }

    public onClose(data?: any): void {

    }

    protected onBtnCloseClick(): void {
        this.close()
    }

    private changeSetting(key: 'bgmEnabled' | 'sfxEnabled'): void {
        const value = key === 'bgmEnabled' ? !Setting.BgmEnabled : !Setting.SfxEnabled
        const commit = () => this.isValid ? Setting.set(key, value) : failure('unavailable')
        const done = () => {
            this.swBgm.IsOn = Setting.BgmEnabled
            this.swSfx.IsOn = Setting.SfxEnabled
            if (key === 'bgmEnabled') {
                if (Setting.BgmEnabled) AudioMgr.playBgm()
                else AudioMgr.stopBgm()
            }
        }
        const result = commit()
        if (result.ok) done()
        else {
            this.swBgm.IsOn = Setting.BgmEnabled
            this.swSfx.IsOn = Setting.SfxEnabled
            RecoveryMgr.retry(commit, done)
        }
    }
    protected onSwBgmClick(): void { this.changeSetting('bgmEnabled') }
    protected onSwSfxClick(): void { this.changeSetting('sfxEnabled') }
}
