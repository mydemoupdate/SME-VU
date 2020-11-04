import COLLECTION from '../collections/donvi.col'

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
                name: 'Tên đơn vị',
            },
            import: {
                name: 'Tên đơn vị',
            },
        },
    },
    initData: [
        {
            id: 'g',
            ten: 'Gam',
        },
        {
            id: 'l',
            ten: 'Lít',
        },
        {
            id: 'bao',
            ten: 'Bao',
        },
        {
            id: 'cai',
            ten: 'Cái',
        },
        {
            id: 'chiec',
            ten: 'Chiếc',
        },
    ],
}