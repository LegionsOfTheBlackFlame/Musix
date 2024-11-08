// Provide random index within array limit
export const randomIndex = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
        console.error("Provided array is undefined or empty");
        return -1; // Return -1 or some error indication if array is invalid
    }
    return Math.floor(Math.random() * arr.length);
};

export const checkLimit = (value, limit) => {
    if (value < limit) {
        return false;
    } else if (value === limit) {
        return true;
    } else {
        console.error("Value is greater than limit");
        return false; // Adding a return statement for consistent behavior
    }
};
