import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { RegisterGameComponent } from './components/register-game/register-game.component';
import { GameBoardComponent } from './components/game-board/game-board.component';

import { ScoreService } from './services/score.service';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterGameComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatCheckboxModule
  ],
  providers: [ScoreService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
