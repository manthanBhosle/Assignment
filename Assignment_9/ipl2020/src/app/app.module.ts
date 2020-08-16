import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { PlayerStatComponent } from './player-stat/player-stat.component';
import { HttpClientModule } from '@angular/common/http';
import { InrPipe } from './shared/pipes/inr.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeamComponent,
    PlayerComponent,
    PlayerStatComponent,
    InrPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2GoogleChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
