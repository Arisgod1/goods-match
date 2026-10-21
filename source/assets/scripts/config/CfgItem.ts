import { DtoItem } from "../dto/DtoItem";
import { Bundle } from "../enum/Bundle";
import { ItemType } from "../enum/ItemType";
import { SkillType } from "../enum/SkillType";

export const CfgItem: DtoItem[] = [
    {
        id: 0,
        name: '星星币',
        type: ItemType.Coin,
        bundle: Bundle.Icon,
        icon: 'item/icon_xxb'
    },
    {
        id: 1,
        name: '冰冻道具',
        type: ItemType.Skill,
        skillType: SkillType.FreezeTime,
        bundle: Bundle.Icon,
        icon: 'item/icon_bd'
    },
    {
        id: 2,
        name: '灯泡道具',
        type: ItemType.Skill,
        skillType: SkillType.EraseGroup,
        bundle: Bundle.Icon,
        icon: 'item/icon_dp'
    },
    {
        id: 3,
        name: '转换道具',
        type: ItemType.Skill,
        skillType: SkillType.RefreshPosition,
        bundle: Bundle.Icon,
        icon: 'item/icon_sx'
    },
    {
        id: 4,
        name: '星星道具',
        type: ItemType.Skill,
        skillType: SkillType.DoubleCoin,
        bundle: Bundle.Icon,
        icon: 'item/icon_xxx2'
    }
]

