import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoachingCenterComponent } from './create-coaching-center.component';

describe('CreateCoachingCenterComponent', () => {
  let component: CreateCoachingCenterComponent;
  let fixture: ComponentFixture<CreateCoachingCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCoachingCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCoachingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
