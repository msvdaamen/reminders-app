import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

interface DialogData {
  type: string;
}

@Component({
  selector: 'app-create-edit-reminder-dialog',
  templateUrl: './create-edit-reminder-dialog.component.html',
  styleUrls: ['./create-edit-reminder-dialog.component.scss']
})
export class CreateEditReminderDialogComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateEditReminderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [''],
      description: [''],
      hasReminder: [false],
      reminderInterval: ['daily'],
      reminderTime: [''],
      endDate: ['']
    });
  }


  get type() {
    return this.data.type;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.createForm.value);
  }

}
