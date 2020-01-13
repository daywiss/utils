const test = require('tape')
const {Store,Dispatch} = require('..')

test('store',t=>{
  let store,dispatch
  t.test('init',t=>{

    store = Store()
    dispatch = Dispatch(store)((state,action,...args)=>{
      console.log(state,action,args)
      return {
        ...state,
        [action]:args[0]
      }
    })             
    t.ok(store)
    t.end()
  })
  t.test('dispatch',t=>{
    dispatch('test',true)
    t.end()
  })
  // t.test('curry',t=>{
  //   store.curry()('test')(true)
  //   t.end()
  // })
  // t.test('curry2',t=>{
  //   store.curry(2)('test')(true)()
  //   t.end()
  // })
})
