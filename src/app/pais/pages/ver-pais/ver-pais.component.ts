import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private paisService: PaisService
  ){ }

  ngOnInit(): void {

    this.activatedRoute.params
      // el switchMap cambia el observable, lo usamos para optimizar el codigo de abajo
      // que hay que subscribirse a 2 observables
      .pipe( switchMap( 
        ({ id }) => this.paisService.buscarAlphaCode(id) ),
        tap(console.log)
        )
      .subscribe( pais => this.pais = pais[0] )

/*     this.activatedRoute.params
      .subscribe( ({ id }) => { //uso la desestructuracion (muy cheto)
        this.paisService.buscarAlphaCode( id )
          .subscribe( pais => {
            console.log( pais );
          })
      })
 */  

  }

}
