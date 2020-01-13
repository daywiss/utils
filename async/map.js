import reduce from './reduce'

export default (list,promise)=>{
  return reduce(list,async (result,...args)=>{
    result.push(await promise(...args))
    return result
  },[])
}
