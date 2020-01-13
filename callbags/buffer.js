module.exports = (limit=0) => source =>{
  const buffer = []
  let push 
  let ready = false

  function next(code,data){
    if(code > 0) queue(code,data)
  }

  function queue(code,data){
    // console.log('start queue',{ready,buffer,data})
    if(ready){
      push(code,data)
      ready = false
    }else{
      if(limit && buffer.length === limit) {
        push(2,new Error(`Buffer Overflow limit ${limit}`))
      }else{
        buffer.push([code,data])
      }
    }
    // console.log('queue',buffer)
  }
  function dequeue(){
    // console.log('buffer pull',buffer)
    if(buffer.length){
      const [code,data] = buffer.shift()
      push(code,data)
    }else{
      ready = true
      source(1)
    }
  }
  return function buffer(code,data){
    if(code ===0){
      push = data
      source(0,next)
      push(0,buffer)
    }else if(code === 1){
      dequeue()
    }else{
      source(code,data)
    }
  }
}                 
