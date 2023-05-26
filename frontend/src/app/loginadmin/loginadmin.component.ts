import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnici';
import { KorisnikService } from '../services/korisnici.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {

  constructor(private ks:KorisnikService,private router:Router) { }

  ngOnInit(): void {
  }

  username:string;
  password:string;
  message:string;

  login(){
    this.ks.loginadmin(this.username,this.password).subscribe((userFromDB: Korisnik)=>{
      if(userFromDB!=null){
        sessionStorage.setItem('username',userFromDB.username)
        sessionStorage.setItem('koje','admin')
      this.router.navigate(['admin']);
    }
  else this.message="Pogresno ime ili lozinka"})
}

}
