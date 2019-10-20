import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { DataPipe } from './data.pipe';
import { stringFilterPipe } from './stringFilter.pipe';
import { LabelColorPipe } from './labelcolor.pipe';


@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    DataPipe,
    stringFilterPipe,
    LabelColorPipe

  ],
  exports: [
    ImagenPipe,
    DataPipe,
    stringFilterPipe,
    LabelColorPipe
  ]
})
export class PipesModule { }
