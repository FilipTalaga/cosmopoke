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
    public loadingNext = false;
    public loadingPrev = false;

    constructor(private activatedRoute: ActivatedRoute, private api: PokeapiService, public router: Router) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const id = +params.id;

            if (!(id >= 1 && id <= 100)) {
                this.router.navigate(['/error']);
                return;
            }

            this.loadCurrentPokemon(id);
            this.loadPrevPokemon(id);
            this.loadNextPokemon(id);
        });
    }

    private loadCurrentPokemon(id: number) {
        this.api.getPokemon(id).subscribe((res: PokemonDto) => {
            this.currentPokemon = this.mapPokemonDto(res);
        });
    }

    private loadPrevPokemon(id: number) {
        if (id <= 1) {
            this.prevPokemon = null;
            return;
        }

        this.loadingPrev = true;
        this.api.getPokemon(id - 1).subscribe((res: PokemonDto) => {
            this.prevPokemon = this.mapPokemonDto(res);
            this.loadingPrev = false;
        });
    }

    private loadNextPokemon(id: number) {
        if (id >= 100) {
            this.nextPokemon = null;
            return;
        }

        this.loadingNext = true;
        this.api.getPokemon(id + 1).subscribe((res: PokemonDto) => {
            this.nextPokemon = this.mapPokemonDto(res);
            this.loadingNext = false;
        });
    }

    private mapPokemonDto = (res: PokemonDto): Pokemon => ({
        id: res.id,
        name: res.name,
        imgUrl: res.sprites.front_default,
        stats: {
            hp: this.getStatByName(res, 'hp'),
            attack: this.getStatByName(res, 'attack'),
            defense: this.getStatByName(res, 'defense'),
            spAttack: this.getStatByName(res, 'special-attack'),
            spDefense: this.getStatByName(res, 'special-defense'),
            speed: this.getStatByName(res, 'speed'),
        }
    })

    private getStatByName = (res: PokemonDto, name: string): number =>
        res.stats.find(item => item.stat.name === name).base_stat

    public handlePrev() {
        this.router.navigate(['/pokemon', this.prevPokemon.id]);
    }

    public handleNext() {
        this.router.navigate(['/pokemon', this.nextPokemon.id]);
    }
}
