import fs from 'fs'
// Function to read MNIST files
function readMNISTImages(filePath) {
  const buffer = fs.readFileSync(filePath);
  const headerCount = 4; // For image files, the first 4 values in the header are magic number, number of images, number of rows, and number of columns.
  const headerValues = [];

  for (let i = 0; i < headerCount; ++i) {
    headerValues[i] = buffer.readInt32BE(i * 4);
  }

  const images = [];
  let index = headerCount * 4;
  const imageCount = headerValues[1];
  const rowCount = headerValues[2];
  const columnCount = headerValues[3];

  for (let imageIdx = 0; imageIdx < imageCount; ++imageIdx) {
    const image = [];
    for (let rowIdx = 0; rowIdx < rowCount; ++rowIdx) {
      const row = [];
      for (let colIdx = 0; colIdx < columnCount; ++colIdx) {
        row.push(buffer[index++]);
      }
      image.push(row);
    }
    images.push(image);
  }

  return images;
}

// Function to read MNIST labels
function readMNISTLabels(filePath) {
  const buffer = fs.readFileSync(filePath);
  const headerCount = 2; // For label files, the first 2 values in the header are magic number and number of items.
  const labelCount = buffer.readInt32BE(4); // Number of labels is the second 32-bit integer.

  const labels = [];
  let index = headerCount * 4;
  for (let labelIdx = 0; labelIdx < labelCount; ++labelIdx) {
    labels.push(buffer[index++]);
  }

  return labels;
}


export const renderImage = (image) => {
  let str = '';
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      if (image[i][j] === 0) {
        str += ' ';
      } else {
        str += 'X';
      }
    }
    str += '\n';
  }
  console.log(str);
}

// Replace 'path_to_file' with the actual paths to your MNIST dataset files
export const trainImages = readMNISTImages('data/train-images-idx3-ubyte/train-images-idx3-ubyte');
export const trainLabels = readMNISTLabels('data/train-labels-idx1-ubyte/train-labels-idx1-ubyte');
export const testImages = readMNISTImages('data/t10k-images-idx3-ubyte/t10k-images-idx3-ubyte');
export const testLabels = readMNISTLabels('data/t10k-labels-idx1-ubyte/t10k-labels-idx1-ubyte');
export const inputData = trainImages[0].flat()




