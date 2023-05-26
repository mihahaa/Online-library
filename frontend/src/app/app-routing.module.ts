import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcommComponent } from './addcomm/addcomm.component';
import { AdminComponent } from './admin/admin.component';
import { BookComponent } from './book/book.component';
import { BookspecComponent } from './bookspec/bookspec.component';
import { BorrowComponent } from './borrow/borrow.component';
import { BorrowactiveComponent } from './borrowactive/borrowactive.component';
import { LoginComponent } from './login/login.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { MainModeratorComponent } from './main-moderator/main-moderator.component';
import { MainReaderComponent } from './main-reader/main-reader.component';
import { MainComponent } from './main/main.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { NewbookReaderComponent } from './newbook-reader/newbook-reader.component';
import { NewbookComponent } from './newbook/newbook.component';
import { PasswordComponent } from './password/password.component';
import { ProfilComponent } from './profil/profil.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';
import { RequestsComponent } from './requests/requests.component';
import { SearchAdvComponent } from './search-adv/search-adv.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'search',component:SearchComponent},
  {path:'reader',component:ReaderComponent},
  {path:'moderator',component:ModeratorComponent},
  {path:'admin',component:AdminComponent},
  {path:'main-reader',component:MainReaderComponent},
  {path:'main-moderator',component:MainModeratorComponent},
  {path:'main-admin',component:MainAdminComponent},
  {path:'loginadmin',component:LoginadminComponent},
  {path:'profil',component:ProfilComponent},
  {path:'search-adv',component:SearchAdvComponent},
  {path:'borrow',component:BorrowComponent},
  {path:'newbook',component:NewbookComponent},
  {path:'requests',component:RequestsComponent},
  {path:'bookspec',component:BookspecComponent},
  {path:'newbook-reader',component:NewbookReaderComponent},
  {path:'book',component:BookComponent},
  {path:'password',component:PasswordComponent},
  {path:'borrowactive',component:BorrowactiveComponent},
  {path:'addcomm',component:AddcommComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
