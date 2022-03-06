import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `

  <button class="absolute top-0 right-0" mat-icon-button (click)="onNoClick()">
    <mat-icon>clear</mat-icon>
  </button>

    <h1 mat-dialog-title class="text-4xl text-slate-100 tracking-wide text-left">Are you sure?</h1>

    <div mat-dialog-content class="flex gap-4 justify-between items-center mt-8">
      <button mat-button class="mt-0.5" (click)="onNoClick()">
        <span class="tracking-wide text-base font-bold text-slate-100 block py-1.5">CANCEL</span>
      </button>
        
      <button mat-raised-button color="accent" [mat-dialog-close]="true"
       class="tracking-widest hover:brightness-150 transition-all">
        <span class="text-lg font-bold block py-1.5 text-slate-100">DELETE</span>
      </button>
    </div>
  `,
  styles: [
    "::ng-deep .mat-dialog-container { background-color: #000C29 !important; position: relative !important; }"
  ]
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    ) {

  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
