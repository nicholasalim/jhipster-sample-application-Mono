import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITblUser } from 'app/shared/model/tbl-user.model';
import { TblUserService } from './tbl-user.service';
import { TblUserDeleteDialogComponent } from './tbl-user-delete-dialog.component';

@Component({
  selector: 'jhi-tbl-user',
  templateUrl: './tbl-user.component.html',
})
export class TblUserComponent implements OnInit, OnDestroy {
  tblUsers?: ITblUser[];
  eventSubscriber?: Subscription;

  constructor(protected tblUserService: TblUserService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.tblUserService.query().subscribe((res: HttpResponse<ITblUser[]>) => (this.tblUsers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTblUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITblUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTblUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('tblUserListModification', () => this.loadAll());
  }

  delete(tblUser: ITblUser): void {
    const modalRef = this.modalService.open(TblUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tblUser = tblUser;
  }
}
