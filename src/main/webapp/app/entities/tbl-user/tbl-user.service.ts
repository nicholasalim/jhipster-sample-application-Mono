import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITblUser } from 'app/shared/model/tbl-user.model';

type EntityResponseType = HttpResponse<ITblUser>;
type EntityArrayResponseType = HttpResponse<ITblUser[]>;

@Injectable({ providedIn: 'root' })
export class TblUserService {
  public resourceUrl = SERVER_API_URL + 'api/tbl-users';

  constructor(protected http: HttpClient) {}

  create(tblUser: ITblUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tblUser);
    return this.http
      .post<ITblUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tblUser: ITblUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tblUser);
    return this.http
      .put<ITblUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITblUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITblUser[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tblUser: ITblUser): ITblUser {
    const copy: ITblUser = Object.assign({}, tblUser, {
      lastLogin: tblUser.lastLogin && tblUser.lastLogin.isValid() ? tblUser.lastLogin.toJSON() : undefined,
      deleteDt: tblUser.deleteDt && tblUser.deleteDt.isValid() ? tblUser.deleteDt.toJSON() : undefined,
      createDt: tblUser.createDt && tblUser.createDt.isValid() ? tblUser.createDt.toJSON() : undefined,
      lastTimestp: tblUser.lastTimestp && tblUser.lastTimestp.isValid() ? tblUser.lastTimestp.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.lastLogin = res.body.lastLogin ? moment(res.body.lastLogin) : undefined;
      res.body.deleteDt = res.body.deleteDt ? moment(res.body.deleteDt) : undefined;
      res.body.createDt = res.body.createDt ? moment(res.body.createDt) : undefined;
      res.body.lastTimestp = res.body.lastTimestp ? moment(res.body.lastTimestp) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tblUser: ITblUser) => {
        tblUser.lastLogin = tblUser.lastLogin ? moment(tblUser.lastLogin) : undefined;
        tblUser.deleteDt = tblUser.deleteDt ? moment(tblUser.deleteDt) : undefined;
        tblUser.createDt = tblUser.createDt ? moment(tblUser.createDt) : undefined;
        tblUser.lastTimestp = tblUser.lastTimestp ? moment(tblUser.lastTimestp) : undefined;
      });
    }
    return res;
  }
}
