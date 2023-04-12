import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataConfirm } from 'src/app/models/model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DataConfirm,
    private mdDialogRef: MatDialogRef<ConfirmDialogComponent>
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
    this.close(true);
  }
  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }
}
