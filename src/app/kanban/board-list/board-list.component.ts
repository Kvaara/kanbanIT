import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Board } from '../board.model';
import { BoardService } from '../board.service';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { IDataBoard } from '../dialogs/dialog-data-board.model';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
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

  async onDrop($event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, $event.previousIndex, $event.currentIndex);
    await this.boardService.sortBoards(this.boards);
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
      hasBackdrop: true,
      data: data,
    });

    dialogRef.afterClosed().subscribe(async (data: IDataBoard) => {
      if (data) {
        await this.boardService.createBoard(data.board);
      }
    });
  }
}
