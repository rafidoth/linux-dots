type Student = {
    name : string;
    batch : string;
};

const promise = new Promise<Student>((resolve,reject)=>{
    console.log("1. Promise Starts");
    setTimeout(()=>{
        resolve({
            name : "rafi",
            batch : "243"
        })
    },5000)
});


console.log("2. intermidiate state");
promise.then((res : Student)=> console.log(`3. ${res.name} `))