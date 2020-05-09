import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonHeaderComponent } from './pokemon-header/pokemon-header.component';
import { PokemonHomepageComponent } from './pokemon-homepage/pokemon-homepage.component';
import { AbilitiesFilterPipe } from './abilities-filter.pipe';
import { SearchPipe } from './search.pipe';
import { TypeFilterPipe } from './type-filter.pipe';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonHeaderComponent,
    PokemonHomepageComponent,
    AbilitiesFilterPipe,
    SearchPipe,
    TypeFilterPipe,
    PokemonDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [PokemonDetailComponent]
})
export class AppModule { }
