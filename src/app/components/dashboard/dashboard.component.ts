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
    public hasNext = false;
    public hasPrevious = false;

    private currentOffset = 0;
    private limit = 10;

    constructor(private api: PokeapiService) { }

    ngOnInit() {
        this.getPokemons();
    }

    handleLeft() {
        this.currentOffset -= this.limit;
        this.getPokemons();
    }

    handleRight() {
        this.currentOffset += this.limit;
        this.getPokemons();
    }

    getPokemons() {
        this.api.getPokemons(this.currentOffset, this.limit).subscribe((res: PokeapiDto) => {
            this.hasNext = !!res.next;
            this.hasPrevious = !!res.previous;
            this.pokemons = res.results.map(item => ({
                name: item.name,
                id: getIdFromUrl(item.url)
            }));
        });
    }
}
