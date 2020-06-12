import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JhipsterMonolithicSharedModule } from 'app/shared/shared.module';
import { JhipsterMonolithicCoreModule } from 'app/core/core.module';
import { JhipsterMonolithicAppRoutingModule } from './app-routing.module';
import { JhipsterMonolithicHomeModule } from './home/home.module';
import { JhipsterMonolithicEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JhipsterMonolithicSharedModule,
    JhipsterMonolithicCoreModule,
    JhipsterMonolithicHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JhipsterMonolithicEntityModule,
    JhipsterMonolithicAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class JhipsterMonolithicAppModule {}
