import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLevelsComponent } from './question-levels.component';

describe('QuestionLevelsComponent', () => {
  let component: QuestionLevelsComponent;
  let fixture: ComponentFixture<QuestionLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
