import { Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackService: SnackService,
  ) {}

  async canActivate(): Promise<boolean> {
   const user = await this.afAuth.currentUser;

   const isUserLoggedIn = !!user;

   if (!isUserLoggedIn) {
     this.snackService.openSnackBarAndShowAuthDrawer();
   }

   return isUserLoggedIn;
  }
  
}
