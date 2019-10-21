export const getIdFromUrl = (url: string): number =>
    +url.split('/').filter(c => c !== '').slice(-1)[0];
