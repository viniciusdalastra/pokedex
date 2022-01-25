import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url = 'http://localhost:3000/Pokemons'; //Define a API do server-json utilizada "SEM BANCO"

  constructor(private httpClient: HttpClient) { }

  /**
   * Define que o cabeçalho da requisição irá ser no formato JSON
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  /**
   * Retorna todos os pokemons
   * @returns
   */
  getPokemons(): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * Retorna o pokemon selecionado pelo ID repasssado
   * @param id 
   * @returns 
   */
  getPokemonById(id: number): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * Efetua a gravação de um pokemon
   * @param Pokemon 
   * @returns 
   */
  savePokemon(Pokemon: Pokemon): Observable<Pokemon> {
    return this.httpClient.post<Pokemon>(this.url, JSON.stringify(Pokemon), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * Realizar atualização dos dados de um pokemon
   * @param Pokemon 
   * @returns 
   */
  updatePokemon(Pokemon: Pokemon): Observable<Pokemon> {
    return this.httpClient.put<Pokemon>(this.url + '/' + Pokemon.id, JSON.stringify(Pokemon), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  /**
   * Realiza a remoção de um pokemon
   * @param Pokemon 
   * @returns 
   */
  deletePokemon(Pokemon: Pokemon) {
    return this.httpClient.delete<Pokemon>(this.url + '/' + Pokemon.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  /**
   * Efetua o tratamento de erro retornando o erro "tratado"
   * @param error 
   * @returns 
   */
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Caso o erro seja proveniente do clientside
      errorMessage = error.error.message;
    } else {
      // Caso o erro seja proveniente do serverside 
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}