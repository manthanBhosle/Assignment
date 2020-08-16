import { MaxPaidPlayers } from './model/maxpaidplayers.model';
import { AllPlayers } from './model/allplayers.model';
import { PlayerService } from './player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  allplayers:AllPlayers[] = [];
  maxpaidplayers:MaxPaidPlayers[] = []
  constructor(private playerservice:PlayerService) { }

  ngOnInit(): void {
    this.playerservice.allPlayerDetails().subscribe(res=>{
      this.allplayers = res;
    })

    this.playerservice.maxPaidPlayerDetails().subscribe(res=>{
      this.maxpaidplayers = res;
      console.log(this.maxpaidplayers)
    })
  }

}
