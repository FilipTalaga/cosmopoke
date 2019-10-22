import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import Pokemon from 'src/app/data-models/pokemon';
import PokemonDto from 'src/app/data-models/pokemon-dto';

@Component({
    selector: 'pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
    public prevPokemon: Pokemon;
    public currentPokemon: Pokemon;
    public nextPokemon: Pokemon;

    constructor(private activatedRoute: ActivatedRoute, private api: PokeapiService, private router: Router) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const id = +params.id;

            this.api.getPokemon(id).subscribe((res: PokemonDto) => {
                this.currentPokemon = this.dtoToPokemon(res);
            });
            this.api.getPokemon(id - 1).subscribe((res: PokemonDto) => {
                this.prevPokemon = this.dtoToPokemon(res);
            });
            this.api.getPokemon(id + 1).subscribe((res: PokemonDto) => {
                this.nextPokemon = this.dtoToPokemon(res);
            });
        });
    }

    get loaded() {
        return this.prevPokemon && this.currentPokemon && this.nextPokemon;
    }

    private dtoToPokemon = (res: PokemonDto): Pokemon => ({
        id: res.id,
        name: res.name,
        imgUrl: res.sprites.front_default,
        stats: res.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat,
        })),
    })

    public handlePrev() {
        this.router.navigate(['/pokemon', this.prevPokemon.id]);
    }

    public handleNext() {
        this.router.navigate(['/pokemon', this.nextPokemon.id]);
    }
}
