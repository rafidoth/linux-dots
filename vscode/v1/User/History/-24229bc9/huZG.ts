type Student = {
    name : string;
    batch : string;
};

const promise1 = new Promise<number>((resolve,reject)=>{
    console.log("1. Promise Starts");
    setTimeout(()=>{
        resolve(555);
    },5000)
});




promise.then()