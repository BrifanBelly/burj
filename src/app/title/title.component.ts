import { Component, OnInit, OnDestroy, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DrinksService } from '../core/services/drinks.service';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { Observable} from 'rxjs';

export type D3Selection = d3.Selection<d3.BaseType, any, d3.BaseType, undefined>;

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit, OnDestroy{
  d3MainContainer: D3Selection;
  private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();
  drink$: Observable<string>;
  drink;

  constructor(private drinkService: DrinksService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
   this.drink$ =  this.drinkService.getCurrentDrink().pipe(takeUntil(this.ngOnDestroy$), map( d => d && d.name));
   this.drink$.subscribe(d => { this.drink = d; this.cd.detectChanges()} )
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.emit(true);
  }

}
