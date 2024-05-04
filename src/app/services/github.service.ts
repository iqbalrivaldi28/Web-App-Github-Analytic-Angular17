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

  // getRepositoryAnalytics(token: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   return this.http
  //     .get<any[]>('https://api.github.com/user/repos', { headers })
  //     .pipe(
  //       map((repositories) => {
  //         const chartData = repositories.map((repo) => {
  //           return {
  //             name: repo.name,
  //             commitsCount: repo.commits_count,
  //           };
  //         });
  //         this.createChart(chartData);
  //       }),
  //       catchError((error) => {
  //         console.log(error);
  //         return of(null);
  //       })
  //     );
  // }

  // //? Batas
  // getRepositoryAnalytics(token: string, repoName: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   return this.http
  //     .get<any[]>(
  //       `https://api.github.com/repos/iqbalrivaldi28/${repoName}/commits`,
  //       { headers }
  //     )
  //     .pipe(
  //       map((commits) => {
  //         const chartData = commits.map((commit) => {
  //           return {
  //             sha: commit.sha,
  //             message: commit.commit.message,
  //             author: commit.commit.author.name,
  //             date: commit.commit.author.date,
  //           };
  //         });
  //         this.createChart(chartData);
  //       }),
  //       catchError((error) => {
  //         console.log(error);
  //         return of(null);
  //       })
  //     );
  // }

  // private createChart(data: any[]): void {
  //   const ctx = document.getElementById('repositoryChart') as HTMLCanvasElement;
  //   const labels = data.map((item) => item.name);
  //   const chartData = data.map((item) => item.commitsCount);

  //   console.log('Labels: ', labels);
  //   console.log('Data chart: ', chartData);

  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: 'Commits Count',
  //           data: chartData,
  //           backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //           borderColor: 'rgba(75, 192, 192, 1)',
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }
  // //? Batas

  //! Batas
  updateUserProfile(token: string, name: string, bio: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const body = {
      name: name,
      bio: bio,
    };

    return this.http
      .patch('https://api.github.com/user', body, { headers })
      .pipe(
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

  getUserInfo(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get('https://api.github.com/user', { headers }).pipe(
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

  getUserRepositories(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<any[]>('https://api.github.com/user/repos', { headers })
      .pipe(
        map((repositories) => repositories),
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      );
  }

  getRepositoryAnalytics(token: string, repoName: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<any[]>(
        `https://api.github.com/repos/iqbalrivaldi28/${repoName}/commits`,
        { headers }
      )
      .pipe(
        map((commits) => commits),
        catchError((error) => {
          console.log(error);
          return of(null);
        })
      );
  }

  getLanguagesForRepository(token: string, repoName: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<any>(
        `https://api.github.com/repos/iqbalrivaldi28/${repoName}/languages`,
        { headers }
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
