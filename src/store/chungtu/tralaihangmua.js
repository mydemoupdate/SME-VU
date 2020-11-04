import Documents from '@/firestore/documents'
import { SUCCESS, WARNING, PUSH_TOAST } from '@/core/services/store/toasts.module'
import { PUSH_ERROR } from "@/core/services/store/errors.module"

export const DOCUMENT = Documents.chungtu.tralaihangmua
const DOCUMENT_HT_TIEN_HANG = Documents.hachtoan.tralaihangmua
const DOCUMENT_HT_THUE_GTGT = Documents.hachtoan.tralaithuegtgt

export default {
    state: {},
    actions: {
        ['chungtu.tralaihangmua.hachtoan.tienhang.create']: ((context, payload) => {
            try {
                return DOCUMENT_HT_TIEN_HANG.create(payload).then((hachtoan) => {
                    const data = {
                        hachtoantienhang: [
                            ...context.getters['chungtu.tralaihangmua.selected'].hachtoantienhang,
                            DOCUMENT_HT_TIEN_HANG.collection.doc(hachtoan.id),
                        ]
                    }
                    context.dispatch('chungtu.tralaihangmua.update', data)
                    context.dispatch(PUSH_TOAST, {
                        message: 'Đã tạo',
                        type: SUCCESS
                    })
                }).catch((error) => {
                    context.dispatch(PUSH_ERROR, { error })
                })
            } catch (error) {
                context.dispatch(PUSH_ERROR, { error });
            }
        }),
        ['chungtu.tralaihangmua.hachtoan.tienhang.update']: ((context, data) => {
            try {
                return DOCUMENT_HT_TIEN_HANG.update(data.id, data).then(() => {
                    context.dispatch('chungtu.tralaihangmua.selected.refresh')
                    context.dispatch(PUSH_TOAST, {
                        message: 'Đã lưu',
                        type: SUCCESS
                    })
                }).catch((error) => {
                    context.dispatch(PUSH_ERROR, { error })
                })
            } catch (error) {
                context.dispatch(PUSH_ERROR, { error });
            }
        }),
        ['chungtu.tralaihangmua.hachtoan.tienhang.delete']: ((context, id) => {
            try {
                const data = {
                    hachtoantienhang: [
                        ...context.getters['chungtu.tralaihangmua.selected'].hachtoantienhang.filter(i => i.id != id),
                    ]
                }
                context.dispatch('chungtu.tralaihangmua.update', data)
                return DOCUMENT_HT_TIEN_HANG.destroy(id).then(() => {
                    context.dispatch(PUSH_TOAST, {
                        message: 'Đã xóa',
                        type: WARNING
                    })
                })
            } catch (error) {
                context.dispatch(PUSH_ERROR, { error });
            }
        }),

        ['chungtu.tralaihangmua.hachtoan.thuegtgt.create']: ((context, payload) => {
            try {
                return DOCUMENT_HT_THUE_GTGT.create(payload).then((hachtoan) => {
                    const data = {
                        hachtoanthuegtgt: [
                            ...context.getters['chungtu.tralaihangmua.selected'].hachtoanthuegtgt,
                            DOCUMENT_HT_THUE_GTGT.collection.doc(hachtoan.id),
                        ]
                    }
                    context.dispatch('chungtu.tralaihangmua.update', data)
                    context.dispatch(PUSH_TOAST, {
                        message: 'Đã tạo',
                        type: SUCCESS
                    })
                }).catch((error) => {
                    context.dispatch(PUSH_ERROR, { error })
                })
            } catch (error) {
                context.dispatch(PUSH_ERROR, { error });
            }
        }),
        ['chungtu.tralaihangmua.hachtoan.thuegtgt.update']: ((context, data) => {
            try {
                return DOCUMENT_HT_THUE_GTGT.update(data.id, data).then(() => {
                    context.dispatch('chungtu.tralaihangmua.selected.refresh')
                    context.dispatch(PUSH_TOAST, {
                        message: 'Đã lưu',
                        type: SUCCESS
                    })
                }).catch((error) => {
                    context.dispatch(PUSH_ERROR, { error })
                })
            } catch (error) {
                context.dispatch(PUSH_ERROR, { error });
            }
        }),
        ['chungtu.tralaihangmua.hachtoan.thuegtgt.delete']: ((context, id) => {
            try {
                const data = {
                    hachtoanthuegtgt: [
                        ...context.getters['chungtu.tralaihangmua.selected'].hachtoanthuegtgt.filter(i => i.id != id),
                    ]
                }
                context.dispatch('chungtu.tralaihangmua.update', data)
                return DOCUMENT_HT_THUE_GTGT.destroy(id).then(() => {
                    context.dispatch(PUSH_TOAST, {
                        message: 'Đã xóa',
                        type: WARNING
                    })
                })
            } catch (error) {
                context.dispatch(PUSH_ERROR, { error });
            }
        }),
    },
    mutations: {},
    getters: {},
};
