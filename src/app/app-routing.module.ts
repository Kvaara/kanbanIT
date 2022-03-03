import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardListComponent } from './kanban/board-list/board-list.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/compat/auth-guard";
import { ProfilePageComponent } from './user/profile-page/profile-page.component';
import { LoginGuardGuard } from './user/login-guard.guard';


const redirectUnauthorizedToHome = () => redirectUnauthorizedTo("/");

const routes: Routes = [
  { path: '', component: HomeComponent},
  { 
    path: 'login', 
    component: HomeComponent,
    canActivate: [LoginGuardGuard],
    data: {
      openAuthDrawer: true
    }
  },
  { path: 'kanban',
    component: BoardListComponent, 
    loadChildren: () => import("./kanban/kanban.module").then((m) => m.KanbanModule),
    canActivate: [AngularFireAuthGuard],
    canLoad: [AngularFireAuthGuard],
    data: {
    isAuthOnly: true,
    authGuardPipe: redirectUnauthorizedToHome,
    }
  },
  { 
    path: "profile",
    component: ProfilePageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      isAuthOnly: true,
      authGuardPipe: redirectUnauthorizedToHome,
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
