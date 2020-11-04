import COLLECTION from '../collections/kho.col'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã kho',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Mã kho',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên kho',
            },
            import: {
                name: 'Tên kho',
            },
        },
        diachi: {
            required: false,
            type: String,
            export: {
                name: 'Địa chỉ',
            },
            import: {
                name: 'Địa chỉ',
            },
        },
    },
    initData: [
        {
            id: 'KCCDC',
            ten: 'Kho Công cụ dụng cụ',
            diachi: 'Đà Nẵng'
        },
        {
            id: 'KHH',
            ten: 'Kho Hàng hoá',
        },
        {
            id: 'KNVL',
            ten: 'Kho Nguyên vật liệu',
        },
    ],
}