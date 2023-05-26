import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnici';
import { KorisnikService } from '../services/korisnici.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private ks:KorisnikService,private router:Router) { }

  ngOnInit(): void {
    this.koje=sessionStorage.getItem('koje');
    this.username=sessionStorage.getItem('username');
    this.message=""
  }

  change(){
    if(this.validation())
    {
    this.ks.checkuserpass(this.username,this.passwordo).subscribe((resp:Korisnik)=>{
      if(resp)
      {
      this.ks.changepass(this.username,this.password).subscribe((rsp)=>{
        this.router.navigate(['login'])
      })
    }
      else this.message="Unesite ispravnu lozinku";
      

    })
  }
  }

  poruke:Array<string>

  validation()
  {
    this.poruke=[]
    let vr=true;
    if(this.password==undefined || this.password=="") 
    {
      this.poruke.push("Lozinka je obavezna")
      vr=false;
    }
    if(this.password1==undefined || this.password1=="") 
    {
      this.poruke.push("Potvrda lozinke je obavezna")
      vr=false;
    }
    if(this.passwordo==undefined || this.passwordo=="") 
    {
      this.poruke.push("Morate uneti staru lozinku")
      vr=false;
    }
    this.checkpass()
    this.samepass()
    if(this.passcm!="") this.poruke.push(this.passcm)
    if(this.passm!="") this.poruke.push(this.passm)
    if(this.passcm!="" || this.passm!="") vr=false
    return vr
    
  }

  checkpass()
  {
    let x = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@&^%${}():;><.,?]).{8,12}$/
    let y=/^[A-Z]/
    if ((x.test(this.password) && y.test(this.password)) || this.password==undefined || this.password=="") this.passm = ''
    else this.passm = 'Lozinka nema ispravan format'
  }

  samepass()
  {
    if(this.password!=this.password1 || this.password1==undefined || this.password1=="") this.passcm="Ne poklapaju se lozinke"
    else this.passcm=""
  }

  passm:string
  passcm:string
  passwordo:string
  password:string
  password1:string
  koje:string
  username:string
  message:string

}
