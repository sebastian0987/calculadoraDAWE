import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
<div class="calculadora">

  <div class="display"><input class="input" [(ngModel)]="ecuacion" placeholder="0" disabled></div>
  <br>
  <div class="keys">
    <p>
      <button class="button gray" (click)="numero(7)">7</button>
      <button class="button gray" (click)="numero(8)">8</button>
      <button class="button gray" (click)="numero(9)">9</button>
      <button class="button pink" (click)="operacion('+')">+</button>
    </p>
    <p>
      <button class="button gray" (click)="numero(4)">4</button>
      <button class="button gray" (click)="numero(5)">5</button>
      <button class="button gray" (click)="numero(6)">6</button>
      <button class="button pink" (click)="operacion('-')">-</button>
    </p>
    <p>
      <button class="button gray" (click)="numero(1)">1</button>
      <button class="button gray" (click)="numero(2)">2</button>
      <button class="button gray" (click)="numero(3)">3</button>
      <button class="button pink" (click)="operacion('*')">x</button>
    </p>
    <p>
      <button class="button gray" (click)="numero(0)">0</button>
      <button class="button gray" (click)="limpiar()">C</button>
      <button class="button orange" (click)="resultado()">=</button>
      <button class="button pink" (click)="operacion('/')">/</button>
    </p>
  </div>
</div>
  `
})
export class AppComponent {
  ecuacion = '';
  ecuacionTerminada = false;

  numero (numero: number) {
    if (this.ecuacionTerminada || this.ecuacion === 'ERROR') {
      this.ecuacionTerminada = false;
      this.ecuacion = '';
    }
    this.ecuacion += numero;
  }

  operacion (operacion:string) {
    if (this.ecuacion != '' &&
        this.ecuacion[this.ecuacion.length-1]!= '+' &&
        this.ecuacion[this.ecuacion.length-1]!= '-' &&
        this.ecuacion[this.ecuacion.length-1]!= '*' &&
        this.ecuacion[this.ecuacion.length-1]!= '/')
    {
      this.ecuacionTerminada = false;
      this.ecuacion += operacion;
    }

  };

  resultado () {
    if (this.ecuacion == ''){
      return;
    }
    if (this.ecuacion[this.ecuacion.length-1]== '+' ||
        this.ecuacion[this.ecuacion.length-1]== '-' ||
        this.ecuacion[this.ecuacion.length-1]== '*' ||
        this.ecuacion[this.ecuacion.length-1]== '/')
    {
      this.ecuacion = 'ERROR';
    }else {
      if (this.ecuacion[0] == '-'){
        this.ecuacion = '0'+this.ecuacion;
      }
      var equationArray = this.ecuacion.split(/(\+|\/|-|\*|\(|\))/);
      var solucion =  parseInt(equationArray[0]);
      for (var i = 1; i < equationArray.length; i=i+2) {
        switch (equationArray[i]){
          case '+':
            solucion = solucion + parseInt(equationArray[i+1]);
            break;
          case '-':
            solucion = solucion - parseInt(equationArray[i+1]);
            break;
          case '*':
            solucion = solucion * parseInt(equationArray[i+1]);
            break;
          case '/':
            solucion = solucion / parseInt(equationArray[i+1]);
            break;
        }
      }
      this.ecuacionTerminada = true;
      this.ecuacion = String(solucion);
    }

  };

  limpiar(){
    this.ecuacion = '';
  };

}
