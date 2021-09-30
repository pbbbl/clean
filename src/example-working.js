// const jsonfile = require("jsonfile");
// const is = require("is");

// /**
//  * Module dependencies.
//  */

// const isEmpty = require("lodash.isempty");
// const isPlainObject = require("lodash.isplainobject");
// const transform = require("lodash.transform");

// /**
//  * Export `clean` function.
//  */
// const defaultOptions = {
//     cleanKeys: [],
//     cleanValues: [],
//     emptyArrays: true,
//     emptyObjects: true,
//     emptyStrings: true,
//     fns: true,
//     NaNValues: true,
//     nullValues: true,
//     undefinedValues: true,
// };
// let options = false;
// function clean(object, options) {
//     options = options ? options : { ...defaultOptions };
//     for (var key in defaultOptions) {
//         if (is.undefined(options[key])) {
//             options[key] = defaultOptions[key];
//         }
//     }
//     let { cleanKeys, cleanValues, emptyArrays, emptyObjects, emptyStrings, fns, NaNValues, nullValues, undefinedValues } = options;
//     return transform(object, (result, value, key) => {
//         // Exclude specific keys.

//         if (cleanKeys.includes(key)) {
//             return;
//         }

//         // Recurse into arrays and objects.
//         if (Array.isArray(value) || isPlainObject(value)) {
//             value = clean(value, options, false);
//         }

//         // Exclude specific values.
//         if (cleanValues.includes(value)) {
//             return;
//         }

//         // Exclude empty objects.
//         // console.log({ emptyObjects, isPlainObject: isPlainObject(value), isEmpty: isEmpty(value) });
//         if (emptyObjects && isPlainObject(value) && isEmpty(value)) {
//             // console.log("emptyObjects", { value });
//             return;
//         }

//         // Exclude empty arrays.
//         if (emptyArrays && is.array(value) && (is.empty(value) || is.array.empty(value))) {
//             return;
//         }

//         if (emptyStrings && isEmptyString(value)) {
//             return;
//         }

//         // Exclude NaN values.
//         if (NaNValues && Number.isNaN(value)) {
//             // console.log("NaNValues", { value });
//             return;
//         }

//         // Exclude functions.
//         if (fns && typeof value == "function") {
//             // console.log("fns", { value });
//             return;
//         }

//         // Exclude null values.
//         if (nullValues && value === null) {
//             // console.log("nullValues", { value });
//             return;
//         }

//         // Exclude undefined values.
//         if (undefinedValues && value === undefined) {
//             // console.log("undefined", { value: value || undefined });
//             return;
//         }

//         // Append when recursing arrays.
//         if (Array.isArray(result)) {
//             // console.log("append recursive array", { value });
//             return result.push(value);
//         }

//         result[key] = value;
//     });
// }

// function isEmptyString(value) {
//     const str = is.string(value) ? `${value}` : false;
//     return str ? is.empty(str) || is.empty(str.replace(/\s/g, "")) : false;
// }
// const tryobj = {
//     _cleanKeys: {
//         no: "removed if matching key",
//         yes: "You should see me",
//     },
//     _cleanValues: { no: "removed", yes: "You should see me" },
//     _emptyArrays: { fails: [], passes: ["hi"], pass: [{ pass: true, fails: [[], []] }, "hello"] },
//     _emptyObjects: { failsEmptyObjects: {}, passes: "hi", pass: { pass: true, failsEmptySubObjects: {} } },
//     _emptyStrings: { failString: "", failString2: "   ", passString: "hasValue", passString2: "hasValue2" },
//     _fns: {
//         fnFails: () => {
//             return "failed";
//         },
//         fnPasses: "You should see me",
//     },
//     _NaNValues: { failIfTrue: NaN, pass: 25, pass2: 15, pass3: "205" },
//     _NullValues: { fail1: null, fail2: null, pass2: 15, pass3: "205" },
//     _undefinedValues: { fail1: undefined, pass: true, fail2: undefined, pass2: "hello" },
// };
// // const tryResults = clean(tryobj, { ...defaultOptions, emptyStrings: true });
// const tryResults = clean(tryobj, {
//     cleanKeys: [],
//     cleanValues: [],
//     emptyArrays: false,
//     emptyObjects: false,
//     emptyStrings: false,
//     fns: true,
//     NaNValues: false,
//     nullValues: false,
//     undefinedValues: true,
// });

