import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameDataService } from '../game-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-add-edit-game',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-game.component.html',
  styleUrl: './add-edit-game.component.css'
})
export class AddEditGameComponent implements OnInit {

  gameForm!: FormGroup;
  constructor(private _gameService: GameDataService) { }
  ngOnInit(): void {
    this.gameForm = new FormGroup({
      title: new FormControl,
      rating: new FormControl,
      year: new FormControl,
      price: new FormControl,
      minPlayers: new FormControl,
      maxPlayers: new FormControl,
      minAge: new FormControl,
    })
  }

  addEditGame(form: FormGroup): void {
    const game = new Game();
    game.title = form.value.title;
    game.rate = form.value.rating;
    game.year = form.value.year;
    game.price = form.value.price;
    game.minPlayers = form.value.minPlayers;
    game.maxPlayers = form.value.maxPlayers;
    game.minAge = form.value.minAge;

    this._gameService.addGame(game).subscribe();
  }
}
