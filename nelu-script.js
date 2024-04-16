import axios from 'axios';
import Excel from 'exceljs';
// Replace 'Your_API_Key' with your actual API key for the currency conversion service
const API_KEY = 'Your_API_Key';

// Function to get the exchange rate for a specific date
const getExchangeRateForDate = async (date) => {
  try {
    const response = await axios.get(`https://api.exchangeratesapi.io/${date}?symbols=USD&base=EUR&access_key=${API_KEY}`);
    return response.data.rates.USD;
  } catch (error) {
    console.error(`Error fetching exchange rate for date ${date}:`, error);
    throw error;
  }
};

// Main function to convert prices
const convertPrices = async (filePath) => {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1); // assuming the data is in the first worksheet

  // Getting all unique dates in the Date column (assumed to be column B)
  const datesSet = new Set();
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) { // Assuming row 1 is the header
      const dateCell = row.getCell(2); // Date is in column B
      if (dateCell.value) {
        datesSet.add(dateCell.text);
      }
    }
  });

  // Fetch exchange rates for all unique dates
  const exchangeRates = {};
  for (let date of datesSet) {
    exchangeRates[date] = await getExchangeRateForDate(date);
  }

  // Convert prices using the fetched exchange rates
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const dateCell = row.getCell(2);
      const amountCell = row.getCell(3); // Total Amount is in column C
      const rate = exchangeRates[dateCell.text];
      if (rate && amountCell.value) {
        const amount = parseFloat(amountCell.value.replace(/[^0-9.-]+/g, "")); // Removing currency formatting if present
        if (!isNaN(amount)) {
          const convertedValue = amount * rate;
          amountCell.value = convertedValue;
        }
      }
    }
  });

  // Write the updated workbook to a new file
  await workbook.xlsx.writeFile('/path/to/your/new_excelfile.xlsx');
};

convertPrices('/path/to/your/excelfile.xlsx').then(() => {
  console.log('Conversion complete.');
}).catch(error => {
  console.error('An error occurred:', error);
});
