import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITblUser, TblUser } from 'app/shared/model/tbl-user.model';
import { TblUserService } from './tbl-user.service';

@Component({
  selector: 'jhi-tbl-user-update',
  templateUrl: './tbl-user-update.component.html',
})
export class TblUserUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    username: [],
    password: [],
    name: [],
    email: [],
    userRole: [],
    lastLogin: [],
    deleteDt: [],
    deleteBy: [],
    createBy: [],
    createDt: [],
    updBy: [],
    lastTimestp: [],
  });

  constructor(protected tblUserService: TblUserService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tblUser }) => {
      if (!tblUser.id) {
        const today = moment().startOf('day');
        tblUser.lastLogin = today;
        tblUser.deleteDt = today;
        tblUser.createDt = today;
        tblUser.lastTimestp = today;
      }

      this.updateForm(tblUser);
    });
  }

  updateForm(tblUser: ITblUser): void {
    this.editForm.patchValue({
      id: tblUser.id,
      username: tblUser.username,
      password: tblUser.password,
      name: tblUser.name,
      email: tblUser.email,
      userRole: tblUser.userRole,
      lastLogin: tblUser.lastLogin ? tblUser.lastLogin.format(DATE_TIME_FORMAT) : null,
      deleteDt: tblUser.deleteDt ? tblUser.deleteDt.format(DATE_TIME_FORMAT) : null,
      deleteBy: tblUser.deleteBy,
      createBy: tblUser.createBy,
      createDt: tblUser.createDt ? tblUser.createDt.format(DATE_TIME_FORMAT) : null,
      updBy: tblUser.updBy,
      lastTimestp: tblUser.lastTimestp ? tblUser.lastTimestp.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tblUser = this.createFromForm();
    if (tblUser.id !== undefined) {
      this.subscribeToSaveResponse(this.tblUserService.update(tblUser));
    } else {
      this.subscribeToSaveResponse(this.tblUserService.create(tblUser));
    }
  }

  private createFromForm(): ITblUser {
    return {
      ...new TblUser(),
      id: this.editForm.get(['id'])!.value,
      username: this.editForm.get(['username'])!.value,
      password: this.editForm.get(['password'])!.value,
      name: this.editForm.get(['name'])!.value,
      email: this.editForm.get(['email'])!.value,
      userRole: this.editForm.get(['userRole'])!.value,
      lastLogin: this.editForm.get(['lastLogin'])!.value ? moment(this.editForm.get(['lastLogin'])!.value, DATE_TIME_FORMAT) : undefined,
      deleteDt: this.editForm.get(['deleteDt'])!.value ? moment(this.editForm.get(['deleteDt'])!.value, DATE_TIME_FORMAT) : undefined,
      deleteBy: this.editForm.get(['deleteBy'])!.value,
      createBy: this.editForm.get(['createBy'])!.value,
      createDt: this.editForm.get(['createDt'])!.value ? moment(this.editForm.get(['createDt'])!.value, DATE_TIME_FORMAT) : undefined,
      updBy: this.editForm.get(['updBy'])!.value,
      lastTimestp: this.editForm.get(['lastTimestp'])!.value
        ? moment(this.editForm.get(['lastTimestp'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITblUser>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
