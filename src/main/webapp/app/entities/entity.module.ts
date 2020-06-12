import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tbl-user',
        loadChildren: () => import('./tbl-user/tbl-user.module').then(m => m.JhipsterMonolithicTblUserModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JhipsterMonolithicEntityModule {}
