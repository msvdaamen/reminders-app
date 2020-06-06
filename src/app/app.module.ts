import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/auth/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RegisterComponent} from "./pages/auth/register/register.component";
import { HomeComponent } from './pages/home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { RemoveReminderDialogComponent } from './components/dialogs/remove-reminder-dialog/remove-reminder-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import { CreateEditReminderDialogComponent } from './components/dialogs/create-edit-reminder-dialog/create-edit-reminder-dialog.component';
import {ReminderRepository} from "./repositories/reminder.repository";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {GraphQLModule} from "./graphql.module";
import {GuardsModule} from "./guards/guards.module";
import {AppStateModule} from "./states/app-state-module";
import {HttpClientModule} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RemoveReminderDialogComponent,
    CreateEditReminderDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    GraphQLModule,
    GuardsModule,
    AppStateModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [
    ReminderRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
