import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PuntajePage } from '../puntaje/puntaje';

@IonicPage()
@Component({
  selector: 'page-juego',
  templateUrl: 'juego.html',
})
export class JuegoPage{
  
  // Varibales globales del juego
  public arrayItems = new Array<Categoria>();
  public preguntaRandom: string;
  public opcion1Random: string;
  public opcion2Random: string;
  public opcion3Random: string;
  public opcion4Random: string;
  public respuestaRandom: string;
  public msmRespuesta: string;
  public puntaje: number = 0;
  public categoria: string;
  private contador: number = 0;
  public temporizador: number;
  public timerSeg: number = 30;
  public aciertos: number = 0;
  public errores: number = 0;
  public fueraTiempo: number = 0;
  private audio: any;
  
  public felicidades: Array<string> = ["¡Sigue así!", "Estás en el camino correcto.",
    "Exacto", "¡Muy bien hecho!", "Tu esfuerzo está dando sus frutos.",
    "Has mejorado mucho.", "Estás haciéndolo mejor hoy.",
    "¡Ya lo tienes!", "No está mal.","¡Correcto!", "Esa es la forma correcta de hacerlo.",
    "Debes haber practicado mucho.", "¡Maravilloso!"];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HttpClient, public alertCtrl: AlertController) {
    this.categoria = navParams.get('categoria');
  }

  // Se ejecuta cuando entras en una página, antes de cargarla.
  ionViewWillEnter(){
    this.cargarDatos();
  }

  // Se ejecuta cuando entras en una página, después de cargarla.
  ionViewDidEnter(){
    this.preguntaAleatoria();
  }

  // Se ejecuta cuando sales de una página, justo antes de salir.
  ionViewWillLeave(){
    clearInterval(this.temporizador);
  }

  // restablece el temporizador
  resetTimer() {
    this.timerSeg = 30;
  }

  // inicia el temporizador
  tick() {
    console.log(this.timerSeg);
    if (--this.timerSeg < 0) {
      this.timerSeg = 30;
      this.fueraTiempo++;
      this.tiempoAgotado();
    }
  }

  // carga los datos del json en un array de datos
  cargarDatos () {
    let data: Observable<any>;
    data = this.http.get<UserResponse>('./assets/data/' + this.categoria + '.json');
    data.subscribe(result => {
      for(var i = 0; i < result.length; i++){
        var itemAdivinanza = new Categoria(result[i].id, result[i].pregunta, result[i].opcion1,
          result[i].opcion2, result[i].opcion3, result[i].opcion4, result[i].respuesta);
        this.arrayItems.push(itemAdivinanza);
      }
    });
  }

  /* genera una pregunta al azar del arreglo, genera un max de 10 preguntas 
  antes de acabar el juego, en la condificon if se puede modificar el limite
  de preguntas */
  preguntaAleatoria(){
    if(this.contador < 10){
      if(this.audio){
        this.audio.pause();
      }
      this.resetTimer();
      this.temporizador = setInterval(() => this.tick(), 1000);
      var random = Math.floor(Math.random() * this.arrayItems.length);
      this.preguntaRandom = this.arrayItems[random].getPregunta();
      this.opcion1Random = this.arrayItems[random].getOpcion1();
      this.opcion2Random = this.arrayItems[random].getOpcion2();
      this.opcion3Random = this.arrayItems[random].getOpcion3();
      this.opcion4Random = this.arrayItems[random].getOpcion4();
      this.respuestaRandom = this.arrayItems[random].getRespuesta();
      this.arrayItems.splice(random, 1);
      this.contador++;
    }else{
      this.pagPuntaje();
    }
  }

  // valida si la respuesta selecionada coincide con la correcta
  validarRespuesta(opcion: string){
    if(opcion === this.respuestaRandom){
      this.puntaje += 10;
      this.aciertos++;
      this.rtaCorrecta();
    }else{
      this.rtaIncorrecta();
      this.errores++;
    }
  }

  // alerta de respuesta correcta, muestra en pantalla un gesto feliz
  rtaCorrecta(){
    if (this.temporizador) {
      clearInterval(this.temporizador);
    }
    var random = Math.floor(Math.random() * this.felicidades.length);
    this.msmRespuesta = this.felicidades[random];
    let alert = this.alertCtrl.create({
      title: 'Rta. Correcta',
      enableBackdropDismiss: false,
      subTitle: this.msmRespuesta,
      cssClass: 'alertaRtaCorrecta',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            this.preguntaAleatoria();
          }
        }
      ]
    });
    alert.present();
    this.audio = new Audio();
    this.audio.src = '../assets/sounds/correcto.mp3';
    this.audio.load();
    this.audio.play();
  }

  // alerta de respuesta incorrecta, muestra en pantalla un gesto triste
  rtaIncorrecta(){
    if (this.temporizador) {
      clearInterval(this.temporizador);
    }
    let alert = this.alertCtrl.create({
      title: 'Rta. Incorrecta',
      enableBackdropDismiss: false,
      subTitle: "La respuesta correcta es: " + this.respuestaRandom,
      cssClass: 'alertaRtaIncorrecta',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            this.preguntaAleatoria();
          }
        }
      ]
    });
    alert.present();
    this.audio = new Audio();
    this.audio.src = '../assets/sounds/incorrecto.mp3';
    this.audio.load();
    this.audio.play();
  }

  // alerta de respuesta fuera de tiempo, muestra en pantalla un gesto de confundido
  tiempoAgotado(){
    if (this.temporizador) {
      clearInterval(this.temporizador);
    }
    let alert = this.alertCtrl.create({
      title: 'Tiempo agotado',
      enableBackdropDismiss: false,
      subTitle: "La respuesta correcta es: " + this.respuestaRandom,
      cssClass: 'alertaFueraTiempo',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            this.preguntaAleatoria();
          }
        }
      ]
    });
    alert.present();
    this.audio = new Audio();
    this.audio.src = '../assets/sounds/fueraTiempo.mp3';
    this.audio.load();
    this.audio.play();
  }

  // ir a la siguiente ventana de puntaje
  pagPuntaje(){
    this.navCtrl.push(PuntajePage, {aciertos: this.aciertos, errores: this.errores,
      fueraTiempo: this.fueraTiempo, puntaje: this.puntaje});
  }
}

