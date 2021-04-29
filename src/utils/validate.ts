export function validateAux(type : string, val : string | number) {
    //must be a string or a number
    if (type === "text" && typeof val === 'string') {
        if(isNaN(+val)){
            return !(val.trim() === '');
        } else {
            return false;
        }
    } else if (type === "number" || type === "select"){
        return val > 0 && val < 400;
    }
    return false;
}

export function calculateBMI(weight : number, height : number){
    return weight / Math.pow(height, 2) * 703;
}