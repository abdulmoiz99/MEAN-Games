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

  public deleteGame(gameId: String): Observable<any> {
    return this._http.delete<any>("http://localhost:3000/games/" + gameId)
  }

  public addGame(game: Game): Observable<any> {
    const apiUrl = "http://localhost:3000/games/";
    const gameData = {
      title: game.title,
      rate: game.rate,
      year: game.year,
      price: game.price,
      minPlayers: game.minPlayers,
      maxPlayers: game.maxPlayers,
      minAge: game.minAge,

    }
    return this._http.post<Game>(apiUrl, gameData);
  }
}
