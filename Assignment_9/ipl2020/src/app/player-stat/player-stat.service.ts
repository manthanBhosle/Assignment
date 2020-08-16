import { TeamRolePlayer } from './model/teamroleplayer.model';
import { TeamRoleAmount } from './model/teamroleamount.model';
import { TeamPlayers } from './model/teamplayers.model';
import { environment } from './../../environments/environment';
import { TeamLabels } from './model/teamlabels.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatService {

  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  teamLabelDetails():Observable<TeamLabels>{
    return this.http.get<TeamLabels>(`${this.baseUrl}labels`)
  }

  teamPlayerDetails(team:string):Observable<TeamPlayers[]>{
    return this.http.get<TeamPlayers[]>(`${this.baseUrl}${team}`)
  }

  teamRoleAmountDetails(team:string):Observable<TeamRoleAmount[]>{
    return this.http.get<TeamRoleAmount[]>(`${this.baseUrl}amountbyrole/${team}`)
  }

  teamRolePlayerDetails(team:string, role:string):Observable<TeamRolePlayer[]>{
    return this.http.get<TeamRolePlayer[]>(`${this.baseUrl}${team}/${role}`)
  }
}
