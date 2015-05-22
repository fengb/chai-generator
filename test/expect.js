if(typeof chai === 'undefined'){
  var chai = module.exports = require('chai')
  var chaiGenerator = require('..')
  chai.use(chaiGenerator)
}

var DEFAULT_RETURN = 'retoin'
var DEFAULT_YIELD = 'yeild'

function* createCounter(){
  var i = 0;
  while(1){
    yield i++;
  }
}

function* createReturnOnly(){
  return DEFAULT_RETURN
}

function* createNtimes(n){
  for (var i = 0; i < n; i++) {
    yield DEFAULT_YIELD
  }
  return DEFAULT_RETURN
}

function* createEcho(echo){
  while(1){
    echo = yield echo
  }
}

describe('expect()', function(){
  describe('.to.yield(value)', function(){
    it('works with { value: "val", done: false }', function(){
      var next = { value: 'val', done: false }
      chai.expect(next).to.yield('val')
    })

    it('works with counting generator', function(){
      var generator = createCounter()
      chai.expect(generator).to.yield(0)
      chai.expect(generator).to.yield(1)
      chai.expect(generator).to.yield(2)
      chai.expect(generator).to.yield(3)
      chai.expect(generator).to.yield(4)
      chai.expect(generator).to.yield(5)
    })

    it('works with ntimes generator', function(){
      var generator = createNtimes(3)
      chai.expect(generator).to.yield(DEFAULT_YIELD)
      chai.expect(generator).to.yield(DEFAULT_YIELD)
      chai.expect(generator).to.yield(DEFAULT_YIELD)
    })
  })

  describe('.to.deep.yield(value)', function(){
    it('works with { value: "val", done: false }', function(){
      var next = { value: 'val', done: false }
      chai.expect(next).to.deep.yield('val')
    })

    it('works with { value: ["deep", "equals"], done: false }', function(){
      var next = { value: ['deep', 'equals'], done: false }
      chai.expect(next).to.deep.yield(['deep', 'equals'])
    })
  })

  describe('.not.to.yield(value)', function(){
    it('works with { value: "val", done: false }', function(){
      var next = { value: 'val', done: false }
      chai.expect(next).not.to.yield('foo')
    })

    it('works when yielding the wrong value', function(){
      var generator = createCounter()
      chai.expect(generator).not.to.yield(4)
      chai.expect(generator).not.to.yield(-1)
    })

    it('works when returning', function(){
      var generator = createReturnOnly()
      chai.expect(generator).not.to.yield(DEFAULT_RETURN)
    })

    it('works when deep yielding', function(){
      var next = { value: ['deep', 'equals'], done: false }
      chai.expect(next).not.to.yield(['deep', 'equals'])
    })
  })

  describe('.to.return(value)', function(){
    it('works with { value: "val", done: true }', function(){
      var next = { value: 'val', done: true }
      chai.expect(next).to.return('val')
    })

    it('works with return only generator', function(){
      var generator = createReturnOnly()
      chai.expect(generator).to.return(DEFAULT_RETURN)
    })

    it('works with ntimes generator', function(){
      var generator = createNtimes(4)
      generator.next()
      generator.next()
      generator.next()
      generator.next()
      chai.expect(generator).to.return(DEFAULT_RETURN)
    })
  })

  describe('.not.to.return(value)', function(){
    it('works with { value: "val", done: true }', function(){
      var next = { value: 'val', done: true }
      chai.expect(next).not.to.return('foo')
    })

    it('works when return the wrong value', function(){
      var generator = createReturnOnly()
      chai.expect(generator).not.to.return('fail')
    })

    it('works when yielding', function(){
      var generator = createCounter()
      chai.expect(generator).not.to.return(0)
      chai.expect(generator).not.to.return(1)
    })
  })

  describe('.next(parameter)', function(){
    describe('.to.yield(value)', function(){
      it('works with echo generator', function(){
        var generator = createEcho(1)
        chai.expect(generator.next()).to.yield(1)
        chai.expect(generator.next(4)).to.yield(4)
        chai.expect(generator.next('foo')).to.yield('foo')
        chai.expect(generator).to.yield(undefined)
      })
    })
  })
})
