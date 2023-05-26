import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { Korisnik } from '../models/korisnici';
import { KnjigeService } from '../services/knjige.service';
import { KorisnikService } from '../services/korisnici.service';
import { ZahteviService } from '../services/zahtevi.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private knjs:KnjigeService,private ks:KorisnikService,private router:Router,private zahs:ZahteviService) { }

  username:string
  koje:string

  ngOnInit(): void {
    this.username=sessionStorage.getItem('username')
    this.koje=sessionStorage.getItem('koje')
    this.zaduzenje=Number(sessionStorage.getItem('zaduzenje'))
    this.knjs.getallbooks().subscribe((books:Knjiga[])=>{
      this.allbooks=books;
    })

    this.ks.getallusers().subscribe((books:Korisnik[])=>{
      this.allusers=books;
    })

  }

  updateuser(idd)
  {
    this.ks.getuserid(idd).subscribe((user:Korisnik)=>{
      sessionStorage.removeItem('username')
      sessionStorage.setItem('username',user.username)
      sessionStorage.removeItem('ime')
      sessionStorage.setItem('ime',user.ime)
      sessionStorage.removeItem('prezime')
      sessionStorage.setItem('prezime',user.prezime)
      sessionStorage.removeItem('adresa')
      sessionStorage.setItem('adresa',user.adresa)
      sessionStorage.removeItem('telefon')
      sessionStorage.setItem('telefon',user.telefon)
      sessionStorage.removeItem('email')
      sessionStorage.setItem('email',user.email)
      sessionStorage.removeItem('slika')
      sessionStorage.setItem('slika',user.slika)
      this.router.navigate(['profil'])
    })
    
  }

  adduser()
  {
    this.router.navigate(['register'])
  }

  upguser(idd){
    this.ks.upguser(idd).subscribe((resp)=>{
      this.ngOnInit()
    })
  }

  dwnguser(idd)
  {
    this.ks.dwnguser(idd).subscribe((resp)=>{
      this.ngOnInit()
    })
  }

  aproveuser(idd)
  {
    this.ks.unblkuser(idd).subscribe((resp)=>{
      this.ngOnInit()
    })
  }

  zaduzenje:Number
  zaduzenjee:Number

  addbook()
  {
    this.router.navigate(['newbook'])
  }

  deleteuser(idd)
  {
    this.ks.deleteuser(idd).subscribe(()=>{
      this.ngOnInit()
    })
  }

  blockuser(idd)
  {
    this.ks.blkuser(idd).subscribe((resp)=>{
      this.ngOnInit()
    })
  }

  unblockuser(idd)
  {
    this.ks.unblkuser(idd).subscribe((resp)=>{
      this.ngOnInit()
    })
  }

  updatebook(idd)
  {
      sessionStorage.removeItem('zabookid')
      sessionStorage.setItem('zabookid',idd)
      this.router.navigate(['bookspec'])
  }

  deletebook(idd)
  {
    this.knjs.deletebook(idd).subscribe(()=>{
      this.ngOnInit()
    })
  }

  aprovebook(idd)
  {
    this.knjs.approvebook(idd).subscribe(()=>{
      this.zahs.deletereq(idd).subscribe(()=>{
        this.ngOnInit()
      })
    })
  }

  declinebook(idd){
    this.knjs.declinebook(idd).subscribe(()=>{
      this.zahs.deletereq(idd).subscribe(()=>{
        this.ngOnInit()
      })
    })
  }

  updatedays()
  {
    sessionStorage.removeItem('zaduzenje')
    sessionStorage.setItem('zaduzenje',String(this.zaduzenjee))
    this.ngOnInit()
  }

  logout()
  {
    this.router.navigate(['']);
  }

  allbooks:Knjiga[];
  allusers:Korisnik[];

}
