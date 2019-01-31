import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoriasPageModule } from '../pages/categorias/categorias.module';
import { JuegoPageModule } from '../pages/juego/juego.module';
import { PuntajePageModule } from '../pages/puntaje/puntaje.module';

// Client
import {HttpClientModule} from '@angular/common/http'
import { ContactosPageModule } from '../pages/contactos/contactos.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CategoriasPageModule,
    JuegoPageModule,
    PuntajePageModule,
    ContactosPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
