import { TeamRolePlayer } from './model/teamroleplayer.model';
import { TeamRoleAmount } from './model/teamroleamount.model';
import { GoogleChartInterface, ChartSelectEvent } from 'ng2-google-charts';
import { TeamPlayers } from './model/teamplayers.model';
import { PlayerStatService } from './player-stat.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-stat',
  templateUrl: './player-stat.component.html',
  styleUrls: ['./player-stat.component.css']
})
export class PlayerStatComponent implements OnInit {
 
  teams:string[] = []
  teamplayers:TeamPlayers[] = []
  teamroleamount:TeamRoleAmount[] = []
  teamroleplayers: TeamRolePlayer[] = []

  constructor(private playerstatservice:PlayerStatService) { }

  teamPlayers(team:string){ 
    this.teamplayers = []
    this.teamroleplayers = []
    this.playerstatservice.teamPlayerDetails(team).subscribe(res=>{
      this.teamplayers = res;
    })

    this.teamroleamount=[];
    this.playerstatservice.teamRoleAmountDetails(team).subscribe(res=>{
      this.teamroleamount = res;
      const chartData:any =[['Role', 'Amount']];
      for(let t of this.teamroleamount){
        chartData.push([t.roleName,t.amount]);
      }
      
      this.drawChart(chartData, team);
    })
    this.pieChart.dataTable = null
  }

  public select(event: ChartSelectEvent) {

    this.teamroleplayers=[];
    this.playerstatservice.teamRolePlayerDetails(this.teamplayers[0].label, event.selectedRowValues[0]).subscribe(res=>{
      this.teamroleplayers = res;
    })
  
  }

  ngOnInit(): void {
    this.playerstatservice.teamLabelDetails().subscribe(res=>{
      this.teams = res["labels"];  
  })
  }

  drawChart(chartData, team:string){
    this.pieChart = {
      chartType: 'PieChart',
      dataTable:chartData,
      //firstRowIsData: true,
      options: {'title': `${team}`,'width':400, 'height':400},
    };
  }

  public pieChart: GoogleChartInterface={
    chartType: 'ColumnChart',
    dataTable:null,
    //firstRowIsData: true,
    options: {'title': 'Tasks'},
  };
  
}
