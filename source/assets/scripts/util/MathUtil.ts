import { math } from "cc"

export class MathUtil {

    public static IsInRange(v: number, min: number, max: number): boolean {
        if (v < min) return false
        if (v > max) return false
        return true
    }

    public static randWeight(weight_arr: number[]): number {
        if (!weight_arr?.length || weight_arr.some(w => !Number.isFinite(w) || w < 0)) return -1
        const total = weight_arr.reduce((sum, weight) => sum + weight, 0)
        if (!Number.isFinite(total) || total <= 0) return -1
        let remaining = math.randomRange(0, total)
        for (let i = 0; i < weight_arr.length; i++) {
            if (weight_arr[i] > 0 && remaining < weight_arr[i]) return i
            remaining -= weight_arr[i]
        }
        return -1
    }

}


