module.exports = (fn=x=>x,result) => source => {
  let push,pull
  let i = 0

  function next(code,data){

    if(push == null) return
    if(code === 0){
      pull = (...args)=>setTimeout(data,0,...args)
    }
    if(code === 1){
      result = fn(result,data,i)
      //we must thunk because reduce consomes till end of stream
      pull(1)
    }
    if(code === 2){
      //no errors, so push result and end stream
      if(data == null){
        // console.log('reducer ending',code,data)
        push(1,result)
        push(2)
        push = null
      }else{
        //push error from upstream
        push(code,data)
        push = null
      }
      //stream ended so stop pushing
    }
  }

  return function reduce(code,data){
    if(code === 0){
      push = data
      source(0,next)
      push(0,reduce)
    }
    if(code === 1){
      // console.log('reduce pull',code,result)
      pull(1)
    }
    if(code === 2){
      pull(code,data)
    }
  }
}
                  
