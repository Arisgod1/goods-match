import { Bundle } from "../enum/Bundle"
import { ItemType } from "../enum/ItemType"
import { SkillType } from "../enum/SkillType"

export type DtoItem = {
    id: number,
    name: string,
    type: ItemType,
    skillType?: SkillType,
    bundle: Bundle,
    icon: string
}

