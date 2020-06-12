import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITblUser } from 'app/shared/model/tbl-user.model';
import { TblUserService } from './tbl-user.service';

@Component({
  templateUrl: './tbl-user-delete-dialog.component.html',
})
export class TblUserDeleteDialogComponent {
  tblUser?: ITblUser;

  constructor(protected tblUserService: TblUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tblUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tblUserListModification');
      this.activeModal.close();
    });
  }
}
