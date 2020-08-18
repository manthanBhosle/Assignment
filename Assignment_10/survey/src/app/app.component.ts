import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name:string ;
  phone:number;
  email:string;
  org:string;
  responsibility:string;



  title = 'survey';
}
