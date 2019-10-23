import { Component, OnInit, Input, OnChanges } from '@angular/core';
import Pokemon from 'src/app/data-models/pokemon';
import { Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import PokemonDto from 'src/app/data-models/pokemon-dto';
import { mapPokemonDto } from 'src/app/utils/utils';

@Component({
    selector: 'actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, OnChanges {
    @Input() id: number;

    public prevPokemon: Pokemon;
    public nextPokemon: Pokemon;
    public loadingNext = false;
    public loadingPrev = false;

    constructor(
        private api: PokeapiService,
        public router: Router
    ) { }

    ngOnInit() {
        this.loadPrevPokemon(this.id);
        this.loadNextPokemon(this.id);
    }

    ngOnChanges() {
        this.loadPrevPokemon(this.id);
        this.loadNextPokemon(this.id);
    }

    private loadPrevPokemon(id: number) {
        if (!(this.id > 1 && this.id <= this.api.count)) {
            this.prevPokemon = null;
            return;
        }

        this.loadingPrev = true;
        this.api.getPokemon(id - 1).subscribe((res: PokemonDto) => {
            this.prevPokemon = mapPokemonDto(res);
            this.loadingPrev = false;
        });
    }

    private loadNextPokemon(id: number) {
        if (!(this.id >= 1 && this.id < this.api.count)) {
            this.nextPokemon = null;
            return;
        }

        this.loadingNext = true;
        this.api.getPokemon(id + 1).subscribe((res: PokemonDto) => {
            this.nextPokemon = mapPokemonDto(res);
            this.loadingNext = false;
        });
    }

    public handlePrev() {
        this.router.navigate(['/pokemon', this.prevPokemon.id]);
    }

    public handleNext() {
        this.router.navigate(['/pokemon', this.nextPokemon.id]);
    }
}
