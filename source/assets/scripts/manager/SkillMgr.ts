import { CfgItem } from '../config/CfgItem'
import { SkillType } from '../enum/SkillType'
import { ItemMgr } from './ItemMgr'
import { EventMgr } from './EventMgr'
import { EventType } from '../enum/EventType'

export class SkillMgr {
    public static getSkillId(skill: SkillType): number {
        return CfgItem.find(item => item.skillType === skill)?.id ?? -1
    }
    public static skillCnt(skill: SkillType): number { return ItemMgr.getCnt(this.getSkillId(skill)) }
    public static hasSkill(skill: SkillType): boolean { return this.skillCnt(skill) > 0 }
    public static animateAdded(skill: SkillType): void { EventMgr.emit(EventType.AddSkill, skill) }
}
