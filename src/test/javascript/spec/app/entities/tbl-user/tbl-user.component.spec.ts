import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { TblUserComponent } from 'app/entities/tbl-user/tbl-user.component';
import { TblUserService } from 'app/entities/tbl-user/tbl-user.service';
import { TblUser } from 'app/shared/model/tbl-user.model';

describe('Component Tests', () => {
  describe('TblUser Management Component', () => {
    let comp: TblUserComponent;
    let fixture: ComponentFixture<TblUserComponent>;
    let service: TblUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterMonolithicTestModule],
        declarations: [TblUserComponent],
      })
        .overrideTemplate(TblUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TblUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TblUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TblUser(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tblUsers && comp.tblUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
