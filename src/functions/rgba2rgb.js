function rgba2rgb(arr) {
    // filter the alpha values (every 4.) out of the array
    return arr.filter((item, index) => ((index+1)%4 != 0));
}

module.exports.rgba2rgb = rgba2rgb