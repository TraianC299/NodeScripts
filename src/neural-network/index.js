import { getRandFloat } from "../utils/getRandNum.js"
import { arrayMean } from "./utils/arrayMean.js"
import { trainImages, trainLabels, testImages, testLabels } from "./getData.js"
const trainImagesLimited = trainImages.slice(0, 10000)
const trainLabelsLimited = trainLabels.slice(0, 10000)
const testImagesLimited = testImages.slice(0, 1000)
const testLabelsLimited = testLabels.slice(0, 1000)
const learningRate = 0.001
const batch = 64
let weights0 = []
let neurons0 = []
let z0 = []
let weights1 = []
let neurons1 = []
let z1 = []

let weights0Changes = []
let weights1Changes = []
function dotProduct(arr1, arr2) {
    return arr1.reduce((acc, curr, index) => acc + curr * arr2[index], 0);
}
const relu = (x) => Math.max(0, x)
const reluDerivative = (x) => x > 0 ? 1 : 0

const costFunction = (output, target) => Math.pow(output - target, 2)
const costFunctionDerivative = (output, target) => 2 * (output - target)

function softmax(scores) {
    let maxScore = Math.max(...scores);
    let exps = scores.map(score => Math.exp(score - maxScore)); // Improve numerical stability
    let sumExps = exps.reduce((sum, exp) => sum + exp, 0);
    return exps.map(exp => exp / sumExps);
}

function softmaxDerivative(scores) {
    const probabilities = softmax(scores);
    const jacobianMatrix = [];

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
const createOutputArrayFromLabel = (number) => {
    const arr = Array(10).fill(0)
    arr[number] = 1
    return arr
}



function initialize() {
    for (let i = 0; i < 128; i++) {
        const arr = []
        const changesArr = []
        for (let i = 0; i < 784; i++) {
            arr.push(getRandFloat(-0.001, 0.001))
            changesArr.push([])
        }
        weights0.push(arr)
        weights0Changes.push(changesArr)
    }
    for (let i = 0; i < 10; i++) {
        const arr = []
        const changesArr = []
        for (let i = 0; i < 128; i++) {
            arr.push(getRandFloat(-0.001, 0.001))
            changesArr.push([])
        }
        weights1.push(arr)
        weights1Changes.push(changesArr)
    }
}

function train() {
    // train the model
    trainImagesLimited.forEach((image, index) => {
        console.log('train ' + index)
        feedForward(image.flat())
        feedBackward(image.flat(), neurons1, createOutputArrayFromLabel(trainLabelsLimited[index]))
        if (index % batch === 0 && index !== 0) {
            console.log('update weights')
            updateWeights()
        }
    })
}



function feedForward(inputArray) {
    neurons0 = []
    z0 = []
    neurons1 = []
    z1 = []
    weights0.forEach((weightsArray) => {
        const multiplicationResult = dotProduct(inputArray, weightsArray)
        z0.push(multiplicationResult)
    })
    neurons0 = z0.map(el => relu(el))

    weights1.forEach((weightsArray) => {
        const multiplicationResult = dotProduct(neurons0, weightsArray)
        z1.push(multiplicationResult)
    })
    neurons1 = softmax(z1)
}

function feedBackward(input, predicted, target) {
    // const cost = z1.map((predicted, index) => costFunction(predicted, target[index]));
    const outputDerivatives = predicted.map((predictedValue, index) => costFunctionDerivative(predictedValue, target[index]));
    const softmaxActivationsDerivatives = softmaxDerivative(z1)
    for (let neuronIndex = 0; neuronIndex < neurons1.length; neuronIndex++) {
        const costToNeuronDerivative = outputDerivatives[neuronIndex]
        const activFuncDeriv = softmaxActivationsDerivatives[neuronIndex][neuronIndex]
        let weights = weights1[neuronIndex]
        for (let weightIndex = 0; weightIndex < weights.length; weightIndex++) {
            const zToWeight = neurons0[weightIndex]
            const result = learningRate * costToNeuronDerivative * activFuncDeriv * zToWeight
            weights1Changes[neuronIndex][weightIndex].push(result)
        }
    }


    const hiddenLayerErrors = neurons0.map(() => 0); // Initialize hidden errors
    for (let i = 0; i < weights1.length; i++) {
        for (let j = 0; j < weights1[i].length; j++) {
            hiddenLayerErrors[j] += outputDerivatives[i] * weights1[i][j];
        }
    }

    const hiddenLayerDerivatives = neurons0.map(neuron => reluDerivative(neuron));

    for (let startNeuronIndex = 0; startNeuronIndex < weights0.length; startNeuronIndex++) {
        const costToNeuronDerivative = hiddenLayerErrors[startNeuronIndex]
        const activFuncDeriv = hiddenLayerDerivatives[startNeuronIndex]
        const weights = weights0[startNeuronIndex]
        for (let targetNeuronIndex = 0; targetNeuronIndex < weights.length; targetNeuronIndex++) {
            const inputToNeuron = input[targetNeuronIndex]; // This should be the actual input feature to the network, not the output
            const result = learningRate * costToNeuronDerivative * activFuncDeriv * inputToNeuron;
            weights0Changes[startNeuronIndex][targetNeuronIndex].push(result)
        }
    }
}

// test the model
const testModel = () => {
    let correct = 0
    testImagesLimited.forEach((image, index) => {
        console.log('test ' + index)
        feedForward(image.flat())
        const maxIndex = neurons1.indexOf(Math.max(...neurons1))
        if (maxIndex === testLabelsLimited[index]) {
            correct++
        }
    })
    console.log('correct: ' + correct / testImagesLimited.length)
    return correct / testImagesLimited.length
}


// update weights
function updateWeights() {
    weights0.forEach((weightsArray, neuronIndex) => {
        weightsArray.forEach((weight, weightIndex) => {
            weightsArray[weightIndex] -= arrayMean(weights0Changes[neuronIndex][weightIndex]);
            weights0Changes[neuronIndex][weightIndex] = [];
        })
    })
    weights1.forEach((weightsArray, neuronIndex) => {
        weightsArray.forEach((weight, weightIndex) => {
            weightsArray[weightIndex] -= arrayMean(weights1Changes[neuronIndex][weightIndex]);
            weights1Changes[neuronIndex][weightIndex] = [];
        })
    })
}


initialize()
train()

//if user presses 't' key, test the model, in nodejs
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', function (chunk, key) {
    if (chunk[0] === 116) {
        testModel()
    }
});

testModel()



















