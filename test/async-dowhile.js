const test = require('tape')
const {doWhile} = require('..').async
const {assert} = require('..')

test('async-doWhile',t=>{
  t.test('doWhile',async t=>{
    const count = 100
    t.plan(count)
    let i = 0
    doWhile(async x=>{
      ++i
      t.ok(i)
      return i < count
    },0)
  })
})

