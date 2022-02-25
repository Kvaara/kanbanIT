import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginFormComponent } from '../../user/login-form/login-form.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  providers: [
    FormBuilder
  ]
})
export class ShellComponent implements OnInit {
  @ViewChild("leftNavDrawer") leftNavDrawer!:  MatSidenav;
  @ViewChild("authDrawer") authDrawer!:  MatSidenav;
  @ViewChild("authForms", {read: ViewContainerRef}) authFormsContainer!:  ViewContainerRef;
  loginComponent?: ComponentRef<LoginFormComponent>;

  isHandset$: Observable<boolean> = this.breakPointObserver.observe(Breakpoints.XSmall).pipe(
    map((breakpointState) => breakpointState.matches),
    shareReplay(),
  )

  constructor(private breakPointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }

  closeLeftNavDrawer() {
    this.leftNavDrawer.close();
  };

  toggleLeftNavDrawer() {
    this.leftNavDrawer.toggle();
  };

  async openAuthDrawer() {

    if (!this.loginComponent)  {
      // Lazily loading the user module for optimization purposes
      await import("../../user/user.module");
      this.loginComponent = this.authFormsContainer.createComponent(LoginFormComponent);
    } 
    this.authDrawer.open();

  }
}
