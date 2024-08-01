import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  constructor(private _http: HttpClient) { }

  public getGames(): Observable<Game[]> {
    return this._http.get<Game[]>("http://localhost:3000/games")
  }


  public getGame(gameId: String): Observable<Game> {
    return this._http.get<Game>("http://localhost:3000/games/" + gameId)
  }
}
