import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnswerPage } from './my-answer.page';

describe('MyAnswerPage', () => {
  let component: MyAnswerPage;
  let fixture: ComponentFixture<MyAnswerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAnswerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAnswerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
