import { TeamRoleAmount } from './model/teamroleamounts.model';
import { TeamAmount } from './model/teamamount.model';
import { Team } from './model/team.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  teamDetails():Observable<Team[]>{
    return this.http.get<Team[]>(`${this.baseUrl}all`)
  }

  teamAmountDetails():Observable<TeamAmount[]>{
    return this.http.get<TeamAmount[]>(`${this.baseUrl}totalamount`)
  }

  teamRoleAmountDetails(team:TeamAmount):Observable<TeamRoleAmount[]>{
    return this.http.get<TeamRoleAmount[]>(`${this.baseUrl}amountbyrole/${team.teamName}`)
  }
}
