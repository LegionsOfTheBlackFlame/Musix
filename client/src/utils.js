// Provide random index within array limit
export const randomOfArray = (pool) => {
    if (!Array.isArray(pool)) {
      throw new Error('Input must be an array');
    }
    if (pool.length === 0) {
      throw new Error('Array must not be empty');
    }
    return pool[Math.floor(Math.random() * pool.length)];
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

