module.exports = (fn=x=>x) => {
  let pull
  function next(code,data){
    if(code === 0){
      pull = (...args)=>setTimeout(data,0,...args)
      pull(1)
    }
    if(code === 1) pull(1)
    if(code === 2) fn(data)
  }
  return source =>{
    source(0,next)
  }
}             
