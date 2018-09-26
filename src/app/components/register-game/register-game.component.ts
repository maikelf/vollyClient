import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-register-game',
  templateUrl: './register-game.component.html',
  styleUrls: ['./register-game.component.css']
})
export class RegisterGameComponent implements OnInit {

  form: FormGroup;
  @Output() registerStatus = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private gs: GameService) {
    this.form = this.fb.group({
      team1: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(60)
        ])
      ],
      team2: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(60)
        ])
      ],
      withoutServer: false
    });
   }

  ngOnInit() {
  }

  async RegisterGame() {
    console.log(this.form.value);
    const game = {
      team1: this.form.value.team1,
      team2: this.form.value.team2,
      state: false,
      status: 0,
      withoutServer: this.form.value.withoutServer
    };
    if (!this.form.value.withoutServer) {
      const setGame = await this.gs.setNewGame(game);
       game['id'] = setGame.response.insertId;
    } else {
      game['id'] = null;
    }
    this.registerStatus.emit(game);
  }
}
