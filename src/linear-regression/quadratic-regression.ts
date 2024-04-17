import { plot } from 'nodeplotlib';
import { getRealEstateData } from './getRealEstateData';
import { partialDerivative } from './utils/derivatives';
async function main() {
    const values = await getRealEstateData();

    const predict = (a: number, b: number, c: number, age: number) => {
        return (a * (age ** 2)) + (b * age) + c;
    }

    const n = values.length;
    let a = 0;
    let b = 0;
    let c = 0;
    const learningRate = 0.0001;
    // mean squared error
    const errorFunction = (a: number, b: number, c: number) => {
        return 1 / n * values.reduce((accumulator, currentValue) => {
            const error = currentValue.price - predict(a, b, c, currentValue.age);
            return accumulator + error ** 2; // Squaring the error
        }, 0);
    };


    let prevError = errorFunction(a, b, c);
    const convergenceThreshold = 1e-6; // Set this to something appropriate for your problem
    const maxIterations = 1000000; // Maximum number of iterations as a fallback
    for (let i = 0; i < maxIterations; i++) {
        a -= (learningRate / 1000) * partialDerivative(errorFunction, [a, b, c], 0);
        b -= learningRate * partialDerivative(errorFunction, [a, b, c], 1);
        c -= learningRate * partialDerivative(errorFunction, [a, b, c], 2);
        const currentError = errorFunction(a, b, c);
        console.log(currentError);

        if (Math.abs(prevError - currentError) < convergenceThreshold) {
            console.log(`Convergence reached at iteration ${i}`);
            break;
        }
        prevError = currentError;
    }


    // Plotting
    const x = values.map(value => value.age);
    const y = values.map(value => value.price);
    const yPredicted = values.map(value => predict(a, b, c, value.age));

    plot([
        {
            x,
            y,
            mode: 'markers',
            name: 'Real data'
        },
        {
            x,
            y: yPredicted,
            mode: 'markers',
            name: 'Predicted data'
        }
    ])




}

main()