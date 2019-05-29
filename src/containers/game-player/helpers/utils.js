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