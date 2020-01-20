import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSettingPage } from './language-setting.page';

describe('LanguageSettingPage', () => {
  let component: LanguageSettingPage;
  let fixture: ComponentFixture<LanguageSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageSettingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
