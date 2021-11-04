import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StundenplanPage } from './stundenplan.page';

describe('StundenplanPage', () => {
  let component: StundenplanPage;
  let fixture: ComponentFixture<StundenplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StundenplanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StundenplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
