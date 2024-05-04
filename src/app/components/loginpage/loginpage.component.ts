import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [DashboardComponent, CommonModule, FormsModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss',
})
export class LoginpageComponent {
  token: string = '';

  constructor(
    private router: Router,
    private githubService: GithubService,
    private tokenService: TokenService
  ) {}

  onLogin() {
    this.githubService.getUserInfo(this.token).subscribe((userData) => {
      if (userData) {
        this.tokenService.setToken(this.token);
        localStorage.setItem('token', this.token);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Token anda tidak Valid Kawan!');
      }
    });
  }
}
