import PokemonDto from '../data-models/pokemon-dto';
import Pokemon from '../data-models/pokemon';

export const getIdFromUrl = (url: string): number => +url
    .split('/')
    .filter(c => c !== '')
    .slice(-1)[0];

export const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomSequence = (count: number, from: number, to: number) =>
    Array(count).fill(0).map(() => getRandomInt(from, to));

export const mapPokemonDto = (dto: PokemonDto): Pokemon => {
    const getStatByName = (name: string): number =>
        dto.stats.find(item => item.stat.name === name).base_stat;

    return {
        id: dto.id,
        name: dto.name,
        imgUrl: dto.sprites.front_default,
        stats: {
            hp: getStatByName('hp'),
            attack: getStatByName('attack'),
            defense: getStatByName('defense'),
            spAttack: getStatByName('special-attack'),
            spDefense: getStatByName('special-defense'),
            speed: getStatByName('speed'),
        }
    };
};
