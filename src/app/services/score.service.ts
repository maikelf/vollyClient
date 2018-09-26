import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  public httpOptions: any;

  constructor(public http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  checkSet(score): any {
    const diff = Math.abs(score.partialScore[score.currentSet - 1][0] - score.partialScore[score.currentSet - 1][1]);
    const result = {end: false, winner: -1};
    const limit = (score.currentSet === 5) ? 15 : 25;
    if ((score.partialScore[score.currentSet - 1][0] >= limit || score.partialScore[score.currentSet - 1][1] >= limit) && diff > 1) {
      console.log('fin');
      result.end = true;
    }
    if (result.end) {
      (score.partialScore[score.currentSet - 1][0] > score.partialScore[score.currentSet - 1][1]) ? result.winner = 0 : result.winner = 1;
    }
    return result;
  }

  checkGame(score): any {
    const result = {end: false, winner: -1};
    if (score.globalScore[0] === 3 || score.globalScore[1] === 3) {
      result.end = true;
    }
    if (result.end) {
      (score.globalScore[0] === 3) ? result.winner = 0 : result.winner = 1;
    }
    return result;
  }

  async setScore(score) {
    try {
      const response = await this.http
        .post(`/volly/scores`, score, this.httpOptions)
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
