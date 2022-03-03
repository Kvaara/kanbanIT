import { Injectable, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  authDrawer?: MatSidenav;

  constructor(private snackBar: MatSnackBar) {}

  registerAuthDrawer(authDrawer: MatSidenav) {
    this.authDrawer = authDrawer;
  }

  async openSnackBarAndShowAuthDrawer() {
    this.snackBar.open("Please sign in to view this page.", "OK", {
      duration: 6000
    });

    await this.authDrawer?.open();
  }
  
  async openAuthDrawer() {
    await this.authDrawer?.open();
  }

  async closeAuthDrawer() {
    await this.authDrawer?.close();
  }


}
