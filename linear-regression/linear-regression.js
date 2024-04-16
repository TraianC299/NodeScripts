import {plot} from 'nodeplotlib';
import { partialDerivative } from '../utils/derivatives.js';
import { getRealEstateData } from './getRealEstateData.js';
async function main() {
    const values = await getRealEstateData();
    const n = values.length;
    let m = 0; let b = 0;
    const learningRate = 0.001;
    // mean squared error
    const errorFunction = (m, b) => {
        return 1/n * values.reduce((accumulator, currentValue) => {
            const error = currentValue.price - (m * currentValue.age + b);
            return accumulator + error * error; // Squaring the error
        }, 0);
    };


    const errors = [];
    for (let i = 0; i < 10000; i++) {
        m -= learningRate * partialDerivative(errorFunction, [m, b], 0); 
        b -= learningRate * partialDerivative(errorFunction, [m, b], 1);
        errors.push(errorFunction(m, b));
    }


    // Plotting
    const x = values.map(value => value.age);
    const y = values.map(value => value.price);
    const yPredicted = values.map(value => m * value.age + b);

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
            mode: 'lines',
            name: 'Predicted data'
        }
    ])
}

main()