import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleAnimatorComponent } from './title-animator.component';

describe('TitleAnimatorComponent', () => {
  let component: TitleAnimatorComponent;
  let fixture: ComponentFixture<TitleAnimatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleAnimatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleAnimatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
