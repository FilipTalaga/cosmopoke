export const getIdFromUrl = (url: string): number => +url
    .split('/')
    .filter(c => c !== '')
    .slice(-1)[0];

export const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min);
