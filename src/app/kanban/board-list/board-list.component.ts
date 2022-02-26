import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Board } from '../board.model';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  sub!: Subscription;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.sub = this.boardService.getUserBoards().subscribe((boards) => {
      boards.forEach((board) => {
        console.log(board.data());
        this.boards.push(
          board.data(),
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
    const newBoard: Board = {
      title: "Grocery List",
      priority: 1,
      tasks: [
        {description: "Grocery List", label: "red"}
      ],
    }
    await this.boardService.createBoard(newBoard);
  }
}
