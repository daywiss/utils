function IncreasingId = (pad=16,nonce=0,max=0) => ()=>{
  let id = nonce.toString().padStart(pad,'0')
  ++nonce
  if(max) nonce = nonce % max
  return id
}

module.exports = IncreasingId

