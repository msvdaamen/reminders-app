import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RemoveReminderDialogComponent} from "../../components/dialogs/remove-reminder-dialog/remove-reminder-dialog.component";
import {ReminderModal} from "../../models/reminder.modal";
import {CreateEditReminderDialogComponent} from "../../components/dialogs/create-edit-reminder-dialog/create-edit-reminder-dialog.component";
import {ReminderRepository} from "../../repositories/reminder.repository";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  reminders$: Observable<ReminderModal[]>

  constructor(
    private dialog: MatDialog,
    private reminderRepository: ReminderRepository
  ) { }

  ngOnInit(): void {
    this.reminders$ = this.reminderRepository.reminders$;
  }

  openRemoveDialog(index: number) {
    const dialog = this.dialog.open(RemoveReminderDialogComponent, {
      width: '400px',
      autoFocus: false,
      data: {
        index
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.reminderRepository.remove(result.index);
      }
    })
  }

  openCreateDialog() {
    const dialog = this.dialog.open(CreateEditReminderDialogComponent, {
      width: '400px',
      autoFocus: false,
      data: {
        type: 'create'
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.reminderRepository.add(result);
      }
    });
  }

}
