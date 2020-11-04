import COLLECTION from '../collections/loaitscd.col'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã loại TSCD',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Mã loại TSCD',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên loại TSCD',
            },
            import: {
                name: 'Tên loại TSCD',
            },
        },
    },
    initData: [
        {
            id: '11',
            ten: 'Nhà cửa, vật kiến trúc',
        },
        {
            id: '21',
            ten: 'Quyền sử dụng đất',
        },
    ],
}