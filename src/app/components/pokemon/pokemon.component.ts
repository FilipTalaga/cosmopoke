import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import Pokemon, { Stats } from 'src/app/data-models/pokemon';
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

    public maxStats: Stats = {
        hp: 255,
        attack: 190,
        defense: 230,
        spAttack: 190,
        spDefense: 230,
        speed: 180
    };

    constructor(private activatedRoute: ActivatedRoute, private api: PokeapiService, public router: Router) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const id = +params.id;

            if (!(id >= 1 && id <= 100)) {
                this.router.navigate(['/error']);
                return;
            }

            this.loadingNext = true;
            this.loadingPrev = true;

            this.api.getPokemon(id).subscribe((res: PokemonDto) => {
                this.currentPokemon = this.dtoToPokemon(res);
            });

            if (id > 1) {
                this.api.getPokemon(id - 1).subscribe((res: PokemonDto) => {
                    this.prevPokemon = this.dtoToPokemon(res);
                    this.loadingNext = false;
                });
            } else {
                this.prevPokemon = null;
                this.loadingNext = false;
            }

            if (id < 100) {
                this.api.getPokemon(id + 1).subscribe((res: PokemonDto) => {
                    this.nextPokemon = this.dtoToPokemon(res);
                    this.loadingPrev = false;
                });
            } else {
                this.nextPokemon = null;
                this.loadingPrev = false;
            }
        });
    }

    get loaded() {
        return this.prevPokemon && this.currentPokemon && this.nextPokemon;
    }

    get total() {
        return this.currentPokemon.stats.hp
            + this.currentPokemon.stats.attack
            + this.currentPokemon.stats.defense
            + this.currentPokemon.stats.spAttack
            + this.currentPokemon.stats.spDefense
            + this.currentPokemon.stats.speed;
    }

    getStatInPercent = (stat: string): string =>
        `scaleX(${this.currentPokemon ? this.currentPokemon.stats[stat] / this.maxStats[stat] : 0.2})`

    private dtoToPokemon = (res: PokemonDto): Pokemon => ({
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
