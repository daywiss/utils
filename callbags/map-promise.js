const assert = require('../assert.js')
const times = require('../times')

const fromFunction = (fn=x=>x) => {
  let sinkcb,sinkready

  const source = (code,sink) => {
    // console.log('fromfunction',code,sink)
    if(code !==0) return
    sinkcb = sink
    sink(0,(t,d)=>{
      // console.log('fromfunction sink',code,sink)
      if(t === 1){
        sinkready = true
      }else{
        sinkready = false
      }
    })
  }
  function write(...args){
    assert(sinkready,'stream is not ready to handle data')
    sinkcb(1,fn(...args))
  }
  return [write,source]
}

const toPromise = callbag => {
  return new Promise((res,rej)=>{
    callbag
  })
}

const buffer = source => (code, sink) => {
  if(code !== 0) return
  let ready = false
  const buffer = []
  let sourcecb 
  source(0,(t,d)=>{
    if(t===0){
      sourcecb = d
    }else if(t === 1){
      if(ready){
        console.log('buffer push immediate')
        sink(1,d)
        ready = false
      }else{
        console.log('buffer enqueue')
        buffer.push(d)
      }
    }
  })
  sink(0,(t,d)=>{
    if(t === 1){
      if(buffer.length){
        console.log('sending buffer')
        sink(1,buffer.shift())
      }else{
        console.log('buffer setting sink ready')
        ready = true
      }
      sourcecb(1)
    }else{
      console.log('buffer sink not ready')
      // sourcecb(t,d)
      ready = false
    }
  })
}

// const buffer = source =>{
//   let ready = false
//   const buffer = []
//   let sink 
//   return (code, s) => {
//     if(code === 0){
//       sink = s
//       // console.log('buffer init')
//       source(0,(t,d)=>{
//         // console.log('buffer got',d,ready)
//         if(t === 1){
//           if(ready){
//             // console.log('buffer push immediate')
//             sink(1,d)
//             ready = false
//           }else{
//             // console.log('buffer enqueue')
//             buffer.push(d)
//           }
//         }
//       })
//     }
//     if(code === 1){
//       // console.log('buffer sink pull',buffer)
//       if(buffer.length){
//         // console.log('senind buffer')
//         sink(1,buffer.shift())
//       }else{
//         // console.log('buffer setting sink ready')
//         ready = true
//       }
//       source(1)
//     }
//   }
// }

const map = f => source => (code, sink) => {
  if(code !== 0) return
  let sourcecb
  source(0,(t,d)=>{
    if(t===0){
      sourcecb = d
      sink(0,(t,d)=>{
        sourcecb(t,d)
      })
    }else if(t===1){
      sink(t,t === 1 ? f(d) : d)
    }
  })

  // if(code === 0){
  //   console.log('map init',code)
  //   source(0,(t,d)=>{
  //     // console.log('map got',d)
  //     sink(t,t === 1 ? f(d) : d)
  //   })
  // }

  // if(code === 1){
  //   // console.log('map pull')
  //   return source(1)
  // }

};

const resume = source => {
  // console.log('resume init')
  source(0,(t,d)=>{
    if(t===0){
      d(1)
    }else if (t === 1){
      d(1)
    }
  })
}



const fromPromise = promise => (start, sink) => {
  if(start !== 0) return
  let sinkready 
  sink(0,(t,d)=>{
    if(t === 1){
      if(sinkready === false) return
      console.log('promise sink ready')
      sinkready = true
      promise.then(x=>{
        if(!sinkready)  return
        sink(1,x)
        sink(2)
      }).catch(e=>sink(2,e))
    }else if(t===2){
      ready = false
    }
  })
};

const parallel = (threads=1) => source => (code, sink) => {
  console.log('parallel',code,sink)
  if(code !== 0) return
  const processing = []
  let sourcecb,innercb
  let sinkready 
  source(0,(t,d)=>{
    if(t === 0) {
      sourcecb = d
      sink(0,(t,d)=>{
        if (t === 1){
          times((threads - processing.length),i=>{
            processing.push(sourcecb(1))
          })
        }else {
          sinkready = false
          sourcecb(t,d)
        }
      })
    }else if (t === 1){
      d(0,(t,d)=>{
        if(t === 0){
          innercb = d 
          if(sinkready){
            innercb(1)
          }else{
            innercb(2)
          }
        }else if(t === 1){
          if(sinkready){
            sink(d)
          }
        }else{
          sink(t,d)
        }
      })
    }else{
      sink(t,d)
    }
  })
  // if (code === 0){
  //   source(0,(t,callbag)=>{
  //     // console.log('parallel got data',t)
  //     callbag(0,(t,d)=>{
  //       callbag(1,(t,d)=>{
  //     // t   console.log('sending parallel promise',t,d)
  //         sink(t,d)
  //       })
  //     })
  //   })
  // }
  // if(code === 1){
  //   // console.log('parallel pull')
  //   source(1)
  // }
}


const flatten = source => (start, sink) => {
  if (start !== 0) return;
  let outerEnded = false;
  let outerTalkback;
  let innerTalkback;
  function talkback(t, d) {
    if (t === 1) (innerTalkback || outerTalkback)(1, d);
    if (t === 2) {
      innerTalkback && innerTalkback(2);
      outerTalkback(2);
    }
  }
  source(0, (T, D) => {
    if (T === 0) {
      outerTalkback = D;
      sink(0, talkback);
    } else if (T === 1) {
      const innerSource = D;
      innerTalkback && innerTalkback(2);
      innerSource(0, (t, d) => {
        if (t === 0) {
          innerTalkback = d;
          innerTalkback(1);
        } else if (t === 1) sink(1, d);
        else if (t === 2 && d) {
          outerTalkback(2);
          sink(2, d);
        } else if (t === 2) {
          if (outerEnded) sink(2);
          else {
            innerTalkback = void 0;
            outerTalkback(1);
          }
        }
      });
    } else if (T === 2 && D) {
      innerTalkback && innerTalkback(2);
      sink(2, D);
    } else if (T === 2) {
      if (!innerTalkback) sink(2);
      else outerEnded = true;
    }
  });
};


module.exports = {
  map,
  fromPromise,
  flatten,
  parallel,
  resume,
  buffer,
  fromFunction,
  toPromise,
}


// module.exports = (fn,endpoint)=>source=>{

  // return flatMap(d=>{
  //   d = fn(d)
  //   return d instanceof Promise ? fromPromise(d) : transfer(d)
  // },endpoint)(source)
// }
