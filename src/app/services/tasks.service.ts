import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private dbService: NgxIndexedDBService) {}
  addTask(task: Task): any {
    this.dbService.add('task', task).subscribe(() => {});
  }
  updateTask(task: Task): any {
    this.dbService.update('task', task).subscribe(() => {});
  }
  getTasks(): any {
    return this.dbService.getAll('task');
  }
  deleteTask(id: string): any {
    this.dbService.delete('task', id).subscribe(() => {});
  }
}
