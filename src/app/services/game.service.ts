import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public httpOptions: any;

  constructor(public http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  async setNewGame(game) {
    try {
      const response = await this.http
        .post(`/volly/games`, game, this.httpOptions)
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
