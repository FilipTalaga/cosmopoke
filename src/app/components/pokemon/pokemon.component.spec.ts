import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonComponent } from './pokemon.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StatsComponent } from './stats/stats.component';

describe('PokemonComponent', () => {
    let component: PokemonComponent;
    let fixture: ComponentFixture<PokemonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [PokemonComponent, StatsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PokemonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
