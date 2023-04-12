import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataConfirm } from 'src/app/models/model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  createForm: UntypedFormGroup = new UntypedFormGroup({
    summary: new UntypedFormControl(''),
    createDate: new UntypedFormControl(''),
    dueDate: new UntypedFormControl(''),
    priority: new UntypedFormControl(''),
    status: new UntypedFormControl(''),
    note: new UntypedFormControl(''),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DataConfirm,
    private mdDialogRef: MatDialogRef<CreateTaskComponent>,
    private tasksService: TasksService
  ) {}
  ngOnInit(): void {
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
    this.tasksService.addTask(this.createForm.value);
    this.close(true);
  }
  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }
}
