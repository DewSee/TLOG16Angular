import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})
export class NewTaskModalComponent implements OnInit {
  @Input() baseUrl: string;
  @Output() onNewTask: EventEmitter <any> = new EventEmitter();
  public newTaskForm: FormGroup;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  openNewTaskModal(): void {
    const newTaskModal = document.getElementById('newTaskModal');
    newTaskModal.style.display = 'inline';
  }

  closeTaskModal(): void {
    const newTaskModal = document.getElementById('newTaskModal');
    newTaskModal.style.display = 'none';
  }

  createNewTask(formValue: any): void {
    console.log(formValue);
    const body = {
      year: this.route.snapshot.paramMap.get('visibleYear'),
      month: this.route.snapshot.paramMap.get('visibleMonth'),
      day: this.route.snapshot.paramMap.get('numberOfDay'),
      taskId: formValue.taskId,
      startTime: formValue.startTime,
      comment: formValue.comment
    };
    console.log(this.baseUrl);
    this.http.post(this.baseUrl + '/workmonths/workdays/tasks/start', body).subscribe( data => {
      this.onNewTask.emit();
    });
    this.newTaskForm.reset();
  }

  private initForm(): void {
    this.newTaskForm = this.formBuilder.group({
      taskId: ['', [Validators.required, Validators.minLength(4)]],
      startTime: ['', [Validators.required, Validators.pattern('[0-9]|0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]')] ],
      comment: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
}


