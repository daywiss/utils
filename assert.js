//truthy
export default function assert(test,message,fn){
  if(test) return test
  if(Error.captureStackTrace == null) throw new Error(message)

  const err = new Error(message)
  Error.captureStackTrace(err,fn || assert)
  throw err
}
//not undefined
export const exists = (test,message,fn) => {
  assert(test != null,message,fn || exists)
  return test
}
