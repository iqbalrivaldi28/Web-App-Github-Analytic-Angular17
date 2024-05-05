import { Component, ElementRef, ViewChild } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { CommonModule } from '@angular/common';
import { EditComponent } from '../edit/edit.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, EditComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  userData!: any;
  userRepositories!: any[];

  constructor(private githubService: GithubService, private router: Router) {}

  ngOnInit(): void {
    this.githubService.getUserInfo().subscribe((userData) => {
      if (userData) {
        this.userData = userData;
      } else {
        alert('Token anda tidak Valid Kawan!');
      }
    });

    this.githubService.getUserRepositories().subscribe((repositories) => {
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
