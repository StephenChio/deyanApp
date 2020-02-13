import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerInformationPage } from './answer-information.page';

describe('AnswerInformationPage', () => {
  let component: AnswerInformationPage;
  let fixture: ComponentFixture<AnswerInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
