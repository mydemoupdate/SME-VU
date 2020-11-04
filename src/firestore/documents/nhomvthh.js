import COLLECTION from '../collections/nhomvthh.col'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã nhóm VTHH',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Mã nhóm VTHH',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên nhóm VTHH',
            },
            import: {
                name: 'Tên nhóm VTHH',
            },
        },
    },
    initData: [
        {
            id: 'CCDC',
            ten: 'Công cụ dụng cụ',
        },
        {
            id: 'DV',
            ten: 'Dịch vụ',
        },
        {
            id: 'NVL',
            ten: 'Nguyên vật liệu',
        },
    ],
}