import { Component, Inject, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirmación</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      h2 {
        color: #1770a8;
      }
    `
  ]
})
export class ContactConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
