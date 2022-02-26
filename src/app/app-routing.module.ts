import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardListComponent } from './kanban/board-list/board-list.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: HomeComponent, data: {openAuthDrawer: true}},
  { path: 'kanban',
    component: BoardListComponent, 
    loadChildren: () => import("./kanban/kanban.module").then((m) => m.KanbanModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
