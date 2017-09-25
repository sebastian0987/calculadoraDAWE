import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
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

  operacion (operacion: string) {
    if (this.ecuacion !== '' &&
        this.ecuacion[this.ecuacion.length - 1] !== '+' &&
        this.ecuacion[this.ecuacion.length - 1] !== '-' &&
        this.ecuacion[this.ecuacion.length - 1] !== '*' &&
        this.ecuacion[this.ecuacion.length - 1] !== '/') {
          this.ecuacionTerminada = false;
          this.ecuacion += operacion;
        }

  }

  resultado () {
    if (this.ecuacion === '') {
      return;
    }
    if (this.ecuacion[this.ecuacion.length - 1] === '+' ||
        this.ecuacion[this.ecuacion.length - 1] === '-' ||
        this.ecuacion[this.ecuacion.length - 1] === '*' ||
        this.ecuacion[this.ecuacion.length - 1] === '/')
    {
      this.ecuacion = 'ERROR';
    }else {
      if (this.ecuacion[0] === '-') {
        this.ecuacion = '0' + this.ecuacion;
      }
      var equationArray = this.ecuacion.split(/(\+|\/|-|\*|\(|\))/);
      var solucion =  parseInt(equationArray[0]);
      for (var i = 1; i < equationArray.length; i = i + 2) {
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
