import { UITransform, Node } from "cc";
import { EDITOR } from "cc/env";

if (!EDITOR) {

    Object.defineProperty(Node.prototype, 'uiTrans', {
        get: function () {
            return this.getComponent(UITransform)
        }
    })

}