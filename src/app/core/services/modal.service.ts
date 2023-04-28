import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(public dialog: MatDialog) {}

  public openDialog(
    component: ComponentType<unknown>,
    config?: MatDialogConfig | undefined
  ) {
    return this.dialog.open(component, config);
  }
}
