module.exports = function(chai, utils){
  function extractNext(obj){
    if (typeof obj.next === 'function') {
      var generator = obj
      return generator.next()
    } else if ('done' in obj) {
      return obj
    }

    // not a real generator
  }

  chai.Assertion.overwriteMethod('yield', function(_super){
    return function(expectedValue){
      var next = extractNext(this._obj)
      if(!this){
        return _super.apply(this, arguments)
      }

      this.assert(
          next.done === false
        , "expected #{this} to yield #{exp} but received return #{act}"
        , "expected #{this} to not yield #{exp}"
        , expectedValue // expected
        , next.value // actual
      )

      this.assert(
          next.value === expectedValue
        , "expected #{this} to yield #{exp} but received yield #{act}"
        , "expected #{this} to not yield #{exp}"
        , expectedValue // expected
        , next.value // actual
      )
    }
  })

  chai.Assertion.overwriteMethod('return', function(_super){
    return function(expectedValue){
      var next = extractNext(this._obj)
      if(!this){
        return _super.apply(this, arguments)
      }

      this.assert(
          next.done === true
        , "expected #{this} to return #{exp} but received yield #{act}"
        , "expected #{this} to not return #{exp}"
        , expectedValue // expected
        , next.value // actual
      )

      this.assert(
          next.value === expectedValue
        , "expected #{this} to return #{exp} but received return #{act}"
        , "expected #{this} to not return #{exp}"
        , expectedValue // expected
        , next.value // actual
      )
    }
  })
}
