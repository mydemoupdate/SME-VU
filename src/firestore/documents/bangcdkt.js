import COLLECTION from '@/firestore/collections/bangcdkt.col'
import store from '@/core/services/store'
import lodash from 'lodash'

export default {
    collection: COLLECTION,
    attributes: {
        chitieu: {
            required: true,
            type: String,
            export: {
                name: 'Chỉ tiêu',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Chỉ tiêu',
            },
        },
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã số',
            },
            import: {
                name: 'Mã số',
            },
        },
        loai: {
            required: true,
            type: Number,
            import: {
                name: 'Loại chỉ tiêu',
            },
        },
        /**
         * pheptinh: + | -
         * chitieu: 101 | 1102 | ...
         */
        congthuctinhtongchitieu: {
            required: false,
            default: [],
            import: {
                name: 'Công thức tính tổng chỉ tiêu',
            },
        },
        /**
         *  pheptinh: + | -
         *  taikhoan: 111 | 1111 | ...
         *  tinhchat: tkno | tkco
         */
        congthuctinhtongtaikhoan: {
            required: false,
            default: [],
            import: {
                name: 'Công thức tính tổng tài khoản',
            },
        },
        socuoiky: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Số cuối kỳ',
            },
            cast(socuoi, item, items) {
                switch (item.loai) {
                    case 2:
                        item.congthuctinhtongtaikhoan.forEach((congthuc) => {
                            const dsHachToan = store.getters['hachtoan.list'].filter((ht) => {
                                return ht[congthuc.tinhchat]['id'] == congthuc.taikhoan
                            })
                            const sotien = lodash.sum(dsHachToan.map(ht => ht.sotien))
                            switch (congthuc.pheptinh) {
                                case '-':
                                    socuoi -= sotien
                                    break;
                                case '+':
                                    socuoi += sotien
                                    break;
                            }
                        })
                        break;
                    case 1:
                        item.congthuctinhtongchitieu.forEach((congthuc) => {
                            const chitieu = lodash.find(items, i => i.id == congthuc.chitieu)
                            if (!chitieu) {
                                return socuoi
                            }
                            const sotien = chitieu.socuoiky
                            switch (congthuc.pheptinh) {
                                case '-':
                                    socuoi -= sotien
                                    break;
                                default: // +
                                    socuoi += sotien
                                    break;
                            }
                        })
                        break;
                }

                return socuoi
            },
        },
        sodauky: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Số đầu kỳ',
            },
            import: {
                name: 'Số đầu kỳ',
            },
            cast(socuoi, item, items) {
                if (item.loai === 1) {
                    item.congthuctinhtongchitieu.forEach((congthuc) => {
                        const chitieu = lodash.find(items, i => i.id == congthuc.chitieu)
                        if (!chitieu) {
                            return socuoi
                        }
                        const sotien = chitieu.sodauky
                        switch (congthuc.pheptinh) {
                            case '-':
                                socuoi -= sotien
                                break;
                            case '+':
                                socuoi += sotien
                                break;
                        }
                    })
                }
                return socuoi
            },
        },
        index: {
            required: true,
            type: Number,
            default: 0,
            import: {
                name: 'index',
            },
        }
    },
    initData: [
        {
            chitieu: '2. Các khoản tương đương tiền',
            id: '112',
            loai: 2,
            congthuctinhtongtaikhoan: [],
        },
        {
            chitieu: '1. Tiền',
            id: '111',
            loai: 2,
            congthuctinhtongtaikhoan: [
                { pheptinh: '+', tinhchat: 'tkno', taikhoan: '111' },
                { pheptinh: '+', tinhchat: 'tkno', taikhoan: '112' },
                { pheptinh: '+', tinhchat: 'tkno', taikhoan: '113' },
            ],
        },
        {
            chitieu: 'I. Tiền và các khoản tương đương tiền',
            id: '110',
            loai: 1,
            congthuctinhtongchitieu: [
                { pheptinh: '+', chitieu: '111' },
                { pheptinh: '+', chitieu: '112' },
            ],
        },
        {
            chitieu: 'A. TÀI SẢN NGẮN HẠN',
            id: '100',
            loai: 1,
            congthuctinhtongchitieu: [
                { pheptinh: '+', chitieu: '110' },
            ],
        },
    ],
}