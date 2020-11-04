import COLLECTION from '../collections/loaitien.col'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã loại tiền',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Mã loại tiền',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên loại tiền',
            },
            import: {
                name: 'Tên loại tiền',
            },
        },
        tygia: {
            required: true,
            type: Number,
            export: {
                name: 'Tỷ giá',
            },
            import: {
                name: 'Tỷ giá',
            },
        }
    },
    initData: [
        {
            id: 'VND',
            ten: 'Việt Nam đồng',
            tygia: 1,
        },
        {
            id: 'USD',
            ten: 'Đô la Mỹ',
            tygia: 20.960,
        },
        {
            id: 'JPY',
            ten: 'Yên Nhật',
            tygia: 221.54,
        },
    ],
}