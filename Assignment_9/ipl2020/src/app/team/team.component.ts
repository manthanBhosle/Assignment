import { TeamRoleAmount } from './model/teamroleamounts.model';
import { TeamService } from './team.service';
import { Team } from './model/team.model';
import { TeamAmount } from './model/teamamount.model';
import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams:Team[] = [];
  teamAmount:TeamAmount[] = [];
  teamRoleAmount:TeamRoleAmount[] = [];

  constructor(private teamservice:TeamService) { }

  public select(event: ChartSelectEvent) {
    this.teamRoleAmount=[];
    this.teamservice.teamRoleAmountDetails(this.teamAmount[event.row]).subscribe(res=>{
      this.teamRoleAmount = res;
      const chartData:any =[['Role', 'Amount']];
      for(let t of this.teamRoleAmount){
        chartData.push([t.roleName,t.amount]);
      }
      
      this.drawChart2(chartData, this.teamAmount[event.row]);
    })
    this.pieChart2.dataTable = null
  }

  ngOnInit(): void {
    this.teamservice.teamDetails().subscribe(res=>{
      this.teams = res;
  })

  this.teamservice.teamAmountDetails().subscribe(res=>{
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
    options: {
      'backgroundColor': 'transparent',
      'title': 'Amount Spent by Teams',
      'titleTextStyle': {
				'color': '#e0e0e0'
      },
      'hAxis':{
				'textStyle' :{
					'color': '#e0e0e0'
				},
			
				'titleTextStyle': {
					'color': '#e0e0e0'
				}
			},
			'vAxis':{
				'textStyle' :{
					'color': '#e0e0e0'
				},
		
				'titleTextStyle': {
					'color': '#e0e0e0'
				}
      },
      'legend': {
				'textStyle': {'color': '#e0e0e0'}
			},
      'width':400, 'height':200
    },
  };
}

drawChart2(chartData, team:TeamAmount){
    this.pieChart2 = {
      chartType: 'PieChart',
      dataTable:chartData,
      //firstRowIsData: true,
      options: {
        'backgroundColor': 'transparent',
        'title': `${team.teamName}`,
        'titleTextStyle': {
          'color': '#e0e0e0'
        },
        'legend': {
          'textStyle': {'color': '#e0e0e0'}
        },
        'width':400, 'height':250
      },
    };
}

public pieChart: GoogleChartInterface={
  chartType: 'ColumnChart',
  dataTable:null,
  //firstRowIsData: true,
  options: {'title': 'Tasks'},
};

public pieChart2: GoogleChartInterface={
  chartType: 'ColumnChart',
  dataTable:null,
  //firstRowIsData: true,
  options: {'title': 'Tasks'},
};


}
