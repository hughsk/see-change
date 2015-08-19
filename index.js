var Symbol = require('es6-symbol')

module.exports = SeeChange
module.exports.array = SeeChangeArray

var ISARRAY = Symbol('see-change-array')

function SeeChange (checkers) {
  var values = []

  for (var i = 0; i < checkers.length; i++) {
    values[i] = checkers[i]()
  }

  return check

  function check () {
    var failed = false

    for (var i = 0; i < checkers.length; i++) {
      var check = checkers[i]
      var next = check()

      if (check[ISARRAY]) {
        if (next) {
          failed = true
          values[i] = next
        }

        continue
      }

      var prev = values[i]
      if (next !== prev) {
        failed = true
        values[i] = next
      }
    }

    return failed
  }
}

function SeeChangeArray (array) {
  var prevLength = array.length
  var mainChecker

  updateCheckers()
  check[ISARRAY] = true

  return check

  function check () {
    if (array.length !== prevLength) {
      prevLength = array.length
      updateCheckers()
      return true
    }

    return mainChecker()
  }

  function updateCheckers () {
    var checkers = []

    for (var i = 0; i < array.length; i++) {
      (function (i) {
        checkers[i] = function checkArrayValue () {
          return array[i]
        }
      })(i)
    }

    mainChecker = SeeChange(checkers)
  }
}
