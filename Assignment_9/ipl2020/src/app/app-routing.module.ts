import { PlayerComponent } from './player/player.component';
import { PlayerStatComponent } from './player-stat/player-stat.component';
import { TeamComponent } from './team/team.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TeamComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'playerStat',
    component: PlayerStatComponent
  },
  {
    path: 'player',
    component: PlayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
