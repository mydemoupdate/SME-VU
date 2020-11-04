import COLLECTION from '../collections/nganhang.col'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Ký hiệu',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Ký hiệu',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên ngân hàng',
            },
            import: {
                name: 'Tên ngân hàng',
            },
        },
    },
    initData: [
        {
            id: 'ABBank',
            ten: 'Ngân hàng TMCP An Bình',
        },
        {
            id: 'ACB',
            ten: 'Ngân hàng TMCP Á Châu',
        },
        {
            id: 'Agribank',
            ten: 'Ngân hàng Nông nghiệp và Phát triển nông thôn Việt Nam',
        },
    ],
}