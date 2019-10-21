import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import Pokemon from 'src/app/data-models/pokemon';
import PokemonDto from 'src/app/data-models/pokemon-dto';

@Component({
    selector: 'pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
    public pokemon: Pokemon;

    constructor(private activatedRoute: ActivatedRoute, private api: PokeapiService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => this.getPokemon(params.id));
    }

    private getPokemon(id: number) {
        this.api.getPokemon(id).subscribe((res: PokemonDto) => {
            this.pokemon = {
                name: res.name,
                imgUrl: res.sprites.front_default,
                stats: res.stats.map(stat => ({
                    name: stat.stat.name,
                    value: stat.base_stat,
                })),
            };
        });
    }
}
