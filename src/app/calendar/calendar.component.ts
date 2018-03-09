import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IWorkMonth} from '../shared/interfaces/IWorkMonth';
import {IWorkDay} from '../shared/interfaces/IWorkDay';


const DAYS_OF_WEEK = [
  {name: 'Monday'},
  {name: 'Tuesday'},
  {name: 'Wednesday'},
  {name: 'Thursday'},
  {name: 'Friday'},
  {name: 'Saturday'},
  {name: 'Sunday'}
];

const baseUrl = 'http://127.0.0.1:8080/timelogger';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: Date;
  visibleDate: Date;


  firstDayOfVisibleMonth: Date;

  daysOfWeek = DAYS_OF_WEEK;
  daysInCurrentMonth = [];

  specificWorkDay: IWorkDay;

  visibleMonth: IWorkMonth = {
    requiredMinPerMonth: 0,
    extraMinPerMonth: 0,
    sumPerMonth: 0,
    days: [],
    id: 0,
    monthDate: '',
    date: null
  };


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.visibleDate = this.currentDate;

    this.firstDayOfVisibleMonth = new Date(this.visibleDate.getFullYear(), this.visibleDate.getMonth(), 1, 1);
    this.loadDaysInMonth();
    this.getVisibleWorkMonth(this.visibleDate.getFullYear(), this.visibleDate.getMonth() + 1);
  }

  onDateChange(newDate: Date): void {
    this.visibleDate = newDate;
    this.firstDayOfVisibleMonth = new Date(this.visibleDate.getFullYear(), this.visibleDate.getMonth(), 1, 1);
    this.loadDaysInMonth();
    this.getVisibleWorkMonth(this.visibleDate.getFullYear(), this.visibleDate.getMonth() + 1);

  }

  daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  loadDaysInMonth(): void {
    this.daysInCurrentMonth = [];
    const daysInVisibleMonth = this.daysInMonth(this.visibleDate.getFullYear(), this.visibleDate.getMonth());


    for (let i = 0; i < this.firstDayOfVisibleMonth.getDay() - 1; i++) {
      this.daysInCurrentMonth.push(0);
    }
    for (let i = 0; i < daysInVisibleMonth; i++) {
      this.daysInCurrentMonth.push(i + 1);
    }
    for (let i = 0; i <= (42 - (daysInVisibleMonth + this.firstDayOfVisibleMonth.getDay())); i++) {
      this.daysInCurrentMonth.push(0);
    }

  }


  isToday(day: number): boolean {
    return day - this.firstDayOfVisibleMonth.getDay() + 1 === this.currentDate.getDate() &&
      (this.visibleDate.getFullYear() === this.currentDate.getFullYear() && this.visibleDate.getMonth() === this.currentDate.getMonth());
  }

  isActiveDay(numberOfCell: number): boolean {
    return this.daysInCurrentMonth[numberOfCell] !== 0;
  }

  getVisibleWorkMonth(year: number, month: number): void {
    this.http.get<IWorkMonth>(baseUrl + '/workmonths/' + year + '/' + month).subscribe(data => {
        this.visibleMonth = data;
      },
      err => {
        this.visibleMonth.requiredMinPerMonth = 0;
        this.visibleMonth.extraMinPerMonth = 0;
        this.visibleMonth.sumPerMonth = 0;
      });
  }

  getSpecificWorKDay(year: number, month: number, day: number): void {
    this.http.get<IWorkDay>(baseUrl + '/workmonths/' + year + '/' + month + '/' + day).subscribe(data => {
      this.specificWorkDay = data;
    });
  }



}


