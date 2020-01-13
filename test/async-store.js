const test = require('tape')
const {Dispatch,sleep} = require('..').async
// const Dispatch = require('../async/dispatch')
const {Store,times} = require('..')

test('async-store',t=>{
  let store,dispatch
  t.test('init',t=>{
    store = Store()
    dispatch = Dispatch(store)(async (state,action,...args)=>{
      await sleep(Math.random()*5)
      // console.log('testing',state,action,args)
      return {
        ...state,
        [action]:args[0]
      }
    })             
    
    t.ok(store)
    t.ok(dispatch)
    t.end()
  })
  // t.test('dispatch',t=>{
  //   store.dispatch('test',true)
  //   t.end()
  // })
  t.test('batch',t=>{
    const count = 1000
    console.time('test')
    const off = store.on(x=>{
      // console.log(x)
      if(x.test){ 
        off()
        t.end()
        console.timeEnd('test')
      }
    },
    (prev,next)=>{
      // console.log('prev,next',prev,next)
      return next && next.test != count-1
    })

    times(count,i=>{
      dispatch('test',i)
    })
  })
})

