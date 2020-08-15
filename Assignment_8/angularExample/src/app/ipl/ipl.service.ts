import { TeamAmount } from './shared/model/teamamount.model';
import { Team } from './shared/model/team.model';
import { environment } from './../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IplService {
  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) {}

  teamDetails():Observable<Team[]>{
    return this.http.get<Team[]>(`${this.baseUrl}/all`)
  }

  teamAmountDetails():Observable<TeamAmount[]>{
    return this.http.get<TeamAmount[]>(`${this.baseUrl}/totalamount`)
  }
}
