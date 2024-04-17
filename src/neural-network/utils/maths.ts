export function dotProduct(arr1: number[], arr2: number[]) {
    return arr1.reduce((acc, curr, index) => acc + curr * arr2[index], 0);
}

export function softmax(scores: number[]) {
    let maxScore = Math.max(...scores);
    let exps = scores.map(score => Math.exp(score - maxScore)); // Improve numerical stability
    let sumExps = exps.reduce((sum, exp) => sum + exp, 0);
    return exps.map(exp => exp / sumExps);
}

export function softmaxDerivative(scores: number[]) {
    const probabilities = softmax(scores);
    const jacobianMatrix: number[][] = [];

    for (let i = 0; i < probabilities.length; i++) {
        jacobianMatrix[i] = [];
        for (let j = 0; j < probabilities.length; j++) {
            if (i === j) {
                jacobianMatrix[i][j] = probabilities[i] * (1 - probabilities[i]);
            } else {
                jacobianMatrix[i][j] = -probabilities[i] * probabilities[j];
            }
        }
    }
    return jacobianMatrix;
}

export function relu(x: number) { return Math.max(0, x) }
export function reluDerivative(x: number) { return x > 0 ? 1 : 0 }
export function costFunctionDerivative(output: number, target: number) { return 2 * (output - target) }
export function arrayMean(arr:number[]){
    return arr.reduce((acc, curr)=>{
        return acc + curr
    },0) / arr.length
}

export function getRandInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  export function getRandFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }