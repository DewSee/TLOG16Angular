import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ITask} from '../shared/interfaces/ITask';
import {IWorkDay} from '../shared/interfaces/IWorkDay';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';



@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  baseUrl = 'http://127.0.0.1:9080/timelogger';

  visibleDay: IWorkDay = {
    id: 0,
    tasks: [],
    requiredMinPerDay: 0,
    extraMinPerDay: 0,
    sumPerDay: 0,
    actualDay: null
  };

  tasksOfDay: Array<ITask> = [];


  constructor(private route: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.getDay();
  }

  getDay(): void {
    const year = this.route.snapshot.paramMap.get('visibleYear');
    console.log(year);
    const month = this.route.snapshot.paramMap.get('visibleMonth');
    console.log(month);
    const numberOfDay = this.route.snapshot.paramMap.get('numberOfDay');
    console.log(numberOfDay);

    this.http.get(this.baseUrl + '/workmonths/' + year + '/' + month + '/' + numberOfDay, {responseType: 'text'}).subscribe(data => {
        const workDay: IWorkDay = JSON.parse(data);
        if (workDay) {
          this.visibleDay = workDay;
          this.tasksOfDay = workDay.tasks;
        }
      }
    );
  }

}

