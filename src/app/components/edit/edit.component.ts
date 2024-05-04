import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  newName: string = '';
  newBio: string = '';

  constructor(private githubService: GithubService, private router: Router) {}

  ngOnInit(): void {
    this.githubService
      .getUserInfo(localStorage.getItem('token') as string)
      .subscribe((userData) => {
        this.newName = userData.name;
        this.newBio = userData.bio;
      });
  }

  submitForm() {
    this.githubService
      .updateUserProfile(
        localStorage.getItem('token') as string,
        this.newName,
        this.newBio
      )
      .subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          alert('Berhasil di Perbaharui');
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );

    this.router.navigate(['/dashboard']);
  }
}
