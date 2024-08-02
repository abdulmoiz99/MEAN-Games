import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddEditGameComponent } from './add-edit-game/add-edit-game.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "games", component: GamesComponent },
    { path: "game/:gameId", component: GameComponent },
    { path: "addEditGame", component: AddEditGameComponent },
    { path: "**", component: ErrorPageComponent },
];
