var chai = module.exports = require('chai')
var chaiGenerator = require('..')

chai.use(chaiGenerator)

var DEFAULT_RETURN
var DEFAULT_YIELD

function *createCounter(){
  var i = 0;
  while(1){
    yield i++;
  }
}

function *createReturnOnly(){
  return DEFAULT_RETURN
}

function *createNtimes(n){
  for (var i = 0; i < n; i++) {
    yield DEFAULT_YIELD
  }
  return DEFAULT_RETURN
}

function *createEcho(echo){
  while(1){
    echo = yield echo
  }
}

describe('chai-generator', function(){
  describe('.to.yield(value)', function(){
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

    it('works with { value: "val", done: false }', function(){
      var next = { value: 'val', done: false }
      chai.expect(next).to.yield('val')
    })
  })

  describe('.to.return(value)', function(){
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

    it('works with { value: "val", done: true }', function(){
      var next = { value: 'val', done: true }
      chai.expect(next).to.return('val')
    })
  })

  describe('generator with next parameter', function(){
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
