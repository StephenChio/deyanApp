import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SexSettingPage } from './sex-setting.page';

describe('SexSettingPage', () => {
  let component: SexSettingPage;
  let fixture: ComponentFixture<SexSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexSettingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
