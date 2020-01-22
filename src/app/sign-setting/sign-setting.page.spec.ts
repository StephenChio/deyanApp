import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignSettingPage } from './sign-setting.page';

describe('SignSettingPage', () => {
  let component: SignSettingPage;
  let fixture: ComponentFixture<SignSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignSettingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
