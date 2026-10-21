export class ObjUtil {

    public static has(obj: Object, key: string | number): boolean {
        if (!obj) return false
        return obj.hasOwnProperty(key)
    }

    public static get(obj: Object, key: string | number, defaultValue: any): any {
        if (!obj) return defaultValue
        if (!obj.hasOwnProperty(key)) return defaultValue
        return obj[key]
    }

}


