const assert = require('../assert')
module.exports = (promise={}) => {
  assert(promise.then,'Requires a promise',module.exports)
  let push 
  return function fromPromise(code,data){
    if(code === 0){
      push = data
      push(0,fromPromise)
    }
    if(code === 1){
      if(push == null) return
      promise.then(x=>{
        if(push == null) return
        push(1,x)
        push(2)
        push = null
      },e=>{
        if(push) push(2,e)
        push = null
      })
    }else if(code === 2){
      push = null
    }
  }
}                   
