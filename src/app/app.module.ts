import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatCardModule, MatRadioModule, MatSlideToggleModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, MatTableModule, MatPaginatorModule, MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SolicitudPermisoComponent } from './solicitud-permiso/solicitud-permiso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberDirective } from './directivas/numbers-only.directive';
import { SPServicio } from './Servicios/sp-servicio';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './http-interceptors/cacheInterceptor';
import { APP_DATE_FORMATS } from './date.adapter';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ValidarSolicitudComponent } from './validar-solicitud/validar-solicitud.component';
import { SolicitudesPendientesComponent } from './solicitudes-pendientes/solicitudes-pendientes.component';

@NgModule({
  declarations: [
    AppComponent,
    SolicitudPermisoComponent,
    NumberDirective,
    ValidarSolicitudComponent,
    SolicitudesPendientesComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    SPServicio,
    { 
      provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true 
    }, 
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    },
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
