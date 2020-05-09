import { Component } from '@angular/core';
import { Results } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public search: string;
  public typeFilter: string;
  public pokemons: Array<Results>;
  public abilityFilter: Array<string>;

  newPokemonSearch(search: string): void {
    if (this.search !== search) {
      this.search = search;
    }
  }


  newTypeSelected(filter: string): void {
    if (this.typeFilter !== filter) {
      this.typeFilter = filter;
    }
  }
  newAbilitiesSelected(abilities: Array<string>): void {
    if (this.abilityFilter !== abilities) {
      this.abilityFilter = abilities;
    }
  }


  exportPokemons(pokemons: Array<Results>): void {
    if (this.pokemons !== pokemons) {
      this.pokemons = pokemons;
    }
  }

}
