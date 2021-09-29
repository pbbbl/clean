# clean-deep-pbbbl (clean-deep)

> Forked [clean-deep](https://github.com/nunofgs/clean-deep/tree/v3.4.0p) with new `fn` option for removing functions/methods. Traverses arrays and objects.

Removes _methods (functions)_ empty _objects_, _arrays_, empty _strings_, _NaN_, _null_, and _undefined_ values from objects. Does not alter the original object.

## Installation

<!-- Install the package via `npm`: -->

Download the repo to your root directory, and install via npm:

```
npm i -S clean-deep-pbbbl
```

## Usage

### Arguments

1. `object` _(Object)_: The source object.
2. `[options]` _(Object)_: An optional object with the following options:

| Option            | Default value | Description                                                                                                           |
| ----------------- | ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `cleanKeys`       | []            | Remove specific keys, ie: `['foo', 'bar', ' ']`                                                                       |
| `cleanValues`     | []            | Remove specific values, ie: `['foo', 'bar', ' ']`                                                                     |
| `emptyArrays`     | true          | Remove empty arrays, ie: `[]`                                                                                         |
| `emptyObjects`    | true          | Remove empty objects, ie: `{}`                                                                                        |
| `emptyStrings`    | true          | Remove empty strings, ie: `''`                                                                                        |
| `fn`              | true          | Remove functions, ie: `()=>{}, function(){}` - ony in [`pbbbl-clean-deep`](https://github.com/pbbbl/pbbbl-clean-deep) |
| `NaNValues`       | false         | Remove NaN values, ie: `NaN`                                                                                          |
| `nullValues`      | true          | Remove null values, ie: `null`                                                                                        |
| `undefinedValues` | true          | Remove undefined values, ie: `undefined`                                                                              |

_(Object)_: Returns the cleansed object.

### Example

```javascript
const cleanDeep = require("clean-deep");
const object = {
    ant: "bug",
    bear: "",
    cat: [],
    dog: {},
    eel: null,
    fox: undefined,
    goat: ()=>{
        return true
    },
    horse: function(){
        return true,
    },
    iguana: {
        ant: "boz",
        bear: "",
        cat: ["cheeta","lion","",null],
        dog: true,
        eel: false
    },
};

const output = cleanDeep(object);
/* output ==>
{
    ant: "bug",
    iguana: {
        ant: "boz",
        cat: ["cheeta","lion"],
        dog: true,
        eel: false
    },
}
*/
```

## Tests

```javascript
$ npm test
```

## Release

<!-- ```sh
npm version [<newversion> | major | minor | patch] -m "Release %s"
``` -->

## License

MIT

<!-- [npm-image]: https://img.shields.io/npm/v/clean-deep.svg?style=flat-square -->
<!-- [npm-url]: https://npmjs.org/package/clean-deep -->
<!-- [workflow-image]: https://github.com/pbbbl/pbbbl-clean-deep/workflows/Node%20CI/badge.svg -->
<!-- [workflow-url]: https://github.com/nunofgs/clean-deep/actions -->
