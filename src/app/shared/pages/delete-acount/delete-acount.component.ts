import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-account-dialog',
  template: `
  <h1 class="title" mat-dialog-title>Eliminar Cuenta</h1>
<div mat-dialog-content>
  <p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no puede deshacerse.</p>
</div>
<div mat-dialog-actions align="end">
  <button mat-button (click)="onCancel()">Cancelar</button>
  <button mat-raised-button color="warn" (click)="onConfirm()">Eliminar</button>
</div>
  `,
})
export class DeleteAccountDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAccountDialogComponent>) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
