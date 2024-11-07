// Provide random index within array limit
export const randomIndex = (arr) => {

    let index = Math.floor(Math.random() * arr.length);
    return index;
}

export const checkLimit = (value, limit) => {
    if (value < limit) {
        return false;
    } else if (value === limit) {
        return true;
    } else {
        console.error("Value is greater than limit");
    }}
