import { Component, ElementRef, ViewChild } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { TokenService } from '../../services/token.service';
import { Chart } from 'chart.js';
import { ProfileComponent } from '../profile/profile.component';
import { EditComponent } from '../edit/edit.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProfileComponent, EditComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  userData!: any;
  userRepositories!: any[];

  constructor(
    private githubService: GithubService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.githubService
      .getUserInfo(localStorage.getItem('token') as string)
      .subscribe((userData) => {
        if (userData) {
          this.userData = userData;
        } else {
          alert('Token anda tidak Valid Kawan!');
        }
      });

    this.githubService
      .getUserRepositories(localStorage.getItem('token') as string)
      .subscribe((repositories) => {
        this.userRepositories = repositories;
      });
  }

  navigateToEditProfile() {
    this.router.navigate(['/edit']);
  }

  removeToken() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
