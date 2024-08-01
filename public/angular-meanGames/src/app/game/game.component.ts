import { Component, OnInit } from '@angular/core';
import { Game } from '../games/games.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDataService } from '../game-data.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  game!: Game;

  constructor(private _activatedRoute: ActivatedRoute, private _gameService: GameDataService, private _router: Router) {
  }

  ngOnInit(): void {
    const gameId: String = this._activatedRoute.snapshot.params["gameId"];
    this._gameService.getGame(gameId).subscribe(game => {
      this.game = game;
    })
  }
  deleteGame(): void {
    if (confirm("Are you sure to delete this game? ")) {
      const gameId: String = this._activatedRoute.snapshot.params["gameId"];
      this._gameService.deleteGame(gameId).subscribe();
      this._router.navigate(['games']);
    }

  }

}
