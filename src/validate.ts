export function validateEntry(formData: HTMLInputElement, callback: Function){
    if(validateAux(formData.type, formData.value)){
        callback(formData.name, formData.value)
        return true
    }
    return false
}

export function validateAux(type : string, val : string) {
    //must be a string or a number
    if (type === "text" || type === "select") {
        if(isNaN(+val)){
            return !(val.trim() === '');
        } else {
            return false;
        }
    } else if (type === "number"){
        return parseInt(val) > 0;
    }
    return false;
}