import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IWorkMonth} from '../../shared/interfaces/IWorkMonth';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
@Input() visibleDate: Date;
@Output() onDateChange: EventEmitter <Date> = new EventEmitter();

  constructor() { }



  ngOnInit() {
  }

  nextMonth(): void {
    this.visibleDate.setMonth(this.visibleDate.getMonth() + 1);
    this.onDateChange.emit(this.visibleDate);
  }


  previousMonth(): void {
    this.visibleDate.setMonth(this.visibleDate.getMonth() - 1);
    this.onDateChange.emit(this.visibleDate);
  }

}
