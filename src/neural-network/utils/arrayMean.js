export function arrayMean(arr){
    return arr.reduce((acc, curr)=>{
        return acc + curr
    },0) / parseFloat(arr.length)
}