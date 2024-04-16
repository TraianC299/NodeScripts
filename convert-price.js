import axios from 'axios';
import ExcelJS from 'exceljs';
// Replace with your Currency Beacon API Key
const API_KEY = 'PkuLCIM94rf3rFN8kjWT8c3WEWswi5Mr';


const data = {
    "2024-01-01": {
        "GBP": 0.86663792,
        "CAD": 1.4606674,
        "USD": 1.10188919,
        "EUR": 1
    },
    "2024-01-02": {
        "GBP": 0.86715725,
        "CAD": 1.46057566,
        "USD": 1.09601141,
        "EUR": 1
    },
    "2024-01-03": {
        "GBP": 0.8621664,
        "CAD": 1.45746788,
        "USD": 1.09282647,
        "EUR": 1
    },
    "2024-01-04": {
        "GBP": 0.86240159,
        "CAD": 1.46155869,
        "USD": 1.09397719,
        "EUR": 1
    },
    "2024-01-05": {
        "GBP": 0.86041319,
        "CAD": 1.46243324,
        "USD": 1.09428993,
        "EUR": 1
    },
    "2024-01-06": {
        "GBP": 0.86055366,
        "CAD": 1.46279131,
        "USD": 1.09480973,
        "EUR": 1
    },
    "2024-01-07": {
        "GBP": 0.86086823,
        "CAD": 1.462309,
        "USD": 1.09367794,
        "EUR": 1
    },
    "2024-01-08": {
        "GBP": 0.85947595,
        "CAD": 1.46310806,
        "USD": 1.09560542,
        "EUR": 1
    },
    "2024-01-09": {
        "GBP": 0.86059853,
        "CAD": 1.46291863,
        "USD": 1.09325816,
        "EUR": 1
    },
    "2024-01-10": {
        "GBP": 0.86008639,
        "CAD": 1.46714283,
        "USD": 1.09786604,
        "EUR": 1
    },
    "2024-01-11": {
        "GBP": 0.85917067,
        "CAD": 1.46882598,
        "USD": 1.09752708,
        "EUR": 1
    },
    "2024-01-12": {
        "GBP": 0.85908925,
        "CAD": 1.46882596,
        "USD": 1.09533419,
        "EUR": 1
    },
    "2024-01-13": {
        "GBP": 0.85962439,
        "CAD": 1.46947444,
        "USD": 1.09588207,
        "EUR": 1
    },
    "2024-01-14": {
        "GBP": 0.85938877,
        "CAD": 1.46800085,
        "USD": 1.09612282,
        "EUR": 1
    },
    "2024-01-15": {
        "GBP": 0.86088024,
        "CAD": 1.47071285,
        "USD": 1.09179947,
        "EUR": 1
    },
    "2024-01-16": {
        "GBP": 0.86126461,
        "CAD": 1.4670889,
        "USD": 1.08680589,
        "EUR": 1
    },
    "2024-01-17": {
        "GBP": 0.8589904,
        "CAD": 1.47015817,
        "USD": 1.08943234,
        "EUR": 1
    },
    "2024-01-18": {
        "GBP": 0.85661162,
        "CAD": 1.46855951,
        "USD": 1.08880168,
        "EUR": 1
    },
    "2024-01-19": {
        "GBP": 0.85803265,
        "CAD": 1.46362216,
        "USD": 1.0900534,
        "EUR": 1
    },
    "2024-01-20": {
        "GBP": 0.85877484,
        "CAD": 1.46730549,
        "USD": 1.09100617,
        "EUR": 1
    },
    "2024-01-21": {
        "GBP": 0.85745096,
        "CAD": 1.46509649,
        "USD": 1.09011519,
        "EUR": 1
    },
    "2024-01-22": {
        "GBP": 0.85606244,
        "CAD": 1.46724688,
        "USD": 1.08949286,
        "EUR": 1
    },
    "2024-01-23": {
        "GBP": 0.85516614,
        "CAD": 1.46344182,
        "USD": 1.08622872,
        "EUR": 1
    },
    "2024-01-24": {
        "GBP": 0.85567102,
        "CAD": 1.47043701,
        "USD": 1.08776031,
        "EUR": 1
    },
    "2024-01-25": {
        "GBP": 0.8532276,
        "CAD": 1.46037792,
        "USD": 1.08409741,
        "EUR": 1
    },
    "2024-01-26": {
        "GBP": 0.85497121,
        "CAD": 1.46061147,
        "USD": 1.08585042,
        "EUR": 1
    },
    "2024-01-27": {
        "GBP": 0.8547178,
        "CAD": 1.46128582,
        "USD": 1.08619286,
        "EUR": 1
    },
    "2024-01-28": {
        "GBP": 0.85366023,
        "CAD": 1.45868856,
        "USD": 1.08478276,
        "EUR": 1
    },
    "2024-01-29": {
        "GBP": 0.85216725,
        "CAD": 1.45213191,
        "USD": 1.08289729,
        "EUR": 1
    },
    "2024-01-30": {
        "GBP": 0.85329391,
        "CAD": 1.45186674,
        "USD": 1.08195909,
        "EUR": 1
    },
    "2024-01-31": {
        "GBP": 0.85224014,
        "CAD": 1.45209091,
        "USD": 1.08082952,
        "EUR": 1
    },
    "2024-02-01": {
        "GBP": 0.85309028,
        "CAD": 1.45452973,
        "USD": 1.08738666,
        "EUR": 1
    },
    "2024-02-02": {
        "GBP": 0.85542235,
        "CAD": 1.45471443,
        "USD": 1.0805606,
        "EUR": 1
    },
    "2024-02-03": {
        "GBP": 0.85514851,
        "CAD": 1.45436418,
        "USD": 1.08022018,
        "EUR": 1
    },
    "2024-02-04": {
        "GBP": 0.85483841,
        "CAD": 1.45229773,
        "USD": 1.07771866,
        "EUR": 1
    },
    "2024-02-05": {
        "GBP": 0.85644332,
        "CAD": 1.45269194,
        "USD": 1.07489408,
        "EUR": 1
    },
    "2024-02-06": {
        "GBP": 0.85370052,
        "CAD": 1.45092073,
        "USD": 1.07582666,
        "EUR": 1
    },
    "2024-02-07": {
        "GBP": 0.85359998,
        "CAD": 1.45042456,
        "USD": 1.0783086,
        "EUR": 1
    },
    "2024-02-08": {
        "GBP": 0.85384565,
        "CAD": 1.45037001,
        "USD": 1.07728923,
        "EUR": 1
    },
    "2024-02-09": {
        "GBP": 0.85395998,
        "CAD": 1.451578,
        "USD": 1.07837223,
        "EUR": 1
    },
    "2024-02-10": {
        "GBP": 0.85397627,
        "CAD": 1.45326735,
        "USD": 1.07811704,
        "EUR": 1
    },
    "2024-02-11": {
        "GBP": 0.85443234,
        "CAD": 1.4526343,
        "USD": 1.07911252,
        "EUR": 1
    },
    "2024-02-12": {
        "GBP": 0.85340413,
        "CAD": 1.448823,
        "USD": 1.07635553,
        "EUR": 1
    },
    "2024-02-13": {
        "GBP": 0.85002479,
        "CAD": 1.45248245,
        "USD": 1.07117136,
        "EUR": 1
    },
    "2024-02-14": {
        "GBP": 0.85376229,
        "CAD": 1.45286162,
        "USD": 1.07252016,
        "EUR": 1
    },
    "2024-02-15": {
        "GBP": 0.85528262,
        "CAD": 1.4509294,
        "USD": 1.07600723,
        "EUR": 1
    },
    "2024-02-16": {
        "GBP": 0.85520039,
        "CAD": 1.45397872,
        "USD": 1.07761985,
        "EUR": 1
    },
    "2024-02-17": {
        "GBP": 0.85524431,
        "CAD": 1.45338011,
        "USD": 1.07755344,
        "EUR": 1
    },
    "2024-02-18": {
        "GBP": 0.85439326,
        "CAD": 1.45293993,
        "USD": 1.0777914,
        "EUR": 1
    },
    "2024-02-19": {
        "GBP": 0.85564287,
        "CAD": 1.45465274,
        "USD": 1.07700064,
        "EUR": 1
    },
    "2024-02-20": {
        "GBP": 0.85616727,
        "CAD": 1.461296,
        "USD": 1.08150058,
        "EUR": 1
    },
    "2024-02-21": {
        "GBP": 0.85680878,
        "CAD": 1.46030185,
        "USD": 1.08288582,
        "EUR": 1
    },
    "2024-02-22": {
        "GBP": 0.85483032,
        "CAD": 1.45938298,
        "USD": 1.08272354,
        "EUR": 1
    },
    "2024-02-23": {
        "GBP": 0.85414554,
        "CAD": 1.4619468,
        "USD": 1.08251997,
        "EUR": 1
    },
    "2024-02-24": {
        "GBP": 0.85505943,
        "CAD": 1.46288439,
        "USD": 1.08339765,
        "EUR": 1
    },
    "2024-02-25": {
        "GBP": 0.85428414,
        "CAD": 1.46201349,
        "USD": 1.08209306,
        "EUR": 1
    },
    "2024-02-26": {
        "GBP": 0.85583743,
        "CAD": 1.46574505,
        "USD": 1.08541087,
        "EUR": 1
    },
    "2024-02-27": {
        "GBP": 0.85530312,
        "CAD": 1.46730906,
        "USD": 1.08331228,
        "EUR": 1
    },
    "2024-02-28": {
        "GBP": 0.85544796,
        "CAD": 1.47051366,
        "USD": 1.08349001,
        "EUR": 1
    },
    "2024-02-29": {
        "GBP": 0.85636015,
        "CAD": 1.46738513,
        "USD": 1.08147402,
        "EUR": 1
    },
    "2024-03-01": {
        "GBP": 0.85657557,
        "CAD": 1.46989179,
        "USD": 1.08405828,
        "EUR": 1
    },
    "2024-03-02": {
        "GBP": 0.85676148,
        "CAD": 1.47055551,
        "USD": 1.08411931,
        "EUR": 1
    },
    "2024-03-03": {
        "GBP": 0.85629384,
        "CAD": 1.47058781,
        "USD": 1.0844039,
        "EUR": 1
    },
    "2024-03-04": {
        "GBP": 0.85539634,
        "CAD": 1.47364865,
        "USD": 1.08506359,
        "EUR": 1
    },
    "2024-03-05": {
        "GBP": 0.85435159,
        "CAD": 1.47425715,
        "USD": 1.08511146,
        "EUR": 1
    },
    "2024-03-06": {
        "GBP": 0.85597622,
        "CAD": 1.47256161,
        "USD": 1.0904326,
        "EUR": 1
    },
    "2024-03-07": {
        "GBP": 0.85461619,
        "CAD": 1.4720286,
        "USD": 1.09449109,
        "EUR": 1
    },
    "2024-03-08": {
        "GBP": 0.85093656,
        "CAD": 1.4748136,
        "USD": 1.09401702,
        "EUR": 1
    },
    "2024-03-09": {
        "GBP": 0.85115875,
        "CAD": 1.4761032,
        "USD": 1.09409593,
        "EUR": 1
    },
    "2024-03-10": {
        "GBP": 0.85140538,
        "CAD": 1.47539614,
        "USD": 1.09441007,
        "EUR": 1
    },
    "2024-03-11": {
        "GBP": 0.85305608,
        "CAD": 1.47361664,
        "USD": 1.09368749,
        "EUR": 1
    },
    "2024-03-12": {
        "GBP": 0.85405799,
        "CAD": 1.47457861,
        "USD": 1.09268333,
        "EUR": 1
    },
    "2024-03-13": {
        "GBP": 0.8555262,
        "CAD": 1.4745987,
        "USD": 1.09418854,
        "EUR": 1
    },
    "2024-03-14": {
        "GBP": 0.85399529,
        "CAD": 1.47251892,
        "USD": 1.0877269,
        "EUR": 1
    },
    "2024-03-15": {
        "GBP": 0.85523068,
        "CAD": 1.47350119,
        "USD": 1.08947676,
        "EUR": 1
    },
    "2024-03-16": {
        "GBP": 0.85549694,
        "CAD": 1.4736713,
        "USD": 1.08962871,
        "EUR": 1
    },
    "2024-03-17": {
        "GBP": 0.85514194,
        "CAD": 1.47383641,
        "USD": 1.08863764,
        "EUR": 1
    },
    "2024-03-18": {
        "GBP": 0.85467302,
        "CAD": 1.47272536,
        "USD": 1.08723887,
        "EUR": 1
    },
    "2024-03-19": {
        "GBP": 0.85440549,
        "CAD": 1.47518816,
        "USD": 1.08693512,
        "EUR": 1
    },
    "2024-03-20": {
        "GBP": 0.85455411,
        "CAD": 1.47255623,
        "USD": 1.09350404,
        "EUR": 1
    },
    "2024-03-21": {
        "GBP": 0.85727428,
        "CAD": 1.46983344,
        "USD": 1.08401299,
        "EUR": 1
    },
    "2024-03-22": {
        "GBP": 0.8593619,
        "CAD": 1.47400048,
        "USD": 1.08289302,
        "EUR": 1
    },
    "2024-03-23": {
        "GBP": 0.85895007,
        "CAD": 1.47362679,
        "USD": 1.08280178,
        "EUR": 1
    },
    "2024-03-24": {
        "GBP": 0.85720679,
        "CAD": 1.47042116,
        "USD": 1.08081001,
        "EUR": 1
    },
    "2024-03-25": {
        "GBP": 0.85776276,
        "CAD": 1.47318907,
        "USD": 1.08591463,
        "EUR": 1
    },
    "2024-03-26": {
        "GBP": 0.8582336,
        "CAD": 1.47220994,
        "USD": 1.08552601,
        "EUR": 1
    }

}

