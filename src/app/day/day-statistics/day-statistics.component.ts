import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-day-statistics',
  templateUrl: './day-statistics.component.html',
  styleUrls: ['./day-statistics.component.css']
})
export class DayStatisticsComponent implements OnInit {
  @Input() visibleDay;

  constructor() {
  }

  ngOnInit() {
  }

}
