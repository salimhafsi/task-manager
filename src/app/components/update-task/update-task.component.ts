import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataConfirm } from 'src/app/models/model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent implements OnInit {
  updateForm: UntypedFormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DataConfirm,
    private mdDialogRef: MatDialogRef<UpdateTaskComponent>,
    private tasksService: TasksService
  ) {}
  ngOnInit(): void {
    console.log(this.data.task.summary);
    this.updateForm = new UntypedFormGroup({
      id: new UntypedFormControl(this.data.task.id),
      summary: new UntypedFormControl(this.data.task.summary),
      createDate: new UntypedFormControl(this.data.task.createDate),
      dueDate: new UntypedFormControl(this.data.task.dueDate),
      priority: new UntypedFormControl(this.data.task.priority),
      status: new UntypedFormControl(this.data.task.status),
      note: new UntypedFormControl(this.data.task.note),
    });
    document.getElementById('dashboard').classList.add('disable');
  }
  public cancel() {
    this.close(false);
  }
  public close(value) {
    this.mdDialogRef.close(value);
    document.getElementById('dashboard').classList.remove('disable');
  }
  public confirm() {
    this.tasksService.updateTask(this.updateForm.value);
    this.close(true);
  }
  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }
}
