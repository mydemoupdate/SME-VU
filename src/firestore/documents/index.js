import lodash from 'lodash';
import firestore, { DocumentReference, Timestamp } from '../../core/services/firebase/firestore.firebase'

const apisCache = {}
const apis = {}

    ; (function () {
        // https://webpack.js.org/guides/dependency-management/#require-context
        const requireApi = require.context(
            // Search for files in the current directory.
            '.',
            // Search for files in subdirectories.
            true,
            // Include any .js files that are not this file or a unit test.
            /^((?!index|\.unit\.).)*\.js$/
        )

        // For every api...
        requireApi.keys().forEach((fileName) => {
            const apiDefinition = requireApi(fileName)

            // Skip the api during hot reload if it refers to the
            // same api definition as the one we have cached.
            if (apisCache[fileName] === apiDefinition) return

            // Update the api cache, for efficient hot reloading.
            apisCache[fileName] = apiDefinition

            // Get the api path as an array.
            const apiPath = fileName
                // Remove the "./" from the beginning.
                .replace(/^\.\//, '')
                // Remove the file extension from the end.
                .replace(/\.\w+$/, '')
                // Split nested apis into an array path.
                .split(/\//)

            // Get the apis object for the current path.
            const api = getNamespace(apis, apiPath)

            const COLLECTION = apiDefinition.default.collection

            const defaultDoc = {
                init() {
                    const batch = firestore.batch()
                    apiDefinition.default.initData.map((item) => {
                        batch.set((lodash.isUndefined(item.id) || lodash.isNull(item.id)) ? COLLECTION.doc() : COLLECTION.doc(item.id), this.parse(item));
                    });
                    return batch.commit()
                },
                parse(data, validate = true) {
                    const attributes = lodash.clone(data)
                    lodash.keys(this.attributes).forEach(key => {
                        const attribute = this.attributes[key]

                        if (attribute.readonly) {
                            lodash.unset(attributes, key)
                            return
                        }

                        if (attributes[key] === null || attributes[key] === undefined || attributes[key] === "" || attributes[key] === {}) {
                            if (validate) {
                                if (attribute.required) {
                                    throw {
                                        message: `The attribute '${key}' is required at ${fileName}`
                                    }
                                }
                                lodash.set(attributes, key, attribute.default === undefined ? null : attribute.default)
                            } else {
                                lodash.unset(attributes, key)
                                return
                            }
                        }

                        if (attribute.type) {
                            if (attribute.type == DocumentReference) {
                                if (!attribute.reference) {
                                    throw {
                                        message: `The property 'reference' is required in attribute '${key}' at ${fileName}`
                                    }
                                }
                                if (attributes[key].id) {
                                    attributes[key] = attribute.reference.doc(attributes[key].id)
                                } else {
                                    attributes[key] = null
                                }
                            } else if (lodash.includes([Number, String], attribute.type) && attributes[key] !== null) {
                                attributes[key] = attribute.type(attributes[key])
                            } else if (attribute.type == Timestamp) {
                                attributes[key] = lodash.toTimestamp(attributes[key])
                            }
                        }

                        if (attribute.castStore && attributes[key] !== null) {
                            attributes[key] = attribute.castStore(attributes[key])
                        }
                    })
                    return attributes
                },
                fetch() {
                    return new Promise((resolve, reject) => {
                        COLLECTION.get().then((querySnapshot) => {
                            const docs = querySnapshot.docs.map(doc => this.parse(doc.data()))
                            resolve(docs)
                        }).catch((error) => {
                            reject(error)
                        })
                    })
                },
                find(id) {
                    return new Promise((resolve, reject) => {
                        COLLECTION.doc(id).get().then((doc) => {
                            resolve(this.parse(doc.data()))
                        }).catch((error) => {
                            reject(error)
                        })
                    })
                },
                create(attributes) {
                    if (attributes.id) {
                        return COLLECTION.doc(attributes.id).set(this.parse(attributes))
                    }
                    return COLLECTION.add(this.parse(attributes))
                },
                update(id, attributes) {
                    return COLLECTION.doc(id).update(this.parse(attributes, false))
                },
                destroy(id) {
                    return COLLECTION.doc(id).delete()
                },
                import(data) {
                    const CHUNK_SIZE = 400
                    return new Promise((resolve) => {
                        const chunk = lodash.chunk(data, CHUNK_SIZE)
                        chunk.forEach((eachData, indexChunk) => {
                            setTimeout(() => {
                                const batch = firestore.batch()
                                let countItems = 0
                                eachData.forEach((item) => {
                                    countItems++
                                    const firedata = this.parse(item)
                                    if (item.id) {
                                        batch.set(COLLECTION.doc(item.id), firedata, { merge: true });
                                    } else if (item.id === undefined) {
                                        batch.set(COLLECTION.doc(), firedata, { merge: true });
                                    }
                                });
                                batch.commit()
                                if (indexChunk >= chunk.length - 1) {
                                    resolve((CHUNK_SIZE * indexChunk) + countItems)
                                }
                            }, indexChunk * 1000)
                        })
                    })
                }
            }

            // Add the api to our apis object.
            api[apiPath.pop()] = {
                // Add more default here.
                ...defaultDoc,
                ...apiDefinition.default,
            }
        })
    })()

// Recursively get the namespace of an api, even if nested.
function getNamespace(subtree, path) {
    if (path.length === 1) return subtree

    const namespace = path.shift()
    subtree[namespace] = {
        ...subtree[namespace],
    }
    return getNamespace(subtree[namespace], path)
}

export default apis
