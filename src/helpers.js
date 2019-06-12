function range(from, to) {
    var array = []
    for(var i = from; i < to; i++) {
        array.push(i)
    }
    return array
}

export {range}