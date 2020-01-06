import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingCentersComponent } from './coaching-centers.component';

describe('CoachingCentersComponent', () => {
  let component: CoachingCentersComponent;
  let fixture: ComponentFixture<CoachingCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachingCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
