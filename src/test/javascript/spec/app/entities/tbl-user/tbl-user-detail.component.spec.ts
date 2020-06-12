import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { TblUserDetailComponent } from 'app/entities/tbl-user/tbl-user-detail.component';
import { TblUser } from 'app/shared/model/tbl-user.model';

describe('Component Tests', () => {
  describe('TblUser Management Detail Component', () => {
    let comp: TblUserDetailComponent;
    let fixture: ComponentFixture<TblUserDetailComponent>;
    const route = ({ data: of({ tblUser: new TblUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterMonolithicTestModule],
        declarations: [TblUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TblUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TblUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tblUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tblUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
