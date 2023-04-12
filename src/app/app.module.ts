import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksDashboardComponent } from './components/tasks-dashboard/tasks-dashboard.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './services/dialog.service';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

export function migrationFactory() {
  return {
    3: (db, transaction) => {
      const store = transaction.objectStore('aa');
      store.createIndex('Summury', 'Summury', { unique: false });
    },
  };
}

const dbConfig: DBConfig = {
  name: 'tasksDataBase',
  version: 3,
  objectStoresMeta: [
    {
      store: 'task',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'summary', keypath: 'summary', options: { unique: false } },
        {
          name: 'createDate',
          keypath: 'createDate',
          options: { unique: false },
        },
        { name: 'dueDate', keypath: 'dueDate', options: { unique: false } },
        { name: 'priority', keypath: 'priority', options: { unique: false } },

        { name: 'status', keypath: 'status', options: { unique: false } },
        { name: 'note', keypath: 'note', options: { unique: false } },
      ],
    },
  ],
  // provide the migration factory to the DBConfig
  migrationFactory,
};
@NgModule({
  declarations: [
    AppComponent,
    TasksDashboardComponent,
    ConfirmDialogComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    BrowserAnimationsModule,
    MatDialogModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    ConfirmDialogService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
