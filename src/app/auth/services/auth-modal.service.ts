import { Injectable } from '@angular/core';
import { ModalService } from '../../core/services/modal.service';
import { AuthDialogComponent } from '../components/auth-dialog/auth-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  constructor(private modalService: ModalService) {}

  public openDialog() {
    return this.modalService.openDialog(AuthDialogComponent);
  }
}
