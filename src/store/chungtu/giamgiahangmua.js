import Documents from '@/firestore/documents'
import { SUCCESS, WARNING, PUSH_TOAST } from '@/core/services/store/toasts.module'
import { PUSH_ERROR } from "@/core/services/store/errors.module"

export const DOCUMENT = Documents.chungtu.giamgiahangmua
const DOCUMENT_HT_TIEN_HANG = Documents.hachtoan.giamgiahangmua
const DOCUMENT_HT_THUE_GTGT = Documents.hachtoan.giamgiathuegtgt

export default {
    state: {},
    actions: {
        ['chungtu.giamgiahangmua.hachtoan.tienhang.create']: ((context, payload) => {
            try {
                return DOCUMENT_HT_TIEN_HANG.create(payload).then((hachtoan) => {
                    const data = {
                        hachtoantienhang: [
                            ...context.getters['chungtu.giamgiahangmua.selected'].hachtoantienhang,
                            DOCUMENT_HT_TIEN_HANG.collection.doc(hachtoan.id),
                        ]
                    }
                    context.dispatch('chungtu.giamgiahangmua.update', data)
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
        ['chungtu.giamgiahangmua.hachtoan.tienhang.update']: ((context, data) => {
            try {
                return DOCUMENT_HT_TIEN_HANG.update(data.id, data).then(() => {
                    context.dispatch('chungtu.giamgiahangmua.selected.refresh')
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
        ['chungtu.giamgiahangmua.hachtoan.tienhang.delete']: ((context, id) => {
            try {
                const data = {
                    hachtoantienhang: [
                        ...context.getters['chungtu.giamgiahangmua.selected'].hachtoantienhang.filter(i => i.id != id),
                    ]
                }
                context.dispatch('chungtu.giamgiahangmua.update', data)
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

        ['chungtu.giamgiahangmua.hachtoan.thuegtgt.create']: ((context, payload) => {
            try {
                return DOCUMENT_HT_THUE_GTGT.create(payload).then((hachtoan) => {
                    const data = {
                        hachtoanthuegtgt: [
                            ...context.getters['chungtu.giamgiahangmua.selected'].hachtoanthuegtgt,
                            DOCUMENT_HT_THUE_GTGT.collection.doc(hachtoan.id),
                        ]
                    }
                    context.dispatch('chungtu.giamgiahangmua.update', data)
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
        ['chungtu.giamgiahangmua.hachtoan.thuegtgt.update']: ((context, data) => {
            try {
                return DOCUMENT_HT_THUE_GTGT.update(data.id, data).then(() => {
                    context.dispatch('chungtu.giamgiahangmua.selected.refresh')
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
        ['chungtu.giamgiahangmua.hachtoan.thuegtgt.delete']: ((context, id) => {
            try {
                const data = {
                    hachtoanthuegtgt: [
                        ...context.getters['chungtu.giamgiahangmua.selected'].hachtoanthuegtgt.filter(i => i.id != id),
                    ]
                }
                context.dispatch('chungtu.giamgiahangmua.update', data)
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
