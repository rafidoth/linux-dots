const promise1 = new Promise<number>((resolve,reject)=>{
    console.log("Promise1 Starts :");
    setTimeout(()=>{
        console.log("promise 1 fulfilled")
        resolve(555);
    },3000)
});

console.log(promise1)

const promise2 = new Promise<number>((resolve,reject)=>{
    console.log("Promise2 Starts");
    setTimeout(()=>{
        console.log("promise 2 fulfilled")
        resolve(40);
    },5000)
});

console.log(promise2)

async function Fn(promise1 : Promise<number>, promise2 : Promise<number>): Promise<number>{
    return new Promise<number>((resolve, reject)=>{
        promise1.then((value : number):void => {
            promise2.then((value2 : number) : void=>{
                    resolve(value+value2); 
            }).catch((error)=> {
                throw new Error("promise 2 failed");
            })
        }).catch((error)=> {
            throw new Error("promise 1 failed");
        })
    })
}


