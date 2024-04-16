// test the model
export const testModel = ({
    testImages,
    testLabels,
    feedForward,
    neurons1,
}) => {
    let correct = 0
    testImages.forEach((image, index) => {
        console.log('test ' + index)
        feedForward(image.flat())
        const maxIndex = neurons1.indexOf(Math.max(...neurons1))
        if (maxIndex === testLabels[index]) {
            correct++
        }
    })
    return correct / testImages.length
}