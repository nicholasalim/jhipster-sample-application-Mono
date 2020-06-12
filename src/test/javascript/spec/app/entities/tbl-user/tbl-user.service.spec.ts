import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TblUserService } from 'app/entities/tbl-user/tbl-user.service';
import { ITblUser, TblUser } from 'app/shared/model/tbl-user.model';

describe('Service Tests', () => {
  describe('TblUser Service', () => {
    let injector: TestBed;
    let service: TblUserService;
    let httpMock: HttpTestingController;
    let elemDefault: ITblUser;
    let expectedResult: ITblUser | ITblUser[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TblUserService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new TblUser(
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            lastLogin: currentDate.format(DATE_TIME_FORMAT),
            deleteDt: currentDate.format(DATE_TIME_FORMAT),
            createDt: currentDate.format(DATE_TIME_FORMAT),
            lastTimestp: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TblUser', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            lastLogin: currentDate.format(DATE_TIME_FORMAT),
            deleteDt: currentDate.format(DATE_TIME_FORMAT),
            createDt: currentDate.format(DATE_TIME_FORMAT),
            lastTimestp: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastLogin: currentDate,
            deleteDt: currentDate,
            createDt: currentDate,
            lastTimestp: currentDate,
          },
          returnedFromService
        );

        service.create(new TblUser()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TblUser', () => {
        const returnedFromService = Object.assign(
          {
            userId: 1,
            username: 'BBBBBB',
            password: 'BBBBBB',
            name: 'BBBBBB',
            email: 'BBBBBB',
            userRole: 'BBBBBB',
            lastLogin: currentDate.format(DATE_TIME_FORMAT),
            deleteDt: currentDate.format(DATE_TIME_FORMAT),
            deleteBy: 'BBBBBB',
            createBy: 'BBBBBB',
            createDt: currentDate.format(DATE_TIME_FORMAT),
            updBy: 'BBBBBB',
            lastTimestp: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastLogin: currentDate,
            deleteDt: currentDate,
            createDt: currentDate,
            lastTimestp: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TblUser', () => {
        const returnedFromService = Object.assign(
          {
            userId: 1,
            username: 'BBBBBB',
            password: 'BBBBBB',
            name: 'BBBBBB',
            email: 'BBBBBB',
            userRole: 'BBBBBB',
            lastLogin: currentDate.format(DATE_TIME_FORMAT),
            deleteDt: currentDate.format(DATE_TIME_FORMAT),
            deleteBy: 'BBBBBB',
            createBy: 'BBBBBB',
            createDt: currentDate.format(DATE_TIME_FORMAT),
            updBy: 'BBBBBB',
            lastTimestp: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastLogin: currentDate,
            deleteDt: currentDate,
            createDt: currentDate,
            lastTimestp: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TblUser', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
