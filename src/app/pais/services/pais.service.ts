import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { CacheStore } from '../interfaces/cache-store.interface';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    porCapital: {term: '', countries: []},
    porPais:    {term: '', countries: []},
    porRegion:  {term: '', countries: []},
  }

  get httpParams(): HttpParams {
    return new HttpParams().set('fields', 'name,capital,cca2,flags,population');
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
   }

  private saveToLoalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify(this.cacheStore) );
  }

  private loadFromLocalStorage() {
    if( !localStorage.getItem('cacheStore') ) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  buscarPais(termino: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>( url, { params: this.httpParams} )
    .pipe(
      tap( countries => this.cacheStore.porPais = { term: termino, countries}),
      tap( () =>  this.saveToLoalStorage()),
      catchError( () => of ([]))
    );
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>( url, { params: this.httpParams} )
    .pipe(
      tap( countries => this.cacheStore.porCapital = { term: termino, countries}),
      tap( () =>  this.saveToLoalStorage()),
      catchError( () => of ([]))
    );
  }

  buscarAlphaCode(termino: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/alpha/${termino}`;
    return this.http.get<Country[]>( url );
  }

  buscarRegion(termino: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${termino}`;
    return this.http.get<Country[]>( url, { params: this.httpParams} )
    .pipe(
      tap( countries => this.cacheStore.porRegion = { term: termino, countries}),
      tap( () =>  this.saveToLoalStorage()),
      catchError( () => of ([]))
    );
  }
}
