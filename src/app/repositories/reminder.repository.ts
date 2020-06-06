import {Injectable} from "@angular/core";
import {ReminderModal} from "../models/reminder.modal";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable()
export  class ReminderRepository {

  private reminders = [
    {
      id: 1,
      title: 'Boodschappen',
      description: 'Appels en peren halen',
      hasReminder: false,
      reminderInterval: '',
      reminderTime: '',
      endDate: '01-12-2020'
    },
    {
      id: 2,
      title: 'Tesla',
      description: 'morgen kijken voor tesla kopen',
      hasReminder: true,
      reminderInterval: 'weekly',
      reminderTime: '09:12',
      endDate: ''
    },
    {
      id: 1,
      title: 'Huisarts',
      description: 'Huisarts bezoeken voor checkup',
      hasReminder: true,
      reminderInterval: 'daily',
      reminderTime: '12:00',
      endDate: '01-12-2020'
    }
  ];
  reminders$ = new BehaviorSubject<ReminderModal[]>(this.reminders);

  add(reminder: ReminderModal) {
    this.reminders.push(reminder);
    this.reminders$.next(this.reminders);
  }

  edit(index: number, reminder: ReminderModal) {
    this.reminders[index] = reminder;
    this.reminders$.next(this.reminders);
  }

  remove(index: number) {
    this.reminders.splice(index, 1);
    this.reminders$.next(this.reminders);
  }
}
