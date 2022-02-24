import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  
  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    if(termino.trim().length === 0) return;
    
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital(termino).subscribe( {
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

}
