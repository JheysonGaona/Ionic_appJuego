import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-puntaje',
  templateUrl: 'puntaje.html',
})
export class PuntajePage {

  public puntaje: number;
  public aciertos: number;
  public errores: number;
  public fueraTiempo: number;
  public emoji: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.puntaje = navParams.get('puntaje');
    this.aciertos = navParams.get('aciertos');
    this.errores = navParams.get('errores');
    this.fueraTiempo = navParams.get('fueraTiempo');
  }

  pagCategories(){
    this.navCtrl.popToRoot();
  }
}
