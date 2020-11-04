import COLLECTION from '../collections/loaidoituong.col'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã loại đối tượng',
            },
            import: {
                name: 'Mã loại đối tượng',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên loại đối tượng',
            },
            import: {
                name: 'Tên loại đối tượng',
            },
        },
        tiento: {
            required: true,
            type: String,
        },
    },
    initData: [
        {
            id: 'KH',
            ten: 'Khách hàng',
            tiento: 'KH',
        },
        {
            id: 'NCC',
            ten: 'Nhà cung cấp',
            tiento: 'NCC',
        },
        {
            id: 'NV',
            ten: 'Nhân viên',
            tiento: 'NV',
        },
    ],
}