module.exports = (fn=x=>x) => source => {
  let push,pull
  function next(code,data){
    // console.log(code,data)
    if(push == null) return
    if(code === 0){
      pull = (c,d)=>setTimeout(data,0,c,d)
    }
    if(code === 1){
      fn(data) ? push(1,data) : pull(1)
    }
    if(code === 2){
      push(code,data)
      push = null
    }
  }
  return function filter(code,data){
    // console.log(code,data)
    if(code === 0){
      push = data
      source(0,next)
      push(0,filter)
    } else{
      pull(code,data)
    }
  }
}
