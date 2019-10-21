export interface Stat {
    name: string;
    value: number;
}

export default interface Pokemon {
    name: string;
    imgUrl: string;
    stats: Stat[];
}

