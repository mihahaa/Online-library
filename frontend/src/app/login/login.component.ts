import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnici';
import { KnjigeService } from '../services/knjige.service';
import { KorisnikService } from '../services/korisnici.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private ks:KorisnikService,private knjs:KnjigeService) { }

  ngOnInit(): void {
  }

  username:string;
  password:string;
  message:string;

  

  login(){
      this.ks.login(this.username,this.password).subscribe((userFromDB: Korisnik)=>{
        if(userFromDB!=null){
          
         sessionStorage.setItem('username',this.username);
          sessionStorage.setItem('ime',userFromDB.ime);
          sessionStorage.setItem('prezime',userFromDB.prezime);
          sessionStorage.setItem('email',userFromDB.email);
          sessionStorage.setItem('telefon',userFromDB.telefon);
          sessionStorage.setItem('slika',userFromDB.slika);
          sessionStorage.setItem('adresa',userFromDB.adresa);
          sessionStorage.setItem('status',userFromDB.status)
          sessionStorage.setItem('zaduzeno',String(userFromDB.zaduzeno))
          if(userFromDB.tip=='citalac')
          {
            sessionStorage.setItem('koje','reader');
            this.router.navigate(['reader']);
          }
          else
          {
            sessionStorage.setItem('koje','moderator');
            this.router.navigate(['moderator']);
          }
      }
    else this.message="Molimo Vas pokusajte opet kasnije"})
  }

}
