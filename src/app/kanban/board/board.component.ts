import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../board.model';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board!: Board;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
  }

  async onDrop($event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks!, $event.previousIndex, $event.currentIndex);
    await this.boardService.updateTasks(this.board.id!, this.board.tasks!);
  }

  async newTask() {
    // this.boardService.updateTasks
  }
}
