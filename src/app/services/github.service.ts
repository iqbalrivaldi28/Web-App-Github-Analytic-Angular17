import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { error } from 'console';
import { response } from 'express';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  updateUserProfile(
    name: string,
    bio: string,
    location: string
  ): Observable<any> {
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });

    const body = {
      name: name,
      bio: bio,
      location: location,
    };

    return this.http.patch('https://api.github.com/user', body).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  getUserInfo(): Observable<any> {
    return this.http.get('https://api.github.com/user').pipe(
      map((response) => {
        console.log(response);
        return response;
      }),

      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  getUserRepositories(): Observable<any[]> {
    return this.http.get<any[]>('https://api.github.com/user/repos').pipe(
      map((repositories) => repositories),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  getRepositoryAnalytics(repoName: string): Observable<any> {
    return this.http
      .get<any[]>(
        `https://api.github.com/repos/iqbalrivaldi28/${repoName}/commits`
      )
      .pipe(
        map((commits) => commits),
        catchError((error) => {
          console.log(error);
          return of(null);
        })
      );
  }

  getLanguagesForRepository(repoName: string): Observable<any> {
    return this.http
      .get<any>(
        `https://api.github.com/repos/iqbalrivaldi28/${repoName}/languages`
      )
      .pipe(
        map((languages) => languages),
        catchError((error) => {
          console.log(error);
          return of(null);
        })
      );
  }
}
