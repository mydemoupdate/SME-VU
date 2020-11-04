import COLLECTION from '../collections/tinhchat.col'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã tính chất',
            },
            import: {
                name: 'Mã tính chất',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên tính chất',
            },
            import: {
                name: 'Tên tính chất',
            },
        },
    },
    initData: [
        {
            id: 'DN',
            ten: 'Dư Nợ',
        },
        {
            id: 'DC',
            ten: 'Dư Có',
        },
        {
            id: 'LT',
            ten: 'Lưỡng tính',
        },
    ],
}