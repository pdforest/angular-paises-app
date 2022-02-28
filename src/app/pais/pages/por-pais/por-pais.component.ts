import { Component } from '@angular/core';
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
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    if(termino.trim().length === 0) return;
    
    this.hayError = false;
    this.mostrarSugerencias = false;
    this.termino = termino;

    this.paisService.buscarPais(termino).subscribe( {
      next: res => {
        console.log(res);
        this.paises = res;
      },
      error: err => {
        this.hayError = true;
        console.log('Error...');
        console.info(err);
        this.paises = [];
        this.paisesSugeridos = [];
      }
    })
    
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino).subscribe({
      next: res => this.paisesSugeridos = res.slice(0,5),
      error: err => {
        this.paisesSugeridos = [];
        this.mostrarSugerencias = false;
      }
    })
  }


}
