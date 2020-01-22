import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionSettingPage } from './position-setting.page';

describe('PositionSettingPage', () => {
  let component: PositionSettingPage;
  let fixture: ComponentFixture<PositionSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionSettingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
