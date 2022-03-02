import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { SnackService } from 'src/app/services/snack.service';
import { LoginFormComponent } from '../../user/login-form/login-form.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  providers: [
    FormBuilder
  ]
})
export class ShellComponent implements AfterViewInit {
  @ViewChild("leftNavDrawer") leftNavDrawer!:  MatSidenav;
  @ViewChild("authDrawer") authDrawer!:  MatSidenav;
  @ViewChild("authForms", {read: ViewContainerRef}) authFormsContainer!:  ViewContainerRef;
  loginComponent?: ComponentRef<LoginFormComponent>;

  isHandset$: Observable<boolean> = this.breakPointObserver.observe(Breakpoints.XSmall).pipe(
    map((breakpointState) => breakpointState.matches),
    shareReplay(),
  )

  constructor(
    private breakPointObserver: BreakpointObserver,
    private snackService: SnackService,
    private afAuth: AngularFireAuth,
  ) {}


  ngAfterViewInit(): void {
    this.registerAuthDrawer();
    this.subscribeToAuthDrawerOpenedStart();
  }

  registerAuthDrawer() {
    this.snackService.registerAuthDrawer(this.authDrawer);
  }

  subscribeToAuthDrawerOpenedStart() {
    this.authDrawer.openedStart.pipe(
      tap(async() => await this.setupAuthDrawerContent())
    ).subscribe();
  }

  async setupAuthDrawerContent() {
    if (!this.loginComponent)  {
      // Lazily loading the user module for optimization purposes
      await import("../../user/user.module");
      this.loginComponent = this.authFormsContainer.createComponent(LoginFormComponent);
      this.loginComponent.instance.hasAuthModuleLoaded = true;
    } 
  }

  async openAuthDrawer() {
    await this.authDrawer.open();
  }

  closeLeftNavDrawer() {
    this.leftNavDrawer.close();
  };

  toggleLeftNavDrawer() {
    this.leftNavDrawer.toggle();
  };

  async isUserAuthenticated() {
    const user = await this.afAuth.currentUser;
    const isAuthenticated = !!user;
    return isAuthenticated;
  };

  
}
