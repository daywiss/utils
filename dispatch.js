const Dispatch = store => (reducer=x=>x) => (...args)=>{
  return store.set(reducer(store.get(),...args))
}

export default Dispatch
