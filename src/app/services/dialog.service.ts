import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DataConfirm } from '../models/model';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { UpdateTaskComponent } from '../components/update-task/update-task.component';

@Injectable()
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  deleteDialogRef: MatDialogRef<ConfirmDialogComponent>;
  createDialogRef: MatDialogRef<CreateTaskComponent>;
  updateDialogRef: MatDialogRef<UpdateTaskComponent>;

  public open(options: DataConfirm) {
    if (options.createTask) {
      this.createDialogRef = this.dialog.open(CreateTaskComponent, {});
    } else if (options.updateTask) {
      this.updateDialogRef = this.dialog.open(UpdateTaskComponent, {
        data: {
          task: options.task,
        },
      });
    } else {
      this.deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          type: options.type || 'failed',
          icon: options.icon,
          title: options.title,
          message: options.message,
          cancelText: options.cancelText,
          confirmText: options.confirmText,
          iconCancel: options.iconCancel,
          sizeConfirm: options.sizeConfirm || 'large',
        },
      });
    }
  }
  public confirmed(): Observable<any> {
    return this.deleteDialogRef?.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }

  public save(): Observable<any> {
    return this.createDialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }

  public update(): Observable<any> {
    return this.updateDialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }
}
