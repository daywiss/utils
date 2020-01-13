import reduce from './reduce'

export default (list,promise)=>{
  return reduce(list,async (result,...args)=>{
    if(await promise(...args)){
      result.push(args[0])
    }
    return result
  },[])
}
