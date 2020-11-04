import Documents from '@/firestore/documents'
import { firestoreAction } from 'vuexfire'
import { SUCCESS, WARNING, PUSH_TOAST } from '@/core/services/store/toasts.module'
import { PUSH_ERROR } from "@/core/services/store/errors.module"

export const DOCUMENT = Documents.chungtu.phieuthu
const DOCUMENT_HACH_TOAN = Documents.hachtoan.phieuthu

export default {
    state: {},
    actions: {
        ['chungtu.phieuthu.hachtoan.create']: firestoreAction((context, payload) => {
            try {
                return DOCUMENT_HACH_TOAN.create(payload).then((hachtoan) => {
                    const data = {
                        hachtoan: [
                            ...context.getters['chungtu.phieuthu.selected'].hachtoan,
                            DOCUMENT_HACH_TOAN.collection.doc(hachtoan.id),
                        ]
                    }
                    context.dispatch('chungtu.phieuthu.update', data)
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
        ['chungtu.phieuthu.hachtoan.update']: firestoreAction((context, data) => {
            try {
                return DOCUMENT_HACH_TOAN.update(data.id, data).then(() => {
                    context.dispatch('chungtu.phieuthu.selected.refresh')
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
        ['chungtu.phieuthu.hachtoan.delete']: firestoreAction((context, id) => {
            try {
                const data = {
                    hachtoan: [
                        ...context.getters['chungtu.phieuthu.selected'].hachtoan.filter(i => i.id != id),
                    ]
                }
                context.dispatch('chungtu.phieuthu.update', data)
                return DOCUMENT_HACH_TOAN.destroy(id).then(() => {
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
