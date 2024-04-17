import {arrayMean, costFunctionDerivative, dotProduct, getRandFloat, relu, reluDerivative, softmax, softmaxDerivative} from './utils/maths'
export const NeuralNetwork = function ({
    leayers,
    learningRate,
    trainingData,
    trainingLabels,
    testingData,
    testingLabels,
    batchSize = 64,
    epochs = 10000,
}: {
    leayers: {
        nrLayers: number,
        nrNeuronsPerLayer: number[],
    }
    learningRate: number,
    trainingData: number[][],
    trainingLabels: number[],
    testingData: number[][],
    testingLabels: number[],
    batchSize: number,
    epochs: number,
}) {
    const trainDataLimited = trainingData.slice(0, epochs)
    const trainLabelsLimited = trainingLabels.slice(0, epochs)
    const testDataLimited = testingData.slice(0, epochs)
    const testLabelsLimited = testingLabels.slice(0, epochs)

    let weights0: number[][] = []
    let neurons0: number[] = []
    let z0: number[] = []
    let weights1: number[][] = []
    let neurons1: number[] = []
    let z1: number[]= []
    
    let weights0Changes: number[][][] = []
    let weights1Changes: number[][][] = []


    

    

    const createOutputArrayFromLabel = (number:number) => {
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
        trainDataLimited.forEach((image, index) => {
            console.log('train ' + index)
            feedForward(image)
            feedBackward(image, neurons1, createOutputArrayFromLabel(trainLabelsLimited[index]))
            if (index % batchSize === 0 && index !== 0) {
                console.log('update weights')
                updateWeights()
            }
        })
    }
    
    
    
    function feedForward(inputArray: number[]) {
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
    
    function feedBackward(input:number[], predicted:number[], target:number[]) {
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
        testDataLimited.forEach((image, index) => {
            console.log('test ' + index)
            feedForward(image)
            const maxIndex = neurons1.indexOf(Math.max(...neurons1))
            if (maxIndex === testLabelsLimited[index]) {
                correct++
            }
        })
        console.log('correct: ' + correct / testDataLimited.length)
        return correct / testDataLimited.length
    }
    
    
    // update weights
    function updateWeights() {
        weights0.forEach((weightsArray, neuronIndex) => {
            weightsArray.forEach((_, weightIndex) => {
                weightsArray[weightIndex] -= arrayMean(weights0Changes[neuronIndex][weightIndex]);
                weights0Changes[neuronIndex][weightIndex] = [];
            })
        })
        weights1.forEach((weightsArray, neuronIndex) => {
            weightsArray.forEach((_, weightIndex) => {
                weightsArray[weightIndex] -= arrayMean(weights1Changes[neuronIndex][weightIndex]);
                weights1Changes[neuronIndex][weightIndex] = [];
            })
        })
    }
    
    
    initialize()
    train()
    
    // //if user presses 't' key, test the model, in nodejs
    // process.stdin.setRawMode(true);
    // process.stdin.resume();
    // process.stdin.on('data', function (chunk, key) {
    //     if (chunk[0] === 116) {
    //         testModel()
    //     }
    // });
    
    testModel()
    
    
}

