module.exports = (fn=x=>x) => source => {
  let push,pull
  function next(code,data){
    if(code === 0){
      pull = (c,d)=>setTimeout(data,0,c,d)
    }
    if(code === 1){
      push(1,fn(data))
    }
    if(code === 2){
      push(code,data)
    }
  }
  return function map(code,data){
    if(code === 0){
      push = data
      source(0,next)
      push(0,map)
    } else{
      pull(code,data)
    }
  }
}            