// interface se usa para leer el json con las caracteristicas que le hemos dado
interface UserResponse {
  id: number;
  pregunta: string;
  opcion1: string;
  opcion2: string;
  opcion3: string;
  opcion4: string;
  respuesta: string;
}

/* clase de categorias sirve para obtener los getters de nuestro array dodne 
guardamos los datos del json */
class Categoria{
  id: number;
  pregunta: string;
  opcion1: string;
  opcion2: string;
  opcion3: string;
  opcion4: string;
  respuesta: string;

  constructor(id: number, pregunta: string, opcion1: string,
    opcion2: string, opcion3: string, opcion4: string, respuesta: string){
      this.id = id;
      this.pregunta = pregunta;
      this.opcion1 = opcion1;
      this.opcion2 = opcion2;
      this.opcion3 = opcion3;
      this.opcion4 = opcion4;
      this.respuesta = respuesta;
  }

  getId():number{
    return this.id;
  }

  getPregunta():string {
    return this.pregunta;
  }

  getOpcion1(): string{
    return this.opcion1;
  }

  getOpcion2(): string{
    return this.opcion2;
  }

  getOpcion3(): string{
    return this.opcion3;
  }

  getOpcion4(): string{
    return this.opcion4;
  }

  getRespuesta(): string{
    return this.respuesta;
  }

  toString(): string{
    return "Id: " + this.id + "Pregunta: " + this.pregunta + "Opcion 1: " + this.opcion1
    + "Opcion 2: " + this.opcion2 + "Opcion 3: " + this.opcion3 + "Opcion 4: " + this.opcion4
    + "Respuesta: "  + this.respuesta;
  }
}