// if (tryResults) {
//     const ts = () => {
//         const d = new Date();
//         return d.getTime();
//     };
//     const filename = `./_tests/results--${ts()}.json`;
//     jsonfile.writeFile(filename, tryResults, function (err, fileRes) {
//         if (err) {
//             const writeError = { error: "failed in writeFileSync", filedata, details: err, results };
//             console.error(writeError);
//             return;
//         } else {
//             return fileRes;
//         }
//     });
// }
// /**

// // const runTests = () => {
// //     const testsConfig = [

// //     ];
// // {
//         //     id: "cleanKeys",
//         //     tests: [[], ["no"]],
//         //     testObject: { no: "removed if matching key", yes: "You should see me" },
//         // },

//         // {
//         //     id: "cleanValues",
//         //     tests: [["removed"], []],

//         //     testObject: { no: "removed", yes: "You should see me" },
//         // },
//         // {
//         //     id: "emptyArrays",

//         //     testObject: { fails: [], passes: ["hi"], pass: [{ pass: true, fails: [[], []] }, "hello"] },
//         // },
//         // {
//         //     id: "emptyObjects",
//         //     tests: [true, false],
//         //     testObject: { failsEmptyObjects: {}, passes: "hi", pass: { pass: true, failsEmptySubObjects: {} } },
//         // },
//         {
//             id: "emptyStrings",
//             tests: [true, false],
//             testObject: { failString: "", failString2: "   ", passString: "hasValue", passString2: "hasValue2" },
//         },
//         // {
//         //     id: "fns",
//         //     tests: [true,false],
//         //     testObject: {
//         //         failIfTrue: () => {
//         //             return "failed";
//         //         },
//         //         pass: "You should see me",
//         //     },
//         // },

//         // {
//         //     id: "NaNValues",
//         //     tests: [true,false],
//         //     testObject: { failIfTrue: NaN, pass: 25, pass2: 15, pass3: "205" },
//         // },
//         // {
//         //     id: "NullValues",
//         //     tests: [true,false],
//         //     testObject: { failIfTrue: null, pass: true },
//         // },
//         // {
//         //     id: "undefinedValues",
//         //     tests: [true,false],
//         //     testObject: { failIfTrue: undefined, pass: true },
//         // },
// //     const results = testsConfig.map(({ id, tests, testObject }) => {
// //         return tests.map(testOption => {
// //             const testOptions = {
// //                 [id]: testOption,
// //             };
// //             const outputValue = clean(testObject, testOptions, true);
// //             return { option: testOption, output: outputValue, input: testObject };
// //         });
// //     });

// //     function toFile() {
// //         try {
// //             // let filedata = {};
// //             // let arr = options.fns === false || options.undefinedValues === false ? clean(results) : results;
// //             // filedata.resultsArray = arr.map((item, index) => {
// //             //     const { id } = testsConfig[index];

// //             //     filedata[id] = item;
// //             //     return { ...item };
// //             // });
// //             jsonfile.writeFile(filename, { results }, function (err, fileRes) {
// //                 if (err) {
// //                     const writeError = { error: "failed in writeFileSync", filedata, details: err, results };
// //                     console.error(writeError);
// //                     return;
// //                 } else {
// //                     return fileRes;
// //                 }
// //             });
// //         } catch (error) {
// //             const writeError2 = { error: "could not set file", filedata: "failed", details: error };

// //             console.error(writeError2);
// //             return false;
// //         }
// //     }
// //     toFile();

// //     return results || false;
// // };

// // runTests();
// */
