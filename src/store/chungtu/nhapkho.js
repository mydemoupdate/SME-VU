import Documents from '@/firestore/documents'
import { SUCCESS, WARNING, PUSH_TOAST } from '@/core/services/store/toasts.module'
import { PUSH_ERROR } from "@/core/services/store/errors.module"

export const DOCUMENT = Documents.chungtu.nhapkho
const DOCUMENT_HT_TIEN_HANG = Documents.hachtoan.nhapkho

export default {
    state: {},
    actions: {
        ['chungtu.nhapkho.hachtoan.tienhang.create']: ((context, payload) => {
            try {
                return DOCUMENT_HT_TIEN_HANG.create(payload).then((hachtoan) => {
                    const data = {
                        hachtoantienhang: [
                            ...context.getters['chungtu.nhapkho.selected'].hachtoantienhang,
                            DOCUMENT_HT_TIEN_HANG.collection.doc(hachtoan.id),
                        ]
                    }
                    context.dispatch('chungtu.nhapkho.update', data)
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
        ['chungtu.nhapkho.hachtoan.tienhang.update']: ((context, data) => {
            try {
                return DOCUMENT_HT_TIEN_HANG.update(data.id, data).then(() => {
                    context.dispatch('chungtu.nhapkho.selected.refresh')
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
        ['chungtu.nhapkho.hachtoan.tienhang.delete']: ((context, id) => {
            try {
                const data = {
                    hachtoantienhang: [
                        ...context.getters['chungtu.nhapkho.selected'].hachtoantienhang.filter(i => i.id != id),
                    ]
                }
                context.dispatch('chungtu.nhapkho.update', data)
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
    },
    mutations: {},
    getters: {},
};
