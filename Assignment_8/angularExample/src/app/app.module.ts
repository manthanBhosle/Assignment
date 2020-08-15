import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { HttpClientModule } from '@angular/common/http';



import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CbookComponent } from './cbook/cbook.component';
import { IplComponent } from './ipl/ipl.component';
import { QuizComponent } from './quiz/quiz.component';
import { TeamComponent } from './ipl/team/team.component';
import { PlayerComponent } from './ipl/player/player.component';
import { PlayerStatComponent } from './ipl/player-stat/player-stat.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CbookComponent,
    QuizComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2GoogleChartsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
