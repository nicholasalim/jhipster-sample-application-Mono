import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { TblUserUpdateComponent } from 'app/entities/tbl-user/tbl-user-update.component';
import { TblUserService } from 'app/entities/tbl-user/tbl-user.service';
import { TblUser } from 'app/shared/model/tbl-user.model';

describe('Component Tests', () => {
  describe('TblUser Management Update Component', () => {
    let comp: TblUserUpdateComponent;
    let fixture: ComponentFixture<TblUserUpdateComponent>;
    let service: TblUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterMonolithicTestModule],
        declarations: [TblUserUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TblUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TblUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TblUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TblUser(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TblUser();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
