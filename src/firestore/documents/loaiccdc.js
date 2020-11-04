import COLLECTION from '../collections/loaiccdc.col'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã Loại CCDC',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Mã Loại CCDC',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên Loại CCDC',
            },
            import: {
                name: 'Tên Loại CCDC',
            },
        },
    },
    initData: [
        {
            id: 'MMCC',
            ten: 'Máy móc công cụ',
        },
        {
            id: 'TTB',
            ten: 'Trang thiết bị',
        },
        {
            id: 'BHLĐ',
            ten: 'Đồ bảo hộ lao động',
        },
        {
            id: 'VPP',
            ten: 'Văn phòng phẩm',
        },
    ],
}