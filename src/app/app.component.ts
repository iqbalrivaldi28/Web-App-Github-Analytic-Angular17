import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginpageComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'github-app';
}
