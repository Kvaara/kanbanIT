import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';
import { BoardDialogComponent } from './dialogs/board-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog.component';
import { VerticalScrollWithMouseDownDirective } from './vertical-scroll-with-mouse-down.directive';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog.component';
import { KanbanRoutingModule } from './kanban-routing.module';



@NgModule({
  declarations: [
    BoardListComponent,
    BoardComponent,
    BoardDialogComponent,
    TaskDialogComponent,
    VerticalScrollWithMouseDownDirective,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    MatButtonToggleModule,
    MatButtonToggleModule,
    MatDialogModule,
    KanbanRoutingModule,
  ],
})
export class KanbanModule { }
