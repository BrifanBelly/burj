import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, OnDestroy, EventEmitter } from '@angular/core';
import { DrinksService } from '../core/services/drinks.service';
import { interval, Observable, bindCallback } from 'rxjs';
import { takeUntil, map, switchMap, filter } from 'rxjs/operators';
import { RenderService, ViewData } from '../services/render.service';
import { DrinkRecipe } from '../core/models/visualisation';
import * as SnapTS from 'snapsvg';


declare const Snap: any;

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss'],
  providers: [ RenderService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationComponent implements OnInit, OnDestroy {
  @ViewChild('svgContainer') public svgContainer: ElementRef
  public snapSvg: SnapTS.Paper;
  private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();

  constructor(private renderService: RenderService) { }

  ngOnInit() {
    this.snapSvg = Snap(this.svgContainer.nativeElement);

    this.renderService.getViewData(this.snapSvg).pipe(
      takeUntil(this.ngOnDestroy$),
      filter((data: ViewData | undefined) => !!data), // to handle undefined data
      switchMap((data: ViewData) => this.renderService.renderDrink(data))
    ).subscribe();
  }
  
  ngOnDestroy(): void {
    this.ngOnDestroy$.emit(true);
  }
  
}
