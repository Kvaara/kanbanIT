import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardListComponent } from './kanban/board-list/board-list.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/compat/auth-guard";
import { ProfilePageComponent } from './user/profile-page/profile-page.component';
import { LoginGuardGuard } from './user/login-guard.guard';
import { ListPageComponent } from './customers/list-page/list-page.component';
import { DetailPageComponent } from './customers/detail-page/detail-page.component';
import { ToolsUsedComponent } from './shared/tools-used/tools-used.component';


const redirectUnauthorizedToHome = () => redirectUnauthorizedTo("/");
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo("/login");

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
    loadChildren: () => import("./kanban/kanban.module").then((m) => m.KanbanModule),
    canActivate: [AngularFireAuthGuard],
    data: {
    isAuthOnly: true,
    authGuardPipe: redirectUnauthorizedToLogin,
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
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then(m => m.CustomersModule),
  },
  {
    path: 'tools-used',
    component: ToolsUsedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
