import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PuntajePage } from './puntaje';

@NgModule({
  declarations: [
    PuntajePage,
  ],
  imports: [
    IonicPageModule.forChild(PuntajePage),
  ],
})
export class PuntajePageModule {}
