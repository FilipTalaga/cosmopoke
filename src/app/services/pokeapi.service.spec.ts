import { TestBed } from '@angular/core/testing';
import { PokeapiService } from './pokeapi.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import PokemonDto from '../data-models/pokemon-dto';
import PokeapiDto from '../data-models/pokeapi-dto';

describe('PokeapiService', () => {
    let service: PokeapiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PokeapiService]
        });
        service = TestBed.get(PokeapiService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#getPokemon', () => {
        it('should get bulbasaur', () => {
            const dummyPokemon: PokemonDto = {
                id: 4,
                name: 'bulbasaur',
                sprites: {
                    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                },
                stats: [
                    { base_stat: 45, stat: { name: 'speed', }, },
                    { base_stat: 65, stat: { name: 'special-defense', }, },
                    { base_stat: 65, stat: { name: 'special-attack', }, },
                    { base_stat: 49, stat: { name: 'defense', }, },
                    { base_stat: 49, stat: { name: 'attack', }, },
                    { base_stat: 45, stat: { name: 'hp', }, },
                ]
            };

            service.getPokemon(1).subscribe(pokemon => {
                expect(pokemon).toEqual(dummyPokemon);
            });

            const req = httpMock.expectOne(`${service.baseUrl}/1`);
            expect(req.request.method).toBe('GET');
            req.flush(dummyPokemon);
        });

        it('should get mawile', () => {
            const dummyPokemon: PokemonDto = {
                id: 4,
                name: 'mawile',
                sprites: {
                    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/303.png',
                },
                stats: [
                    { base_stat: 50, stat: { name: 'speed', }, },
                    { base_stat: 55, stat: { name: 'special-defense', }, },
                    { base_stat: 55, stat: { name: 'special-attack', }, },
                    { base_stat: 85, stat: { name: 'defense', }, },
                    { base_stat: 85, stat: { name: 'attack', }, },
                    { base_stat: 50, stat: { name: 'hp', }, },
                ]
            };

            service.getPokemon(303).subscribe(pokemon => {
                expect(pokemon).toEqual(dummyPokemon);
            });

            const req = httpMock.expectOne(`${service.baseUrl}/303`);
            expect(req.request.method).toBe('GET');
            req.flush(dummyPokemon);
        });
    });

    describe('#getPokemons', () => {
        it('should get list with 50 offset and 10 limit', () => {
            const offset = 50;
            const limit = 10;

            const dummyPokeapi: PokeapiDto = {
                count: 964,
                next: `https://pokeapi.co/api/v2/pokemon?offset=${offset + limit}&limit=${limit}`,
                previous: `https://pokeapi.co/api/v2/pokemon?offset=${offset - limit}&limit=${limit}`,
                results: Array(limit).fill(
                    { name: 'dugtrio', url: 'https://pokeapi.co/api/v2/pokemon/51/' },
                )
            };

            service.getPokemons(offset, limit).subscribe(list => {
                expect(list).toEqual(dummyPokeapi);
            });

            const req = httpMock.expectOne(`${service.baseUrl}?offset=${offset}&limit=${limit}`);
            expect(req.request.method).toBe('GET');
            req.flush(dummyPokeapi);
        });

        it('should get list with 480 offset and 50 limit', () => {
            const offset = 480;
            const limit = 50;

            const dummyPokeapi: PokeapiDto = {
                count: 964,
                next: `https://pokeapi.co/api/v2/pokemon?offset=${offset + limit}&limit=${limit}`,
                previous: `https://pokeapi.co/api/v2/pokemon?offset=${offset - limit}&limit=${limit}`,
                results: Array(limit).fill(
                    { name: 'dugtrio', url: 'https://pokeapi.co/api/v2/pokemon/51/' },
                )
            };

            service.getPokemons(offset, limit).subscribe(list => {
                expect(list).toEqual(dummyPokeapi);
            });

            const req = httpMock.expectOne(`${service.baseUrl}?offset=${offset}&limit=${limit}`);
            expect(req.request.method).toBe('GET');
            req.flush(dummyPokeapi);
        });
    });

    afterEach(() => {
        httpMock.verify();
    });
});
