import {Component, Input, OnInit} from '@angular/core';
import {IWorkMonth} from '../../shared/interfaces/IWorkMonth';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-month-statistics',
  templateUrl: './month-statistics.component.html',
  styleUrls: ['./month-statistics.component.css']
})
export class MonthStatisticsComponent implements OnInit {
  @Input() visibleDate: Date;
  @Input() visibleMonth: IWorkMonth;


  constructor() {
  }

  ngOnInit() {

  }



}
