module.exports = (fn=x=>x) => source => {
  let push 

  function next(code,data){
    // console.log('tap next',code,data)
    if(code === 1){
      fn(data)
      push(code,data)
    }
    if(code === 2){
      push(code,data)
      push = null
    }
  }

  return function tap(code,data){
    if(code === 0){
      // console.log('tap',source,code,data.toString())
      push = data
      source(0,next)
      push(0,tap)
    }else{
      source(code,data)
    }
  }
}           
