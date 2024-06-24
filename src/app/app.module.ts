import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/layout/header/header.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {HomeComponent} from './components/pages/home/home.component';
import {AboutAreaComponent} from './components/about-area/about-area.component';
import {PartnerAreaComponent} from './components/partner-area/partner-area.component';
import {FeedbackComponent} from './components/feedback/feedback.component';
import {PricingPlanComponent} from './components/pricing-plan/pricing-plan.component';
import {FreeTrialAreaComponent} from './components/free-trial-area/free-trial-area.component';
import {AboutComponent} from './components/pages/about/about.component';
import {TeamComponent} from './components/pages/team/team.component';
import {FaqComponent} from './components/pages/faq/faq.component';
import {ComingSoonComponent} from './components/pages/coming-soon/coming-soon.component';
import {ContactComponent} from './components/pages/contact/contact.component';
import {GseTickerComponent} from "./components/gse-ticker/gse-ticker.component";
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PartnerComponent } from './components/pages/partner/partner.component';
import { HomeSevenComponent } from './components/pages/home-seven/home-seven.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './Services/auth/token.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        AboutAreaComponent,
        AboutComponent,
        TeamComponent,
        NotFoundComponent,
        FaqComponent,
        ComingSoonComponent,
        ContactComponent,
        GseTickerComponent,
        PartnerComponent,
        PartnerAreaComponent,
        FeedbackComponent,
        FreeTrialAreaComponent,
        PricingPlanComponent,
        AboutComponent,
        AboutAreaComponent,
        HomeSevenComponent,
        PricingPlanComponent,
        PricingComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
