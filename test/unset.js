const test = require('tape')
const unset = require('..').unset
test('unset',t=>{
  t.test('1',t=>{
    let state = {test:{test:'test'}}
    const result = unset({...state},['test','test'])
    t.notOk(result.test.test)
    t.ok(state.test.test)
    t.end()
  })
  t.test('2',t=>{
    let state = {test:{test:'test'}}
    const result = unset({...state},['test','a','b'])
    t.deepEqual(state,result)
    t.ok(state.test.test)
    t.end()
  })
})

