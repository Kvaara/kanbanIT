import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @ViewChild(MatSidenav) drawer!:  MatSidenav;

  isHandset$: Observable<boolean> = this.breakPointObserver.observe(Breakpoints.Handset).pipe(
    map((breakpointState) => breakpointState.matches),
    shareReplay(),
  )

  constructor(private breakPointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }

  closeDrawer() {
    this.drawer.close();
  };

  toggleDrawer() {
    this.drawer.toggle();
  };

}
