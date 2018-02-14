import {ITask} from './ITask';

export interface IWorkDay {
  id: number;
  tasks: Array<ITask>;
  requiredMinPerDay: number;
  extraMinPerDay: number;
  sumPerDay: number;
  actualDay: Date;
}
