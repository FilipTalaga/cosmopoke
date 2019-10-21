import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';

interface PokemonDto {
    name: string;
    url: string;
}

interface PokeApiDto {
    count: number;
    next: string;
    previous: string;
    results: PokemonDto[];
}

interface Pokemon {
    name: string;
    id: number;
}

const getIdFromUrl = (url: string): number => +url.split('/').slice(-2)[0];

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public title = 'Cosmopoke';
    public pokemons: Pokemon[] = [];

    constructor(private api: PokeapiService) { }

    ngOnInit() {
        this.api.getPokemons(0, 10).subscribe((res: PokeApiDto) => {
            this.pokemons = res.results.map(item => ({
                name: item.name,
                id: getIdFromUrl(item.url)
            }));
        });
    }
}
