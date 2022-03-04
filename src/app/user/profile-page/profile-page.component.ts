import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userDisplayName: string = "";
  userEmail: string = "";

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.userDisplayName = user.displayName ?? "";
      this.userEmail = user.email ?? "";
    }
  }

  async signUserOut() {
    await this.afAuth.signOut();
    this.snackBar.open("Signed out successfully!", "OK", {
      duration: 5000,
    })
    this.router.navigate(["/"])
  }

}
