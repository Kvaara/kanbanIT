import { animate, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Board, Task } from '../board.model';
import { BoardService } from '../board.service';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog.component';
import { IDataBoard } from '../dialogs/dialog-data-board.model';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [ 
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [ 
        style({transform: 'scale(1)', opacity: 1}),
        animate(200, style({transform: 'scale(0)', opacity: 0})) 
      ]),
    ]),
    trigger("popUp", [
      transition(":enter", [
        style({transform: 'scale(1)'}),
        animate(200, style({transform: 'scale(1.1)'}))
      ])
    ]),
  ]
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  sub!: Subscription;

  constructor(
    private boardService: BoardService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.sub = this.boardService.getUserBoards().subscribe((boards) => {
      boards.forEach((board) => {
        const id = board.id;
        this.boards.push(
          {
            ...board.data(),
            id,
          }
        )
      })
    });
  }

  ngOnDestroy(): void {
      this.sub!.unsubscribe();
  }

  async onDropMove($event: CdkDragDrop<any>) {
    moveItemInArray(this.boards, $event.previousIndex, $event.currentIndex);
    await this.boardService.sortBoards(this.boards);
  }

  onDropDelete($event: CdkDragDrop<any>) {
    const data = $event.previousContainer.data;
    const previousIndex = $event.previousIndex;

    if (data.isBoard) {
      const boardID = this.boards[previousIndex].id!;
      this.deleteBoard(boardID);
    } else {
      const boardID = data.board.id!;
      const task = data.board.tasks[previousIndex];
      this.deleteTask(boardID, task);
    }

    
  }

  deleteBoard(boardID: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      hasBackdrop: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(async (doDeleteBoard) => {
      if (doDeleteBoard && boardID) {
        await this.boardService.deleteBoard(boardID);
        this.boards = this.boards.filter((board) => {
          return board.id !== boardID;
        });
      } else {
        console.error("To be deleted Board object doesn't have a document ID and/or doDeleteBoard was false!");
      }
    });
  };

  deleteTask(boardID: string, task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      hasBackdrop: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(async (doDeleteTask) => {
      if (doDeleteTask && boardID) {
        await this.boardService.removeTask(boardID, task);
        this.boards.forEach((board) => {
          if (board.id === boardID) {
            board.tasks = board.tasks?.filter((currentTask) => {
              return currentTask !== task
            });
          } 
        });
      } else {
        console.error("onDropDelete Board object doesn't have a document ID and/or doDeleteTask was false");
      }
    });

  }

  async createBoard() {
    const data: IDataBoard = {
      board: {
        title: "",
        priority: this.boards.length,
        tasks: [],
      },
      isNew: true
    }

    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: "350px",
      autoFocus: false,
      hasBackdrop: true,
      data: data,
    });

    dialogRef.afterClosed().subscribe(async (data: IDataBoard) => {
      if (data) {
        const board = data.board;
        const addedBoardID = await this.boardService.createBoard(board);
        this.boards.push({
          ...board,
          id: addedBoardID,
        });
      }
    })
  }

}
