module.exports = function(chai, utils){
  function extractNext(obj){
    if (typeof obj.next === 'function') {
      var generator = obj
      return generator.next()
    } else if ('done' in obj && 'value' in obj) {
      return obj
    } else {
      // not a real generator
    }
  }

  function description(next){
    var description = next.done ? 'return "' : 'yield "'
    description += next.value + '"'

    return description
  }

  function assertNext(context, expected){
    var actual = extractNext(context._obj)
    if(!actual){
      return _super.apply(this, arguments)
    }

    context.assert(
      actual.value === expected.value && actual.done === expected.done
    , "expected #{this} to " + description(expected) + " but received " + description(actual)
    , "expected #{this} to not " + description(actual)
    , expected
    , actual
    )
  }

  chai.Assertion.overwriteMethod('yield', function(_super){
    return function(expectedValue){
      assertNext(this, { value: expectedValue, done: false })
    }
  })

  chai.Assertion.overwriteMethod('return', function(_super){
    return function(expectedValue){
      assertNext(this, { value: expectedValue, done: true })
    }
  })
}
