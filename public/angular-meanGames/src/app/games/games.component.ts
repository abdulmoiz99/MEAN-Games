import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { GameDataService } from '../game-data.service';
import { CommonModule } from '@angular/common';

export class Game {
  #_id!: string;
  #title!: string;
  #year!: string;
  #rate!: number;
  #price!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;
  get _id() { return this.#_id; }
  get title() { return this.#title; }
  set title(title: string) { this.#title = title; }
  get year() { return this.#year; }
  set year(year: string) { this.#year = year; }
  get rate() { return this.#rate; }
  set rate(rate: number) { this.#rate = rate; }
  get price() { return this.#price; }
  set price(price: number) { this.#price = price; }
  get minPlayers() { return this.#minPlayers; }
  set minPlayers(minPlayers: number) { this.#minPlayers = minPlayers; }
  get maxPlayers() { return this.#maxPlayers; }
  set maxPlayers(maxPlayers: number) { this.#maxPlayers = maxPlayers; }
  get minAge() { return this.#minAge; }
  set minAge(minAge: number) { this.#minAge = minAge; }

}

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {
  games: Game[] = []

  constructor(private gamesService: GameDataService, private _router: Router) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(games => {
      this.games = games;
    })
  }
  addNewGame(): void {
    this._router.navigate(['addEditGame'])
  }
}
