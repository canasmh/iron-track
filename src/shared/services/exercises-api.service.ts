import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExercisesApiService {
  private apiUrl = environment.ninjaApiUrl;
  constructor(private http: HttpClient) { }

  getExercises(name: string): Observable<any> {

    const headers = new HttpHeaders({
      'X-Api-Key': environment.apiKey
    });

    const params = new HttpParams()
      .set('name', name);

    return this.http.get(this.apiUrl, { headers, params });
  }
}
