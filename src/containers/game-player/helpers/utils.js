/**
 * 
 * @param { number } min 
 * @param { number } max
 * @description 'Create Random number between min and max, with min inclusively
 */
export function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 
 * @param { number } max 
 * @param { number } number 
 * @param { number } difference
 * @description 'Get number + difference within range like 0 - 1 will be max number and not -1 
 */
export function getNextNumberInRange(max, number, difference) {
    if (number > max - 1 || number < 0) {
        throw new Error('NexNumberInRange: Invalid number !');
    }
    if(difference > -1) {
        return (number + difference) % max;
    }
    return (number + difference + max) % max;
}