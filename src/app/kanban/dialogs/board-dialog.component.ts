import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDataBoard } from './dialog-data-board.model';

@Component({
  selector: 'app-board-dialog',
  template: `
  <button class="absolute top-0 right-0" mat-icon-button (click)="onNoClick()">
    <mat-icon>clear</mat-icon>
  </button>

      <div class="flex items-center justify-start -translate-y-2">
        <h1 mat-dialog-title class="text-4xl text-left tracking-wide text-slate-100">
          {{ data.isNew ? "What name?" : "Edit Name" }}
        </h1>
      </div>

      <div mat-dialog-content class="flex flex-col justify-center items-stretch">

        <label for="description" class="text-xl mb-1 tracking-wide font-bold text-slate-100">Title:</label>
        <div class="flex p-2 rounded bg-slate-800">
          <textarea [(ngModel)]="data.board.title"
           minlength="2"
           required
           cdkFocusInitial
           cdkTextareaAutosize
           cdkAutosizeMinRows="1"
           cdkAutosizeMaxRows="2"
           id="description"
           class="rounded text-xl flex-1 outline-none pl-1 transition-all bg-transparent focus:bg-slate-700"
           #title="ngModel"
          ></textarea>
        </div>

        <mat-error [ngClass]="(title.touched && title.errors) ? 'opacity-100' : 'opacity-0'" class="text-lg font-bold text-red-400 transition-opacity">
          * At least two characters are required
        </mat-error>

    </div>
    <div mat-dialog-actions class="flex flex-col justify-center items-stretch mt-1">
      <button mat-raised-button [mat-dialog-close]="data" color="accent" [disabled]="title.errors"
      class="font-bold text-[18px] tracking-widest hover:brightness-110 hover:tracking-wide transition-all py-1.5
      disabled:cursor-not-allowed disabled:brightness-100 disabled:tracking-normal disabled:opacity-80">
        {{ data.isNew ? 'CREATE' : 'UPDATE' }}
      </button>
    </div>

    <div class="h-3"></div>
  `,
  styles: [
    "::ng-deep .mat-dialog-container { background-color: #000C29 !important; position: relative !important; }"
  ],
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
export class BoardDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDataBoard,
    private dialogRef: MatDialogRef<BoardDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
