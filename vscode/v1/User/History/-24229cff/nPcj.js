const promise = new Promise((resolve,reject)=>{
    console.log("1. Promise Starts");
    setTimeout(()=>{
        resolve("foo")
    },5000)
})