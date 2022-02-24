import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    if(termino.trim().length === 0) return;
    
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino).subscribe( {
      next: (res) => {
        console.log(res);
        this.paises = res;
      },
      error: (err) => {
        this.hayError = true;
        console.log('Error...');
        console.info(err);
        this.paises = [];
      }
    })
    
  }

  sugerencias(termino: string) {
    this.hayError = false;
    //this.termino = termino;
  }


}
