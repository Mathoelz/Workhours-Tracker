import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeutePage } from './heute.page';

describe('HeutePage', () => {
  let component: HeutePage;
  let fixture: ComponentFixture<HeutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeutePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
