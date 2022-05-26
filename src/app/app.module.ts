import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { es_ES, NZ_DATE_CONFIG, NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US , NZ_DATE_LOCALE} from 'ng-zorro-antd/i18n';

import { registerLocaleData, CommonModule } from '@angular/common';

import localeEsMX from '@angular/common/locales/ff-Latn-CM';

registerLocaleData(localeEsMX, 'es-MX');
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "@shared/shared.module";
import { locale, utc } from 'moment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
    
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    { provide: LOCALE_ID, useValue: 'en_US' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
