import { plot } from 'nodeplotlib';
import { partialDerivative } from '../src/utils/derivatives.js';
import { getRealEstateData } from './getRealEstateData.js';
async function main() {
    const values = await getRealEstateData();

    const n = values.length;
    let m = 0; let b = 0; let c = 0;
    const prediction = (m, b, c, age, stores) => {
        return m * age + b * stores + c;
    }
    const learningRate = 0.001;
    // mean squared error
    const errorFunction = (m, b, c) => {
        return 1 / n * values.reduce((accumulator, currentValue) => {
            const error = currentValue.price - prediction(m, b, c, currentValue.age, currentValue.stores);
            return accumulator + error * error; // Squaring the error
        }, 0);
    };

    for (let i = 0; i < 10000; i++) {
        m -= learningRate * partialDerivative(errorFunction, [m, b, c], 0)
        b -= learningRate * partialDerivative(errorFunction, [m, b, c], 1)
        c -= learningRate * partialDerivative(errorFunction, [m, b, c], 2);
    }

    const zPredicted = values.map(value => prediction(m, b, c, value.age, value.stores));
    //plot 3d
    const x = values.map(value => value.age);
    const y = values.map(value => value.stores);
    const z = values.map(value => value.price);
    plot([{
        x,
        y,
        z,
        type: 'mesh3d',
    }, {
        x,
        y,
        z: zPredicted,
        type: 'mesh3d',
    }]);
}

main()