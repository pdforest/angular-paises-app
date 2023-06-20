import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: []
})
export class PaisInputComponent implements OnInit, OnDestroy {

  //los Inputs inyectan los padres a los hijos
  @Input() 
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  //los Output escuchan los padres de este componente (por-pais-componnent)
  @Output() 
  public onEnter   : EventEmitter<string> = new EventEmitter();
  
  @Output() 
  public onDebounce: EventEmitter<string> = new EventEmitter();

  public termino: string = '';

  //Debounce - peticiones cuando el usuario deja de escribir
  //Subject es un tipo especial de Observable
  private deBouncer: Subject<string> = new Subject<string>();
  private deBouncerSubscription?: Subscription;
    
  constructor() { }

  ngOnInit(): void {
    this.termino = this.initialValue;
    this.deBouncerSubscription = this.deBouncer
      .pipe(debounceTime(300))
      //luego que se dejo de escribir, espera 300ms para mandar al subscrbe
      .subscribe( valor => {
        this.onDebounce.emit( valor );
        //console.log('debouncer', valor);
      });
  }

  ngOnDestroy(): void {
    this.deBouncerSubscription?.unsubscribe();
  }

 buscarInput() {
   console.log(this.termino);
   this.onEnter.emit(this.termino);
 }

 teclaPresionada() {
   this.deBouncer.next( this.termino );

 }

}
