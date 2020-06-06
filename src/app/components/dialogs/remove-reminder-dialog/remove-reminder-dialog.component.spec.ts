import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveReminderDialogComponent } from './remove-reminder-dialog.component';

describe('RemoveReminderDialogComponent', () => {
  let component: RemoveReminderDialogComponent;
  let fixture: ComponentFixture<RemoveReminderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveReminderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
