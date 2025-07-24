type Student = {
    name : string;
    batch : string;
};

const promise1 = new Promise<number>((resolve,reject)=>{
    console.log("1. Promise Starts");
    setTimeout(()=>{
        resolve(555);
    },3000)
});


const promise2 = new Promise<number>((resolve,reject)=>{
    console.log("1. Promise Starts");
    setTimeout(()=>{
        resolve(555);
    },3000)
});


promise1.then((value : number):void => {
    console.log(value);
})