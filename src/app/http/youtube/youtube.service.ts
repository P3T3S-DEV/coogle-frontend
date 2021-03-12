import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Video } from 'src/app/models/youtube/youtube.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private readonly BASE_URL = environment.YOUTUBE_BASE_URL;
  private headers = { 'content-type': 'application/json' }
  
  constructor(private readonly _http: HttpClient) { }

  searchVideo(keywork: string): Observable<Video>{
    return this._http.get<Video>(this.BASE_URL + keywork, { 'headers': this.headers }).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  handleError(err: any){
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.status} request error`;
    } else {
      errorMessage = `Error: ${err.status} youtube error`;
    }
    return throwError(errorMessage);
  }
}
