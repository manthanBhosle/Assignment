import { GoogleChartInterface } from 'ng2-google-charts';
import { TeamAmount } from './../shared/model/teamamount.model';
import { Team } from './../shared/model/team.model';
import { IplService } from './../ipl.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams:Team[] = [];
  teamAmount:TeamAmount[] =[];
  constructor(private iplService:IplService) { }

  ngOnInit(): void {
      this.iplService.teamDetails().subscribe(res=>{
          this.teams = res;
      })

      this.iplService.teamAmountDetails().subscribe(res=>{
          this.teamAmount = res;

          const chartData:any =[['Team name', 'Amount']];
          for(let t of this.teamAmount){
            chartData.push([t.teamName,t.amount]);
          }
          
        this.drawChart(chartData);
      })
  }

  drawChart(chartData){
      this.pieChart = {
        chartType: 'ColumnChart',
        dataTable:chartData,
        //firstRowIsData: true,
        options: {'title': 'Amount Spent by Teams','width':400, 'height':300},
      };
  }

  public pieChart: GoogleChartInterface={
    chartType: 'ColumnChart',
    dataTable:null,
    //firstRowIsData: true,
    options: {'title': 'Tasks','width':400, 'height':300},
  };


}
