import { animate, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board, Task } from '../board.model';
import { BoardService } from '../board.service';
import { IData } from '../dialogs/dialog-data.model';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [ 
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
    ]),
    trigger("popUp", [
      transition(":enter", [
        style({transform: 'scale(1)'}),
        animate(100, style({transform: 'scale(1.1)'}))
      ])
    ]),
  ]
})
export class BoardComponent implements OnInit {
  @Input() board!: Board;

  constructor(
    private boardService: BoardService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  async onDrop($event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks!, $event.previousIndex, $event.currentIndex);
    await this.boardService.updateTasks(this.board.id!, this.board.tasks!);
  }

  openNewTaskDialog() {
    const data: IData = {
      task: {
        description: "",
        label: "purple",
      },
      isNew: true,
    }

    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "350px",
      hasBackdrop: true,
      data: data,
    })

    dialogRef.afterClosed().subscribe((data: IData) => {
      this.board.tasks?.push(data.task);
      this.boardService.updateTasks(this.board.id!, this.board.tasks!);
    });
    
    
  };

  openUpdateTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "350px",
      data: {
        task,
        isNew: false,
      }
    })
  }
}
