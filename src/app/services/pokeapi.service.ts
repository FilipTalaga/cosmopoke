import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import PokemonDto from '../data-models/pokemon-dto';
import PokeapiDto from '../data-models/pokeapi-dto';

@Injectable({
    providedIn: 'root'
})
export class PokeapiService {
    public baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    constructor(private http: HttpClient) { }

    public getPokemon = (id: number): Observable<PokemonDto> => this.http
        .get<PokemonDto>(`${this.baseUrl}/${id}`)

    public getPokemons = (offset: number, limit: number): Observable<PokeapiDto> => this.http
        .get<PokeapiDto>(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
}
