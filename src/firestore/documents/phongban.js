import COLLECTION from '../collections/phongban.col'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã phòng ban',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Mã phòng ban',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên phòng ban',
            },
            import: {
                name: 'Tên phòng ban',
            },
        },
    },
    initData: [
        {
            id: 'BGD',
            ten: 'Ban giám đốc',
        },
        {
            id: 'PKD',
            ten: 'Phòng kinh doanh',
        },
        {
            id: 'PKT',
            ten: 'Phòng kế toán',
        },
    ],
}