import { ArrayUtil } from '../util/ArrayUtil'
export type GoodsData = { [shelf: number]: { [slot: number]: number[] } }
export type LayoutShelf = { id: number, small: boolean }
export function validGoodsId(id: number, maxId: number): boolean {
    return Number.isInteger(id) && id > 0 && id <= maxId
}
export function goodsCounts(ids: number[], maxId: number): string {
    const counts: { [id: number]: number } = {}
    ids.filter(id => validGoodsId(id, maxId)).forEach(id => { counts[id] = (counts[id] ?? 0) + 1 })
    return JSON.stringify(Object.keys(counts).sort((a, b) => Number(a) - Number(b)).map(id => [Number(id), counts[id]]))
}
export function distributeGoods(shelves: LayoutShelf[], ids: number[], maxId: number): GoodsData {
    if (!Number.isInteger(maxId) || maxId <= 0 || new Set(shelves.map(s => s.id)).size !== shelves.length) return null
    const remaining = ids.filter(id => validGoodsId(id, maxId))
    ArrayUtil.shuffle(remaining)
    const data: GoodsData = {}
    for (const shelf of shelves) data[shelf.id] = shelf.small ? { 0: [] } : { 0: [], 1: [], 2: [] }
    for (const shelf of shelves.filter(s => s.small)) {
        for (let i = 0; i < 3; i++) data[shelf.id][0].push(remaining.shift() ?? -1)
    }
    const slots: { shelf: number, slot: number }[] = []
    for (const shelf of shelves.filter(s => !s.small)) {
        for (let slot = 0; slot < 3; slot++) slots.push({ shelf: shelf.id, slot })
    }
    if (remaining.length && !slots.length) return null
    while (remaining.length) {
        const before = remaining.length
        const order = slots.map((_, i) => i)
        ArrayUtil.shuffle(order)
        const empty = slots.length <= 6 ? 2 : 4 + Math.floor(Math.random() * 2)
        const chosen = new Set(order.slice(0, Math.max(1, slots.length - empty)))
        slots.forEach((place, i) => data[place.shelf][place.slot].push(chosen.has(i) ? remaining.shift() ?? -1 : -1))
        if (before === remaining.length) return null
    }
    const allocated: number[] = []
    Object.values(data).forEach(s => Object.values(s).forEach(q => allocated.push(...q)))
    return goodsCounts(ids, maxId) === goodsCounts(allocated, maxId) ? data : null
}
