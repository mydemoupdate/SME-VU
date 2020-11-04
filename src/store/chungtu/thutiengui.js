import Documents from '@/firestore/documents'
import { firestoreAction } from 'vuexfire'
import { SUCCESS, WARNING, PUSH_TOAST } from '@/core/services/store/toasts.module'
import { PUSH_ERROR } from "@/core/services/store/errors.module"

export const DOCUMENT = Documents.chungtu.thutiengui
const DOCUMENT_HACH_TOAN = Documents.hachtoan.thutiengui

export default {
    state: {},
    actions: {
        ['chungtu.thutiengui.hachtoan.create']: firestoreAction((context, payload) => {
            try {
                return DOCUMENT_HACH_TOAN.create(payload).then((hachtoan) => {
                    const data = {
                        hachtoan: [
                            ...context.getters['chungtu.thutiengui.selected'].hachtoan,
                            DOCUMENT_HACH_TOAN.collection.doc(hachtoan.id),
                        ]
                    }
                    context.dispatch('chungtu.thutiengui.update', data)
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
        ['chungtu.thutiengui.hachtoan.update']: firestoreAction((context, data) => {
            try {
                return DOCUMENT_HACH_TOAN.update(data.id, data).then(() => {
                    context.dispatch('chungtu.thutiengui.selected.refresh')
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
        ['chungtu.thutiengui.hachtoan.delete']: firestoreAction((context, id) => {
            try {
                const data = {
                    hachtoan: [
                        ...context.getters['chungtu.thutiengui.selected'].hachtoan.filter(i => i.id != id),
                    ]
                }
                context.dispatch('chungtu.thutiengui.update', data)
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
