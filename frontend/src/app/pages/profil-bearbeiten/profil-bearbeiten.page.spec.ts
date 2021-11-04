import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilBearbeitenPage } from './profil-bearbeiten.page';

describe('ProfilBearbeitenPage', () => {
  let component: ProfilBearbeitenPage;
  let fixture: ComponentFixture<ProfilBearbeitenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilBearbeitenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilBearbeitenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
