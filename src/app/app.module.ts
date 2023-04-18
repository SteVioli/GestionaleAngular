import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpedizioneComponent } from './components/spedizione/spedizione.component';
import { OrganicoComponent } from './components/organico/organico.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { TrasportatoriComponent } from './components/trasportatori/trasportatori.component';
import { StockComponent } from './components/stock/stock.component';
import { OperatoreComponent } from './components/operatore/operatore.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { GestioneComponent } from './components/gestione/gestione.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SortByOrderPipe } from './_pipe/sort-by-order.pipe';
import { CreaclienteComponent } from './components/creacliente/creacliente.component';
import { CreaArticoloComponent } from './components/crea-articolo/crea-articolo.component';
import { CreaTrasportatoreComponent } from './components/crea-trasportatore/crea-trasportatore.component';
import { PdfFatturaComponent } from './components/pdf-fattura/pdf-fattura.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SpedizioneComponent,
    OrganicoComponent,
    ClientiComponent,
    TrasportatoriComponent,
    StockComponent,
    OperatoreComponent,
    FattureComponent,
    GestioneComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent,
    SortByOrderPipe,
    CreaclienteComponent,
    CreaArticoloComponent,
    CreaTrasportatoreComponent,
    PdfFatturaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
