import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [DashboardComponent, CommonModule, FormsModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss',
})
export class LoginpageComponent {
  token: string = '';

  constructor(private router: Router, private githubService: GithubService) {}

  onLogin() {
    localStorage.setItem('token', this.token);
    this.githubService.getUserInfo().subscribe((userData) => {
      if (userData) {
        this.router.navigate(['/dashboard']);
        console.log(this.token);
      } else {
        alert('Token anda tidak Valid Kawan!');
      }
    });
  }
}
