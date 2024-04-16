const fs = require('fs');
const ExcelJS = require('exceljs');
import { plot } from 'nodeplotlib';

const data = [
  {
    x: [1, 3, 4, 5],
    y: [3, 12, 1, 4],
    type: 'scatter',
  },
];

plot(data);
const workbook = new ExcelJS.Workbook();
const values = [];
fs.readFile('excel-file.xlsx', (err, data) => {
    if (err) throw err;
    workbook.xlsx.load(data).then(() => {
        const worksheet = workbook.getWorksheet('pop030200reg');
        const header = worksheet.getRow(1);
        const stringYears = header.values.slice(2);
        const years = stringYears.map((year, index) => {
            return Number(year)
        })
        worksheet.eachRow((row, rowNumber) => {
            if(rowNumber === 1) return;
            const perfectRow = row.values.slice(1);
            // console.log(perfectRow[0]);
            years.forEach((year, index)=>{
                values.push({
                    year: year,
                    region: perfectRow[0],
                    population: perfectRow[index+1]
                })
            })

        });
    });
}

);

 