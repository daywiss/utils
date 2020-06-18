const test = require('tape')
const {Store,Dispatch} = require('..')

test('store',t=>{
  let store,dispatch
  t.test('init',t=>{

    store = Store()
    // dispatch = Dispatch(store)((state,action,...args)=>{
    //   return {
    //     ...state,
    //     [action]:args[0]
    //   }
    // })             
    t.ok(store)
    t.end()
  })
  t.test('set',t=>{
    const off = store.on(state=>{
      t.ok(state)
      off()
      t.end()
    })
    store.set({
      a:'test',
    })
  })
  t.test('set',t=>{
    const off = store.on(state=>{
      t.ok(state)
      off()
      t.end()
    },[])
    store.set({
      a:'test',
    })
  })
  t.test('set',t=>{
    const off = store.on(state=>{
      t.ok(state)
      off()
      t.end()
    },'')
    store.set({
      a:'test',
    })
  })
  t.test('set multi path',t=>{
    const off = store.on(state=>{
      t.ok(state)
      off()
      t.end()
    },['',['a']])

    store.set({
      a:'test',
    })
  })
})
