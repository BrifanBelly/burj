import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, OnDestroy, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { takeUntil, switchMap, filter, tap } from 'rxjs/operators';
import { RenderService, ViewData } from '../services/render.service';
import { Ingredient } from '../core/models/visualisation';

const VIEWBOX_HEIGHT = 60;

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss'],
  providers: [ RenderService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationComponent implements OnInit, OnDestroy {
  @ViewChild('svgContainer') public svgContainer: ElementRef;

  ingredients: Ingredient[] = [];
  listTop: number = 0;
  listHeight: number = 0
  animating: boolean = false;
  private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();

  constructor(private renderService: RenderService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.renderService.getViewData().pipe(
      takeUntil(this.ngOnDestroy$),
      filter((data: ViewData | undefined) => !!data), // to handle undefined data
      tap(() => {
        this.animating = true;
        this.cdRef.detectChanges();
      }),
      tap((data: ViewData) => {
        const glass = data.recipe.glass;
        this.listTop = (glass.maskTopMargin / VIEWBOX_HEIGHT ) * 100;
        this.listHeight = (glass.maskHeight / VIEWBOX_HEIGHT ) * 100;
        this.ingredients = data.recipe.ingredients;
        this.cdRef.detectChanges();
      }),
      switchMap((data: ViewData) => this.renderService.renderDrink(data)),
      tap(() => {
        this.animating = false;
        this.cdRef.detectChanges();
      })
    ).subscribe();
  }
  
  ngOnDestroy(): void {
    this.ngOnDestroy$.emit(true);
  }
  
}
