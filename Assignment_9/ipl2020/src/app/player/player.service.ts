import { MaxPaidPlayers } from './model/maxpaidplayers.model';
import { AllPlayers } from './model/allplayers.model';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { }

  allPlayerDetails():Observable<AllPlayers[]>{
    return this.http.get<AllPlayers[]>(`${this.baseUrl}players/all`)
  }

  maxPaidPlayerDetails():Observable<MaxPaidPlayers[]>{
    return this.http.get<MaxPaidPlayers[]>(`${this.baseUrl}maxamoutbyrole`)
  }

}
