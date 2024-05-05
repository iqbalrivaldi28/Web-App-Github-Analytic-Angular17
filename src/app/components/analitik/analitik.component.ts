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
  repoCommit: any[] = [];
  repo: any[] = [];

  constructor(private router: Router, private githubService: GithubService) {}

  ngOnInit(): void {
    this.getRepos();
  }

  removeToken() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getRepos() {
    this.githubService.getUserRepositories().subscribe({
      next: (data) => {
        this.repo = data;
        this.getAllRepoData(data);
        console.log('repos', data);
      },
    });
  }

  getAllRepoData(data: any[]) {
    const token = localStorage.getItem('token') as string;
    const repoName = data.filter((x) => x.name !== 'kasir_cerdas');
    let count = 0;
    repoName.forEach((repo) => {
      this.githubService.getRepositoryAnalytics(repo.name).subscribe({
        next: (data) => {
          count++;
          const commit = data.length;
          this.repoCommit.push({
            nameRepo: repo.name,
            commit: commit,
          });

          if (count === repoName.length) {
            this.createCommitChart();
            this.getAllLanguages(repoName);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    });
  }

  getAllLanguages(data: any[]) {
    let count = 0;
    data.forEach((repo) => {
      this.githubService.getLanguagesForRepository(repo.name).subscribe({
        next: (languages) => {
          count++;
          this.repoCommit.find(
            (item) => item.nameRepo === repo.name
          ).languages = Object.keys(languages);
          this.repoCommit.find((item) => item.nameRepo === repo.name).counts =
            Object.values(languages);

          if (count === data.length) {
            this.createLanguageChart();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    });
  }

  private createCommitChart(): void {
    const ctx = document.getElementById('repositoryChart') as HTMLCanvasElement;
    const repoName = this.repoCommit.map((x) => x.nameRepo);
    console.log('cc', repoName);
    const commitCount = this.repoCommit.map((x) => x.commit);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: repoName,
        datasets: [
          {
            label: 'Commits Count',
            data: commitCount,
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

  private createLanguageChart(): void {
    const ctx = document.getElementById('languagesChart') as HTMLCanvasElement;
    const labels: string[] = [];
    const data: number[] = [];

    this.repoCommit.forEach((repo) => {
      repo.languages.forEach((language: any, index: any) => {
        const existingIndex = labels.indexOf(language);
        if (existingIndex === -1) {
          labels.push(language);
          data.push(repo.counts[index]);
        } else {
          data[existingIndex] += repo.counts[index];
        }
      });
    });

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(128, 0, 128, 0.5)',
              'rgba(0, 0, 255, 0.5)',
              'rgba(255, 0, 0, 0.5)',
              'rgba(0, 255, 0, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(128, 0, 128, 1)',
              'rgba(0, 0, 255, 1)',
              'rgba(255, 0, 0, 1)',
              'rgba(0, 255, 0, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
