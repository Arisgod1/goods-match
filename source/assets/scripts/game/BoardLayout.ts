import { Node, UITransform, v3 } from 'cc';

export interface BoardArea { left: number; right: number; bottom: number; top: number }

// Below this height fixed-size HUD regions consume the entire play area.
export function needsPortraitFrame(width: number, height: number): boolean {
    return width > 0 && height > 0 && height / width * 720 < 960
}

/** All values use Stage local design coordinates. Never enlarge the board. */
export function fitBoard(width: number, height: number, area: BoardArea, preferredY = 100) {
    const availableWidth = Math.max(0, area.right - area.left)
    const availableHeight = Math.max(0, area.top - area.bottom)
    const scale = width > 0 && height > 0 ? Math.min(1, availableWidth / width, availableHeight / height) : 0
    const halfHeight = height * scale / 2
    return { scale, x: (area.left + area.right) / 2,
        y: Math.max(area.bottom + halfHeight, Math.min(preferredY, area.top - halfHeight)) }
}

/** Includes inactive HUD elements so counters/combos appearing cannot move the board.
 * Peak scales reserve space for animations even while those animations are at rest. */
export function boundsInSpace(root: Node, space: UITransform, peaks = new Map<Node, number>()): BoardArea {
    const bounds = { left: Infinity, right: -Infinity, bottom: Infinity, top: -Infinity }
    const visit = (node: Node) => {
        const transform = node.getComponent(UITransform)
        if (transform) {
            for (const x of [-transform.width * transform.anchorX, transform.width * (1 - transform.anchorX)]) {
                for (const y of [-transform.height * transform.anchorY, transform.height * (1 - transform.anchorY)]) {
                    const point = transform.convertToWorldSpaceAR(v3(x, y, 0))
                    // Compensate current animated scale, including descendants of buttons.
                    for (let parent: Node = node; parent; parent = parent.parent) {
                        const peak = peaks.get(parent)
                        if (peak) {
                            const origin = parent.worldPosition
                            const sx = peak / Math.max(Math.abs(parent.scale.x), 0.001)
                            const sy = peak / Math.max(Math.abs(parent.scale.y), 0.001)
                            point.x = origin.x + (point.x - origin.x) * sx
                            point.y = origin.y + (point.y - origin.y) * sy
                        }
                        if (parent === root) break
                    }
                    const local = space.convertToNodeSpaceAR(point)
                    bounds.left = Math.min(bounds.left, local.x)
                    bounds.right = Math.max(bounds.right, local.x)
                    bounds.bottom = Math.min(bounds.bottom, local.y)
                    bounds.top = Math.max(bounds.top, local.y)
                }
            }
        }
        for (const child of node.children) visit(child)
    }
    visit(root)
    return bounds
}
