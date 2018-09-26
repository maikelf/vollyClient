import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() game: any;

  @Output() registerStatus = new EventEmitter<any>();

  public score: any;
  public endSet: boolean;
  public endGame: boolean;

  constructor(private scoreService: ScoreService) {
    this.endSet = false;
    this.endGame = false;
  }

  ngOnInit() {
    this.buildInitialScoreObject();
  }

  registerPoint(team, p) {
    let getStatus = this.scoreService.checkSet(this.score);
    if (!getStatus.end) {
      this.score.partialScore[this.score.currentSet - 1][p] ++;
      this.score.service = team;
    }
    getStatus = this.scoreService.checkSet(this.score);
    console.log(getStatus);
    this.endSet = getStatus.end;
  }

  async registerSet() {
    const getStatus = this.scoreService.checkSet(this.score);
    console.log(this.game);
    if (!this.game.withoutServer) {
      const partial = await this.scoreService.setScore(
        {
          id: this.game.id,
          partial: this.score.currentSet,
          team1: this.score.partialScore[this.score.currentSet - 1][0],
          team2: this.score.partialScore[this.score.currentSet - 1][1]
        }
      );
    }
    this.score.currentSet ++;
    this.score.globalScore[getStatus.winner] ++;
    this.score.partialScore.push([0, 0]);
    this.endSet = false;
    const getGame = this.scoreService.checkGame(this.score);
    this.endGame = getGame.end;
  }

  newGame() {
    this.registerStatus.emit({
      team1: null,
      team2: null,
      state: true
    });
  }

  private buildInitialScoreObject() {
    this.score = {};
    this.score['currentSet'] = 1;
    this.score['globalScore'] = [0, 0];
    this.score['partialScore'] = [];
    this.score.partialScore.push([0, 0]);
    this.score['service'] = this.game.team1;
  }

}
