import { _decorator, AudioClip, AudioSource, Component, Game, game } from 'cc'
import { Debug } from '../util/Debug'
import { ResMgr } from './ResMgr'
import { Setting } from '../Setting'
const { ccclass, property, requireComponent } = _decorator

const Tag: string = 'AudioMgr'

//需要手动拖放到场景中
@ccclass('Manager/AudioMgr')
@requireComponent(AudioSource)
export class AudioMgr extends Component {

    private static audio: AudioSource
    public static get Audio(): AudioSource {
        return this.audio
    }

    private static curBgm: string = null
    public static get CurBgm(): string {
        return this.curBgm
    }

    public static bundleName: string = 'audio'

    protected onLoad(): void {
        globalThis.AudioMgr = AudioMgr
        AudioMgr.audio = this.getComponent(AudioSource)
        game.on(Game.EVENT_HIDE, this.onHide, this)
        game.on(Game.EVENT_SHOW, this.onShow, this)
    }

    protected onHide(): void {
        AudioMgr.pauseBgm()
        Debug.Log(Tag, '进入后台')
    }

    protected onShow(): void {
        AudioMgr.resumeBgm()
        Debug.Log(Tag, '回到前台')
    }

    public static playBgm(bgm?: string, volume: number = 1, loop: boolean = true): void {
        if (bgm) this.curBgm = bgm
        if (!Setting.BgmEnabled) return
        let clip: AudioClip = ResMgr.getRes(this.bundleName, this.curBgm)
        if (!clip) return
        this.audio.stop()
        this.audio.clip = clip
        this.audio.loop = loop
        this.audio.volume = volume
        this.audio.play()
    }

    public static pauseBgm(): void {
        Setting.BgmEnabled && this.audio.pause()
    }

    public static resumeBgm(): void {
        Setting.BgmEnabled && this.audio.play()
    }

    public static stopBgm(): void {
        this.audio.stop()
        this.audio.clip = null
    }

    public static playSfx(sfxName: string, volumeScale: number = 1): void {
        if (!Setting.SfxEnabled) return
        let clip: AudioClip = ResMgr.getRes<AudioClip>(this.bundleName, sfxName)
        if (!clip) return
        this.audio.playOneShot(clip, volumeScale)
    }

}


