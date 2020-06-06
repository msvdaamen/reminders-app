import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditReminderDialogComponent } from './create-edit-reminder-dialog.component';

describe('CreateEditReminderDialogComponent', () => {
  let component: CreateEditReminderDialogComponent;
  let fixture: ComponentFixture<CreateEditReminderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditReminderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
