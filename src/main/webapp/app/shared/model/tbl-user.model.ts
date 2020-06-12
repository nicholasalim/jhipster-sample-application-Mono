import { Moment } from 'moment';

export interface ITblUser {
  id?: number;
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  userRole?: string;
  lastLogin?: Moment;
  deleteDt?: Moment;
  deleteBy?: string;
  createBy?: string;
  createDt?: Moment;
  updBy?: string;
  lastTimestp?: Moment;
}

export class TblUser implements ITblUser {
  constructor(
    public id?: number,
    public username?: string,
    public password?: string,
    public name?: string,
    public email?: string,
    public userRole?: string,
    public lastLogin?: Moment,
    public deleteDt?: Moment,
    public deleteBy?: string,
    public createBy?: string,
    public createDt?: Moment,
    public updBy?: string,
    public lastTimestp?: Moment
  ) {}
}
