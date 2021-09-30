/**
 * Module dependencies.
 */

const isEmpty = require("lodash.isempty");
const isPlainObject = require("lodash.isplainobject");
const transform = require("lodash.transform");

/**
 * Export `clean` function.
 */

module.exports = function clean(
    object,
    { cleanKeys = [], cleanValues = [], emptyArrays = true, emptyObjects = true, emptyStrings = true, functions = true, NaNValues = false, nullValues = true, undefinedValues = true } = {},
) {
    return transform(object, (result, value, key) => {
        // Exclude specific keys.
        if (cleanKeys.includes(key)) {
            return;
        }

        // Recurse into arrays and objects.
        if (Array.isArray(value) || isPlainObject(value)) {
            value = cleanDeep(value, { NaNValues, cleanKeys, cleanValues, emptyArrays, emptyObjects, emptyStrings, nullValues, undefinedValues });
        }

        // Exclude specific values.
        if (cleanValues.includes(value)) {
            return;
        }

        // Exclude empty objects.
        if (emptyObjects && isPlainObject(value) && isEmpty(value)) {
            return;
        }

        // Exclude empty arrays.
        if (emptyArrays && Array.isArray(value) && !value.length) {
            return;
        }

        // Exclude empty strings.
        if (emptyStrings && value === "") {
            return;
        }

        // Exclude empty strings.
        if (functions && typeof value == "function") {
            return;
        }

        // Exclude NaN values.
        if (NaNValues && Number.isNaN(value)) {
            return;
        }

        // Exclude null values.
        if (nullValues && value === null) {
            return;
        }

        // Exclude undefined values.
        if ((undefinedValues && value === undefined) || (typeof value === "undefined" && value !== null)) {
            return;
        }

        // Append when recursing arrays.
        if (Array.isArray(result)) {
            return result.push(value);
        }

        result[key] = value;
    });
};
// Exclude specific keys.
// if (cleanKeys.includes(key)) {
//     return;
// }

// // Recurse into arrays and objects.
// if (Array.isArray(value) || isPlainObject(value)) {
//     value = clean(value, {
//         cleanKeys,
//         cleanValues,
//         emptyArrays,
//         emptyObjects,
//         emptyStrings,
//         functions,
//         NaNValues,
//         nullValues,
//         undefinedValues,
//     });
// }

// // Exclude specific values.
// if (cleanValues && .includes(value)) {
//     console.log('cleaning specific values',cleanValues)
//     return;
// }

// // Exclude empty objects.
// if (emptyObjects && isPlainObject(value) && isEmpty(value)) {
//     return;
// }

// // Exclude empty arrays.
// if (emptyArrays && Array.isArray(value) && !value.length) {
//     return;
// }

// // Exclude empty strings.
// if (emptyStrings && value === "") {
//     return;
// }

// // Exclude NaN values.
// if (NaNValues && Number.isNaN(value)) {
//     return;
// }

// // Exclude null values.
// if (nullValues && value === null) {
//     return;
// }

// // Exclude functions.
// if (functions !== false && typeof value == "function") {
//     return;
// }

// // Exclude undefined values.
// if (undefinedValues && value === undefined) {
//     return;
// }

// // Append when recursing arrays.
// if (Array.isArray(result)) {
//     return result.push(value);
// }
