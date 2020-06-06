import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface DialogData {
  index: number
}

@Component({
  selector: 'app-remove-reminder-dialog',
  templateUrl: './remove-reminder-dialog.component.html',
  styleUrls: ['./remove-reminder-dialog.component.scss']
})
export class RemoveReminderDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemoveReminderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  remove() {
    this.dialogRef.close({
      index: this.data.index
    })
  }

}
