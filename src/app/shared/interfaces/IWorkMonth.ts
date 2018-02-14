import {IWorkDay} from './IWorkDay';

export interface IWorkMonth {
  date: number[];
  sumPerMonth: number;
  requiredMinPerMonth: number;
  extraMinPerMonth: number;
  monthDate: string;
  id: number;
  days: Array<IWorkDay>;
}
