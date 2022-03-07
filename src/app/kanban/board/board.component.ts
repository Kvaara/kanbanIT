import { animate, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Board, Task } from '../board.model';
import { BoardService } from '../board.service';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { IDataTask } from '../dialogs/dialog-data-task.model';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [ 
        style({opacity:0}),
        animate(300, style({opacity:1})) 
      ]),
      transition(':leave', [ 
        style({transform: 'scale(1)', opacity: 1}),
        animate(200, style({transform: 'scale(0)', opacity: 0})) 
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
  @Input() deleteZone!: CdkDropList<any>;
  showAddText: boolean = false;

  constructor(
    private boardService: BoardService,
    private dialog: MatDialog,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Kanban Management");
  }

  async onDrop($event: CdkDragDrop<any>) {
    moveItemInArray(this.board.tasks!, $event.previousIndex, $event.currentIndex);
    await this.boardService.updateTasks(this.board.id!, this.board.tasks!, false);
  }

  openNewTaskDialog() {
    const data: IDataTask = {
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
      autoFocus: false,
    })

    dialogRef.afterClosed().subscribe(async (data: IDataTask) => {
      if (data) {
        this.board.tasks?.push(data.task);
        await this.boardService.updateTasks(this.board.id!, this.board.tasks!, true);
      }
    });
    
    
  };

  openUpdateTaskDialog(taskToUpdate: Task) {
    // Angular's change detection is why we copy the task to a new object (new memory reference).
    const newTaskCopy = {
      ...taskToUpdate
    };
    const data: IDataTask = {
      task: newTaskCopy,
      isNew: false,
    }

    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "350px",
      hasBackdrop: true,
      autoFocus: false,
      data,
    })

    dialogRef.afterClosed().subscribe(async (dataWithNewTask: IDataTask) => {
      if (dataWithNewTask) {
        // After confirmation, update the task currently in view to the user.
        taskToUpdate.description = dataWithNewTask.task.description;
        taskToUpdate.label = dataWithNewTask.task.label;
        await this.boardService.updateTasks(this.board.id!, this.board.tasks!, false);
      }
    });
  };

  openUpdateBoardDialog(boardToUpdate: Board) {
    const newBoardCopy = {
      ...boardToUpdate,
    }

    const data = {
      board: newBoardCopy,
      isNew: false,
    }

    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: "350px",
      hasBackdrop: true,
      autoFocus: false,
      data,
    })

    dialogRef.afterClosed().subscribe(async (dataWithNewBoard) => {
      if (dataWithNewBoard) {
        // After confirmation, update the task currently in view to the user.
        boardToUpdate.title = dataWithNewBoard.board.title;
        await this.boardService.updateBoard(this.board.id!, boardToUpdate);
      }
    });
  }
};