function convertDateToISO(dateStr) {
    const months = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
        Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };

    const parts = dateStr.split('.'); // Split the date string into [Month, Day, Year]
    const year = `20${parts[2]}`;
    const month = months[parts[1]]; // Convert month name to month number
    const day = parts[0]

    return `${year}-${month}-${day}`;
}

const getExchangeValue = ({ date, currencyFrom, currencyTo, ammount }) => {
    let valuesforTheDate = data[date]
    return valuesforTheDate[currencyTo] / valuesforTheDate[currencyFrom] * ammount

};



function convertPrice(item) {
    let value, currency;

    // Check for Canadian Dollar
    if (item.includes('C$')) {
        value = parseFloat(item.replace('C$', ''));
        currency = 'CAD';
    }
    // Check for US Dollar
    else if (item.includes('US $')) {
        value = parseFloat(item.replace('US $', ''));
        currency = 'USD';
    }
    else if (item.includes('$')) {
        value = parseFloat(item.replace('$', ''));
        currency = 'USD';
    }
    // Check for British Pound Sterling
    else if (item.includes('£')) {
        value = parseFloat(item.replace('£', ''));
        currency = 'GBP';
    }
    // Check for Euro
    else if (item.includes('€')) {
        value = parseFloat(item.replace('€', ''));
        currency = 'EUR';
    }
    // Assume Euro for others
    else {
        value = parseFloat(item);
        currency = 'EUR';
    }

    return { value, currency };
}

