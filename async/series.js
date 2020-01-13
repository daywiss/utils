export default (promise,parallel=1) => {
  const buffer = []
  let processing = 0

  function write(...args){
    if(processing < parallel){
      run(args)
    }else{
      buffer.push(args)
    }
  }

  function dequeue(){
    if(buffer.length){
      run(buffer.shift())
    }
  }

  function run(args){
    ++processing
    return promise(...args).finally(x=>{
      --processing
      dequeue()
    })
  }

  return write
}

