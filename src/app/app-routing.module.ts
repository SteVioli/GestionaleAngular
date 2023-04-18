import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { OperatoreComponent } from './components/operatore/operatore.component';
import { GestioneComponent } from './components/gestione/gestione.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { TrasportatoriComponent } from './components/trasportatori/trasportatori.component';
import { OrganicoComponent } from './components/organico/organico.component';
import { StockComponent } from './components/stock/stock.component';
import { SpedizioneComponent } from './components/spedizione/spedizione.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreaclienteComponent } from './components/creacliente/creacliente.component';
import { CreaArticoloComponent } from './components/crea-articolo/crea-articolo.component';
import { CreaTrasportatoreComponent } from './components/crea-trasportatore/crea-trasportatore.component';
import { PdfFatturaComponent } from './components/pdf-fattura/pdf-fattura.component';


const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'fatture',component:FattureComponent},
  {path:'operatore',component:OperatoreComponent},
  {path:'gestione-aziendale',component:GestioneComponent},
  {path:'clienti',component:ClientiComponent},
  {path:'trasportatori',component:TrasportatoriComponent},
  {path:'organico',component:OrganicoComponent},
  {path:'stock',component:StockComponent},
  {path:'spedizioni',component:SpedizioneComponent},
  {path:'crea-cliente',component: CreaclienteComponent},
  {path:'crea-articolo',component: CreaArticoloComponent},
  {path:'crea-trasportatore',component: CreaTrasportatoreComponent},
  {path:'fattura/:id',component: PdfFatturaComponent},
  {path:'404',component:NotFoundComponent},
  {path:'**',redirectTo:'/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
