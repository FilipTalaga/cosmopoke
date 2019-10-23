import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import Pokemon from 'src/app/data-models/pokemon';
import PokemonDto from 'src/app/data-models/pokemon-dto';
import { mapPokemonDto } from 'src/app/utils/utils';

@Component({
    selector: 'pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
    public currentPokemon: Pokemon;
    public id: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private api: PokeapiService,
        public router: Router
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = +params.id;

            if (!(this.id >= 1 && this.id <= 100)) {
                this.router.navigate(['/error']);
                return;
            }

            this.api.getPokemon(this.id).subscribe((res: PokemonDto) => {
                this.currentPokemon = mapPokemonDto(res);
            });
        });
    }
}
