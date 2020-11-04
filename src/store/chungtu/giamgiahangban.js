import Documents from '@/firestore/documents'
import { SUCCESS, WARNING, PUSH_TOAST } from '@/core/services/store/toasts.module'
import { PUSH_ERROR } from "@/core/services/store/errors.module"

export const DOCUMENT = Documents.chungtu.giamgiahangban
const DOCUMENT_HT_TIEN_HANG = Documents.hachtoan.giamgiahangban
const DOCUMENT_HT_THUE_GTGT = Documents.hachtoan.giamgiathuegtgt
const DOCUMENT_HT_CHIEC_KHAU = Documents.hachtoan.chieckhau

export default {
    state: {},
    actions: {
        ['chungtu.giamgiahangban.hachtoan.tienhang.create']: ((context, payload) => {
            try {
                return DOCUMENT_HT_TIEN_HANG.create(payload).then((hachtoan) => {
                    const data = {
                        hachtoantienhang: [
                            ...context.getters['chungtu.giamgiahangban.selected'].hachtoantienhang,
                            DOCUMENT_HT_TIEN_HANG.collection.doc(hachtoan.id),
                        ]
                    }
                    context.dispatch('chungtu.giamgiahangban.update', data)
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
        ['chungtu.giamgiahangban.hachtoan.tienhang.update']: ((context, data) => {
            try {
                return DOCUMENT_HT_TIEN_HANG.update(data.id, data).then(() => {
                    context.dispatch('chungtu.giamgiahangban.selected.refresh')
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
        ['chungtu.giamgiahangban.hachtoan.tienhang.delete']: ((context, id) => {
            try {
                const data = {
                    hachtoantienhang: [
                        ...context.getters['chungtu.giamgiahangban.selected'].hachtoantienhang.filter(i => i.id != id),
                    ]
                }
                context.dispatch('chungtu.giamgiahangban.update', data)
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

        ['chungtu.giamgiahangban.hachtoan.thuegtgt.create']: ((context, payload) => {
            try {
                return DOCUMENT_HT_THUE_GTGT.create(payload).then((hachtoan) => {
                    const data = {
                        hachtoanthuegtgt: [
                            ...context.getters['chungtu.giamgiahangban.selected'].hachtoanthuegtgt,
                            DOCUMENT_HT_THUE_GTGT.collection.doc(hachtoan.id),
                        ]
                    }
                    context.dispatch('chungtu.giamgiahangban.update', data)
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
        ['chungtu.giamgiahangban.hachtoan.thuegtgt.update']: ((context, data) => {
            try {
                return DOCUMENT_HT_THUE_GTGT.update(data.id, data).then(() => {
                    context.dispatch('chungtu.giamgiahangban.selected.refresh')
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
        ['chungtu.giamgiahangban.hachtoan.thuegtgt.delete']: ((context, id) => {
            try {
                const data = {
                    hachtoanthuegtgt: [
                        ...context.getters['chungtu.giamgiahangban.selected'].hachtoanthuegtgt.filter(i => i.id != id),
                    ]
                }
                context.dispatch('chungtu.giamgiahangban.update', data)
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

        ['chungtu.giamgiahangban.hachtoan.chieckhau.create']: ((context, payload) => {
            try {
                return DOCUMENT_HT_CHIEC_KHAU.create(payload).then((hachtoan) => {
                    const data = {
                        hachtoanchieckhau: [
                            ...context.getters['chungtu.giamgiahangban.selected'].hachtoanchieckhau,
                            DOCUMENT_HT_CHIEC_KHAU.collection.doc(hachtoan.id),
                        ]
                    }
                    context.dispatch('chungtu.giamgiahangban.update', data)
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
        ['chungtu.giamgiahangban.hachtoan.chieckhau.update']: ((context, data) => {
            try {
                return DOCUMENT_HT_CHIEC_KHAU.update(data.id, data).then(() => {
                    context.dispatch('chungtu.giamgiahangban.selected.refresh')
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
        ['chungtu.giamgiahangban.hachtoan.chieckhau.delete']: ((context, id) => {
            try {
                const data = {
                    hachtoanchieckhau: [
                        ...context.getters['chungtu.giamgiahangban.selected'].hachtoanchieckhau.filter(i => i.id != id),
                    ]
                }
                context.dispatch('chungtu.giamgiahangban.update', data)
                return DOCUMENT_HT_CHIEC_KHAU.destroy(id).then(() => {
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
