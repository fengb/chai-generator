# chai-generator

This is a plugin for [chai](http://chaijs.com) to simplify the testing of
Javascript generators, as introduced in ES6 / ES2015.

## Setup

### node.js / io.js

```javascript
var chai = require('chai')
chai.use(require('chai-generator'))
```

### Browser

```html
<script src="chai.js"></script>
<script src="chai-generator.js"></script>
```

## Assertions

### .yield

Assert that a value is yielded from `generator.next()`. Returned values are not
considered yielded.

```javascript
expect(generator).to.yield(1)
expect(generator).not.to.yield('missing')
expect(generator.next(10)).to.yield(10)

generator.should.yield(1)
generator.should.not.yield('missing')
generator.next(10).should.yield(10)

assert.yield(generator, 1)
assert.notYield(generator, 'missing')
assert.yield(generator.next(10), 10)
```

### .return

Assert that a value is returned from `generator.next()`. Yielded values are not
considered returned.

```javascript
expect(generator).to.return(1)
expect(generator).not.to.return('missing')
expect(generator.next(10)).to.return(10)

generator.should.return(1)
generator.should.not.return('missing')
generator.next(10).should.return(10)

assert.return(generator, 1)
assert.notReturn(generator, 'missing')
assert.return(generator.next(10), 10)
```
