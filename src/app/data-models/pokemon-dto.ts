export interface StatDetailsDto {
    name: string;
    url: string;
}

export interface StatDto {
    base_stat: number;
    effort: number;
    stat: StatDetailsDto;
}

export interface SpritesDto {
    front_default: string;
}

export default interface PokemonDto {
    name: string;
    stats: StatDto[];
    sprites: SpritesDto;
}
