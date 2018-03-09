import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('editTaskModal') child;
  baseUrl = 'http://127.0.0.1:8080/timelogger';

  visibleDay: IWorkDay = {
    id: 0,
    tasks: [],
    requiredMinPerDay: 0,
    extraMinPerDay: 0,
    sumPerDay: 0,
    actualDay: null
  };



  constructor(private route: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.getDay();
  }



  getDay(): void {
    const year = this.route.snapshot.paramMap.get('visibleYear');
    const month = this.route.snapshot.paramMap.get('visibleMonth');
    const numberOfDay = this.route.snapshot.paramMap.get('numberOfDay');

    this.http.get(this.baseUrl + '/workmonths/' + year + '/' + month + '/' + numberOfDay, {responseType: 'text'}).subscribe(data => {
        const workDay: IWorkDay = JSON.parse(data);
        if (workDay) {
          this.visibleDay = workDay;
        }
      }
    );
  }

}

