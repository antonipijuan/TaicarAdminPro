import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { DataPipe } from './data.pipe';
import { stringFilterPipe } from './stringFilter.pipe';


@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    DataPipe,
    stringFilterPipe
  ],
  exports: [
    ImagenPipe,
    DataPipe,
    stringFilterPipe
  ]
})
export class PipesModule { }
