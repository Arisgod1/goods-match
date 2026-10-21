import { PREVIEW } from "cc/env"

export class Global {

    public static readonly Version: string = '1.0.0'

    public static readonly Default_Item = { 0: 0, 1: 3, 2: 3, 3: 3, 4: 3 }

    public static readonly Goods_Offset: number = 15

    public static readonly Normal_Level_Coin_Default_Cnt: number = 100
    public static readonly Normal_Level_Coin_Add_Cnt: number = 10

    public static Level_Time: number = 0
    public static readonly Freeze_Time: number = 20
    public static readonly Revive_Add_Time: number = 60

    public static readonly Time_Out_Alert_Time: number = 5

    public static readonly Max_Combo: number = 8

    public static readonly Double_Coin_Duration: number = 30

    public static readonly Lucky_Spin_Coin_Cost: number = 400
}

if (PREVIEW) {
    globalThis.Global = Global
}