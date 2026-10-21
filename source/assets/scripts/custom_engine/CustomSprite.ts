import { Sprite, AssetManager, assetManager, SpriteFrame } from "cc";
import { EDITOR } from "cc/env";
import { Debug } from "../util/Debug";

const Tag: string = 'Sprite'

if (!EDITOR) {

    Sprite.prototype.loadSpriteFrame = function (bundleName: string, path: string): void {
        const bundle: AssetManager.Bundle = assetManager.getBundle(bundleName)
        if (!bundle) {
            Debug.Warn(Tag, `bundle ${bundleName} not exist or loaded`)
            return
        }
        const spfPath: string = path + '/spriteFrame'
        let spf: SpriteFrame = bundle.get(spfPath, SpriteFrame)
        if (spf) {
            if (!this.isValid) return
            this.spriteFrame = spf
        } else {
            bundle.load(spfPath, SpriteFrame, (err, res) => {
                if (err) {
                    Debug.Error(Tag, err.message)
                } else {
                    if (!this.isValid) return
                    this.spriteFrame = res
                }
            })
        }
    }
    
}