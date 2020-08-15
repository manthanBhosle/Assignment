import { Component, OnInit } from '@angular/core';
import { Server } from "../../assets/models/server.module";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = "Angular is tough!!!";
  imgSrc = "../../assets/img/off.png";
  username:string = null;
  status = false;

  servers:Server[] = [
    {"ip":"232.100.100.996","status":false},
    {"ip":"232.100.100.997","status":true},
    {"ip":"232.100.100.998","status":false},
    {"ip":"232.100.100.999","status":true}
]

  constructor() { }
  ngOnInit(): void {
  }

  toggleBlub(){
    this.status = !this.status;
    this.imgSrc = this.status ?  "../../assets/img/on.png" :  "../../assets/img/off.png";
  }

  changeStatus(server:Server){
    server.status = !server.status;
  }

  removeServer(server:Server){
    this.servers = this.servers.filter(e=>e.ip !== server.ip);
  }

}
