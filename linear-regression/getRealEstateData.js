import ExcelJS from 'exceljs';

export const getRealEstateData = async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('Real-estate.xlsx');
    const worksheet = workbook.getWorksheet(1); // assuming the data is in the first worksheet
    const values = [];
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            // Skipping header
            const age = row.getCell(3).value;
            const numberOfConvenienceStores = row.getCell(5).value;
            const pricePerUnit = row.getCell(8).value;
            values.push({
                age,
                price: pricePerUnit,
                stores: numberOfConvenienceStores
            });
        }
    });
    return values;
}