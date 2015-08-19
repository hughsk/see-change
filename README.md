# see-change
![](http://img.shields.io/badge/stability-stable-orange.svg?style=flat)
![](http://img.shields.io/npm/v/see-change.svg?style=flat)
![](http://img.shields.io/npm/dm/see-change.svg?style=flat)
![](http://img.shields.io/npm/l/see-change.svg?style=flat)

Detect changes in the return values of a list of functions. Useful for memoizing
functions with multiple dependencies: e.g. only updating a visualization when
specific values have changed.

## Usage

[![NPM](https://nodei.co/npm/see-change.png)](https://nodei.co/npm/see-change/)

### `change = seechange(functions)`

Takes an array of `functions` that return a value and returns a `change`
function.

### `change()`

Returns `true` if the return values of any of the previously supplied functions
have changed since it was last called.

### `arrayChanged = seechange.array(array)`

Takes an `array` of values and returns a `change` function.

### `arrayChanged()`

Returns `true` if any elements in the array have changed since the function
was last called. May also be supplied as a function in `seechange`, and changes
will propogate upwards as expected.

## Example

``` javascript
const seechange = require('see-change')

var highlighted = 0
var viewport = [0, 0, 0, 0]
var selected = 0

const change = seechange([
  () => highlighted,
  () => selected,
  seechange.array(viewport)
])

// When any of the functions return a different value,
// `change()` will return `true`:
change() // false
selected = 20
change() // true
change() // false

// seechange.array will check to see if an array has changed
viewport[0] = 2
change() // true
change() // false
```

This makes it easy to transparently check for changes at the beginning of each
frame in a render loop, e.g.:

``` javascript
function render () {
  if (!change()) return
  // shiny render code...
}
```

## License

MIT. See [LICENSE.md](http://github.com/hughsk/see-change/blob/master/LICENSE.md) for details.
