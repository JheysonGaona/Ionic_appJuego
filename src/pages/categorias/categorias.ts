import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { JuegoPage } from '../juego/juego';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  public nombreUsuario: string;
  public audio: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.nombreUsuario = navParams.get('nombreUsuario');
  }

  /* Muestra una alerta de la categoria seleccionada
  y lleva a la ventana del juego */
  pagGame(categoria: string) {
    let alert = this.alertCtrl.create({
      title: categoria,
      subTitle : ' ',
      enableBackdropDismiss: false,
      cssClass: categoria,
      buttons: [
        {
          text: 'Atras',
          // evento cuando se clikea no hace nada
          handler: () => {
            console.log('Cancel click');
          }
        },
        {
          text: 'Jugar',
          // evento cuando se clikea lleva a la ventana del juego
          handler: () => {
            this.navCtrl.push(JuegoPage, {categoria: categoria});
          }
        }
      ]
    });
    alert.present();
  }

  /* Se activa cuando se ingresa una página, antes de que se 
  convierta en la activa. */
  ionViewWillEnter() {
    this.audio = new Audio();
    this.audio.src = '../assets/sounds/musicFondo.mp3';
    this.audio.load();
    this.playAudio();
  }

  // Se activa cuando se deja una página, antes de que deje de ser la activa.
  ionViewWillLeave(){
    this.audio.pause();
  }

  playAudio() { 
    this.audio.play();
      this.audio.loop = true;
  }
   
  stopAudio() {
    this.audio.pause(); 
  }
   
  // Se activa cuando se deja la paguina.
  ngOnDestroy() {
    if(this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}
