import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITblUser, TblUser } from 'app/shared/model/tbl-user.model';
import { TblUserService } from './tbl-user.service';
import { TblUserComponent } from './tbl-user.component';
import { TblUserDetailComponent } from './tbl-user-detail.component';
import { TblUserUpdateComponent } from './tbl-user-update.component';

@Injectable({ providedIn: 'root' })
export class TblUserResolve implements Resolve<ITblUser> {
  constructor(private service: TblUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITblUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tblUser: HttpResponse<TblUser>) => {
          if (tblUser.body) {
            return of(tblUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TblUser());
  }
}

export const tblUserRoute: Routes = [
  {
    path: '',
    component: TblUserComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TblUsers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TblUserDetailComponent,
    resolve: {
      tblUser: TblUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TblUsers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TblUserUpdateComponent,
    resolve: {
      tblUser: TblUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TblUsers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TblUserUpdateComponent,
    resolve: {
      tblUser: TblUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TblUsers',
    },
    canActivate: [UserRouteAccessService],
  },
];
