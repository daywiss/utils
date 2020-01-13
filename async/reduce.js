export default async (list=[],promise,first) => {
  list = Object.values(list)
  let result = first
  let i = 0
  for(let next of list){
    result = await promise(result,next,i,list)
    ++i
  }
  return result
}
