import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokeAPI, PokemonDetails, Results, TYPE_COLOURS } from '../interface';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemons: PokeAPI;
  pokemonID: any;
  pokemonsLoaded: boolean;
  @Output() exportPokemons = new EventEmitter();


  constructor(private pokemonService: PokemonService, private dialogRef: MatDialogRef<PokemonDetailComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.pokemonID = data.id;
  }

  ngOnInit(): void {
    this.getPokemons();
    //this.getPokemonSpeciesDetails(this.pokemonService.pokedescAPI);
  }




  getPokemons(): void {
    this.pokemonService.getPokemon().subscribe((data: PokeAPI) => {
      this.pokemons = data;
      // console.log(data);
      if (data && data.results) {
        let array = data.results.filter((x, i) => x.url.split('/')[
          x.url.split('/').length - 2
        ] === this.pokemonID);
        if (array) {
          this.pokemons.results = array;
          this.getPokemonDetails(array[0]);
          this.getPokemonSpeciesDetails(array[0]);
        }
      }



      // //Data display For all pokemons
      // if (this.pokemons.results && this.pokemons.results.length) {
      //   // get pokemon details for every pokemon
      //   this.pokemons.results.forEach(pokemon => {
      //     // set pokemon id
      //      pokemon.id = pokemon.url.split('/')[
      //        pokemon.url.split('/').length - 2
      //     ];
      //     this.getPokemonDetails(pokemon);
      //     this.getPokemonSpeciesDetails(pokemon);
      //   });
      // }
    });
  }

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
  getPokemonDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonDetails(pokemon.name)
      .subscribe((details: PokemonDetails) => {
        pokemon.details = details;
        // when last pokemon details have been loaded
        // send pokemons to header component
        //Data display For all pokemons
        // if (pokemon.id === '151') {
        //   this.pokemonsLoaded = true;
        //   this.exportPokemons.emit(this.pokemons.results);
        // }
        this.pokemonsLoaded = true;
        this.exportPokemons.emit(this.pokemons.results);
      });

  }






  // getPokemonSpeciesDetails(pokemon: Results): void {
  //   this.pokemonService
  //     .getPokemonDesc(pokemon.name)
  //     .subscribe((data: any) => {
  //       const entries = data.flavor_text_entries;
  //       if (entries) {
  //         entries.some(flavor => {
  //           if (flavor.language.name === 'en') {
  //             pokemon.description = flavor.flavor_text;
  //             this.pokemons = data;
  //             console.log(this.pokemons);
  //           }
  //         });
  //       }
  //     });
  // }







}
