import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    public searchForm: FormGroup;

    constructor(
        formBuilder: FormBuilder,
        private router: Router,
        public api: PokeapiService
    ) {
        this.searchForm = formBuilder.group({
            id: formBuilder.control('', {
                updateOn: 'change',
                validators: [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(api.count),
                    Validators.pattern('^(0|[1-9][0-9]*)$'),
                ]
            }),
        });
    }

    get isFormInvalid() {
        return !this.searchForm.pristine && this.searchForm.touched && this.searchForm.invalid;
    }

    handleSearch() {
        if (this.searchForm.invalid) {
            return;
        }

        this.router.navigate(['/pokemon', this.searchForm.value.id]);
    }
}
