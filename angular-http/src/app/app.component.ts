import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './models/pokemon';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pokemon = {} as Pokemon;
  pokemons: Pokemon[] | undefined;

  constructor(private pokemonService: PokemonService) {}
  
  ngOnInit() {
    this.getPokemons();
  }

  /**
   * Faz a verificação para atualizar um registro caso exista, caso contrário ele cria
   * @param form 
   */
  savePokemon(form: NgForm) {
    if (this.pokemon.id !== undefined) {
      this.pokemonService.updatePokemon(this.pokemon).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.pokemonService.savePokemon(this.pokemon).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
  /**
   * Define  todos os pokemons existentes na "API"
   */
  getPokemons() {
    this.pokemonService.getPokemons().subscribe((pokemons: Pokemon[]) => {
      this.pokemons = pokemons;
    });
  }

  
  /**
   * Efetua a remoção do pokemon
   * @param pokemon 
   */
  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemon(pokemon).subscribe(() => {
      this.getPokemons();
    });
  }

  /**
   * Copia o pokemon para realizar a alteração do mesmo
   * @param pokemon 
   */  
  editPokemon(pokemon: Pokemon) {
    this.pokemon = { ...pokemon };
  }

  /**
   * Efetua a limpeza do formulário enviado
   * @param form 
   */
  cleanForm(form: NgForm) {
    this.getPokemons();
    form.resetForm();
    this.pokemon = {} as Pokemon;
  }
  

}