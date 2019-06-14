import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPermisoComponent } from './solicitud-permiso.component';

describe('SolicitudPermisoComponent', () => {
  let component: SolicitudPermisoComponent;
  let fixture: ComponentFixture<SolicitudPermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudPermisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
