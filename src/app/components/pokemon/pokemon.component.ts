import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Pokemon {
    name: string;
    stats: [];
    sprites: any;
}

@Component({
    selector: 'pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
    public pokemon: Pokemon;

    constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.http.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`).subscribe((res: Pokemon) => {
                this.pokemon = res;
                console.log(res);
            });
        });
    }
}
