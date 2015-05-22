if(typeof chai === 'undefined'){
  var chai = module.exports = require('chai')
  var chaiGenerator = require('..')
  chai.use(chaiGenerator)
}

describe('assert', function(){
  describe('.yield()', function(){
    it('works with { value: "val", done: false }', function(){
      var next = { value: 'val', done: false }
      chai.assert.yield(next, 'val')
    })
  })

  describe('.notYield()', function(){
    it('works with { value: "val", done: false }', function(){
      var next = { value: 'val', done: false }
      chai.assert.notYield(next, 'foo')
    })
  })

  describe('.deepYield()', function(){
    it('works with { value: ["deep", "equals"], done: false }', function(){
      var next = { value: ['deep', 'equals'], done: false }
      chai.assert.deepYield(next, ['deep', 'equals'])
    })
  })

  describe('.notDeepYield()', function(){
    it('works with { value: ["deep", "equals"], done: false }', function(){
      var next = { value: ['deep', 'equals'], done: false }
      chai.assert.notDeepYield(next, ['deep', 'not-equals'])
    })
  })

  describe('.return()', function(){
    it('works with { value: "val", done: true }', function(){
      var next = { value: 'val', done: true }
      chai.assert.return(next, 'val')
    })
  })

  describe('.notReturn()', function(){
    it('works with { value: "val", done: true }', function(){
      var next = { value: 'val', done: true }
      chai.assert.notReturn(next, 'foo')
    })
  })

  describe('.deepReturn()', function(){
    it('works with { value: ["deep", "equals"], done: true }', function(){
      var next = { value: ['deep', 'equals'], done: true }
      chai.assert.deepReturn(next, ['deep', 'equals'])
    })
  })

  describe('.notDeepYield()', function(){
    it('works with { value: ["deep", "equals"], done: true }', function(){
      var next = { value: ['deep', 'equals'], done: true }
      chai.assert.notDeepReturn(next, ['deep', 'not-equals'])
    })
  })

})
