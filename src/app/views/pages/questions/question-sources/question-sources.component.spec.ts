import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSourcesComponent } from './question-sources.component';

describe('QuestionSourcesComponent', () => {
  let component: QuestionSourcesComponent;
  let fixture: ComponentFixture<QuestionSourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
