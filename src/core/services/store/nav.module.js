import lodash from "lodash";

// action types | mutitions types
export const PUSH_ITEMS = 'pushNavItems';
export const FRESH_ITEMS = 'freshNavItems';
export const SELECT_ITEM = 'nav.select.item';
export const SET_MENU = 'nav.set.menu';

// getters types
export const ITEMS = 'navItems';
export const MENU = 'nav.menu';
export const ITEM_SELECTED = 'nav.item.selected';

const state = {
    items: [
        {
            _name: 'CSidebarNav',
            _children: []
        }
    ],
    item: {},
    menu: {},
}

const getters = {
    [ITEMS](state) {
        return state.items;
    },
    [ITEM_SELECTED](state) {
        return state.item;
    },
    [MENU](state) {
        return state.menu;
    },
}

const actions = {
    [PUSH_ITEMS](context, items) {
        context.commit(PUSH_ITEMS, items);
    },
    [FRESH_ITEMS](context) {
        context.commit(FRESH_ITEMS);
    },
    [SELECT_ITEM](context, route) {
        let item = null

        context.state.items[0]._children.forEach(i => {
            if (i.items) {
                item = i.items.find(subitem => {
                    return lodash.startsWith(route, subitem.to)
                })
            }
        })

        if (!item) {
            item = context.state.items[0]._children.find((i) => {
                return lodash.startsWith(route, i.to)
            })
        }

        if (!item || !item.menu) {
            const param = lodash.takeRightWhile(lodash.split(route, '/'))[0];
            const parent = context.state.items[0]._children.find((i) => {
                if (!i.to) return false
                const prefix = i.to.indexOf('/') == 0 ? '/' : ''
                return i.to == prefix + param
            })
            context.commit(SET_MENU, !parent ? undefined : parent.menu);
        } else {
            context.commit(SET_MENU, item.menu);
        }
        context.commit(SELECT_ITEM, item);
    },
}

const mutations = {
    [PUSH_ITEMS](state, items) {
        state.items[0]._children.push(...items);
    },
    [FRESH_ITEMS](state) {
        state.items[0]._children = [];
    },
    [SELECT_ITEM](state, item) {
        state.item = item;
    },
    [SET_MENU](state, menu) {
        state.menu = menu;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
