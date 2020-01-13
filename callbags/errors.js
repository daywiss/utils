module.exports = (fn=x=>x) => source => {
  let push
  function next(code,data){
    if(code === 2){
      (data != null) 
        ? fn(data,res=>push(1,res))
        : push(code,data)
    }
    if(code === 1){
      push(code,data)
    }
  }

  return function errors(code,data){
    if(code === 0){
      push = data
      source(0,next)
      push(0,errors)
    } else{
      source(code,data)
    }
  }
}                 
