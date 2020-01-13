module.exports = source =>{
  let push
  function open(stream,cb){
    stream(0,(code,data)=>{
      if(code === 0){
        return stream(1)
      }
      if(code === 1) cb(code,data)
      if(code === 2 && data) cb(code,data)
    })
  }
  function next(code,data){
    // if(code ===1 ) console.log('flatten enqueue',data)
    if(code === 1) open(data,push)
    if(code === 2) push(code,data)
  }

  return function flatten(code,data){
    if(code === 0){
      // console.log('flattening init')
      push = data
      source(0,next)
      push(0,flatten)
    }else{
      source(code,data)
    }
  }
}                  
