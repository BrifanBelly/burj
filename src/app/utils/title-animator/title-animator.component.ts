import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { WordAnimateService } from './word-animate.service';
import * as d3 from 'd3';


@Component({
  selector: 'title-animator',
  templateUrl: './title-animator.component.html',
  styleUrls: ['./title-animator.component.scss'],
  providers: [WordAnimateService],
})
export class TitleAnimatorComponent implements OnInit, OnChanges {
  @Input('drink') drink: any;
  @ViewChild('titleContainer')  titleContainer: ElementRef;
  d3MainContainer: d3.Selection<any, {}, null, undefined>;

  constructor(private WAService: WordAnimateService) {}

  ngOnInit() {
    this.d3MainContainer = d3.select(this.titleContainer.nativeElement);
    if(this.drink)
    this.WAService.renderTitle(this.drink || "", this.d3MainContainer);
  }

  ngOnChanges(changes) {
    if(this.drink)
    this.WAService.renderTitle(changes.drink.currentValue, this.d3MainContainer);
  }

  

}
