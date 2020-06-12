import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterMonolithicSharedModule } from 'app/shared/shared.module';
import { TblUserComponent } from './tbl-user.component';
import { TblUserDetailComponent } from './tbl-user-detail.component';
import { TblUserUpdateComponent } from './tbl-user-update.component';
import { TblUserDeleteDialogComponent } from './tbl-user-delete-dialog.component';
import { tblUserRoute } from './tbl-user.route';

@NgModule({
  imports: [JhipsterMonolithicSharedModule, RouterModule.forChild(tblUserRoute)],
  declarations: [TblUserComponent, TblUserDetailComponent, TblUserUpdateComponent, TblUserDeleteDialogComponent],
  entryComponents: [TblUserDeleteDialogComponent],
})
export class JhipsterMonolithicTblUserModule {}
