import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { BoardService } from '../board.service';
import { IDataTask } from './dialog-data-task.model';

@Component({
  selector: 'app-task-dialog',
  template: `

  <button class="absolute top-0 right-0" mat-icon-button (click)="onNoClick()">
    <mat-icon>clear</mat-icon>
  </button>

    <div class="flex items-center justify-start -translate-y-2">
      <h1 mat-dialog-title class="text-4xl text-left tracking-wide text-slate-100">
        {{ data.isNew ? "What's the task?" : "What to update?" }}
      </h1>
    </div>

    <div mat-dialog-content class="flex flex-col justify-center items-stretch">

          <label for="description" class="text-xl mb-1 tracking-wide font-bold text-slate-100">Description:</label>
          <div class="flex p-2 rounded" [ngClass]="addBG(data.task.label)">
            <textarea [(ngModel)]="data.task.description"
             minlength="2"
             required
             cdkFocusInitial
             cdkTextareaAutosize
             cdkAutosizeMinRows="1"
             cdkAutosizeMaxRows="4"
             id="description"
             class="rounded text-xl flex-1 outline-none pl-1 transition-all bg-transparent"
             [ngClass]="data.task.label === 'gray' ? 'line-through' : ''"
             #description="ngModel"
            ></textarea>
          </div>

          <mat-error *ngIf="description.touched && description.errors" class="text-lg font-bold text-red-400">
            * At least two characters are required
          </mat-error>

      <div class="flex flex-col mt-3">

        <span class="text-xl mb-1 tracking-wide font-bold text-slate-100">Color:</span>
        <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.task.label"
        class="mb-4 flex"
        >
          <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt" class="bg-slate-800 flex-1">
            <mat-icon [ngClass]="opt" class="mb-0.5">{{
              opt === 'gray' ? 'check_box' : 'lens'
              
            }}</mat-icon>
          </mat-button-toggle>
        </mat-button-toggle-group>

      </div>

  </div>
  <div mat-dialog-actions class="flex flex-col justify-center items-stretch">
    <button mat-raised-button [mat-dialog-close]="data" color="accent" [disabled]="description.errors"
     class="font-bold text-[18px] tracking-widest hover:brightness-110 hover:tracking-wide transition-all py-1.5
     disabled:cursor-not-allowed disabled:brightness-100 disabled:tracking-normal disabled:opacity-80">
      {{ data.isNew ? 'CREATE' : 'UPDATE' }}
    </button>
  </div>

  <div class="h-3"></div>
  `,
  styles: [
    ".blue {color: #71deff !important; }",
    ".green { color: #36e9b6 !important; }",
    ".yellow {  color: #ffd044 !important; }",
    ".purple {  color: #b05cff !important; }",
    ".red { color: #e74a4a !important; }",
    ".gray { color: #5b5b5b !important; filter: brightness(2); }",
    ".blueBG { background-color: #71deff !important; color: black; }",
    ".greenBG { background-color: #36e9b6 !important; color: black; }",
    ".yellowBG {  background-color: #ffd044 !important; color: black; }",
    ".purpleBG {  background-color: #b05cff !important; }",
    ".redBG { background-color: #e74a4a !important; }",
    ".grayBG { background-color: #5b5b5b !important;  }",
    ".mat-button-toggle-checked {background-color: #10192B !important; filter: brightness(0.9); }",
    "::ng-deep .mat-dialog-container { background-color: #000C29 !important; position: relative !important; }"
  ]
})
export class TaskDialogComponent implements OnInit {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: IDataTask,
  ) { }

  ngOnInit(): void {

  }

  addBG(label: string) {
    return label + "BG";
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
