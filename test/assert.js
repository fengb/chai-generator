var chai = module.exports = require('chai')
var chaiGenerator = require('..')

chai.use(chaiGenerator)

describe('assert', function(){
  describe('.yield()', function(){
    it('works with { value: ["deep", "equals"], done: false }', function(){
      var next = { value: ['deep', 'equals'], done: false }
      chai.assert.yield(next, ['deep', 'equals'])
    })
  })

  describe('.notYield()', function(){
    it('works with { value: "val", done: false }', function(){
      var next = { value: 'val', done: false }
      chai.assert.notYield(next, 'foo')
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
})
