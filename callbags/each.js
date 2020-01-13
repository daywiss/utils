
module.exports = (fn=x=>x) => {
  let end = false
  return source => {
    source(0,(code,data)=>{
      // console.log('each',code,data)
      if(code === 0){
        source(1)
      }
      if(code === 1){
        if(end) return 
        fn(data)
        source(1)
      }
      if(code === 2){
        end = true
      }
    })
  }
}
