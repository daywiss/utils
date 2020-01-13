const test = require('tape')
const {Curry} = require('..')

test('curry',t=>{
  t.test('0',t=>{
    const fn = (...args) =>args
    const curry = Curry(fn)
    const result = curry(1,2,3)
    t.equal(result.length,3)
    t.end()
  })
  t.test('1',t=>{
    const fn = (...args) =>args
    const curry = Curry(fn,1)
    console.log(curry.toString())
    const result = curry(1)(2,3)
    t.equal(result.length,3)
    t.end()
  })
  t.test('2',t=>{
    const fn = (...args) =>args
    const curry = Curry(fn,2)
    console.log(curry.toString())
    const result = curry(1)(2)(3)
    console.log(result)
    t.equal(result.length,3)
    t.end()
  })
})
