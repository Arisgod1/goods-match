import { Component, Node, find, __private, AssetManager, assetManager, Prefab, instantiate, UITransform } from "cc";
import { EDITOR } from "cc/env";
import { Debug } from "../util/Debug";

const Tag: string = 'Component'

if (!EDITOR) {

    Component.prototype.findNode = function (path: string, referenceNode?: Node): Node {
        if (!referenceNode) referenceNode = this.node
        return find(path, referenceNode)
    }

    Component.prototype.findComp = function <T extends Component>(path: string, comp: __private.__types_globals__Constructor<T> | __private.__types_globals__AbstractedConstructor<T>, referenceNode?: Node): T {
        if (!referenceNode) referenceNode = this.node
        const n: Node = find(path, referenceNode)
        return n?.getComponent(comp)
    }

    Component.prototype.instantiate = async function (bundleName: string, path: string, parent?: Node): Promise<Node> {
        return new Promise<Node>((resolve, reject) => {
            if (!parent) parent = this.node
            const bundle: AssetManager.Bundle = assetManager.getBundle(bundleName)
            if (!bundle) {
                Debug.Warn(Tag, `bundle ${bundleName} not exist or loaded`)
                reject()
                return
            }
            const startTime: number = Date.now()
            const prefab: Prefab = bundle.get(path, Prefab)
            let node: Node = null
            if (prefab) {
                node = instantiate(prefab)
                parent.addChild(node)
                Debug.Log(Tag, `prefab ${path} instantiate success, cost ${Date.now() - startTime} ms`)
                resolve(node)
            } else {
                bundle.load(path, Prefab, (err, prefab) => {
                    if (err) {
                        reject()
                    } else {
                        if (!this.isValid) return
                        node = instantiate(prefab)
                        parent.addChild(node)
                        Debug.Log(Tag, `prefab ${path} instantiate success, cost ${Date.now() - startTime} ms`)
                        resolve(node)
                    }
                })
            }
        })
    }

    Object.defineProperty(Component.prototype, 'uiTrans', {
        get: function () {
            return this.node.getComponent(UITransform)
        }
    })
}