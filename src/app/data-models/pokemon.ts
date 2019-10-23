export interface Stats {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
}

export default interface Pokemon {
    id: number;
    name: string;
    imgUrl: string;
    stats: Stats;
}

