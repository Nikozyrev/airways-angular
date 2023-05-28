import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../../core/services/modal.service';
import { AuthDialogComponent } from '../components/auth-dialog/auth-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  private dialogRef?: MatDialogRef<unknown>;

  constructor(private modalService: ModalService) {}

  public openDialog() {
    this.dialogRef = this.modalService.openDialog(AuthDialogComponent, {
      maxWidth: '90vw',
    });
    return this.dialogRef;
  }

  public closeDialog() {
    this.dialogRef?.close();
  }
}
