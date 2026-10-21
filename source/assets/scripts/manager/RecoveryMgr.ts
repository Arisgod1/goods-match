import { EventMgr } from './EventMgr'
import { EventType } from '../enum/EventType'
import { UI } from '../enum/UI'
import { ActionResult, FailureReason, success } from './GameSave'

export type RecoveryAction = { label: string, run: () => ActionResult<any>, onSuccess?: (value: any) => void }
export type RecoveryOptions = { title: string, message: string, actions: RecoveryAction[] }
export class RecoveryMgr {
    public static message(reason: FailureReason): string {
        return { storage_error: '无法保存进度，请重试。', corrupt_save: '存档无法读取，可重试或新建存档。',
            insufficient_coins: '星星币不足，消除商品或通关可获得。', invalid_config: '当前配置异常，请返回后重试。',
            unavailable: '当前无法执行此操作。' }[reason] ?? '操作未完成，请重试。'
    }
    public static show(options: RecoveryOptions): void { EventMgr.emit(EventType.OpenUI, UI.Recovery, options) }
    public static retry<T>(retry: () => ActionResult<T>, onSuccess: (value: T) => void,
        message: string = '无法保存进度，请重试。'): void {
        this.show({ title: '操作未完成', message, actions: [
            { label: '重试保存', run: retry, onSuccess },
            { label: '返回', run: () => success() }
        ] })
    }
}
