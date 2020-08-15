import { QuizComponent } from './quiz/quiz.component';
import { IplComponent } from './ipl/ipl.component';
import { CbookComponent } from './cbook/cbook.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: "full" },
  { path: 'cbook', component: CbookComponent },
  { path: 'ipl', loadChildren: ()=>import("./ipl/ipl.module").then(m=>m.IplModule) },
  { path: 'quiz', component: QuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
