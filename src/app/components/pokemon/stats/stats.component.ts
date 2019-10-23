import { Component, Input } from '@angular/core';
import { Stats } from 'src/app/data-models/pokemon';

@Component({
    selector: 'stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
    @Input() stats: Stats;

    public maxStats: Stats = {
        hp: 255,
        attack: 190,
        defense: 230,
        spAttack: 190,
        spDefense: 230,
        speed: 180
    };

    get total() {
        return Object.keys(this.stats)
            .reduce((prev: number, curr: string) => prev + this.stats[curr], 0);
    }

    public getStatInPercent = (stat: string): string =>
        `scaleX(${this.stats ? this.stats[stat] / this.maxStats[stat] : 0.2})`
}
