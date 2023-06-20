import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
    a {
      padding: 0;
    }
  `]
})
export class PorPaisComponent implements OnInit{

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;
  isLoading: boolean = false;
  initialValue: string = '';

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paises = this.paisService.cacheStore.porPais.countries;
    this.initialValue = this.paisService.cacheStore.porPais.term;
  }

  buscar(termino: string) {
    if(termino.trim().length === 0) return;
    
    this.hayError = false;
    this.mostrarSugerencias = false;
    this.termino = termino;
    this.isLoading = true;

    this.paisService.buscarPais(termino).subscribe( {
      next: res => {
        console.log(res);
        this.paises = res;
        this.isLoading = false;
      },
      error: err => {
        this.hayError = true;
        console.log('Error...');
        console.info(err);
        this.paises = [];
        this.paisesSugeridos = [];
        this.isLoading = false;
      }
    })
    
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.isLoading = true;

    this.paisService.buscarPais(termino).subscribe({
      next: res => {
        this.paisesSugeridos = res.slice(0,5);
        this.isLoading = false;
      },
      error: err => {
        this.paisesSugeridos = [];
        this.mostrarSugerencias = false;
        this.isLoading = false;
      }
    })
  }


}
