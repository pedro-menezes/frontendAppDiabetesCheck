import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  constructor( 
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  async logout() {
    await this.storage.set('access_token', "");
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
