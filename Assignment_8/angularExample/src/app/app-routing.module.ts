import { HeaderComponent } from './header/header.component';
import { QuizComponent } from './quiz/quiz.component';
import { CbookComponent } from './cbook/cbook.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  { path: 'header', component: HeaderComponent},
  { path: 'home', component: HomeComponent},
  { path: 'cbook', component: CbookComponent},
  { path: 'ipl', loadChildren: ()=>import("./ipl/ipl.module").then(m=>m.IplModule)},
  { path: 'quiz', component: QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
