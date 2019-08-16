import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { DataPipe } from './data.pipe';



@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    DataPipe
  ],
  exports: [
    ImagenPipe,
    DataPipe
  ]
})
export class PipesModule { }
