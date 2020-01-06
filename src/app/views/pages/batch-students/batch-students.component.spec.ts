import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchStudentsComponent } from './batch-students.component';

describe('BatchStudentsComponent', () => {
  let component: BatchStudentsComponent;
  let fixture: ComponentFixture<BatchStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
