import { Component, OnInit } from '@angular/core';
import { getRandomSequence, getIdFromUrl } from 'src/app/utils/utils';
import PokemonLabel from 'src/app/data-models/pokemon-label';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import PokeapiDto from 'src/app/data-models/pokeapi-dto';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    public mocks = getRandomSequence(10, 40, 100);
    public pokemons: PokemonLabel[] = [];
    public hasNext = false;
    public hasPrevious = false;
    public loading = false;

    private currentOffset = 0;

    constructor(private api: PokeapiService) { }

    ngOnInit() {
        this.getPokemons();
    }

    public handleLeft() {
        this.currentOffset -= this.api.limit;
        this.getPokemons();
    }

    public handleRight() {
        this.currentOffset += this.api.limit;
        this.getPokemons();
    }

    private getPokemons() {
        this.mocks = getRandomSequence(10, 40, 100);
        this.pokemons = [];
        this.loading = true;
        this.api.getPokemons(this.currentOffset, this.api.limit).subscribe((res: PokeapiDto) => {
            this.hasNext = !!res.next && !this.isOverMaxPages();
            this.hasPrevious = !!res.previous;
            this.pokemons = res.results.map(item => ({
                name: item.name,
                id: getIdFromUrl(item.url)
            }));
            this.loading = false;
        });
    }

    private isOverMaxPages = (): boolean =>
        this.currentOffset >= this.api.count - this.api.limit
}
