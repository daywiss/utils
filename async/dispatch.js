import Series from './series'
const Dispatch = store => (reducer=async x=>x) =>{
  async function dispatch(...args){
    return store.set(await reducer(store.get(),...args))
  }
  return Series(dispatch)
}

export default Dispatch

