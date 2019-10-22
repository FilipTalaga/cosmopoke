export interface Stat {
    name: string;
    value: number;
}

export default interface Pokemon {
    id: number;
    name: string;
    imgUrl: string;
    stats: Stat[];
}

