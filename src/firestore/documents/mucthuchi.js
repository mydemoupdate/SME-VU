import COLLECTION from '../collections/mucthuchi.col'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã mục',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Mã mục',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên mục',
            },
            import: {
                name: 'Tên mục',
            },
        },
    },
    initData: [
        {
            id: '101',
            ten: 'Thu nợ khách hàng',
        },
        {
            id: '102',
            ten: 'Thu tạm ứng nhân viên',
        },
        {
            id: '205',
            ten: 'Chi nộp thuế',
        },
    ],
}