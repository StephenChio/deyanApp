import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowPage } from './my-follow.page';

describe('MyFollowPage', () => {
  let component: MyFollowPage;
  let fixture: ComponentFixture<MyFollowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFollowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFollowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
