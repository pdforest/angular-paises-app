import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: []
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  termino: string = '';
  deBouncer: Subject<string> = new Subject();
  
  @Input() placeholder: string = '';
  
  constructor() { }

  ngOnInit(): void {
    this.deBouncer
      .pipe(debounceTime(300))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
        //console.log('debouncer', valor);
      });
  }

 buscarInput() {
   console.log(this.termino);
   this.onEnter.emit(this.termino);
 }

 teclaPresionada() {
   this.deBouncer.next( this.termino );

 }

}
