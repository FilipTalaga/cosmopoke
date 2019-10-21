export const getIdFromUrl = (url: string): number =>
    +url.split('/').slice(-2)[0];
