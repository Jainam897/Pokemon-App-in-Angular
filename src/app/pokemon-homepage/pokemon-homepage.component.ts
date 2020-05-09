import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PokeAPI, PokemonDetails, Results, TYPE_COLOURS } from '../interface';
import { PokemonService } from '../pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-pokemon-homepage',
  templateUrl: './pokemon-homepage.component.html',
  styleUrls: ['./pokemon-homepage.component.scss']
})
export class PokemonHomepageComponent implements OnInit {
  // dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;

  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  @Output() exportPokemons = new EventEmitter();
  pokemonsLoaded: boolean;
  pokemons: PokeAPI;
  query: string;
  abilityFilters: Array<string>;
  typeFilters: string;

  @Input() set search(newSearch: string) {
    if (newSearch !== this.query) {
      this.query = newSearch;
    }
  }

  @Input() set typeFilter(type: string) {
    if (type !== this.typeFilter) {
      this.typeFilters = type;
    }
  }

  @Input() set abilityFilter(abilities: Array<string>) {
    if (abilities !== this.abilityFilters) {
      this.abilityFilters = abilities;
    }
  }


  constructor(private pokemonService: PokemonService, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog) { }
  dataSource: MatTableDataSource<Results  >;

  ngOnInit(): void {
    this.pokemonsLoaded = false;
    this.getPokemons();


  }

  getPokemons(): void {
    this.pokemonService.getPokemon().subscribe((data: PokeAPI) => {
      this.pokemons = data;

      if (this.pokemons.results && this.pokemons.results.length) {
        // get pokemon details for every pokemon
        this.pokemons.results.forEach(pokemon => {
          // set pokemon id
          pokemon.id = pokemon.url.split('/')[
            pokemon.url.split('/').length - 2
          ];
          this.getPokemonDetails(pokemon);
          this.getPokemonSpeciesDetails(pokemon);
        });
        let DATA : Results[] = this.pokemons.results;
        this.dataSource = new MatTableDataSource<Results>(DATA);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      }
    });
  }

  /**
   * Gets and sets a pokemons details
   */
  getPokemonDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonDetails(pokemon.name)
      .subscribe((details: PokemonDetails) => {
        pokemon.details = details;
        // when last pokemon details have been loaded
        // send pokemons to header component
        if (pokemon.id === '151') {
          this.pokemonsLoaded = true;
          this.exportPokemons.emit(this.pokemons.results);
        }
      });
  }

  /**
   * Gets and sets a species details
   * (currently only sets the description -
   * would be used when card is clicked and either
   * a new page/dialog with further information on
   * a pokemon is shown)
   */
  getPokemonSpeciesDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonSpecies(pokemon.name)
      .subscribe((species: any) => {
        const entries = species.flavor_text_entries;
        if (entries) {
          entries.some(flavor => {
            if (flavor.language.name === 'en') {
              pokemon.description = flavor.flavor_text;
            }
          });
        }
      });
  }

  /**
   * returns colour based on type mapped
   * in TYPE_COLOURS interface
   */
  _getTypeColour(type: string): string {
    if (type) {
      return '#' + TYPE_COLOURS[type];
    }
  }

  openDialog(id: any) {
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.width = "50%";
    config.height = "80%";
    config.data = {
      id: id,
    };
    this.dialog.open(PokemonDetailComponent, config);


  }
}
