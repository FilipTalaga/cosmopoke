import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import PokeapiDto from 'src/app/data-models/pokeapi-dto';
import PokemonLabel from 'src/app/data-models/pokemon-label';
import { getIdFromUrl } from 'src/app/utils/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public searchForm: FormGroup;
    public pokemons: PokemonLabel[] = [];
    public hasNext = false;
    public hasPrevious = false;
    private currentOffset = 0;
    public limit = 10;
    public maxPages = 10;

    constructor(formBuilder: FormBuilder, private api: PokeapiService, private router: Router) {
        this.searchForm = formBuilder.group({
            id: formBuilder.control('', {
                updateOn: 'change',
                validators: [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(this.limit * this.maxPages),
                    Validators.pattern('^(0|[1-9][0-9]*)$'),
                ]
            }),
        });
    }

    get isFormInvalid() {
        return !this.searchForm.pristine && this.searchForm.touched && this.searchForm.invalid;
    }

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

    handleSearch() {
        if (this.searchForm.invalid) {
            return;
        }
        this.router.navigate(['/pokemon', this.searchForm.value.id]);
    }

    getPokemons() {
        this.api.getPokemons(this.currentOffset, this.limit).subscribe((res: PokeapiDto) => {
            this.hasNext = !!res.next && !this.isOverMaxPages();
            this.hasPrevious = !!res.previous;
            this.pokemons = res.results.map(item => ({
                name: item.name,
                id: getIdFromUrl(item.url)
            }));
        });
    }

    isOverMaxPages = (): boolean => this.currentOffset >= this.maxPages * this.limit - this.limit;
}
