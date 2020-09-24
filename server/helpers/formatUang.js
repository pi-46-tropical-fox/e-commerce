function formatUang(data){
    let newData = data.toLocaleString()
    return `Rp. ${newData},00`
}
module.exports = formatUang; 