// Main function to convert prices
const convertPrices = async (filePath) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1); // assuming the data is in the first worksheet
    const totalAmountColIndex = worksheet.actualColumnCount
    // Getting all unique dates in the Date column (assumed to be column B)
    const valuesArray = []
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            // Skipping header
            // get date from date formatted column
            const date0 = new Date(0);
            const utcOffset = date0.getTimezoneOffset();

            const date = new Date(0, 0, row.getCell(2).value - 1, 0, -utcOffset, 0);

            
            //date to format YYYY-MM-DD
            const formattedDate = date.toISOString().split('T')[0];
            //   dates.add(dateCell.text);
            const price = row.getCell(6)
            const { value, currency } = convertPrice(price.text)
            console.log(value, currency)

            valuesArray.push({
                date: formattedDate,
                value,
                currency
            })

        }
    });




    valuesArray.forEach((row, index) => {
        let eurValue = getExchangeValue({
            date: row.date, currencyFrom: row.currency, currencyTo: 'EUR', ammount: row.value
        });
        valuesArray[index].eurPrice = eurValue
    })


    console.log(valuesArray)

    // Convert prices using the fetched exchange rates
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            const orderObject = valuesArray[rowNumber - 2]
            row.getCell(2).value = `${orderObject?.date}`;
            row.getCell(totalAmountColIndex + 1).value = `${orderObject?.eurPrice}`;
            row.getCell(totalAmountColIndex + 2).value = 'EUR';
        }
    });

    // Write the updated workbook to a new file
    await workbook.xlsx.writeFile('./new.xlsx');
};

convertPrices('./aliexpress-2-datetext.xlsx')
    .then(() => console.log('Conversion complete.'))
    .catch(error => console.error('An error occurred:', error));
