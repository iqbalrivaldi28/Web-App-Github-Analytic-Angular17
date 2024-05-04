import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { Chart } from 'chart.js/auto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-analitik',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './analitik.component.html',
  styleUrl: './analitik.component.scss',
})
export class AnalitikComponent {
  chart: any = [];

  constructor(private router: Router, private githubService: GithubService) {}

  removeToken() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // ngOnInit(): void {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     this.githubService.getRepositoryAnalytics(token).subscribe(
  //       () => {
  //         console.log('Repository analytics retrieved successfully');
  //       },
  //       (error) => {
  //         console.error('Error retrieving repository analytics:', error);
  //       }
  //     );
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }

  //? Batas
  // ngOnInit(): void {
  //   const token = localStorage.getItem('token');
  //   const repoName = 'API-Perpusku';

  //   if (token) {
  //     this.githubService.getRepositoryAnalytics(token, repoName).subscribe({
  //       next: (data) => {
  //         console.log(data);
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         console.log(err);
  //       },
  //     });
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }
  //? Batas
  repoCommit: any[] = [];
  repo: any[] = [];

  getRepos() {
    this.githubService
      .getUserRepositories(localStorage.getItem('token') as string)
      .subscribe({
        next: (data) => {
          this.repo = data;
          this.getAllRepoCommit(data);
          console.log('repos', data);
        },
      });
  }

  getAllRepoCommit(data: any[]) {
    console.log('param', data);
    const token = localStorage.getItem('token') as string;
    let repoName = data.filter((x) => x.name !== 'kasir_cerdas');
    console.log('rnme', repoName);
    // this.getRepos();
    repoName.forEach((repo) => {
      this.githubService.getRepositoryAnalytics(token, repo.name).subscribe({
        next: (data) => {
          // this.createChart(data);
          // console.log('data:', data);
          const commit = data.length;
          this.repoCommit.push({
            nameRepo: repo.name,
            commit: commit,
          });

          if (this.repoCommit.length === repoName.length) {
            this.createChart();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    });
  }

  ngOnInit(): void {
    this.getRepos();
    // this.getAllRepoCommit();

    // if (token) {
    //   this.githubService.getRepositoryAnalytics(token, repoName).subscribe({
    //     next: (data) => {
    //       this.createChart(data);
    //       console.log('data:', data);
    //     },
    //     error: (err: HttpErrorResponse) => {
    //       console.log(err);
    //     },
    //   });
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }

  // private createChart(data: any[]): void {
  //   const ctx = document.getElementById('repositoryChart') as HTMLCanvasElement;
  //   const labels = data.map((commit) => new Date(commit.date).toLocaleString());
  //   const dataCounts = data.map((commit) => 1); // Setiap commit dihitung sebagai 1

  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: 'Commits Count',
  //           data: dataCounts,
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

  //?
  // private createChart(data: any[]): void {
  //   const ctx = document.getElementById('repositoryChart') as HTMLCanvasElement;
  //   const commitCounts = this.getCommitCountsByDate(data);

  //   const labels = Object.keys(commitCounts);
  //   const dataCounts = Object.values(commitCounts);

  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: 'Commits Count',
  //           data: dataCounts,
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

  // private getCommitCountsByDate(data: any[]): { [date: string]: number } {
  //   const commitCounts: { [date: string]: number } = {};

  //   data.forEach((commit) => {
  //     const date = new Date(commit.date).toLocaleDateString();
  //     commitCounts[date] = (commitCounts[date] || 0) + 1;
  //   });

  //   return commitCounts;
  // }

  private createChart(): void {
    const ctx = document.getElementById('repositoryChart') as HTMLCanvasElement;
    // const commitCounts = this.getCommitCountsByDate(data); // Or: const totalCount = this.getTotalCommitCount(data);

    // const labels = Object.keys(commitCounts); // or: ['Total Commits'];
    // const dataCounts = Object.values(commitCounts); // or: [totalCount];

    const repoName = this.repoCommit.map((x) => x.nameRepo);
    console.log('cc', repoName);
    const count = this.repoCommit.map((x) => x.commit);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: repoName,
        datasets: [
          {
            label: 'Commits Count', // Adjust label if needed
            data: count,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  private getCommitCountsByDate(data: any[]): { [date: string]: number } {
    const commitCounts: { [date: string]: number } = {};

    data.forEach((commit) => {
      const date = new Date(commit.date).toLocaleDateString('en-US', {
        day: 'numeric',
      }); // Format as 'DD'
      commitCounts[date] = (commitCounts[date] || 0) + 1;
    });

    return commitCounts;
  }

  //!Batas
}
