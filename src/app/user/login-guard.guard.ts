import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate} from '@angular/router';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private snackBar: MatSnackBar) {}

  async canActivate(): Promise<boolean> {
      const user = this.afAuth.user;
      const isAuthenticated = await firstValueFrom(user.pipe(
        map((user) => !!user)
      ));
      if (isAuthenticated) {
        this.snackBar.open("You are already logged in.", "OK", {
          duration: 5000,
        });
      }
      return !isAuthenticated;
  }
  
}
