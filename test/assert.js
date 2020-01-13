const {assert,exists} = require('..')
const test = require('tape')

test('assert',t=>{
  t.test('undefined',t=>{
    try{
      assert(undefined,'ok')
    }catch(err){
      t.ok(err)
      t.end()
    }
  })
  t.test('false',t=>{
    try{
      assert(false,'ok')
    }catch(err){
      t.ok(err)
      t.end()
    }
  })
  t.test('false',t=>{
    try{
      assert(0,'ok')
    }catch(err){
      t.ok(err)
      t.end()
    }
  })
  t.test('exists',t=>{
    const result = exists(0,'ok')
    t.equal(result,0)
    t.end()
  })
  t.test('exists',t=>{
    const result = exists(false,'ok')
    t.equal(result,false)
    t.end()
  })
  t.test('exists',t=>{
    try{
      const result = exists(undefined,'ok')
    }catch(err){
      console.log(err)
      t.ok(err)
      t.end()
    }
  })
})
