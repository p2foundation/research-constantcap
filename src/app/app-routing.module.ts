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

const routes: Routes = [
    {path: '', component: HomeSevenComponent},
    {path: 'home', component: HomeComponent},
    {path: 'partner', component: PartnerComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'equity', component: EquityComponent},
    {path: 'fixed-income', component: FixedIncomeComponent},
    {path: 'bond-market', component: BondMarketComponent},
    {path: 'corporate', component: CorporateComponent},
    {path: 'market-data', component: MarketDataComponent},
    // {path: 'report', component: ProjectDetailsComponent},
    // {path: 'ai', component: ProjectDetailsComponent},
    // {path: 'admin', component: ProjectDetailsComponent},
    // Here add new pages component
    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
