import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuestionPage } from './my-question.page';

describe('MyQuestionPage', () => {
  let component: MyQuestionPage;
  let fixture: ComponentFixture<MyQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQuestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
