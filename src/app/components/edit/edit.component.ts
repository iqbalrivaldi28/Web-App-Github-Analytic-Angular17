import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  newName: string = '';
  newBio: string = '';
  newLocation: string = '';

  constructor(private githubService: GithubService, private router: Router) {}

  ngOnInit(): void {
    this.githubService.getUserInfo().subscribe((userData) => {
      this.newName = userData.name;
      this.newBio = userData.bio;
      this.newLocation = userData.location;
    });
  }

  submitForm() {
    this.githubService
      .updateUserProfile(this.newName, this.newBio, this.newLocation)
      .subscribe(
        (response) => {
          console.log('Berhasil di Perbaharui:', response);
          alert('Berhasil di Perbaharui');
        },
        (error) => {
          console.error('Error update profile:', error);
        }
      );

    this.router.navigate(['/dashboard']);
  }

  removeToken() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
