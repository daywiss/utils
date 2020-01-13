const test = require('tape')
const {reduce} = require('..').async

test('async-reduce',t=>{
  t.test('test1',async t=>{
    const list = ['1','2','3']
    const result = await reduce(list,async (result,next)=>{
      result[next] = next
      return result
    },{})
    t.equal(result[1],'1')
    t.equal(result[2],'2')
    t.equal(result[3],'3')
    t.ok(result)
    t.end()
  })
})
