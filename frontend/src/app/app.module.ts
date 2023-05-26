import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule }from '@swimlane/ngx-charts';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { MainComponent } from './main/main.component';
import { PasswordComponent } from './password/password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { ProfilComponent } from './profil/profil.component';
import { BookComponent } from './book/book.component';
import { BorrowComponent } from './borrow/borrow.component';
import { ReaderComponent } from './reader/reader.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { AdminComponent } from './admin/admin.component';
import { MainReaderComponent } from './main-reader/main-reader.component';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { MainModeratorComponent } from './main-moderator/main-moderator.component';
import { SearchAdvComponent } from './search-adv/search-adv.component';
import { NewbookComponent } from './newbook/newbook.component';
import { RequestsComponent } from './requests/requests.component';
import { BookspecComponent } from './bookspec/bookspec.component';
import { NewbookReaderComponent } from './newbook-reader/newbook-reader.component';
import { AddcommComponent } from './addcomm/addcomm.component';
import { BorrowactiveComponent } from './borrowactive/borrowactive.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginadminComponent,
    MainComponent,
    PasswordComponent,
    RegisterComponent,
    SearchComponent,
    ProfilComponent,
    BookComponent,
    BorrowComponent,
    ReaderComponent,
    ModeratorComponent,
    AdminComponent,
    MainReaderComponent,
    MainAdminComponent,
    MainModeratorComponent,
    SearchAdvComponent,
    NewbookComponent,
    RequestsComponent,
    BookspecComponent,
    NewbookReaderComponent,
    AddcommComponent,
    BorrowactiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
