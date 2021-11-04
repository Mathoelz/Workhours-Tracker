import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-profil-bearbeiten',
  templateUrl: './profil-bearbeiten.page.html',
  styleUrls: ['./profil-bearbeiten.page.scss'],
})
export class ProfilBearbeitenPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  user: User;

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
  }

}
