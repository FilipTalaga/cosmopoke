import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PokeapiService {
    private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    constructor(private http: HttpClient) { }

    public getPokemon = (id: number) =>
        this.http.get(`${this.baseUrl}/${id}`)

    public getPokemons = (offset: number, limit: number) =>
        this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
}
