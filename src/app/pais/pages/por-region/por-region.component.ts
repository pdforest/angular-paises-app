import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  `]
})
export class PorRegionComponent implements OnInit{

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];
  initialValue: string = '';

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paises = this.paisService.cacheStore.porRegion.countries;
    this.initialValue = this.paisService.cacheStore.porRegion.term;
    this.regionActiva = this.initialValue;
  }

  getClaseCSS(region: string): string{
    return (this.regionActiva == region) ? 'btn btn-primary' : 'btn btn-outline-primary';
  }

  activarRegion(region: string){
    if (region === this.regionActiva) return;
    this.regionActiva = region;
    this.paises = [];
    this.paisService.buscarRegion(region).subscribe( resp => {
      console.log(resp);
      this.paises = resp;
    });

  }

}
