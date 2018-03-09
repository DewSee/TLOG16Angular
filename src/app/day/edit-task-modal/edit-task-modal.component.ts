import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent implements OnInit {
  public editTaskForm: FormGroup;
  taskIdToEdit: string;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }


  openEditTaskModal(taskId: string): void {
    const editTaskModal = document.getElementById('editTaskModal');
    editTaskModal.style.display = 'inline';
    this.taskIdToEdit = taskId;
    console.log(this.taskIdToEdit);
  }

  closeEditTaskModal(): void {
    const editTaskModal = document.getElementById('editTaskModal');
    editTaskModal.style.display = 'none';
}

  private initForm(): void {
    this.editTaskForm = this.formBuilder.group({
      taskId: ['', [Validators.required, Validators.minLength(4)], Validators.maxLength(7)],
      startTime: ['', [Validators.required, Validators.pattern('[0-9]|0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]')] ],
      endTime: ['', [Validators.required, Validators.pattern('[0-9]|0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]')] ],
      comment: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

}
