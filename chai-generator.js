// Ugh - module dance
!function(context, chaiGenerator){
  if(typeof require === 'function' && typeof exports === 'object' && typeof module === 'object'){
    // node
    module.exports = chaiGenerator
  } else if(typeof define === 'function' && define.amd){
    // AMD
    define(function(){
      return chaiGenerator
    })
  } else {
    // assume browser
    chai.use(chaiGenerator)
  }
}(this, function(chai, utils){
  var deepEql = utils.eql

  function strictEql(first, second){
    return first === second
  }

  function extractNext(obj){
    if(typeof obj.next === 'function'){
      var generator = obj
      return generator.next()
    } else if('done' in obj && 'value' in obj){
      return obj
    } else {
      // not a real generator
    }
  }

  function description(next){
    var description = next.done ? 'return ' : 'yield '
    description += utils.objDisplay(next.value)

    return '{ ' + description + ' }'
  }

  function assertNext(_super, context, expected){
    var actual = extractNext(context._obj)
    if(!actual){
      return _super.apply(context, arguments)
    }

    var eql = utils.flag(context, 'deep') ? deepEql : strictEql
    context.assert(
      actual.done === expected.done && eql(actual.value, expected.value)
    , "expected #{this} to " + description(expected) + " but received " + description(actual)
    , "expected #{this} to not " + description(actual)
    , expected
    , actual
    )
  }

  chai.Assertion.overwriteMethod('yield', function(_super){
    return function(expectedValue){
      assertNext(_super, this, { value: expectedValue, done: false })
    }
  })

  chai.Assertion.overwriteMethod('return', function(_super){
    return function(expectedValue){
      assertNext(_super, this, { value: expectedValue, done: true })
    }
  })

  chai.assert.yield = function(val, exp, msg){
    new chai.Assertion(val, msg).to.yield(exp)
  }

  chai.assert.return = function(val, exp, msg){
    new chai.Assertion(val, msg).to.return(exp)
  }

  chai.assert.notYield = function(val, exp, msg){
    new chai.Assertion(val, msg).not.to.yield(exp)
  }

  chai.assert.notReturn = function(val, exp, msg){
    new chai.Assertion(val, msg).not.to.return(exp)
  }

  chai.assert.deepYield = function(val, exp, msg){
    new chai.Assertion(val, msg).to.deep.yield(exp)
  }

  chai.assert.deepReturn = function(val, exp, msg){
    new chai.Assertion(val, msg).to.deep.return(exp)
  }

  chai.assert.notDeepYield = function(val, exp, msg){
    new chai.Assertion(val, msg).not.to.deep.yield(exp)
  }

  chai.assert.notDeepReturn = function(val, exp, msg){
    new chai.Assertion(val, msg).not.to.deep.return(exp)
  }
})
