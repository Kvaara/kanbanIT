import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { SnackService } from '../services/snack.service';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {
  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private snackBar: MatSnackBar,
    private snackService: SnackService,
  ) { }

  @HostListener("click")
  async onClick() {
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      this.router.navigate(["/"]);
      this.snackBar.open("Logged in successfully through Google!", "OK", {
        duration: 5000,
      });
      this.snackService.closeAuthDrawer();
    } catch (err) {
      throw new Error("Unexpected error: " + err);
    }

  }

}
