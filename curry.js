function curry(fn,depth=0,args=[]){
  if(depth==0) return fn(...args)
  return (...rest)=>curry(fn,depth-1,[...args,...rest])
}

export default (fn,depth)=>(...args)=>curry(fn,depth,args)
