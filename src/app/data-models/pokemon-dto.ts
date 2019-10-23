export interface StatDetailsDto {
    name: string;
}

export interface StatDto {
    base_stat: number;
    stat: StatDetailsDto;
}

export interface SpritesDto {
    front_default: string;
}

export default interface PokemonDto {
    id: number;
    name: string;
    stats: StatDto[];
    sprites: SpritesDto;
}
