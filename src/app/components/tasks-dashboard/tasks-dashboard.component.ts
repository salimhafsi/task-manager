import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, map } from 'rxjs';
import { Task } from 'src/app/models/model';
import { ConfirmDialogService } from 'src/app/services/dialog.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss'],
})
export class TasksDashboardComponent implements OnInit {
  tasksList$: Observable<any>;
  sortAsc = true;
  constructor(
    private tasksService: TasksService,
    private dialogService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
  }
  getAllTasks() {
    return (this.tasksList$ = this.tasksService.getTasks());
  }
  deleteTask(task: Task) {
    const options = {
      icon: 'fas fa-trash-alt',
      title: 'Are you sure you want to delete this task ?',
      message: `This action will remove  this task ?`,
      cancelText: 'No',
      confirmText: 'Yes,Delete',
      createTAsk: false,
    };
    this.dialogService.open(options);
    this.dialogService
      .confirmed()
      .toPromise()
      .then((confirmed: any) => {
        if (confirmed) {
          this.tasksService.deleteTask(task.id);
          this.getAllTasks();
          this.snackBar.open('Task deleted succefully', 'close');
        }
      });
  }
  CreateTask() {
    const options = {
      createTask: true,
      cancelText: 'No',
      confirmText: 'Yes,Delete',
    };

    this.dialogService.open(options);
    this.dialogService
      .save()
      .toPromise()
      .then((save: any) => {
        if (save) {
          this.getAllTasks();
          this.snackBar.open('Task added succefully', 'close');
        }
      });
  }
  updateTask(task: Task) {
    const options = {
      updateTask: true,
      task: task,
    };

    this.dialogService.open(options);
    this.dialogService
      .update()
      .toPromise()
      .then((save: any) => {
        if (save) {
          this.getAllTasks();
          this.snackBar.open('Task updated succefully', 'close');
        }
      });
  }
  onSort(element: string) {
    this.tasksList$ = this.sortAsc
      ? this.tasksList$.pipe(
          map((data) => {
            return data.sort((first, second) => {
              if (first[element] < second[element]) {
                return -1;
              }
              if (first[element] > second[element]) {
                return 1;
              }
              return 0;
            });
          })
        )
      : this.tasksList$.pipe(
          map((data) => {
            return data.sort((first, second) => {
              if (first[element] > second[element]) {
                return -1;
              }
              if (first[element] < second[element]) {
                return 1;
              }
              return 0;
            });
          })
        );
    this.sortAsc = !this.sortAsc;
  }
  onFilter(element: string, type: string) {
    this.tasksList$ = this.tasksService.getTasks().pipe(
      map((data: any) => {
        return data.filter((data: Task) => {
          if (type === 'dueDate') {
            return data.dueDate.includes(element);
          } else if (type === 'priority') {
            return element !== 'all' ? data.priority.includes(element) : data;
          } else
            return element !== 'all' ? data.status.includes(element) : data;
        });
      })
    );
  }
  clearDueDate(target) {
    if (target.value !== '') {
      target.value = '';
      this.getAllTasks();
    }
  }
}
