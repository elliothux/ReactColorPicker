function maxOf() {
    let max = - Infinity;
    for (let value of arguments)
        if (value > max) max = value;
    return max;
}


function minOf() {
    let min = Infinity;
    for (let value of arguments)
        if (value < min) min = value;
    return min
}

function RGB2HSL(r, g, b) {
    r = r / 255; g = g / 255; b = b / 255;
    const max = maxOf(r, g, b);
    const min = minOf(r, g, b);
    return {
        H: Math.round(getH()),
        S: Math.round(getS() * Math.pow(10, 2)) / Math.pow(10, 2),
        L: Math.round(getL() * Math.pow(10, 2)) / Math.pow(10, 2)
    };

    function getH() {
        if (max === min) return 0;
        else if (max === g)
            return 60 * (b - r) / (max -min) + 120;
        else if (max === b)
            return 60 * (r - g) / (max -min) + 240;
        else if (max === r && g >= b)
            return 60 * (g - b) / (max -min);
        else if (max === r && g < b)
            return 60 * (g - b) / (max -min) + 360;
        return 0;
    }

    function getL() {
        return 1/2 * (max + min)
    }

    function getS() {
        const l = getL();
        if (l === 0) return 0;
        else if (l > 0 && l < 0.5)
            return (max - min) / (max + min);
        else if (l > 0.5)
            return (max - min) / (2 - (max + min));
    }
}

function HSL2RGB(H, S, L) {

}