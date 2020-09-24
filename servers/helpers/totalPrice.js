module.exports = (currentPrice, newPrice, quantity) => {
    console.log(currentPrice, newPrice, quantity)
    return currentPrice+(newPrice*quantity)
}