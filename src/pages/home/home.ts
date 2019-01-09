import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriasPage } from '../categorias/categorias';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public nombreUsuario: string;

  constructor(public navCtrl: NavController) {

  }

  // Ir a la ventana categorias
  pagCategories(){
    if(this.nombreUsuario != undefined){
      this.navCtrl.setRoot(CategoriasPage, {nombreUsuario: this.nombreUsuario});
    }
  }
}
