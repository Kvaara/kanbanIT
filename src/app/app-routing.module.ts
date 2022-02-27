import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardListComponent } from './kanban/board-list/board-list.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/compat/auth-guard";


const redirectUnauthorizedToHome = () => redirectUnauthorizedTo("/");

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: HomeComponent, data: {openAuthDrawer: true}},
  { path: 'kanban',
    component: BoardListComponent, 
    loadChildren: () => import("./kanban/kanban.module").then((m) => m.KanbanModule),
    canActivate: [AngularFireAuthGuard],
    data: {
    isAuthOnly: true,
    authGuardPipe: redirectUnauthorizedToHome,
  }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
