
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/pages/home/home.component';
import {AboutComponent} from './components/pages/about/about.component';
import {PartnerComponent} from './components/pages/partner/partner.component';
import {NotFoundComponent} from './components/pages/not-found/not-found.component';
import {FaqComponent} from './components/pages/faq/faq.component';
import {ComingSoonComponent} from './components/pages/coming-soon/coming-soon.component';
import {ContactComponent} from './components/pages/contact/contact.component';
import {FixedIncomeComponent} from "./components/pages/fixed-income/fixed-income.component";
import {BondMarketComponent} from "./components/pages/bond-market/bond-market.component";
import {CorporateComponent} from "./components/pages/corporate/corporate.component";
import {MarketDataComponent} from "./components/pages/market-data/market-data.component";
import {EquityComponent} from "./components/pages/equity/equity.component";
import { HomeSevenComponent } from './components/pages/home-seven/home-seven.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { AuthGuard } from './Services/auth/auth.guard.service';

const routes: Routes = [
    {path: '', component: HomeSevenComponent},
    {path: 'home', component: HomeComponent},
    {path: 'partner', component: PartnerComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'contact', component: ContactComponent},
    {
        path: 'equity', 
        component: EquityComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'fixed-income', 
        component: FixedIncomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'bond-market', 
        component: BondMarketComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'corporate', 
        component: CorporateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'market-data', 
        component: MarketDataComponent,
        canActivate: [AuthGuard]
    },
    // {path: 'report', component: ProjectDetailsComponent},
    // {path: 'ai', component: ProjectDetailsComponent},
    // {path: 'admin', component: ProjectDetailsComponent},
    // Here add new pages component
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
