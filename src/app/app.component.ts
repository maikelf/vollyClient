import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public game: any;

  constructor() {
    this.game = {
      team1: null,
      team2: null,
      state: true
    };
  }

  getRegister($event) {
    this.game = $event;
  }
}
