import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BackgroundComponent } from './components/background/background.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatsComponent } from './components/pokemon/stats/stats.component';
import { ActionsComponent } from './components/pokemon/actions/actions.component';
import { ListComponent } from './components/dashboard/list/list.component';
import { IconButtonDirective } from './directives/icon-button.directive';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        PokemonComponent,
        PageNotFoundComponent,
        BackgroundComponent,
        ToolbarComponent,
        StatsComponent,
        ActionsComponent,
        ListComponent,
        IconButtonDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
