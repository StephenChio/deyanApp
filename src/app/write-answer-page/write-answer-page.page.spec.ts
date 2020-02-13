import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteAnswerPagePage } from './write-answer-page.page';

describe('WriteAnswerPagePage', () => {
  let component: WriteAnswerPagePage;
  let fixture: ComponentFixture<WriteAnswerPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteAnswerPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteAnswerPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
