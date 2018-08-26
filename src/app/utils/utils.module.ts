import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleAnimatorComponent } from './title-animator/title-animator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TitleAnimatorComponent],
  exports: [TitleAnimatorComponent]
})
export class UtilsModule { }
