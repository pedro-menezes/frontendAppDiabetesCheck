import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  constructor( 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
