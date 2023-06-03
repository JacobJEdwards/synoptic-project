/**
 * Regex to get the parameters from the url path and return them as an object
 * Based on the route object
 * @param {string} path
 */
export const pathToRegex = (path) =>
    new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

/**
 * type Match = {
 *      path: string,
 *      result: null | Array<string[]>
 * }
 *
 * result will be null if route doesn't match current path, or an array with the full path and potential parameters
 */

/**
 * Get the parameters from the URL path and return them as an object
 * @param {object} match object with the corresponding route
 */
export const getParams = (match) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
        (result) => result[1]
    );

    return Object.fromEntries(
        keys.map((key, i) => {
            return [key, values[i]];
        })
    );
};
