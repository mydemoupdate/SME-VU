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

        const Service = apiDefinition.SERVICE
        const Resource = apiDefinition.RESOURCE || apiPath[0]

        const crud = !Service ? {} : {
            all(query) {
                return Service.query(Resource, query);
            },
            get(id, query) {
                return Service.get(Resource, id, query);
            },
            create(params) {
                return Service.get(Resource, params);
            },
            update(id, params) {
                return Service.update(Resource, id, params);
            },
            delete(id) {
                return Service.delete(Resource, id);
            },
        }

        // Add the api to our apis object.
        api[apiPath.pop()] = {
            // Add more default here.
            ...crud,
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