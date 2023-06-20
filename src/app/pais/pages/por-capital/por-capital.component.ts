import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit{

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  initialValue: string = '';
  
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paises = this.paisService.cacheStore.porCapital.countries;
    this.initialValue = this.paisService.cacheStore.porCapital.term;
  }

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
