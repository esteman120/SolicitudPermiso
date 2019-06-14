import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarSolicitudComponent } from './validar-solicitud.component';

describe('ValidarSolicitudComponent', () => {
  let component: ValidarSolicitudComponent;
  let fixture: ComponentFixture<ValidarSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
