type Student = {
    name : string;
    batch : string;
};

const promise1 = new Promise<number>((resolve,reject)=>{
    console.log("Promise1 Starts :");
    setTimeout(()=>{
        resolve(555);
    },3000)
});

console.log(promise1)


const promise2 = new Promise<number>((resolve,reject)=>{
    console.log("Promise2 Starts");
    setTimeout(()=>{
        resolve(40);
    },3000)
});

console.log(promise1)

async function Fn(promise1 : Promise<number>, promise2 : Promise<number>): Promise<number>{
    promise1.then((value : number):void => {
        promise2.then((value2 : number) : Promise<number> =>{
            return new Promise<number>((resolve, reject)=>{
            resolve(value+value2); 
            })
        })
    })
    
}

