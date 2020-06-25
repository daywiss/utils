const test = require('tape')
const {loop} = require('..').async
const {assert} = require('..')

test('async-loop',t=>{
  t.test('loop',async t=>{
    const count = 100
    t.plan(count)
    let i = 0
    loop(async x=>{
      assert(i < count)
      ++i
      t.ok(i)
    },0).catch(x=>x)
  })
})

