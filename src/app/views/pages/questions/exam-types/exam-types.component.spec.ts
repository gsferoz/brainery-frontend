import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTypesComponent } from './exam-types.component';

describe('ExamTypesComponent', () => {
  let component: ExamTypesComponent;
  let fixture: ComponentFixture<ExamTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
