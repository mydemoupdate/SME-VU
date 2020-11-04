import lodash from 'lodash';
import { firestoreAction } from 'vuexfire'
import { PUSH_ERROR } from "@/core/services/store/errors.module"
import { SUCCESS, WARNING, PUSH_TOAST } from '@/core/services/store/toasts.module'

const modulesCache = {}
const modules = {}

    ; (function () {
        // https://webpack.js.org/guides/dependency-management/#require-context
        const requireModule = require.context(
            // Search for files in the current directory.
            '.',
            // Search for files in subdirectories.
            true,
            // Include any .js files that are not this file or a unit test.
            /^((?!index|\.unit\.).)*\.js$/
        )

        // For every module...
        requireModule.keys().forEach((fileName) => {
            const moduleDefinition = requireModule(fileName)

            // Skip the module during hot reload if it refers to the
            // same module definition as the one we have cached.
            if (modulesCache[fileName] === moduleDefinition) return

            // Update the module cache, for efficient hot reloading.
            modulesCache[fileName] = moduleDefinition

            // Get the module path as an array.
            const modulePath = fileName
                // Remove the "./" from the beginning.
                .replace(/^\.\//, '')
                // Remove the file extension from the end.
                .replace(/\.\w+$/, '')
                // Split nested modules into an array path.
                .replace(/\//, '.')

            // Get the modules object for the current path.
            const module = getNamespace(modules, [modulePath])

            const MODULE = {
                DOCUMENT: moduleDefinition.DOCUMENT,
                OPTION: moduleDefinition.OPTION ?? {},
                STATE_SELECTED: modulePath.replace(/\./, '') + 'chitiet',
                STATE_LIST: modulePath.replace(/\./, '') + 'list',
                STATE_DATA_IMPORT: modulePath.replace(/\./, '') + 'dataimport',
                GETTER_LIST: modulePath + '.list',
                GETTER_LIST_CSELECT: modulePath + '.cselect',
                GETTER_PANE_SIZE: modulePath + '.panesize',
                GETTER_DATA_EXPORT: modulePath + '.dataexport',
                GETTER_DATA_IMPORT: modulePath + '.dataimport',
                GETTER_SELECTED: modulePath + '.selected',
                GETTER_ACTIVE_TAB: modulePath + '.tab',
                GETTER_WAS_SELECTED: modulePath + '.wasselected',
                ACTION_IMPORT_DATA: modulePath + '.import',
                ACTION_FETCH_LIST: modulePath + '.fetch',
                ACTION_BIND_LIST: modulePath + '.bind',
                ACTION_REFRESH_SELECTED: modulePath + '.selected.refresh',
                ACTION_CREATE: modulePath + '.create',
                ACTION_SELECT: modulePath + '.select',
                ACTION_UPDATE: modulePath + '.update',
                ACTION_DELETE: modulePath + '.delete',
                MUTATION_SET_LIST: modulePath + '.list.set',
                MUTATION_SELECT: modulePath + '.select',
                MUTATION_PURGE_SELECT: modulePath + '.purgeselect',
                MUTATION_UPDATE: modulePath + '.update',
                MUTATION_ACTIVE_TAB: modulePath + '.tab',
                MUTATION_PANE_SIZE: modulePath + '.panesize',
                MUTATION_ADD_DATA_IMPORT: modulePath + '.import.add',
                MUTATION_SET_DATA_IMPORT: modulePath + '.import.set',
                MUTATION_CLEAR_DATA_IMPORT: modulePath + '.import.clear',
            }

            const defaultAttribute = {
                ...lodash.mapValues(MODULE.DOCUMENT.attributes, attribute => attribute.default ?? null)
            }

            const defaultState = {
                [MODULE.STATE_LIST]: [],
                detailPanSize: 0,
                [MODULE.STATE_SELECTED]: defaultAttribute,
                activeTab: 0,
                [MODULE.STATE_DATA_IMPORT]: [],
            }

            const defaultGetters = {
                [MODULE.GETTER_LIST](state) {
                    return lodash.cast(state[MODULE.STATE_LIST], MODULE.DOCUMENT)
                },
                [MODULE.GETTER_LIST_CSELECT](state) {
                    return lodash.toCSelect(state[MODULE.STATE_LIST])
                },
                [MODULE.GETTER_PANE_SIZE](state) {
                    return state.detailPanSize
                },
                [MODULE.GETTER_DATA_EXPORT](state) {
                    return lodash.toExport(state[MODULE.STATE_LIST], MODULE.DOCUMENT)
                },
                [MODULE.GETTER_DATA_IMPORT](state) {
                    return lodash.toImport(state[MODULE.STATE_DATA_IMPORT], MODULE.DOCUMENT)
                },
                [MODULE.GETTER_SELECTED](state) {
                    return lodash.clone(state[MODULE.STATE_SELECTED] ?? defaultAttribute)
                },
                [MODULE.GETTER_ACTIVE_TAB](state) {
                    return state.activeTab
                },
                [MODULE.GETTER_WAS_SELECTED](state) {
                    return state[MODULE.STATE_SELECTED] ? state[MODULE.STATE_SELECTED].id !== defaultAttribute.id : false
                }
            }

            const defaultActions = {
                [MODULE.ACTION_BIND_LIST]: firestoreAction((context) => {
                    try {
                        return context.bindFirestoreRef(MODULE.STATE_LIST, MODULE.DOCUMENT.collection, {
                            wait: true,
                            ...MODULE.OPTION
                        })
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    }
                }),
                [MODULE.ACTION_FETCH_LIST](context) {
                    try {
                        MODULE.DOCUMENT.fetch().then(data => {
                            context.commit(MODULE.MUTATION_SET_LIST, data)
                        })
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    }
                },
                [MODULE.ACTION_IMPORT_DATA](context) {
                    try {
                        context.dispatch(PUSH_TOAST, {
                            message: 'Đang xử lý dữ liệu...',
                            type: WARNING
                        })
                        MODULE.DOCUMENT.import(context.getters[MODULE.GETTER_DATA_IMPORT]).then(count => {
                            context.commit(MODULE.MUTATION_CLEAR_DATA_IMPORT)
                            lodash.each(MODULE.DOCUMENT.attributes, attr => {
                                if (attr.import && attr.import.onSuccess) {
                                    attr.import.onSuccess(count)
                                }
                            })
                            context.dispatch(PUSH_TOAST, {
                                title: 'Nhập dữ liệu thành công',
                                message: 'Số dữ liệu đã nhập: ' + count,
                                type: SUCCESS
                            })
                        })
                    } catch (error) {
                        context.commit(MODULE.MUTATION_CLEAR_DATA_IMPORT)
                        context.dispatch(PUSH_ERROR, { error });
                    }
                },
                [MODULE.ACTION_REFRESH_SELECTED]: ((context) => {
                    try {
                        context.dispatch(MODULE.ACTION_SELECT, context.getters[MODULE.GETTER_SELECTED].id)
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    }
                }),
                [MODULE.ACTION_CREATE]: ((context, data) => {
                    try {
                        return MODULE.DOCUMENT.create(data).then(() => {
                            context.dispatch(MODULE.ACTION_SELECT, data.id)
                            context.dispatch(PUSH_TOAST, {
                                message: 'Đã tạo',
                                type: SUCCESS
                            })
                        }).catch((error) => {
                            context.dispatch(PUSH_ERROR, { error })
                        })
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    }
                }),
                [MODULE.ACTION_SELECT]: firestoreAction((context, id) => {
                    try {
                        context.unbindFirestoreRef(MODULE.STATE_SELECTED)
                        const doituong = context.getters[MODULE.GETTER_LIST].find(e => e.id == id);
                        const doituongCasted = lodash.cast([doituong ?? defaultAttribute], MODULE.DOCUMENT)[0]
                        context.commit(MODULE.MUTATION_SELECT, doituongCasted)
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    }
                }),
                [MODULE.ACTION_UPDATE]: ((context, data) => {
                    try {
                        MODULE.DOCUMENT.update(context.getters[MODULE.GETTER_SELECTED].id, data).then(() => {
                            context.dispatch(MODULE.ACTION_REFRESH_SELECTED)
                            context.dispatch(PUSH_TOAST, {
                                message: 'Đã lưu',
                                type: SUCCESS
                            })
                        }).catch((error) => {
                            context.dispatch(PUSH_ERROR, { error })
                        })
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    }
                }),
                [MODULE.ACTION_DELETE]: ((context) => {
                    try {
                        return MODULE.DOCUMENT.destroy(context.getters[MODULE.GETTER_SELECTED].id).then(function () {
                            context.dispatch(PUSH_TOAST, {
                                message: 'Đã xóa',
                                type: WARNING
                            })
                        }).catch((error) => {
                            context.dispatch(PUSH_ERROR, { error })
                        })
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    } finally {
                        context.commit(MODULE.MUTATION_PURGE_SELECT);
                    }
                }),
            };

            const defaultMutations = {
                [MODULE.MUTATION_SET_LIST](state, data) {
                    state[MODULE.STATE_LIST] = data
                },
                [MODULE.MUTATION_PANE_SIZE](state, size) {
                    state.detailPanSize = size
                },
                [MODULE.MUTATION_SELECT](state, data) {
                    state[MODULE.STATE_SELECTED] = data
                },
                [MODULE.MUTATION_UPDATE](state, data) {
                    state[MODULE.STATE_SELECTED] = { ...state[MODULE.STATE_SELECTED], data }
                },
                [MODULE.MUTATION_ACTIVE_TAB](state, index) {
                    state.activeTab = index
                },
                [MODULE.MUTATION_PURGE_SELECT](state) {
                    state[MODULE.STATE_SELECTED] = defaultAttribute
                },
                [MODULE.MUTATION_ADD_DATA_IMPORT](state, data) {
                    state[MODULE.STATE_DATA_IMPORT].push(data)
                },
                [MODULE.MUTATION_SET_DATA_IMPORT](state, data) {
                    state[MODULE.STATE_DATA_IMPORT] = data
                },
                [MODULE.MUTATION_CLEAR_DATA_IMPORT](state) {
                    state[MODULE.STATE_DATA_IMPORT] = []
                },
            };

            // Add the module to our modules object.
            module[modulePath] = {
                state: {
                    ...defaultState,
                    ...moduleDefinition.default.state,
                },
                actions: {
                    ...defaultActions,
                    ...moduleDefinition.default.actions,

                },
                mutations: {
                    ...defaultMutations,
                    ...moduleDefinition.default.mutations,

                },
                getters: {
                    ...defaultGetters,
                    ...moduleDefinition.default.getters,
                },
            }
        })
    })()

// Recursively get the namespace of an module, even if nested.
function getNamespace(subtree, path) {
    if (path.length === 1) return subtree

    const namespace = path.shift()
    subtree[namespace] = {
        ...subtree[namespace],
    }
    return getNamespace(subtree[namespace], path)
}

export default modules
