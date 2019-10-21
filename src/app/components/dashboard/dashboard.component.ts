import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import PokeapiDto from 'src/app/data-models/pokeapi-dto';
import PokemonLabel from 'src/app/data-models/pokemon-label';
import { getIdFromUrl } from 'src/app/utils/utils';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public title = 'Cosmopoke';
    public pokemons: PokemonLabel[] = [];

    constructor(private api: PokeapiService) { }

    ngOnInit() {
        this.api.getPokemons(30, 10).subscribe((res: PokeapiDto) => {
            this.pokemons = res.results.map(item => ({
                name: item.name,
                id: getIdFromUrl(item.url)
            }));
        });
    }
}
