import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';

interface Pokemon {
    name: string;
    stats: [];
    sprites: any;
}

@Component({
    selector: 'pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
    public pokemon: Pokemon;

    constructor(private activatedRoute: ActivatedRoute, private api: PokeapiService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.api.getPokemon(params.id).subscribe((res: Pokemon) => {
                this.pokemon = res;
                console.log(res);
            });
        });
    }
}
