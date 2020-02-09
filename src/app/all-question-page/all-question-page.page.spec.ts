import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuestionPagePage } from './all-question-page.page';

describe('AllQuestionPagePage', () => {
  let component: AllQuestionPagePage;
  let fixture: ComponentFixture<AllQuestionPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllQuestionPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQuestionPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
