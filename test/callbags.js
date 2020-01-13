const test = require('tape')
const times = require('../times')
const pipe = require('callbag-pipe')

const fromIterator = require('../callbags/fromIterator.js')
const fromPromise = require('../callbags/fromPromise.js')
const fromFunction = require('../callbags/fromFunction.js')
const tap = require('../callbags/tap.js')
const done = require('../callbags/done.js')
const each = require('../callbags/each.js')
const map = require('../callbags/map')
const reduce = require('../callbags/reduce')
const filter = require('../callbags/filter')

test('callbags',t=>{
  // t.test('fromIterator',t=>{
  //   const input = [1,2,3,4,5]

  //   t.plan(input.length + 1)
   
  //   pipe(
  //     fromIterator(input),
  //     tap(t.ok),
  //     done(t.notOk)
  //   )
  // })
  // t.test('fromPromise',t=>{

  //   pipe(
  //     fromPromise((async x=>{
  //       return true
  //     })()),
  //     tap(t.ok),
  //     done(t.end)
  //   )
  // })
  // t.test('fromPromise Error',t=>{
  //   t.plan(1)
  //   pipe(
  //     fromPromise((async x=>{
  //       throw new Error('err')
  //     })()),
  //     done(t.ok)
  //   )
  // })
  // t.test('fromFunction',t=>{
  //   const count = 10
  //   t.plan(count+1)
  //   const [source,write,end] = fromFunction()
  //   pipe(source,tap(x=>t.ok(x+1)),done(t.notOk))
  //   times(count,write)
  //   end()
  // })
  // t.test('map',t=>{
  //   const input = [1,2,3,4,5]
  //   pipe(
  //     fromIterator(input),
  //     map(x=>x*2),
  //     tap(t.ok),
  //     done(t.end)
  //   )
  // })
  // t.test('reduce',t=>{
  //   const input = [1,2,3,4,5]
  //   pipe(
  //     fromIterator(input),
  //     reduce((sum,next)=>sum+next,0),
  //     tap(x=>t.equal(x,15)),
  //     done(t.end),
  //   )
  // })
  // t.test('reduce',t=>{
  //   const input = [1,2,3,4,5]
  //   pipe(
  //     fromIterator(input),
  //     reduce((sum,next)=>sum+next,0),
  //     tap(x=>t.equal(x,15)),
  //     done(t.end),
  //   )
  // })
  // t.test('filter',t=>{
  //   const input = [1,2,3,4,5]
  //   pipe(
  //     fromIterator(input),
  //     filter(x=>x%2),
  //     tap(console.log),
  //     done(t.end),
  //   )
  // })
  t.test('stress',t=>{
    const a = times(100000,x=>x)
    function add1(x) {
      return x + 1;
    }

    function even(x) {
      return x % 2 === 0;
    }

    function sum(x, y) {
      return x + y;
    }
    pipe(
      fromIterator(a),
      filter(even),
      map(add1),
      reduce(sum,0),
      tap(console.log),
      done(t.end))
  })
})
