import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleAnimatorComponent } from './title-animator/title-animator.component';
import { WordAnimateService } from './title-animator/word-animate.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TitleAnimatorComponent],
  exports: [TitleAnimatorComponent]
})
export class UtilsModule { }
