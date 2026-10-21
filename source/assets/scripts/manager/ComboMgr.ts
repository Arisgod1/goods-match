import { math } from "cc"
import { Global } from "../Global"
import { TimeMgr } from "./TimeMgr"

export class ComboMgr {

    private static curCombo: number = 0
    public static get CurCombo(): number {
        return this.curCombo
    }
    public static set CurCombo(v: number) {
        this.curCombo = math.clamp(v, 0, Global.Max_Combo)
        TimeMgr.delay()
    }

}


