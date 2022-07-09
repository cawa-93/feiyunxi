export function rand<T extends any>(arr: T[]): T {
    return arr[randNum(arr.length)];
}



export function randNum(max: number, min = 0): number {
    return Math.floor(Math.random() * (max - min)) + min;
}
