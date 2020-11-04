import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import { DocumentReference, Timestamp } from '../services/firebase/firestore.firebase'
import i18n from './vue-i18n'

lodash.mixin({
    /**
     * Rename specify object keys
     * 
     * @param {Object} object 
     * @param {Object} swrap 
     */
    'renameKeys': function (object, swrap) {
        lodash.each(swrap, function (newKey, key) {
            if (newKey instanceof Function) return;
            if (newKey === key) return;
            lodash.set(object, newKey, object[key])
            lodash.unset(object, key)
        })
    },

    /**
     * One way format date
     * 
     * @param {Date} date
     * @return {String}
     */
    'formatDate': function (date) {
        return date.toISOString().split('T')[0]
    },

    /**
     * Format to Timestamp
     * 
     * @param {Date|Number|String} value
     * @return {Timestamp}
     */
    'toTimestamp': function (value) {
        if (!value) {
            return null
        }
        const date = value instanceof Date ? value : (typeof value == "number" ? new Date(1000 * 60 * 60 * 24 * (value - 25569)) : new Date(value))
        return Timestamp.fromDate(date)
    },

    /**
     * Cast values as defined
     * 
     * @param {Array} items 
     * @param {Object} doc:{attributes.cast()}
     */
    'cast': function (items, doc) {
        return items.map((item) => {
            if (item === null || item === undefined || typeof item == "string") {
                return item
            }
            lodash.each(doc.attributes, (attribute, key) => {
                if (item[key] == null || item[key] == undefined) {
                    item[key] = attribute.default ?? ''
                }
                if (attribute.cast) {
                    item[key] = attribute.cast(item[key], item, items)
                }
            })
            return item
        })
    },

    /**
     * Cast to list DocumentReference
     * 
     * @param {Array} items 
     * @param {Object} doc:{attributes.cast()}
     */
    'castToDocRefs': function (listHT, HachToanDOC) {
        let listResult = []
        lodash.each(listHT, (ht) => {
            if (ht instanceof DocumentReference) {
                listResult.push(ht)
                return
            }
            if (ht.id) {
                listResult.push(HachToanDOC.collection.doc(ht.id))
            }
        })
        return listResult
    },

    /**
     * Pick & parse data to export
     * 
     * @param {Array} items 
     * @param {Object} doc 
     * @return {Array}
     */
    'toExport': function (items, doc) {
        let exportRows = []
        items.forEach(function (item) {
            const result = {}
            lodash.each(doc.attributes, (describe, key) => {
                if (!describe.export || !item[key] || describe.type == Array)
                    return
                if (describe.export.customize) {
                    result[i18n.t(describe.export.name)] = describe.export.customize(item[key])
                } else {
                    result[i18n.t(describe.export.name)] = item[key]
                }
            })
            if (lodash.find(doc.attributes, att => att.type == Array)) {
                lodash.each(doc.attributes, (describe, key) => {
                    if (describe.type == Array) {
                        const mergeItems = describe.export.customize(item[key])
                        lodash.each(mergeItems, mergeItem => {
                            exportRows.push({ ...result, ...mergeItem })
                        })
                    }
                })
            } else {
                exportRows.push(result)
            }
        })
        return exportRows
    },

    /**
     * Pick & parse data to import
     * 
     * @param {Array} data 
     * @param {Object} doc 
     * @return {Array}
     */
    'toImport': function (data, doc) {
        let result = []
        data.forEach(function (row) {
            let item = {}
            lodash.each(doc.attributes, (describe, key) => {
                if (!describe.import)
                    return
                if (describe.import.customize && describe.type == Array) {
                    let attribute = describe.import.customize(row[key], row)
                    let itemExisted = lodash.find(result, r => r.id == item.id)
                    if (itemExisted) {
                        item[key] = [...itemExisted[key], attribute]
                        lodash.remove(result, itemExisted)
                    } else {
                        item[key] = [attribute]
                    }
                } else if (describe.import.customize) {
                    item[key] = describe.import.customize(row[describe.import.name])
                } else {
                    item[key] = row[describe.import.name || key]
                }
            })
            result.push(item)
        })
        return result
    },

    /**
     * Convert data for CSelect
     * 
     * @param {Array} data 
     * @param {Object} doc 
     * @return {Array}
     */
    'toCSelect': function (items, targets = { value: 'id', label: 'ten' }, keys = { value: 'id', label: 'label' }) {
        const result = !items ? null : items.map(function (item) {
            return {
                [keys.value]: item[targets.value],
                [keys.label]: item[targets.label]
            }
        })
        return [{ [keys.value]: '', [keys.label]: 'Trống' }, ...result]
    },

    /**
     * Get table fields
     * 
     * @param {Object} doc 
     * @return {Array}
     */
    'getTableFields': function (doc) {
        const fields = []
        lodash.each(doc.attributes, (attribute, key) => {
            if (attribute.export && attribute.type != Array) {
                fields.push({
                    key: key,
                    label: i18n.t(attribute.export.name),
                    ...attribute.export.options,
                })
            }
        })
        return fields
    },

    /**
     * Filter
     * 
     * @param {Object|Array} items
     * @param {Object} filter {value: "", keyFilter: "id", condition: "like|=",}
     * @return {Array}
     */
    'advancedFilter': function (list, filter) {
        return lodash.filter(list, (item) => {
            const result = lodash.uniq(
                lodash.map(filter, (field, key) => {
                    if (!field.value) {
                        return true;
                    }
                    const condition = field.condition ?? 'like'
                    field.keyFilter = field.keyFilter ?? 'id'
                    switch (condition) {
                        case '=':
                            return item[key][field.keyFilter] == field.value
                        default:
                            return lodash.includes(
                                item[key][field.keyFilter],
                                field.value
                            );
                    }

                })
            );
            return result.length === 1 && result[0] === true;
        })
    },
})

Vue.use(VueLodash, { lodash: lodash })

export default lodash