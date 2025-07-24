const promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("foo")
    },5000)
})