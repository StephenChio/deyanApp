import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInformationPage } from './question-information.page';

describe('QuestionInformationPage', () => {
  let component: QuestionInformationPage;
  let fixture: ComponentFixture<QuestionInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
